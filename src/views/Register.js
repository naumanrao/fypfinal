import { useEffect, useState } from 'react'
// ** React Imports
import { Link, useNavigate } from 'react-router-dom'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Reactstrap Imports
import { Row, Col, CardTitle, CardText, Form, Label, Input, Button } from 'reactstrap'

import Select from 'react-select'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import Navroutes from '../common/Navroutes'
import apiRoutes from '../apiConfiguration/apiRoutes'
import ApiCall from '../apiConfiguration/network'
import { useLoader } from '../hooks'

const Register = () => {
  const { setLoading } = useLoader()
  // ** Hooks
  const { skin } = useSkin()
  const navigate = useNavigate()

  const [state, setState] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    location: ''
  })

  const [locations, setLocations] = useState([])

  const handleInputChange = ({ target }) => {
    const { name, value } = target
    setState({ ...state, [name]: value })
  }

  const handleDropdownChange = async (event, stateName) => {
    setState({ ...state, [stateName]: event })
  }

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

  const handleSignup = async () => {
    setLoading(true)
    const obj = {
      ...state,
      location: state.location.value
    }
    const response = await ApiCall.any(apiRoutes.Signup, {}, obj)
    setLoading(false)
    if (response !== -1) {
      navigate(Navroutes.login)
    }
  }

  useEffect(() => {
    getLocations()
  }, [])

  const illustration = skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <h2 className="brand-text text-primary ms-1">Organic Product</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col className="d-flex align-items-center auth-bg px-2 p-lg-5" lg="4" sm="12">
          <Col className="px-xl-2 mx-auto" xs="12" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Organic Food Signup
            </CardTitle>
            <CardText className="mb-2">Make your Food Healthy!</CardText>
            <Form className="auth-register-form mt-2" onSubmit={(e) => e.preventDefault()}>
              <div className="mb-1">
                <Label className="form-label" for="register-fullname">
                  Full Name
                </Label>
                <Input type="text" name="fullName" value={state.fullName} onChange={handleInputChange} id="register-fullname" autoFocus />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="register-email">
                  Email
                </Label>
                <Input type="email" name="email" value={state.email} onChange={handleInputChange} id="register-email" />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="register-phone">
                  Phone Number
                </Label>
                <Input name="phoneNumber" value={state.phoneNumber} onChange={handleInputChange} id="register-phone" />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="register-password">
                  Password
                </Label>
                <InputPasswordToggle name="password" value={state.password} onChange={handleInputChange} className="input-group-merge" id="register-password" />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="register-password">
                  Location
                </Label>
                <Select isClearable classNamePrefix="select" className="react-select" menuPortalTarget={document.body} styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }} options={locations} value={state.location} onChange={(event) => handleDropdownChange(event, 'location')} />
              </div>

              <Button color="primary" block onClick={handleSignup}>
                Sign up
              </Button>
            </Form>
            <p className="text-center mt-2">
              <span className="me-25">Already have an account?</span>
              <Link to={Navroutes.login}>
                <span>Sign in instead</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Register
