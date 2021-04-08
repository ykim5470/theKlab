import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isUserAuthenticated } from './helpers/authUtils'
import Dashboard from './pages/dashboard/Dashboard'
import SalesLog from './pages/saleslog/Saleslog'
import Login from './pages/auth/Login'
import Logout from './pages/auth/Logout'
import { useSelector } from 'react-redux'
import Write from './pages/boardWrite'
import Organization from './pages/organization'

// // lazy load all the views
// const Dashboard = React.lazy(() => import('./pages/dashboards/index'))

// // saleslog
// const SalesLog = React.lazy(() => import('./pages/saleslog/index'))

// // // auth
// const Login = React.lazy(() => import('./pages/auth/Login'))
// const Logout = React.lazy(() => import('./pages/auth/Logout'))

// handle auth and authorization
// const PrivateRoute = ({ component: Component, roles, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) => {
//       const isAuthTokenValid = isUserAuthenticated()
//       if (!isAuthTokenValid) {
//         // not logged in so redirect to login page with the return url
//         return <Redirect to={{ pathname: '/login' }} />
//       }
//       // authorised so return component
//       return <Component {...props} />
//     }}
//   />
// )

// if (isUserAuthenticated()) {
//   return <Redirect to='/login' />
// }

const PrivateRoute = () => {
  const state = useSelector((state) => state)
  console.log(state.auth)
  if (!state.auth) {
    return <Redirect to='/login' />
  }
  return <Redirect to='/dashboard' />
}

const routes = [
  // auth and account
  { path: '/login', name: 'Login', component: Login, route: Route },
  { path: '/logout', name: 'Logout', component: Logout, route: Route },

  // other pages
  {
    path: '/dashboard',
    name: 'Dashboard',
    exact: true,
    component: Dashboard,
    route: Route,
    roles: ['Admin'],
  },
  {
    path: '/',
    exact: true,
    component: () => <Redirect to='/dashboard' />,
    route: PrivateRoute,
  },
  //saleslog
  {
    path: '/dashboard/saleslog',
    name: 'SalesLog',
    component: SalesLog,
    route: Route,
    roles: ['Admin'],
  },
  {
    path: '/dashboard/write',
    name: 'Write',
    component: Write,
    route: Route,
    roles: ['Admin'],
  },
  {
    path: '/dashboard/organization',
    name: 'Organization',
    component: Organization,
    route: Route,
    roles: ['Admin'],
  },
]

export { routes }
