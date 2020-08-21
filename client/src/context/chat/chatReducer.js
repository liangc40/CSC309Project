import { REGISTER_CHAT, GET_CHATS, LOADING } from '../types'
export default (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      }
    case REGISTER_CHAT:
      return {
        ...state
      }
    case GET_CHATS:
      return {
        ...state,
        chats: action.payload.data,
        loading: false
      }

    default:
      return state
  }
}
