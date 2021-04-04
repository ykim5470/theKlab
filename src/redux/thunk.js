import Axios from 'axios'
import { createUrl, createAccessTokenUrl } from '../helpers/modules'
import { Cookies } from 'react-cookie'

export const authRequest = () => async (dispatch, getState) => {
  dispatch({ type: 'AUTH_URL_REQUEST' })
  try {
    let response = await createUrl('localhost:3000').then(async (url) => {
      const redirect = await Axios.get(url)
      return redirect.config.url
    })
    dispatch({ type: 'AUTH_URL_SUCCESS', payload: response })
  } catch (error) {
    dispatch({ type: 'AUTH_RUL_FAILURE', error })
  }
}

export const querySet = () => async (dispatch, getState) => {
  dispatch({ type: 'QUERY_SET_REQUEST' })
  try {
  } catch (error) {
    dispatch({ type: 'QUERY_SET_FAILURE', error })
  }
}

export const tokenAuth = () => async (dispatch, getState) => {
  dispatch({ type: 'TOKEN_AUTH_REQUEST' })
  try {
    let response = await Axios.get(createAccessTokenUrl())
    const cookies = new Cookies()
    cookies.set('user', response.data)
    dispatch({
      type: 'TOKEN_AUTH_SUCCESS',
      payload: response.data,
    })
  } catch (error) {
    dispatch({ type: 'TOKEN_AUTH_FAILURE', error })
  }
}
