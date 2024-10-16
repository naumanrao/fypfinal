import Navroutes from '../../../common/Navroutes'
import { lazy } from 'react'

const MySalesComponent = lazy(() => import('../../../views/MySales'))
const MySalesPage = [
  {
    path: Navroutes.mySales,
    element: <MySalesComponent />,
    meta: {
      menuHidden: true
    }
  }
]

export default MySalesPage
