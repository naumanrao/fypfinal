/* eslint-disable */
import React, { useEffect, useState } from 'react'
import Breadcrumbs from '@components/breadcrumbs'

// ** Styles
import '@styles/react/libs/editor/editor.scss'
import '@styles/base/plugins/forms/form-quill-editor.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/base/pages/page-blog.scss'
import { Button, Card, CardBody, CardFooter, Col, Input, InputGroup, InputGroupText, Label, Row } from 'reactstrap'
import apiRoutes from '../../apiConfiguration/apiRoutes'
import ApiCall from '../../apiConfiguration/network'
import { useNavigate, useParams } from 'react-router-dom'
import Navroutes from '../../common/Navroutes'
import { useLoader } from '../../hooks'

function AdForm({ mode = 'ADD' }) {
  const { setLoading } = useLoader()
  const params = useParams()
  const navigate = useNavigate()
  const [state, setState] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
    unit: '',
    voucher: '',
    voucherAvailableTimes: '',
    voucherPercentage: ''
  })

  const [productImage, setProductImage] = useState(null)
  const [previewImage, setPreviewImage] = useState()

  const handleInputChange = ({ target }) => {
    const { name, value } = target
    setState({ ...state, [name]: value })
  }

  const getSingleProduct = async () => {
    setLoading(true)
    const response = await ApiCall.any(apiRoutes.GetProduct(params.id))
    setLoading(false)
    if (response !== -1) {
      const { product } = response
      const { created_at, image, userId, __v, _id, ...restValues } = product
      setState({ ...state, ...restValues })
      setPreviewImage(process.env.REACT_APP_PREFIX + product.image)
    }
  }

  useEffect(() => {
    if (params.id && mode === 'EDIT') {
      getSingleProduct()
    }
  }, [])

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const reader = new FileReader()
      const file = e.target.files[0]
      reader.onloadend = () => {
        setProductImage(file)
        setPreviewImage(reader.result)
      }

      reader.readAsDataURL(file)
    }
  }

  const handlePostAd = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append('name', state.name)
    formData.append('price', Math.abs(state.price))
    formData.append('description', state.description)
    formData.append('unit', state.unit)
    formData.append('stock', Math.abs(state.stock))
    state.voucher.length && formData.append('voucher', state.voucher)
    state.voucherAvailableTimes.length && formData.append('voucherAvailableTimes', state.voucherAvailableTimes)
    state.voucherPercentage.length && formData.append('voucherPercentage', state.voucherPercentage)
    if (productImage) {
      formData.append('image', productImage)
    }

    const response = await ApiCall.any(mode === 'EDIT' ? apiRoutes.EditProduct(params.id) : apiRoutes.CreateProduct, {}, formData)
    setLoading(false)
    if (response !== -1) {
      navigate(mode === 'EDIT' ? Navroutes.myProducts : Navroutes.home)
    }
  }

  return (
    <div className="blog-edit-wrapper">
      <Breadcrumbs title={mode === 'EDIT' ? 'Edit Ad' : 'Create Ad'} />
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <Row>
                <Col md={6} className="mb-2">
                  <Label className="form-label" for="blog-edit-title">
                    Name
                  </Label>
                  <Input id="blog-edit-title" name="name" value={state.name} onChange={handleInputChange} />
                </Col>
                <Col md={6} className="mb-2">
                  <Label className="form-label" for="blog-edit-price">
                    Price
                  </Label>
                  <InputGroup className="input-group-merge">
                    <InputGroupText>PKR</InputGroupText>
                    <Input type="number" id="blog-edit-price" name="price" value={state.price} onChange={handleInputChange} />
                  </InputGroup>
                </Col>
                <Col md={12} className="mb-2">
                  <Label className="form-label" for="blog-edit-decription ">
                    Description
                  </Label>
                  <Input type="textarea" maxLength="250" name="description" value={state.description} onChange={handleInputChange} />
                  <span>Max length : 250 words</span>
                </Col>
                <Col md={12} className="mb-2">
                  <Label className="form-label">Product Image</Label>
                  <Input type="file" label={productImage?.name} onChange={handleImageChange} />
                </Col>
                <Col md={6} sm={12}>
                  <Label className="form-label">Stock</Label>
                  <Input name="stock" type="number" value={state.stock} onChange={handleInputChange} />
                </Col>
                <Col md={6} sm={12}>
                  <Label className="form-label">Unit</Label>
                  <Input name="unit" value={state.unit} onChange={handleInputChange} />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={4} sm={12}>
                  <Label className="form-label">Discount Voucher</Label>
                  <Input name="voucher" value={state.voucher} onChange={handleInputChange} />
                </Col>
                <Col md={4} sm={12}>
                  <Label className="form-label">Discount Voucher Percentage</Label>
                  <Input name="voucherPercentage" value={state.voucherPercentage} onChange={handleInputChange} />
                </Col>
                <Col md={4} sm={12}>
                  <Label className="form-label">Times the voucher can be used</Label>
                  <Input name="voucherAvailableTimes" value={state.voucherAvailableTimes} onChange={handleInputChange} />
                </Col>
              </Row>
              <Row>
                <Col md={4} sm={12} className="mt-2">
                  <img src={previewImage} alt={productImage ? productImage.name : state.name} style={{ width: '30%', height: 'auto', objectFit: 'contain' }} />
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <Button.Ripple color="primary" onClick={handlePostAd}>
                {mode === 'EDIT' ? 'Edit' : 'Post'} Ad
              </Button.Ripple>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default AdForm
