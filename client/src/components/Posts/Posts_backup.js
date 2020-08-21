import React from 'react'
import CommentDisplayModal from './PostsModal'
import NewPostHandlerModal from './NewPostHandlerModal'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Divider, Statistic } from 'semantic-ui-react'

import Media from 'react-bootstrap/Media'
import { Icon } from 'semantic-ui-react'

class ProfileStats extends React.Component {
  render() {
    return (
      <div id='Posts-profileStats'>
          <ul>
            <li>{this.props.user.posts.length} Posts</li>
            <li>{this.props.user.following.length} Following</li>
            <li>{this.props.user.follower.length} Followers</li>
          </ul>
          <Button variant='primary' size='ls' onClick={this.props.handleNewPost}>
          New Post
          </Button>      
      </div>
    )
  }
}

class ProfileInfo extends React.Component {
  render() {
    return (
      <Container as='div' id='Posts-profileInfo' className="Posts-profileInfo">
        <img src="./images/client_b.png"/>
        <h2>{this.props.user.name}</h2>
        <h3>{this.props.user.university}</h3>
        <h3>{this.props.user.major}</h3>
        <h3>{this.props.user.email}</h3>
        <p>Bio: {this.props.user.bio}</p>
      </Container>
    )
  }
}

class PostTimelineBody extends React.Component {
  render() {
    return (
      <Container id='Posts-timeline-body'>
        {this.props.user.posts.length > 0 &&
          this.props.user.posts.map((post, index) => (
            // whole post div
            <Media
              key={'body' + index}
              className='Posts-PostTimelineBody-Media'
            >
              <img
                width={64}
                height={64}
                className='mr-3'
                src={this.props.user.image}
                alt='Generic placeholder'
              />
              <Media.Body>
                <h2 className='Posts-PostTimelineBody-h2'>{post.name}</h2>
                <h5 className='Posts-PostTimelineBody-h5'>
                  Post at {post.date}
                </h5>
                <p className='Posts-PostTimelineBody-p'>{post.text}</p>
                <br />
                <div className='Posts-PostTimelineBody-IconActionDiv'>
                  <Icon
                    name='thumbs up'
                    className='Posts-PostTimelineBody-Icon'
                  />
                  <span className='Posts-PostTimelineBody-IconSpan'>
                    {post.commentNum}
                  </span>
                  <Icon
                    name='comment'
                    className='Posts-PostTimelineBody-Icon'
                    onClick={() => {
                      this.props.handleShowPopUp(post)
                    }}
                  />
                  <span>{post.commentNum}</span>
                </div>

                {post.comment[0] && (
                  <Media
                    className='Posts-PostTimelineBody-Comment-Body'
                    key={'media' + index}
                  >
                    <img
                      width={30}
                      height={30}
                      className='mr-3'
                      src={post.comment[0].image}
                      alt='Generic placeholder'
                    />
                    <Media.Body>
                      <h5 className='Posts-PostTimelineBody-Comment-Name'>
                        {post.comment[0].name}
                      </h5>
                      <p className='Posts-PostTimelineBody-Comment-Content'>
                        {post.comment[0].text}
                      </p>
                      
                    </Media.Body>
                  </Media>
                )}
                {post.comment[1] && (
                  <Media
                    className='Posts-PostTimelineBody-Comment-Body'
                    key={index}
                  >
                    <img
                      width={30}
                      height={30}
                      className='mr-3'
                      src={post.comment[1].image}
                      alt='Generic placeholder'
                    />
                    <Media.Body>
                      <h5 className='Posts-PostTimelineBody-Comment-Name'>
                        {post.comment[1].name}
                      </h5>
                      <p className='Posts-PostTimelineBody-Comment-Content'>
                        {post.comment[1].text}
                      </p>
                      
                    </Media.Body>
                  </Media>
                )}
              </Media.Body>
            </Media>
          ))}
      </Container>
    )
  }
}
class PostTimeline extends React.Component {
  render() {
    return (
      <Container id='Posts-timeline'>
        <div id='Posts-timeline-header'>
          <span className='Posts-PostTimeline-span'>Sorted by:</span>
          <select
            id='Posts-postSortedBy'
            onChange={this.props.handlePostSorting}
          >
            <option value='Date'>Date</option>
            <option value='Most thumb'>Most thumb</option>
            <option value='Most comment'>Most comment</option>
          </select>
        </div>
        <PostTimelineBody
          user={this.props.user}
          handleShowPopUp={this.props.handleShowPopUp}
        />
      </Container>
    )
  }
}


