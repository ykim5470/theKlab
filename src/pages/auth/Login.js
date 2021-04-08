import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isUserAuthenticated, getLoggedInUser } from '../../helpers/authUtils'
import { authRequest } from '../../redux/thunk'
import { Redirect } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Label,
  FormGroup,
  Button,
  Alert,
} from 'reactstrap'
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
} from 'availity-reactstrap-validation'
import logo from '../../assets/images/logo-dark.png'

const Login = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authRequest())
  }, [])

  return (
    <div>
      <a href={state.url}>Login</a>
    </div>
  )
}

export default Login
