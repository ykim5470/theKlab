import { getLoggedInUser, isUserAuthenticated } from '../helpers/authUtils'

// init state
const initialState = {
  url: '',
  auth: false,
  query_string: null,
  token: null,
  user: null,
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
        auth: isUserAuthenticated(),
        token: action.payload.access_token,
        user: action.payload,
      }
    default:
      return state
  }
}
