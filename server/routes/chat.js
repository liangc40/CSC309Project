const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Chat = require('../models/chat')
const User = require('../models/user.js')
const { ObjectID } = require('mongodb')

/*
  @route    GET api/chat/
  @desc     Get chat
  @access   Private
*/

router.get('/', auth, (req, res) => {
  User.findById(req.user.id)
    .populate({
      path: 'chat',
      populate: {
        path: 'user1',
        select: ['_id', 'username', 'avatar', 'firstname', 'lastname'],
      },
    })
    .populate({
      path: 'chat',
      populate: {
        path: 'user2',
        select: ['_id', 'username', 'avatar', 'firstname', 'lastname'],
      },
    })
    .exec((err, user) => {
      if (err) {
        return res.status(500).json({ msg: 'server error' })
      }
      res.json(user.chat)
    })
})

/*
  @route    GET api/chat/
  @desc     Get chat
  @access   Private
*/

router.get('/all', auth, (req, res) => {
  User.findById(req.user.id)
    .then((user) => {
      if (!user.isAdmin) return res.status(401).json({ msg: 'unauthorized' })
    })
    .catch(() => res.status(500).json({ msg: 'server error' }))
  Chat.find()
    .then((chats) => {
      res.json(chats)
    })
    .catch(() => res.status(500).json({ msg: 'server error' }))
})

/*
  @route    POST api/chat
  @desc     Post a new chat record
  @access   Private
*/
router.post('/', auth, (req, res) => {
  const { pairID } = req.body
  if (!ObjectID.isValid(pairID) || !ObjectID.isValid(req.user.id)) {
    return res.status(400).json({ msg: 'invalid user id' })
  }
  User.findById(req.user.id)
    .then((user1) => {
      User.findById(pairID)
        .then((user2) => {
          const chat = {
            user1: user1._id,
            user2: user2._id,
          }

          Chat.findOne({
            $or: [
              { user1: chat.user1, user2: chat.user2 },
              { user1: chat.user2, user2: chat.user1 },
            ],
          }).then((rec) => {
            if (rec) {
              return res.status(400).json({ msg: 'chat already exists ' })
            }
            new Chat(chat)
              .save()
              .then((newChat) => {
                user1.chat.push(newChat._id)
                user1
                  .save()
                  .then(() => {
                    user2.chat.push(newChat._id)
                    user2
                      .save()
                      .then(() => {
                        res.send('saved')
                      })
                      .catch((err) => {
                        console.error(err)
                        res.status(500).json({ msg: 'server error' })
                      })
                  })
                  .catch((err) => {
                    console.error(err)
                    res.status(500).json({ msg: 'server error' })
                  })
              })
              .catch((err) => res.status(500).json({ msg: 'server error 5' }))
          })
        })
        .catch((err) => res.status(500).json({ msg: 'server error 6' }))
    })

    .catch((err) => res.status(500).json({ msg: 'server error 7' }))
})

/*
  @route    POST api/chat/:chatID
  @desc     Send message
  @access   Private
*/
router.post('/?:chatID', auth, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatID)
    const { content } = req.body
    if (chat.user1 != req.user.id && chat.user2 != req.user.id) {
      return res.status(401).json({ msg: 'req.user.id not in this chat' })
    }

    chat.contents.push({ sender: req.user.id, content })
    await chat.save()
    return res.send('Chat message ok')
  } catch (error) {
    console.error(error)
    return res.status(500).json({ msg: 'server error' })
  }
})

module.exports = router
