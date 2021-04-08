//const endpoint = 'https://api.saleslog.co';
const version = '/dev'

const board = '/board'
const admin = '/admin'
const organization = '/organization'
const auth = '/auth'
const login = '/login'

const Base = {
  //board
  GET_BOARD: version + board,
  POST_BOARD: version + board,
  DELETE_BOARD: version + board + '/',
  PUT_BOARD: version + board + '/',
  //admin
  GET_ADMIN_SALESLOG: version + admin + organization,
  GET_ADMIN_STAT: version + admin + organization,
  //auth
  TK_LOGIN: version + auth + login,
}

export default Base
