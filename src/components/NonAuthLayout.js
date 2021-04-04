import React from 'react'
import Footer from './Footer'

const NonAuthLayout = (props) => {
  const Children = props.child
  return (
    <div>
      NonAuthLayout
      <Children />
      <Footer />
    </div>
  )
}

export default NonAuthLayout
