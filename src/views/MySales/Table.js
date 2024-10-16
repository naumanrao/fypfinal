/*eslint-disable*/

import moment from 'moment'
import { Table } from 'reactstrap'

const TableBorderless = ({ data = [] }) => {
  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Buyer Name</th>
            <th>Buyer Phone Number</th>
            <th>Bought On</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <span className="align-middle fw-bold">{item.product?.name}</span>
                </td>
                <td>{item.quantity}</td>
                <td>{item.total}</td>
                <td>{item.buyer.fullName}</td>
                <td>{item.buyer.phoneNumber}</td>

                <td>{moment(item.created_at).format('DD-MMM-YYYY')}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}

export default TableBorderless
