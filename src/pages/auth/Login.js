import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isUserAuthenticated, getLoggedInUser } from '../../helpers/authUtils'
import { authRequest } from '../../redux/thunk'

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
