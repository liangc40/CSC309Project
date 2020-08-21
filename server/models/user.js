const mongoose = require('mongoose')

const FriendRequestSchema = mongoose.Schema({
  sender: {
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

const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
  },
  gender: {
    type: String,
  },
  school: {
    type: String,
  },
  major: {
    type: String,
  },
  bio: {
    type: String,
  },
  followers: {
    type: Array,
  },
  following: {
    type: Array,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  chat: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'chat',
    },
  ],

  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  friendRequest: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'friend',
    },
  ],
})

module.exports = mongoose.model('user', UserSchema)
