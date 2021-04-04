import React from 'react'
import Footer from './Footer'

const AuthLayout = (props) => {
  const Children = props.child
  return (
    <div>
      AuthLayout
      <Children />
      <Footer />
    </div>
  )
}

export default AuthLayout
