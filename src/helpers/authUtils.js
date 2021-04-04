import { Cookies } from 'react-cookie'

const isUserAuthenticated = () => {
  const user = getLoggedInUser()
  if (!user) {
    return false
  }
  let currentTime = Date.now()
  if (currentTime + user.expires_in < currentTime) {
    console.warn('access token expired')
    console.log('access token expired')
    return false
  } else {
    return true
  }
}

const getLoggedInUser = () => {
  const cookies = new Cookies()
  const user = cookies.get('user')
  return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null
}

export { isUserAuthenticated, getLoggedInUser }
