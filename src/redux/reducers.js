import { getTwoMonthAgo } from '../helpers/modules'

// init state
const initialState = {
  url: '',
  auth: false,
  query_string: null,
  token: null,
  user: null,
  db: '',
  organization: 'theklab',
  salesLog: null,
  isNoSalesLog: false,
  isOpen: false,
  data: [],
  hasMore: true,
  from_date: getTwoMonthAgo(),
  to_date: +new Date(),
}

// reducers
export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_URL_SUCCESS':
      return { ...state, url: action.payload }
    case 'QUERY_SET_SUCCESS':
      return { ...state, query_string: action.payload }
    case 'TOKEN_AUTH_SUCCESS':
      return {
        ...state,
        auth: true,
        token: action.payload.access_token,
        user: action.payload,
      }
    case 'ACCOUNTS_GET_SUCCESS':
      return {
        ...state,
        db: action.payload,
      }
    case 'SALESLOG_GET_SUCCESS':
      console.log(action.payload)
      return {
        ...state,
        data: action.payload,
      }
    case 'TOGGLE_SWITCH':
      return { ...state, isOpen: action.payload }
    case 'CHANGE_ORGANIZATION':
      return { ...state, organization: action.payload }
    case 'CHANGE_FROM_DATE':
      return { ...state, from_date: action.payload }
    case 'CHANGE_TO_DATE':
      return { ...state, to_date: action.payload }
    default:
      return state
  }
}
