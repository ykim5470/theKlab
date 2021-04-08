import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Collapse } from 'reactstrap'

const NavMenuContent = (props) => {
  const onMenuClickCallback = props.onMenuClickCallback
  return (
    <React.Fragment>
      <ul className='navigation-menu'>
        <li className='has-submenu'>
          <Link to='/' aria-expanded='true' onClick={onMenuClickCallback}>
            <i className='fe-airplay'></i>
            더클랩
            <div className='ml-1 arrow-down'></div>
          </Link>
          <ul className='submenu'>
            <li>
              <Link to='/dashboard' className='side-nav-link-ref'>
                게시글 조회
              </Link>
            </li>
            <li>
              <Link to='/dashboard/write' className='side-nav-link-ref'>
                게시글 작성
              </Link>
            </li>
            <li>
              <Link to='/dashboard/saleslog' className='side-nav-line-ref'>
                세일즈로그 현황
              </Link>
            </li>
            <li>
              <Link to='/dashboard/organization' className='side-nav-line-ref'>
                조직 현황
              </Link>
            </li>
            <li>
              <Link to='/dashboard/group' className='side-nav-line-ref'>
                그룹 현황
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </React.Fragment>
  )
}

const Navbar = (props) => {
  const location = useLocation()
  // init menu
  const initMenu = () => {
    var links = document.getElementsByClassName('side-nav-link-ref')
    var matchingMenuItem = null
    for (var i = 0; i < links.length; i++) {
      if (location.pathname === links[i].pathname) {
        matchingMenuItem = links[i]
        break
      }
    }
    if (matchingMenuItem) {
      matchingMenuItem.classList.add('active')
      var parent = matchingMenuItem.parentElement
      if (parent) {
        parent.classList.add('active')
        const parent2 = parent.parentElement
        if (parent2) {
          parent2.classList.add('in')
        }
        const parent3 = parent2.parentElement
        if (parent3) {
          parent3.classList.add('active')
          var childAnchor = parent3.querySelector('.has-dropdown')
          if (childAnchor) childAnchor.classList.add('active')
        }
        const parent4 = parent3.parentElement
        if (parent4) parent4.classList.add('in')
        const parent5 = parent4.parentElement
        if (parent5) parent5.classList.add('active')
      }
    }
  }

  //onMenuclicked event
  const onMenuClick = (event) => {
    event.preventDefault()
    const nextEl = event.target.nextSibling
    if (nextEl && !nextEl.classList.contains('open')) {
      const parentEl = event.target.parentNode
      if (parentEl) {
        parentEl.classList.remove('open')
      }

      nextEl.classList.add('open')
    } else if (nextEl) {
      nextEl.classList.remove('open')
    }
    return false
  }

  useEffect(() => {
    initMenu()
  })

  return (
    <React.Fragment>
      <div className='topbar-menu'>
        <div className='container-fluid'>
          <Collapse isopen={props.isMenuOpened} id='navigation'>
            <NavMenuContent onMenuClickCallback={onMenuClick} />
            <div className='clearfix'></div>
          </Collapse>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Navbar
