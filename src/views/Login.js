import { useState } from 'react'
import { useSkin } from '@hooks/useSkin'
import { Link, useNavigate } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, Label, Input, Button } from 'reactstrap'
import '@styles/react/pages/page-authentication.scss'
import Navroutes from '../common/Navroutes'
import apiRoutes from '../apiConfiguration/apiRoutes'
import ApiCall from '../apiConfiguration/network'
import { useAuth, useLoader } from '../hooks'
import themeConfig from '@configs/themeConfig'
import { showErrorMessage } from '../components/toasts'

const Login = () => {
  const { setLoading } = useLoader()
  const navigate = useNavigate()
  const { login } = useAuth()
  const { skin } = useSkin()
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = ({ target }) => {
    const { name, value } = target
    setState({ ...state, [name]: value })
  }

  const handleSignin = async () => {
    setLoading(true)
    try {
      const response = await ApiCall.any(apiRoutes.Signin, {}, state)
      setLoading(false)
      login(response.token, response.user)
      navigate(Navroutes.home)
    } catch (err) {
      showErrorMessage('verify your Account')
    }
  }

  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <div onClick={() => navigate(Navroutes.home)} className="brand-logo d-flex align-items-center">
            <img className="rounded-circle" style={{ width: '50px', height: '50px', objectFit: 'contain' }} src={themeConfig.app.appLogoImage} alt="logo" />
            <h2 className="brand-text text-primary ms-1">Organic Product</h2>
          </div>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col className="d-flex align-items-center auth-bg px-2 p-lg-5" lg="4" sm="12">
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Welcome👋
            </CardTitle>
            <CardText className="mb-2">Please sign-in to your account and start the adventure</CardText>
            <Form className="auth-login-form mt-2" onSubmit={(e) => e.preventDefault()}>
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  Email
                </Label>
                <Input type="email" name="email" value={state.email} id="login-email" onChange={handleInputChange} placeholder="john@example.com" autoFocus />
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    Password
                  </Label>
                </div>
                <InputPasswordToggle name="password" value={state.password} onChange={handleInputChange} className="input-group-merge" id="login-password" />
              </div>

              <Button color="primary" onClick={handleSignin}>
                Sign in
              </Button>
            </Form>
            <p className="text-center mt-2">
              <span className="me-25">New on our platform?</span>
              <Link to={Navroutes.register}>
                <span>Create an account</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
