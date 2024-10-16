/*eslint-disable*/

import React, { useEffect, useState } from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap'
import { useLocation, useNavigate } from 'react-router-dom'

import ApiCall from '../../apiConfiguration/network'
import '@styles/react/libs/input-number/input-number.scss'
import ProductDetails from './ProductDetails'
import apiRoutes from '../../apiConfiguration/apiRoutes'
import PriceDetails from './PriceDetails'
import { config } from '../../apiConfiguration/env'
import { showErrorMessage, showSuccessMessage } from '../../components/toasts'
import { useLoader } from '../../hooks'

const initialState = {
  voucher: '',
  customerName: '',
  cardNumber: '',
  expiryDate: '',
  securityCode: '',
  quantity: 1,
  discount: '',
  total: 0
}

const CheckoutPage = () => {
  const location = useLocation()
  const { name, stock, discount, price, id, unit } = location.state

  const navigate = useNavigate()
  const [state, setState] = useState(initialState)
  const { setLoading } = useLoader()
  const [errors, setErrors] = useState({})

  const handleStateChange = ({ target }) => {
    const { name, value } = target

    setState({ ...state, [name]: value })
  }

  useEffect(() => {
    setState({ ...state, total: parseInt(state.quantity) * parseInt(price) })
  }, [state.quantity])

  const verifyVoucher = async () => {
    setLoading(true)
    const response = await ApiCall.get(`${apiRoutes.GetVoucherDetails}${state.voucher}/${id}`, (await config()).headers)
    setLoading(false)
    if (!response.ok) {
      return showErrorMessage(response.data.error)
    }

    console.log('here')

    showSuccessMessage(response.data.message)

    setState({ ...state, discount })
  }

  const handleBuy = async () => {
    setErrors({})
    const error = validateBody()

    setErrors({ ...errors, ...error })
    if (Object.entries(error).length) {
      return
    }
    let obj = {
      product: id,
      hasVoucher: state.discount !== '',
      cardDetails: {
        cardNumber: state.cardNumber,
        expiryDate: state.expiryDate,
        securityCode: state.securityCode
      },
      totalPrice: state.discount !== '' ? state.total - parseInt((parseInt(discount) * state.total) / 100) : state.total,
      quantity: state.quantity
    }

    setLoading(true)
    const response = await ApiCall.post(apiRoutes.BuyProduct, obj, (await config()).headers)
    setLoading(false)

    if (!response.ok) {
      return showErrorMessage(response.data.error)
    }

    showSuccessMessage(response.data.message)
    navigate(-1)
    setState(initialState)
  }

  const validateBody = () => {
    let error = {}
    if (!state.customerName.length) {
      error.customerName = true
    }
    if (!state.cardNumber.length || !state.cardNumber.length === 16) error.cardNumber = true
    if (!state.expiryDate[2] === '/' || !state.expiryDate.length || state.expiryDate.length > 5) error.expiryDate = true
    if (!state.securityCode.length || !state.securityCode.length === 3) error.securityCode = true

    return error
  }

  return (
    <Card>
      <CardBody>
        <h1>Checkout</h1>
      </CardBody>
      <CardBody>
        <Row>
          <Col md={8} sm={12}>
            <ProductDetails errors={errors} name={name} stock={stock} unit={unit} price={price} state={state} onVerify={verifyVoucher} handleStateChange={handleStateChange} />
          </Col>
          <Col md={4} sm={12}>
            <PriceDetails total={state.total} discount={state.discount} onBuy={handleBuy} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default CheckoutPage
