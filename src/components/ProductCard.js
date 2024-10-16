import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardTitle, Col, CardText, CardBody } from 'reactstrap'
import moment from 'moment'

import Avatar from '@components/avatar'
import Navroutes from '../common/Navroutes'

const ProductCard = ({ product }) => {
  return (
    <Col key={product._id} md="4">
      <Card className="rounded">
        <Link to={`${Navroutes.adDetail}${product._id}`}>
          <div>
            <img className="img-fluid w-100 h-100" src={`${process.env.REACT_APP_PREFIX}${product.image}`} alt={product.name} style={{ maxHeight: '250px', width: '100%', objectFit: 'cover' }} />
          </div>
        </Link>
        <CardBody>
          <CardTitle tag="h4">
            <Link className="blog-title-truncate text-body-heading text-primary" to={`${Navroutes.adDetail}${product._id}`}>
              {product.name} (PKR {product.price})
            </Link>
          </CardTitle>
          <div className="d-flex align-items-center">
            <Avatar color="secondary" content={product.userId.fullName} initials imgHeight="24" imgWidth="24" />
            <div>
              <small className="text-muted me-25">&nbsp;by</small>
              <small>
                <a className="text-body">{product.userId.fullName}</a>
              </small>
              <span className="text-muted ms-50 me-25">|</span>
              <small className="text-muted">{moment(product.created_at).format('DD-MMM-YYYY')}</small>
            </div>
          </div>
          <CardText className="blog-content-truncate mt-1">{product.description}</CardText>
          <hr />
        </CardBody>
      </Card>
    </Col>
  )
}

export default ProductCard
