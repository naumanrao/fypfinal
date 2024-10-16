import { Button, CardBody, Col, Row } from 'reactstrap'

const PriceDetails = ({ total, discount, onBuy }) => {
  const discountedPrice = discount === '' ? 0 : parseInt((parseInt(discount) * total) / 100)

  return (
    <CardBody className="invoice-padding">
      <Row className="invoice-sales-total-wrapper">
        <Col className="d-flex justify-content-end" md={{ size: '12', order: 2 }} xs={{ size: 12, order: 1 }}>
          <div style={{ width: '200px' }} className="w300 border border-primary rounded d-flex flex-column p-1 justify-content-between align-items-center">
            <div className="w-100 d-flex justify-content-between">
              <p className="">Total: </p> <p className=""> Rs.{total}</p>
            </div>
            <div className="w-100 d-flex justify-content-between">
              <p className="">Discount: </p> <p className=""> Rs.{discountedPrice}</p>
            </div>
            <div className="divider border border-secondary w-100" />
            <div className="w-100 d-flex justify-content-between">
              <p className="">Grand Total: </p> <p className=""> Rs.{total - discountedPrice}</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12} sm={12}>
          <div className="d-flex justify-content-center ms-5 mt-2 w-100">
            <Button onClick={onBuy} color="primary" className="w-50">
              Buy
            </Button>
          </div>
        </Col>
      </Row>
    </CardBody>
  )
}

export default PriceDetails
