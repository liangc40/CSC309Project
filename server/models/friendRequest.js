const mongoose = require('mongoose')

const FriendRequestSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  status: {
    type: String,
    default: 'pending',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('friend', FriendRequestSchema)
