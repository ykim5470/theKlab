import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isUserAuthenticated } from './helpers/authUtils'
import Dashboard from './pages/dashboards/Dashboard'
import SalesLog from './pages/saleslog/Saleslog'
import Login from './pages/auth/Login'
import Logout from './pages/auth/Logout'

// // lazy load all the views
// const Dashboard = React.lazy(() => import('./pages/dashboards/index'))

// // saleslog
// const SalesLog = React.lazy(() => import('./pages/saleslog/index'))

// // // auth
// const Login = React.lazy(() => import('./pages/auth/Login'))
// const Logout = React.lazy(() => import('./pages/auth/Logout'))

// handle auth and authorization
const PrivateRoute = () => {
  console.log(isUserAuthenticated())
  return (
    <Route
      render={() => {
        if (!isUserAuthenticated()) {
          return <Redirect to={{ pathname: '/login' }} />
        }
        return <Redirect to={{ pathname: '/dashboard' }} />
      }}
    />
  )
}

const routes = [
  // auth and account
  { path: '/login', name: 'Login', component: Login, route: Route },
  // <Route key=0 path='/login' component={Login}/>
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
    route: PrivateRoute,
    roles: ['Admin'],
  },
]

export { routes }
