/*eslint-disable*/

import InputNumber from 'rc-input-number'
import React from 'react'
import { Minus, Plus } from 'react-feather'

import { Row, Col, Input, Label, Button, CardBody } from 'reactstrap'

const ProductDetails = ({ name, stock, state, unit, handleStateChange, onVerify, price, errors }) => {
  return (
    <>
      <Row>
        <Col md={8} sm={12}>
          <h2>{name}</h2>
        </Col>
        <CardBody>
          <Col md={8} sm={12}>
            <h3>
              Price: {price} per {unit}
            </h3>
          </Col>
          <Col md={2} sm={12}>
            <div className="item-quantity  d-flex">
              <span className="quantity-title me-50">Qty</span>
              <InputNumber
                min={1}
                max={parseInt(stock)}
                name="quantity"
                onInput={(value) => {
                  return {
                    target: {
                      name: 'quantity',
                      value: parseInt(value)
                    }
                  }
                }}
                value={state.quantity}
                upHandler={<Plus />}
                className="cart-input"
                defaultValue={1}
                onChange={(value) =>
                  handleStateChange({
                    target: {
                      name: 'quantity',
                      value: parseInt(value)
                    }
                  })
                }
                downHandler={<Minus />}
              />
            </div>
          </Col>
        </CardBody>
      </Row>
      <Row>
        <Col md={3} sm={12}>
          <Label>Customer Name</Label>
          <Input placeholder="John Doe" invalid={errors.customerName && true} name="customerName" value={state.customerName} onChange={handleStateChange} />
        </Col>
        <Col md={3} sm={12}>
          <Label>Card Number</Label>
          <Input placeholder="4242424242424242" invalid={errors.cardNumber && true} value={state.cardNumber} name="cardNumber" onChange={handleStateChange} />
        </Col>
        <Col md={3} sm={12}>
          <Label>Card Expiry Date</Label>
          <Input placeholder="08/23" name="expiryDate" invalid={errors.expiryDate && true} value={state.expiryDate} onChange={handleStateChange} />
        </Col>
        <Col md={3} sm={12}>
          <Label>Card CVV</Label>
          <Input value={state.securityCode} maxLength={5} invalid={errors.securityCode && true} name="securityCode" onChange={handleStateChange} placeholder="123" />
        </Col>
      </Row>
      <CardBody>
        <Row>
          <Col md={4} sm={12}>
            <Label>Discount Voucher (If Available)</Label>
            <Input placeholder="E.g. YAY" value={state.voucher} name="voucher" onChange={handleStateChange} />
          </Col>
          <Col className="align-items-center d-flex mt-2 justify-content-start" md={4} sm={12}>
            <Button color="primary" onClick={onVerify}>
              Verify Voucher
            </Button>
          </Col>
        </Row>
      </CardBody>
    </>
  )
}

export default ProductDetails
