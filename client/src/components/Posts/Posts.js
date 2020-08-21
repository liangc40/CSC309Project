import React, { useState, useEffect, useContext } from 'react'
import CommentDisplayModal from './PostsModal'
import NewPostHandlerModal from './NewPostHandlerModal'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Media from 'react-bootstrap/Media'
import { Icon } from 'semantic-ui-react'
import PostContext from '../../context/post/PostContext'
import authContext from '../../context/auth/authContext'


const ProfileInfo = props => {
  return (
    <Container>
    <Tab.Container>
      <Row className="Posts-profileinfo-row">
        <Col>
          <ListGroup>
            <ListGroup.Item className="Posts-profileinfo-listitem" action onClick={()=>props.handleClickFriend("default", props.user, NaN)}>
              All Posts
            </ListGroup.Item>
            <ListGroup.Item className="Posts-profileinfo-listitem" action onClick={()=>props.handleClickFriend("myself", props.user, NaN)}>
              My Posts
            </ListGroup.Item>
            <ListGroup.Item className="Posts-profileinfo-listitem" action onClick={()=>props.handleClickFriend("all", props.user, NaN)}>
              Friends Posts
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Tab.Container>
    
    <h2 className="Posts-profileinfo-header">My Friends List</h2>
    <Tab.Container className="Posts-profileinfo-friendtab">
      <Row>
        <Col>
        <ListGroup className="Posts-profileinfo-friendtab-listgroup">
          {props.friendsList.length>0 && props.friendsList.map((friend, index) =>{
                return(
                  <ListGroup.Item className="Posts-profileinfo-listitem" action key={'friendlist'+index} onClick={()=>props.handleClickFriend("one", props.user, friend)}>
                    {friend.firstname}
                  </ListGroup.Item>
                )
              })
            }
        </ListGroup>
        </Col>
      </Row>

    </Tab.Container>
    </Container>
  )
}

