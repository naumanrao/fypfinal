/*eslint-disable*/
import React, { useEffect, useState } from 'react'

// ** Styles
import '@styles/base/pages/page-blog.scss'
import apiRoutes from '../../apiConfiguration/apiRoutes'
import ApiCall from '../../apiConfiguration/network'
import { Col, Row, Input, Button } from 'reactstrap'
import { useLoader } from '../../hooks'
import ProductCard from '../../components/ProductCard'
import AnimationText from './AnimationText'

function HomePage() {
  const { setLoading } = useLoader()
  const [products, setProducts] = useState([])
  const [searchedProducts, setSearchedProducts] = useState([])
  const [state, setState] = useState({
    keys: '',
    locationId: ''
  })

  const handleInputChange = ({ target }) => {
    const { name, value } = target
    setState({ ...state, [name]: value })
  }

  const [locations, setLocations] = useState([])

  const getLocations = async () => {
    setLoading(true)
    const response = await ApiCall.any(apiRoutes.GetLocations)
    setLoading(false)
    if (response !== -1) {
      const tempLocations = response.locations.map((location) => {
        return { value: location._id, label: location.name }
      })
      setLocations(tempLocations)
    }
  }

  const getProducts = async () => {
    setLoading(true)
    const response = await ApiCall.any(apiRoutes.GetFilteredProducts, {}, { ...state })
    setLoading(false)
    if (response !== -1) {
      if (state.keys.length) setSearchedProducts(response.products)
      else setProducts(response.products)
    }
  }

  useEffect(() => {
    getProducts()
    getLocations()
  }, [])

  const renderRenderList = (products) => {
    return products?.map((product) => {
      return <ProductCard product={product} />
    })
  }

  useEffect(() => {
    if (!state.keys.length) setSearchedProducts([])
  }, [state.keys])

  return (
    <>
      <div className="blog-wrapper">
        <div className="content-detached ">
          <div className="d-flex  justify-content-center align-items-center mb-3 " style={{ backgroundImage: "url('https://www.skh.com/wp-content/uploads/2020/01/iStock-1155240408-1-800x500.jpg')", minHeight: '400px', width: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', position: 'relative' }}>
            <AnimationText /> <br />
            <div style={{ right: '0%', top: '60%', height: '50px' }} className=" position-absolute w-100 justify-content-center d-flex">
              <Input className="w-50" placeholder="Search" name="keys" value={state.keys} onChange={handleInputChange} />
              <Input className="w-25" type="select" name="locationId" value={state.locationId} placeholder="Select Location" onChange={handleInputChange}>
                <option value="">Select Location</option>
                {locations?.map((location) => {
                  return (
                    <option key={location.value} value={location.value}>
                      {location.label}
                    </option>
                  )
                })}
              </Input>
              <Button.Ripple onClick={getProducts} color="danger">
                Search
              </Button.Ripple>
            </div>
          </div>
          <div className="content-body">
            <div className="blog-list-wrapper">
              {products?.length > 0 ? (
                <>
                  <div className="h1">Products</div>
                  <Row>{renderRenderList(searchedProducts.length ? searchedProducts : products)}</Row>
                </>
              ) : (
                <Row>
                  <Col md={12} sm={12}>
                    <div className="h1 text-danger">No Product</div>
                  </Col>
                </Row>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
