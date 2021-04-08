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

export const getDatabase = () => async (dispatch, getState) => {
  dispatch({ type: 'ACCOUNTS_GET_REQUEST' })
  let authToken = getState().token
  try {
    let response = await Axios.get(
      'https://api-v2.saleslog.co/dev/accounts/system',
      {
        Headers: { Authorization: authToken },
      },
    )
    const DATABASE_NAME = response.data.map((dbName, index) => {
      const orgs =
        dbName.Database === 'SalesLog'
          ? 'theklab'
          : dbName.Database.split('_')[1]
      return orgs
    })
    dispatch({
      type: 'ACCOUNTS_GET_SUCCESS',
      payload: DATABASE_NAME,
    })
  } catch (error) {
    dispatch({ type: 'ACCOUNTS_GET_FAILURE', error })
  }
}

export const getSalesLog = () => async (dispatch, getState) => {
  dispatch({ type: 'SALESLOG_GET_REQUEST' })
  let authToken = getState().token
  const ORGANIZATION = getState().organization // kt
  try {
    let response = await Axios.get(
      `https://api-v2.saleslog.co/dev/saleslogs/all?organizations?organizations=${ORGANIZATION}`,
      {
        Headers: authToken,
        Params: {
          page: 7,
          from: getState().from_date,
          to: getState().to_date,
        },
      },
    )
    dispatch({
      type: 'SALESLOG_GET_SUCCESS',
      payload: response.data,
    })
    dispatch({
      type: 'CHANGE_ORGANIZATION',
      payload: ORGANIZATION,
    })
  } catch (error) {
    dispatch({ type: 'SALESLOG_GET_FAILURE', error })
  }
}

export const orgChange = (name) => async (dispatch, getState) => {
  dispatch({ type: 'CHANGE_ORGANIZATION', payload: name })
}

export const timeSetFrom = (date) => async (dispatch, getState) => {
  dispatch({ type: 'CHANGE_FROM_DATE', payload: new Date(date).getTime() })
}

export const timeSetTo = (date) => async (dispatch, getState) => {
  dispatch({ type: 'CHANGE_TO_DATE', payload: new Date(date).getTime() })
}
