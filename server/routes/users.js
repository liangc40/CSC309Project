const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth')

const User = require('../models/user.js')
const Friend = require('../models/friendRequest')

/*
  @route     POST api/users
  @desc      Register a user
  @access    Public
*/
router.post(
  '/',
  [
    check('firstname', 'Please add firstname').not().isEmpty(),
    check('lastname', 'Please add lastname').not().isEmpty(),
    check('username', 'Please include a username').not().isEmpty(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      firstname,
      lastname,
      school,
      email,
      password,
      username,
      gender,
      major,
      avatar,
    } = req.body

    try {
      let user = await User.findOne({ username })

      if (user) {
        return res.status(400).json({ msg: 'User already exists' })
      }

      user = new User({
        firstname,
        lastname,
        school,
        email,
        password,
        username,
        gender,
        major,
        avatar,
      })

      const salt = await bcrypt.genSalt(10)

      user.password = await bcrypt.hash(password, salt)

      await user.save()

      const payload = {
        user: {
          id: user.id,
          isAdmin: false,
        },
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    GET api/users/all
// @desc     Get all users
// @access   Admin Only

router.get('/all', auth, async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(401).json({ msg: 'Unauthorized' })
  }

  try {
    const users = await User.find({ isAdmin: false })
      .select('-isAdmin')
      .select('-password')
      .sort({
        createdAt: -1,
      })
    res.json(users)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ msg: 'Server Error' })
  }
})

// @route    PUT api/user?:id
// @desc     Update User info
// @access   Private: user only

router.put('/user?:id', auth, async (req, res) => {
  if (!req.user.isAdmin && (req.user.id == req.params.id) == req.body.id) {
    res.status(401).json({ msg: 'Unauthorized' })
  }
  try {
    const oldUser = await User.findById(req.body.id)
    if (!oldUser) return res.status(404).json({ msg: 'User not found' })

    await User.findByIdAndUpdate(req.body.id, { $set: req.body }, { new: true })

    res.send('you are fine')
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// @route     DELETE api/user?:id
// @desc      Delete user
// @access    Admin Only
router.delete('/user?:id', auth, async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(401).json({ msg: 'Unauthorized' })
  }

  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ msg: 'User not found' })

    await User.findByIdAndRemove(req.params.id)

    res.json({ msg: 'user removed' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/users/home
// @desc     Get recommend users
// @access   Admin Only

router.get('/home', auth, async (req, res) => {
  const user = await User.findById(req.user.id)
  try {
    const users = await User.find({
      isAdmin: false,
      _id: {
        $ne: user._id,
        $nin: user.friends,
      },
    })
    res.json(users)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/users/name
// @desc     Get user by name
// @access   public
router.get('/name', async (req, res) => {
  const name = req.query.name
  try {
    await User.find({ username: name })
      .then((user) => {
        res.send(user)
      })
      .catch((error) => res.status(404).send(error))
  } catch (error) {
    console.error(error)
  }
})

// @route    GET api/users/user?:id
// @desc     Get user by id
// @access   private
router.get('/user?:id', async (req, res) => {
  try {
    await User.findById(req.params.id)
      .then((user) => {
        res.send(user)
      })
      .catch((error) => res.status(404).send(error))
  } catch (error) {
    console.error(error)
  }
})

const frAccept = async (rid) => {
  const fr = await Friend.findById(rid)
  fr.status = 'accepted'
  await fr.save()

  const user1 = await User.findById(fr.sender)
  const user2 = await User.findById(fr.receiver)

  user1.friends.push(user2._id)
  await user1.save()

  user2.friends.push(user1._id)
  await user2.save()
}

const frDecline = async (rid) => {
  const fr = await Friend.findById(rid)
  fr.status = 'declined'
  await fr.save()
}

// @route    POST api/users/friend?:id
// @desc     Send a friend request
// @access   private
router.post('/friend?:id', auth, async (req, res) => {
  const senderID = req.user.id
  const receiverID = req.params.id
  try {
    const fr1 = await Friend.findOne({
      sender: senderID,
      receiver: receiverID,
      status: 'pending',
    })
    if (fr1) {
      return res.status(400).json({ msg: 'already sent friend request' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ msg: 'server error' })
  }

  try {
    const fr2 = await Friend.findOne({
      sender: receiverID,
      receiver: senderID,
      status: 'pending',
    })
    if (fr2) {
      frAccept(fr2._id)
      return res.send('accepted')
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ msg: 'server error' })
  }

  try {
    const user1 = await User.findById(senderID)
    const user2 = await User.findById(receiverID)
    if (user1.friends.includes(user2._id)) {
      console.log(user1.friends, user1.friends.includes(user2._id))
      return res.status(401).json({ msg: 'already a friend 1' })
    }
    if (user2.friends.includes(user1._id)) {
      console.log(user2.friends, user2.friends.includes(user1._id))
      return res.status(401).json({ msg: 'already a friend 2' })
    }

    const fr = new Friend({
      sender: senderID,
      receiver: receiverID,
    })
    const frdb = await fr.save()

    const receiver = await User.findById(receiverID)
    receiver.friendRequest.push(frdb._id)
    await receiver.save()
    return res.send('sent')
  } catch (error) {
    console.error(error)
    return res.status(500).json({ msg: 'server error' })
  }
})

// @route    POST api/users/resfriend?:id
// @desc     Respond to a friend request
// @access   private
router.post('/resfriend?:id', auth, async (req, res) => {
  const rid = req.params.id
  try {
    const fr = await Friend.findById(rid)
    if (fr.status !== 'pending') {
      res.status(400).json({ msg: 'Already responded to this request' })
    }
  } catch (error) {
    res.status(500).json({ msg: 'server error' })
    console.error(error)
  }

  if (req.body.response === 'accept') {
    try {
      frAccept(rid)
      return res.send(req.body.response)
    } catch (error) {
      res.status(500).json({ msg: 'server error' })
      console.error(error)
    }
  }
  if (req.body.response === 'decline') {
    try {
      frDecline(rid)
      return res.send(req.body.response)
    } catch (error) {
      res.status(500).json({ msg: 'server error' })
      console.error(error)
    }
  }

  res.status(400).json({ msg: 'invalid response' })
})

module.exports = router
