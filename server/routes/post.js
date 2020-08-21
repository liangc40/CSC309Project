const router = require('express').Router()
let Post = require('../models/post.js')

/*
  @route     get api/posts
  @desc      get all posts
  @access    Public
*/
router.route('/').get((req, res) => {
  Post.find()
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json('Error: ' + err))
})

/*
  @route     post api/posts/add
  @desc      add a post to db
  @access    Public
*/
router.route('/add').post((req, res) => {
  const name = req.body.name
  const text = req.body.text
  const comments = []
  const createdAt = Date.parse(req.body.createdAt)
  const like = []
  const avatar = req.body.avatar

  const newPost = new Post({
    name,
    text,
    comments,
    createdAt,
    like,
    avatar,
  })
  console.log(newPost)

  newPost
    .save()
    .then(() => res.json('new post is added'))
    .catch((err) => res.status(400).json('Error: ' + err))
})

/*
  @route     get api/posts/:id
  @desc      get a post by id 
  @access    Public
*/ router
  .route('/:id')
  .get((req, res) => {
    Post.findById(req.params.id)
      .then((post) => res.json(post))
      .catch((err) => res.status(400).json('Error: ' + err))
  })

/*
  @route     delete api/posts/:id
  @desc      delete a post by id
  @access    Public
*/ router
  .route('/:id')
  .delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
      .then(() => res.json('post is deleted'))
      .catch((err) => res.status(400).json('Error: ' + err))
  })

/*
  @route     post api/posts/update/:id
  @desc      update a post text by id
  @access    Public
*/
router.route('/update/:id').post((req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (req.body.text) {
        post.text = req.body.text
      }
      if (req.body.like) {
        post.like = Number(req.body.like)
      }

      post
        .save()
        .then(() => res.json('post is updated'))
        .catch((err) => res.status(400).json('Error: ' + err))
    })
    .catch((err) => res.status(400).json('Error: ' + err))
})

/*
  @route     get api/posts/:id/allComment
  @desc      get all comments of a post
  @access    Public
*/
router.route('/:id/allComment').get((req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      res.json(post.comments)
    })
    .catch((err) => res.status(400).json('Error: ' + err))
})

/*
  @route     post api/posts/:id/addComment
  @desc      add a comment to post
  @access    Public
*/
router.route('/:id/addComment').post((req, res) => {
  const name = req.body.name
  const text = req.body.text
  const createdAt = req.body.createdAt
  const avatar = req.body.avatar
  const comment = {
    name,
    text,
    createdAt,
    avatar,
  }
  Post.findById(req.params.id)
    .then((post) => {
      post.comments.push(comment)

      post
        .save()
        .then(() => res.json('comment is added'))
        .catch((err) => res.status(400).json('Error: ' + err))
    })
    .catch((err) => res.status(400).json('Error: ' + err))
})

/*
  @route     get api/posts/:id/:commentId
  @desc      get a specific comment of a post
  @access    Public
*/ router
  .route('/:id/:commentId')
  .get((req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        res.json(post.comments.id(req.params.commentId))
      })
      .catch((err) => res.status(400).json('Error: ' + err))
  })

/*
  @route     delete api/posts/:id/:commentId
  @desc      delete a specific comment of a post
  @access    Public
*/
router.route('/:id/:commentId').delete((req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      post.comments.pull(req.params.commentId)

      post
        .save()
        .then(() => res.json('comment is deleted'))
        .catch((err) => res.status(400).json('Error: ' + err))
    })
    .catch((err) => res.status(400).json('Error: ' + err))
})

/*
  @route     patch api/posts/:id/:commentId
  @desc      update a specific comment of a post
  @access    Public
*/
router.route('/:id/:commentId').patch((req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      post.comments.id(req.params.commentId).text = req.body.text

      post
        .save()
        .then(() => res.json(post))
        .catch((err) => res.status(400).json('Error: ' + err))
    })
    .catch((err) => res.status(400).json('Error: ' + err))
})

module.exports = router
