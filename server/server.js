const express = require('express')
const connectDB = require('./config/db')
const path = require('path')
const cors = require('cors')

const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http, { path: '/chatroom' })
const Chat = require('./models/chat')

// Connect Database
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))
app.use(cors())

// Socket IO
io.on('connection', socket => {
  console.log('one user connected')

  socket.on('room', ({ roomID }) => {
    socket.join(roomID)
  })

  socket.on('send_msg', ({ roomID, message, sender }) => {
    Chat.findById(roomID).then(chat => {
      if (chat.user1 != sender && chat.user2 != sender) {
        return console.error('sender not in chat')
      }
      chat.contents.push({ sender, content: message })
      chat.save().then(newChat => {})
    })
    socket.to(roomID).emit('received', { sender, message })
  })

  socket.on('typing', ({ roomID, user, message }) => {
    socket.to(roomID).emit('notifyTyping', {
      user: user,
      message: message
    })
  })

  socket.on('stopTyping', ({ roomID }) => {
    socket.to(roomID).emit('notifyStopTyping', 'stop typing')
  })
})

// Define Routes
app.get('/', (_, res) => {
  res.send('Welcome to the API of TEAM20 PROJECT')
})
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/posts', require('./routes/post'))
app.use('/api/chat', require('./routes/chat'))

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}

const PORT = 5000

http.listen(PORT, () => console.log(`Server started on port ${PORT}`))