let comment1 = {
  image: './images/client_b.png',
  name: 'James',
  text: 'So now is reading daily!!!!'
}
let comment2 = {
  image: './images/client_b.png',
  name: 'Jeremy',
  text: 'I agree above. LMFAO ~ ~'
}
let comment3 = {
  image: './images/client_b.png',
  name: 'tester',
  text: '1231'
}

let post1 = {
  name: 'Li Hai',
  date: '2020/2/24',
  text: 'Reading week is over',
  picture: [
    'login_left.jpg',
    'login_left.jpg',
    'login_left.jpg',
    'login_left.jpg'
  ],
  thumbs: 100,
  commentNum: 20,
  comment: [comment1, comment2, comment3],
  index: 3
}

let post2 = {
  name: 'Li Hai',
  date: '2020/2/25',
  text: 'xxxxx',
  picture: [],
  thumbs: 10,
  commentNum: 15,
  comment: [],
  index: 1
}

let post3 = {
  name: 'Li Hai',
  date: '2020/1/25',
  text: 'xxxxxxxx',
  picture: [],
  thumbs: 20,
  commentNum: 10,
  comment: [],
  index: 2
}

let user = {
  name: 'LI HAI',
  image: './images/client_b.png',
  university: 'University of Toronto',
  major: 'CS',
  email: 'hhai.li@mail.utoronto.ca',
  bio: 'Right place to save our hairs',
  posts: [post1, post2, post3],
  following: ['user1', 'user2', 'user3'],
  follower: ['u1', 'u2', 'u3', 'u4', 'u5']
}

let trending_lst = [
  'Hello World',
  'Save hairs',
  'How to study csc309',
  'How to find girl friend',
  'Winter is coming',
  "Today's lecture",
  'New program list',
  '4.0gpa for everyone',
  'Good luck for exam week'
]
export default class PostPageDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: user,
      showPopUp: false,
      showPost: {},
      newPostDisplay: false
    }
    this.handleClosePopUp = this.handleClosePopUp.bind(this)
    this.handleShowPopUp = this.handleShowPopUp.bind(this)
    this.handleNewPost = this.handleNewPost.bind(this)
    this.handleNewPostClose = this.handleNewPostClose.bind(this)
    this.handlePostSorting = this.handlePostSorting.bind(this)
    this.addComment = this.addComment.bind(this)
  }
  handleShowPopUp(post) {
    this.setState(() => ({ showPopUp: true, showPost: post }))
  }
  handleClosePopUp() {
    this.setState(() => ({ showPopUp: false, showPost: {} }))
  }

  handleNewPost() {
    this.setState(() => ({ newPostDisplay: true }))
  }
  handleNewPostClose() {
    this.setState(() => ({ newPostDisplay: false }))
  }
  addComment(name, post, text) {
    let newComment = {
      image: './images/client_b.png',
      name: name,
      text: text
    }
    post.comment.push(newComment)
    post.commentNum += 1
    this.setState(() => ({ showPost: post }))
  }
  handlePostSorting() {
    let sortedBy = document.getElementById('Posts-postSortedBy').value
    switch (sortedBy) {
      case 'Date':
        this.state.user.posts.sort(function(a, b) {
          if (a.date > b.date) return -1
          if (b.date > a.date) return 1
          return 0
        })
        break
      case 'Most thumb':
        this.state.user.posts.sort(function(a, b) {
          if (a.thumbs > b.thumbs) return -1
          if (b.thumbs > a.thumbs) return 1
          return 0
        })
        break
      case 'Most comment':
        this.state.user.posts.sort(function(a, b) {
          if (a.commentNum > b.commentNum) return -1
          if (b.commentNum > a.commentNum) return 1
          return 0
        })
        break
    }
    this.setState(() => ({ user: user }))
  }
  render() {
    return (
      <div className='Posts'>
        <Container>
          <Row>
            <Col sm={4}>
              <ProfileInfo user={this.state.user} />
            </Col>
            <Col sm={8}>
              <Row className="Posts-ProfileStats-Row">
                <ProfileStats
                user={this.state.user}
                handleNewPost={this.handleNewPost}
                />
              </Row>
              <Row>
                <PostTimeline
                  user={this.state.user}
                  handleShowPopUp={this.handleShowPopUp}
                  handlePostSorting={this.handlePostSorting}
                />
              </Row>
            </Col>
          </Row>
        </Container>
        <CommentDisplayModal
          showPopUp={this.state.showPopUp}
          showPost={this.state.showPost}
          user={this.state.user}
          handleClosePopUp={this.handleClosePopUp}
          addComment={this.addComment}
        />
        <NewPostHandlerModal
          newPostDisplay={this.state.newPostDisplay}
          user={this.state.user}
          handleNewPostClose={this.handleNewPostClose}
        />
      </div>
    )
  }
}
