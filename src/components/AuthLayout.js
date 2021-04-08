import React, { useState } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Topbar from './Topbar'
import { Container } from 'reactstrap'

const AuthLayout = (props) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false)

  const toggleMenu = (e) => {
    e.preventDefault()
    setIsMenuOpened({ isMenuOpended: !isMenuOpened })
  }

  const toggleRightSidebar = () => {
    document.body.classList.toggle('right-bar-enabled')
  }
  const Children = props.child

  return (
    <div className='app'>
      <header id='topnav'>
        <Topbar
          rightSidebarToggle={toggleRightSidebar}
          menuToggle={toggleMenu}
          isMenuOpened={isMenuOpened}
        />
        <Navbar isMenuOpened={isMenuOpened} />
        {/* AuthLayout */}
      </header>
      <div className='wrapper'>
        <Container fluid>
          <Children />
        </Container>
      </div>
      <Footer />
    </div>
  )
}

export default AuthLayout
