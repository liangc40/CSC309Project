import { GET_ALL_USER, REQ_FAIL, SET_ADMIN_EDIT, LOADING } from '../types'

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_USER:
      return {
        ...state,
        users: action.payload,
        loading: false,
      }
    case SET_ADMIN_EDIT:
      return {
        ...state,
        showEditStatus: action.payload.status,
        currEditUser: action.payload.user,
      }
    case LOADING:
      return {
        ...state,
        loading: true,
      }
    case REQ_FAIL:
    default:
      return { ...state, loading: false }
  }
}
