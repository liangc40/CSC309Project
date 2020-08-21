import React, { useReducer } from 'react'
import ChatContext from './chatContext'
import chatReducer from './chatReducer'
import axios from 'axios'
import { REGISTER_CHAT, GET_CHATS, LOADING } from '../types'

const ChatState = props => {
  const initialState = { loading: true, chats: [] }
  const [state, dispatch] = useReducer(chatReducer, initialState)

  const load_chats = async () => {
    dispatch({ type: LOADING })
    try {
      const chats = await axios.get('http://localhost:5000/api/chat')
      dispatch({ type: GET_CHATS, payload: chats })
    } catch (error) {
      console.error(error)
    }
  }

  const send_msg = async (id, content) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      await axios.post(
        `http://localhost:5000/api/chat/${id}`,
        { content: content },
        config
      )
    } catch (error) {
      console.error(error)
    }
  }

  const register_msg = async pairID => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      axios.post('http://localhost:5000/api/chat', { pairID }, config)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ChatContext.Provider
      value={{
        chats: state.chats,
        loading: state.loading,
        load_chats,
        send_msg,
        register_msg
      }}
    >
      {props.children}
    </ChatContext.Provider>
  )
}

export default ChatState
