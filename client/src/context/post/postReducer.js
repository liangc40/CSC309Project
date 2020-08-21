import {
  POST_SET_SHOW_POPUP,
  POST_SET_CLOSE_POPUP, 
  POST_SET_SHOW_POST,
  POST_SET_NEW_POST_DISPLAY, 
  POST_SET_CLOSE_NEW_POST_DISPLAY,
  POST_LOAD_POST,
  POST_LOAD_POST_FAIL,
  POST_RELOAD_SHOW_POST,
  POST_RELOAD_ALL_POST,
  POST_UPDATE_ALL_POST_AFTER_SORTED,
  POST_UPDATE_SHOW_COMMENTS_STATUS,
  POST_LOAD_FRIENDS_LIST,
  POST_POSTS,
} from '../types'

export default (state, action) => {
  // console.log("payload: ")
  // console.log(action.payload)
  switch (action.type) {
    case POST_SET_SHOW_POPUP:
      return {
        ...state,
        showPopUp: true
      }
    case POST_SET_CLOSE_POPUP:
      return {
        ...state,
        showPopUp: false
      }
    case POST_SET_SHOW_POST:
      return {
        ...state,
        showPost: action.payload
      }
    case POST_SET_NEW_POST_DISPLAY:
      return {
        ...state,
        newPostDisplay: true
      }
    case POST_SET_CLOSE_NEW_POST_DISPLAY:
      return {
        ...state,
        newPostDisplay: false
      } 
    case POST_LOAD_POST:
      return {
        ...state,
        allPost: action.payload
      }
    case POST_LOAD_POST_FAIL:
      return{
        ...state,
        allPost: action.payload
      }
    case POST_RELOAD_SHOW_POST:
      return{
        ...state,
        showPost: action.payload
      }
    case POST_RELOAD_ALL_POST:
      return{
        ...state,
        allPost: action.payload
      }
    case POST_UPDATE_ALL_POST_AFTER_SORTED:
      return{
        ...state,
        allPost: action.payload
      }
    case POST_UPDATE_SHOW_COMMENTS_STATUS:
      return{
        ...state,
        showComments: action.payload
      }
    case POST_LOAD_FRIENDS_LIST:
      return{
        ...state,
        friendsList: action.payload
      }
    case POST_POSTS:
      return{
        ...state,
        posts: action.payload
      }
    default:
      return state
  }
}