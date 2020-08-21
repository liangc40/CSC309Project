import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

const Message = (props) => (
  <li className={`chat ${props.username === props.sender ? 'right' : 'left'}`}>
    {props.username !== props.sender && (
      <img src={props.img} alt={`${props.sender}'s profile pic`} />
    )}
    <p>{props.content}</p>
  </li>
)
const socket = io('http://localhost:5000', { path: '/chatroom' })
const ChatContent = (props) => {
  const [typing, setTyping] = useState('')
  const [chatState, setChat] = useState(props.chat)
  const roomID = chatState._id

  const handleSubmit = (e) => {
    e.preventDefault()
    if (e.target && e.target.chat_msg.value) {
      socket.emit('send_msg', {
        roomID,
        message: e.target.chat_msg.value,
        sender: props.userID,
      })
      const content = e.target.chat_msg.value
      setChat((oldChat) => {
        return {
          ...oldChat,
          contents: oldChat.contents.concat([
            {
              sender: props.userID,
              content,
            },
          ]),
        }
      })
      e.target.chat_msg.value = ''
    }
  }

  useEffect(() => {
    if (roomID) {
      socket.emit('room', { roomID })
    }

    socket.on('notifyTyping', (data) => {
      // setTyping(data.user + ' ' + data.message)
      setTyping(data.message)
    })
    socket.on('notifyStopTyping', (msg) => {
      setTyping('')
    })
    socket.on('received', ({ sender, message }) => {
      setChat((oldChat) => {
        return {
          ...oldChat,
          contents: oldChat.contents.concat([
            {
              sender: sender,
              content: message,
            },
          ]),
        }
      })
    })
  }, [])

  return (
    <div className='chatroom'>
      <h3>
        {typing !== ''
          ? typing
          : chatState.user1.username === props.username
          ? chatState.user2.firstname
          : chatState.user1.firstname}
      </h3>
      <ul className='chats'>
        {chatState.contents.map((content) => (
          <Message
            key={Math.random() * 10000 + ' '}
            sender={
              chatState.user1._id === content.sender
                ? chatState.user1.username
                : chatState.user2.username
            }
            username={props.username}
            content={content.content}
            img={
              chatState.user1._id === content.sender
                ? chatState.user1.avatar
                : chatState.user2.avatar
            }
          />
        ))}
      </ul>
      <form className='ChatContent-input' onSubmit={handleSubmit}>
        <input
          type='text'
          name='chat_msg'
          onKeyPress={() => {
            socket.emit('typing', {
              roomID,
              user: props.username,
              message: 'Typing...',
            })
          }}
          onKeyUp={() => {
            socket.emit('stopTyping', { roomID })
          }}
        />
        <input type='submit' value='Send' />
      </form>
    </div>
  )
}

export default ChatContent
