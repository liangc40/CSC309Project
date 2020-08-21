import {
  REGISTER_SUCCESS,
  USER_LOADED,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  SHOW_ACCOUNT,
  CLOSE_ACCOUNT,
  REQ_FAIL,
  LOADING,
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      }
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    case SHOW_ACCOUNT:
      return {
        ...state,
        showAccountStatus: action.showAccountStatus,
      }
    case CLOSE_ACCOUNT:
      return {
        ...state,
        showAccountStatus: action.showAccountStatus,
      }
    case REQ_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case LOADING:
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}
