import React, { useEffect } from 'react'
import { routes } from './routes'
import { BrowserRouter, useLocation, Route } from 'react-router-dom'
import { isUserAuthenticated } from './helpers/authUtils'
import queryString from 'query-string'
import { Cookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { tokenAuth, authRequest } from './redux/thunk'
import AuthLayout from './components/AuthLayout'
import NonAuthLayout from './components/NonAuthLayout'

// Themes
import './assets/scss/DefaultTheme.scss'

const App = () => {
  const getLayout = (child) => {
    return isUserAuthenticated() ? AuthLayout : NonAuthLayout
  }

  const dispatch = useDispatch()

  const location = useLocation()
  const query = queryString.parse(location.search)

  useEffect(() => {
    const cookies = new Cookies()
    dispatch(authRequest())
    if ((query.code !== null) & (query.user_id !== null)) {
      cookies.set('code', query.code)
      cookies.set('user_id', query.user_id)
      let obj = { code: query.code, user_id: query.user_id }
      dispatch({ type: 'QUERY_SET_SUCCESS', payload: obj })
      dispatch(tokenAuth())
    }
  }, [])

  return (
    <BrowserRouter>
      <React.Fragment>
        {routes.map((route, index) => {
          return (
            <route.route
              key={index}
              path={route.path}
              exact={route.exact}
              roles={route.roles}
              render={() => {
                const Layout = getLayout()
                return <Layout child={route.component} />
              }}
            />
          )
        })}
      </React.Fragment>
    </BrowserRouter>
  )
}

export default App
