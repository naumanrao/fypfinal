// ** React Imports
import { Fragment, useState } from 'react'

// ** Custom Components
import NavbarUser from './NavbarUser'
import themeConfig from '@configs/themeConfig'

// ** Third Party Components
import { Menu } from 'react-feather'

// ** Reactstrap Imports
import { NavItem, NavLink } from 'reactstrap'
import Navroutes from '../../../../common/Navroutes'
import { useNavigate } from 'react-router-dom'
import ContactUsModal from './ContactUsModal'

const ThemeNavbar = (props) => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props
  const navigate = useNavigate()
  const [showContactUs, setShowContactUS] = useState(false)

  return (
    <Fragment>
      <div className="bookmark-wrapper d-flex align-items-center">
        <ul className="navbar-nav d-xl-none">
          <NavItem className="mobile-menu me-auto">
            <NavLink className="nav-menu-main menu-toggle hidden-xs is-active" onClick={() => setMenuVisibility(true)}>
              <Menu className="ficon" />
            </NavLink>
          </NavItem>
        </ul>
        <NavItem className="d-none d-lg-block">
          <NavLink onClick={() => navigate(Navroutes.home)} className="nav-link-style">
            <span onClick={() => navigate(Navroutes.home)} className="brand-logo">
              <img className="rounded-circle" style={{ width: '50px', height: '50px', objectFit: 'contain' }} src={themeConfig.app.appLogoImage} alt="logo" />
            </span>
            Organic Product
          </NavLink>
        </NavItem>
      </div>
      <NavbarUser show={showContactUs} setShow={setShowContactUS} skin={skin} setSkin={setSkin} />
      <ContactUsModal show={showContactUs} setShow={setShowContactUS} />
    </Fragment>
  )
}

export default ThemeNavbar
