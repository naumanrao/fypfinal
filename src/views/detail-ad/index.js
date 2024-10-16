import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiRoutes from '../../apiConfiguration/apiRoutes'
import ApiCall from '../../apiConfiguration/network'
import { Button, Card, CardBody, CardFooter, CardImg, CardTitle, Col, Row } from 'reactstrap'
import Avatar from '@components/avatar'
import Navroutes from '../../common/Navroutes'
import { useAuth, useLoader, useUser } from '../../hooks'

function DetailAd() {
  const { setLoading } = useLoader()
  const { token } = useAuth()
  const navigate = useNavigate()
  const params = useParams()
  const { user } = useUser()

  const [product, setProduct] = useState(null)

  const getProduct = async () => {
    setLoading(true)
    const response = await ApiCall.any(apiRoutes.GetProduct(params.id))

    console.log({ response })
    setLoading(false)
    if (response !== -1) {
      setProduct(response.product)
    }
  }

  const createChat = async () => {
    setLoading(true)
    const response = await ApiCall.any(apiRoutes.CreateChatRoom, {}, { productId: product._id, chatRoomName: product.name, productOwnerId: product.userId._id })
    setLoading(false)
    if (response !== -1) {
      navigate(Navroutes.chat, { state: { chatId: response.conversation._id } })
    }
  }

  useEffect(() => {
    getProduct()

    return () => {
      setProduct(null)
    }
  }, [])

  const onBuyClick = () => {
    if (token) {
      return navigate(Navroutes.checkout, {
        state: {
          name: product.name,
          stock: product.stock,
          voucher: product.voucher,
          discount: product.voucherPercentage,
          price: product.price,
          unit: product.unit,
          id: product._id
        }
      })
    }
    navigate(Navroutes.login)
  }

  const onChatClick = () => {
    token ? createChat() : navigate(Navroutes.login)
  }

  return (
    <>
      {product !== null ? (
        <>
          <Card>
            <CardBody>
              <CardTitle className="text-primary" tag="h1">
                {`Ad Detail of ${product.name}`}{' '}
              </CardTitle>
            </CardBody>
          </Card>
          <div className="blog-wrapper">
            <div className="content-detached ">
              <div className="content-body">
                <Row>
                  <Col sm="12">
                    <Card className="mb-3">
                      <CardBody>
                        <CardImg src={`${process.env.REACT_APP_PREFIX}${product.image}`} top style={{ height: '200px', objectFit: 'contain' }} />
                      </CardBody>
                      <CardBody>
                        <CardTitle>
                          <div className="d-flex align-items-between ">
                            <h4>{`${product.name}\t `}</h4>
                            <h4 className="text-primary">
                              (PKR {product.price} per {product.unit})
                            </h4>
                          </div>
                        </CardTitle>
                        <div className="d-flex align-items-center w-75 my-2">
                          <h4 className="text-success">Stock Available : </h4>
                          <h5 className="color-success"> {` ${product.stock} ${product.unit}s`}</h5>
                        </div>
                        <div className="d-flex align-items-center">
                          <Avatar color="secondary" content={product.userId.fullName} initials imgHeight="24" imgWidth="24" />
                          <div>
                            <small className="text-muted me-25">&nbsp;by</small>
                            <small>
                              <a className="text-body">{product.userId.fullName}</a>
                            </small>
                            <span className="text-muted ms-50 me-25">|</span>
                            <small className="text-muted">{product.created_at}</small>
                          </div>
                        </div>
                        <CardBody>
                          <div className="mt-2">{product.description}</div>
                        </CardBody>
                      </CardBody>
                      {product.userId._id !== user?._id && (
                        <>
                          <CardFooter>
                            <Button.Ripple onClick={onChatClick} color="primary">
                              Chat
                            </Button.Ripple>

                            <Button.Ripple className="ms-2" onClick={onBuyClick} color="primary">
                              Buy
                            </Button.Ripple>
                          </CardFooter>
                        </>
                      )}
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

export default DetailAd
