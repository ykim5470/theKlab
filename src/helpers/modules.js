import React from 'react'
import { Cookies } from 'react-cookie'

const toHex = (buffer) => {
  return buffer.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export const getRandomSHA256 = async () => {
  const array = new Uint32Array(2)
  const randBuf = window.crypto.getRandomValues(array)
  const crypto = window.crypto || window.msCrypto
  const hash = await crypto.subtle.digest('SHA-256', randBuf)
  return toHex(Array.from(new Uint8Array(hash)))
}

const setPCKE = (pcke) => {
  localStorage.setItem('pcke', pcke)
}

export const checkDevelopmentMode = () => {
  return '_self' in React.createElement('div')
}

export async function createUrl(_redirectUri) {
  const endPoint = 'https://oauth2sso.theklab.co/dev/oauth2/authorize'
  const grantType = 100
  let pcke
  pcke = await getRandomSHA256()
  setPCKE(pcke)

  const host = window.location.host.match(/[A-z0-9]+.saleslog.co/)
  const isDevMode = checkDevelopmentMode()
  let clientId
  let redirectUri = _redirectUri

  if (isDevMode) {
    clientId = 'admin.all.fd8bbf18dd1d98d684dae3a711ada761.web'
    redirectUri = 'http://localhost:3000'
  } else {
    if (!host) {
      clientId = 'saleslog.b2c.fd8bbf18dd1d98d684dae3a711ada761.web'
      redirectUri = 'https://saleslog.co'
    } else {
      const org = host[0].split('.')[0]
      clientId = `saleslog.${org}.fd8bbf18dd1d98d684dae3a711ada761.web`
      redirectUri = `https://${org}.saleslog.co`
    }
  }

  const response_type = 'token'
  return `${endPoint}?grant_type=${grantType}&client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${response_type}&pcke=${pcke}`
}

export function createAccessTokenUrl() {
  var cookie = new Cookies()
  const endPoint = 'https://oauth2sso.theklab.co/dev/oauth2/token'
  const authCode = cookie.get('code')
  const clientId = 'admin.all.fd8bbf18dd1d98d684dae3a711ada761.web'
  const pcke = localStorage.getItem('pcke')
  const userId = cookie.get('user_id')
  const platform = 'web'
  return `${endPoint}?code=${authCode}&client_id=${clientId}&pcke=${pcke}&user_id=${userId}&platform=${platform}`
}
