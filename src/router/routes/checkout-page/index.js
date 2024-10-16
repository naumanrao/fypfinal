import Navroutes from '../../../common/Navroutes'
import { lazy } from 'react'

const CheckoutComponent = lazy(() => import('../../../views/CheckoutPage'))
const CheckoutPage = [
  {
    path: Navroutes.checkout,
    element: <CheckoutComponent />,
    meta: {
      menuHidden: true
    }
  }
]

export default CheckoutPage