const PostTimelineBody = props => {
  return (
    <Container id='Posts-timeline-body'>
      {props.allPost.length==0 && 
        <div className="posts-posttimelinebody-nofriend">
          Message Your Friend to Write the First Post ~
        </div>}
      {props.allPost.length > 0 &&
        props.allPost.map((post, index) => (
          // whole post div
          <Media key={'body' + index} className='Posts-PostTimelineBody-Media'>
            <img
              width={65}
              height={65}
              className='mr-3'
              src={post.avatar}
              alt='Generic placeholder'
            />
            <Media.Body>
              <h2 className='Posts-PostTimelineBody-h2'>{post.name}</h2>
              <h5 className='Posts-PostTimelineBody-h5'>
                Post at {post.createdAt}
              </h5>
              <p className='Posts-PostTimelineBody-p'>{post.text}</p>
              <br />
              <div className='Posts-PostTimelineBody-IconActionDiv'>
                <Icon
                  name='thumbs up'
                  className='Posts-PostTimelineBody-Icon'
                  onClick={() => {
                    props.handleThumbsUp(props.user, post)
                  }}
                />
                <span className='Posts-PostTimelineBody-IconSpan'>
                  {post.like.length}
                </span>
                <Icon
                  name='comment'
                  className='Posts-PostTimelineBody-Icon'
                  onClick={() => {
                    props.handleShowPopUp(post)
                  }}
                />
                <span>{post.comments ? post.comments.length : 0}</span>
              </div>

              {post.comments &&
                props.showComments[index] &&
                post.comments.map((comment, i) => (
                  <Media key={i}>
                    <img
                      width={30}
                      height={30}
                      className='mr-3'
                      src={comment.avatar}
                      alt='Generic placeholder'
                    />
                    <Media.Body>
                      <h5>{comment.name}</h5>
                      <p>{comment.text}</p>
                    </Media.Body>
                    <br />
                    <br />
                  </Media>
                ))}
              {post.comments && !props.showComments[index] && post.comments[0] && (
                <Media
                  className='Posts-PostTimelineBody-Comment-Body'
                  key={'media' + 0}
                >
                  <img
                    width={30}
                    height={30}
                    className='mr-3'
                    src={post.comments[0].avatar}
                    alt='Generic placeholder'
                  />
                  <Media.Body>
                    <h5 className='Posts-PostTimelineBody-Comment-Name'>
                      {post.comments[0].name}
                    </h5>
                    <p className='Posts-PostTimelineBody-Comment-Content'>
                      {post.comments[0].text}
                    </p>
                  </Media.Body>
                </Media>
              )}
              {post.comments && !props.showComments[index] && post.comments[1] && (
                <Media key={"comment_1"}
                  className='Posts-PostTimelineBody-Comment-Body'
                  key={'media' + 1}
                >
                  <img
                    width={30}
                    height={30}
                    className='mr-3'
                    src={post.comments[1].avatar}
                    alt='Generic placeholder'
                  />
                  <Media.Body>
                    <h5 className='Posts-PostTimelineBody-Comment-Name'>
                      {post.comments[1].name}
                    </h5>
                    <p className='Posts-PostTimelineBody-Comment-Content'>
                      {post.comments[1].text}
                    </p>
                  </Media.Body>
                </Media>
              )}
              {post.comments && !props.showComments[index] && post.comments[2] && (
                <Media key={"comment_2"}
                  className='Posts-PostTimelineBody-Comment-Body'
                  key={'media' + 2}
                >
                  <img
                    width={30}
                    height={30}
                    className='mr-3'
                    src={post.comments[2].avatar}
                    alt='Generic placeholder'
                  />
                  <Media.Body>
                    <h5 className='Posts-PostTimelineBody-Comment-Name'>
                      {post.comments[2].name}
                    </h5>
                    <p className='Posts-PostTimelineBody-Comment-Content'>
                      {post.comments[2].text}
                    </p>
                  </Media.Body>
                </Media>
              )}
              {!props.showComments[index] && post.comments.length>3&&
                <Button variant="light" className="Posts-PostTimelineBody-showbutton" onClick={() => props.showAllComments(index)}>
                <i className="far fa-caret-square-down"/>Show All Comments
                </Button>
              }
              {props.showComments[index] && post.comments.length>3&&
                <Button variant="light" className="Posts-PostTimelineBody-showbutton" onClick={() => props.showAllComments(index)}>
                <i className="far fa-caret-square-up"/>Close
                </Button>
              }
              
            </Media.Body>
          </Media>
        ))}
    </Container>
  )
}
const PostTimeline = props => {
  return (
    <Container id='Posts-timeline'>
      <Row id='Posts-timeline-header'>
        <Col sm={2} className="Posts-posttimeline-col1">
          <Button className="Posts-posttimeline-button" variant='primary' size='ls' onClick={props.handleNewPost}>
            New Post
          </Button>
        </Col>
        <Col sm className="Posts-posttimeline-col2">
          <span className='Posts-PostTimeline-span'>Sorted by:</span>
          <select id='Posts-postSortedBy' onChange={()=>{props.handlePostSorting()}}>
            <option value='Date'>Date</option>
            <option value='Most thumb'>Most thumb</option>
            <option value='Most comment'>Most comment</option>
          </select>
        </Col>
      </Row>
      <PostTimelineBody
        allPost={props.allPost}
        user={props.user}
        handleShowPopUp={props.handleShowPopUp}
        handleThumbsUp={props.handleThumbsUp}
        showAllComments={props.showAllComments}
        showComments={props.showComments}
      />
    </Container>
  )
}

const PostPageDisplay = props => {
  const {
    handleShowPopUp,
    handleClosePopUp,
    handleNewPost,
    handleNewPostClose,
    addComment,
    handlePostSorting,
    loadPost,
    handleAddNewPost,
    handleThumbsUp,
    showAllComments,
    loadFriendsList,
    handleClickFriend,

    showPopUp,
    showPost,
    newPostDisplay,
    allPost,
    showComments,
    friendsList,
  } = useContext(PostContext)

  const { user } = useContext(authContext)


  useEffect(() => {
    loadFriendsList(user)
    loadPost(user)
  }, [])

  // console.log("allPost:")
  return (
    <PostContext.Provider>
      
        <Container className="Posts">
          <Row className="Posts-Row">
            <Col sm={3}>
              <ProfileInfo user={user} friendsList={friendsList} handleClickFriend={handleClickFriend}/>
            </Col>

            <Col sm={9}>
             
              <Row>
                <PostTimeline
                  allPost={allPost}
                  user={user}
                  handleShowPopUp={handleShowPopUp}
                  handlePostSorting={handlePostSorting}
                  handleThumbsUp={handleThumbsUp}
                  showAllComments={showAllComments}
                  showComments={showComments}
                  handleNewPost={handleNewPost}
                />
              </Row>
            </Col>
          </Row>
        </Container>
        <CommentDisplayModal
          showPopUp={showPopUp}
          showPost={showPost}
          user={user}
          handleClosePopUp={handleClosePopUp}
          addComment={addComment}
          handleThumbsUp={handleThumbsUp}
        />
        <NewPostHandlerModal
          newPostDisplay={newPostDisplay}
          user={user}
          handleNewPostClose={handleNewPostClose}
          handleAddNewPost={handleAddNewPost}
        />
    </PostContext.Provider>
  )
}
export default PostPageDisplay
