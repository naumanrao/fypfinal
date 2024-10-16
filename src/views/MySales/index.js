/*eslint-disable*/
import { useEffect, useState } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { DollarSign, Tag } from 'react-feather'

import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
import { useLoader } from '../../hooks'
import ApiCall from '../../apiConfiguration/network'
import apiRoutes from '../../apiConfiguration/apiRoutes'
import { config } from '../../apiConfiguration/env'
import { showErrorMessage } from '../../components/toasts'
import Table from './Table'

const MySales = () => {
  const [sales, setSales] = useState([])
  const { setLoading } = useLoader()
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getSales()
  }, [])

  const getSales = async () => {
    setLoading(true)
    const response = await ApiCall.get(apiRoutes.GetSales, (await config()).headers)
    setLoading(false)

    if (!response.ok) return showErrorMessage(response.data.error)
    setSales(response.data.sales)

    let sum = 0
    response.data.sales.map((item) => {
      sum += parseInt(item.total)
    })
    setTotal(sum)
  }

  return (
    <>
      <Row>
        <Col md={4} sm={12}>
          <StatsHorizontal color="primary" statTitle="Total Sales" icon={<Tag size={15} />} renderStats={<h3 className="fw-bolder mb-75">{sales.length}</h3>} />
        </Col>
        <Col md={4} sm={12}>
          <StatsHorizontal color="primary" statTitle="Money Earnerd" icon={<DollarSign size={15} />} renderStats={<h3 className="fw-bolder mb-75">Rs. {total}</h3>} />
        </Col>
      </Row>
      <Card>
        <CardBody>
          <Table data={sales} />
        </CardBody>
      </Card>
    </>
  )
}

export default MySales
