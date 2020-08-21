const mongoose = require('mongoose')

const ChatContentSchema = mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  content: {
    type: String,
    required: true
  }
})

const ChatSchema = mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  contents: [ChatContentSchema]
})

module.exports = mongoose.model('chat', ChatSchema)
