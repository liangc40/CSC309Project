import {
  HOME_SET_SHOW_POPUP,
  HOME_SET_SHOW_USER,
  HOME_SET_CLOSE_POPUP,
  HOME_GET_USER_MATCHES,
  HOME_HANDLE_CHANGE,
  HOME_HANDLE_SUBMIT,
  HOME_SET_ALL_MATCHES
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case HOME_SET_SHOW_USER:
      return {
        ...state,
        showUser: action.payload
      }
    case HOME_SET_SHOW_POPUP:
      return {
        ...state,
        showPopUp: true
      }
    case HOME_SET_CLOSE_POPUP:
      return {
        ...state,
        showPopUp: false
      }
    case HOME_GET_USER_MATCHES:
      return {
        ...state,
        userMatches: action.payload
      }
    case HOME_HANDLE_CHANGE:
      return {
        ...state,
        value: action.payload
      }
    case HOME_HANDLE_SUBMIT:
      return {
        ...state,
        value: action.payload
      }
    case HOME_SET_ALL_MATCHES:
      return{
        ...state,
        allMatches: action.payload
      }
    default:
      return state
  }
}
