import React, { useReducer } from 'react'
import PostContext from './PostContext'
import postReducer from './postReducer'
import {
  POST_SET_SHOW_POPUP,
  POST_SET_CLOSE_POPUP, 
  POST_SET_SHOW_POST,
  POST_SET_NEW_POST_DISPLAY, 
  POST_SET_CLOSE_NEW_POST_DISPLAY,
  POST_LOAD_POST,
  POST_LOAD_POST_FAIL,
  POST_RELOAD_SHOW_POST,
  POST_RELOAD_ALL_POST,
  POST_UPDATE_ALL_POST_AFTER_SORTED,
  POST_UPDATE_SHOW_COMMENTS_STATUS,
  POST_LOAD_FRIENDS_LIST,
  POST_POSTS,
  POST_CHANGE_SORT,
} from '../types'
import axios from 'axios'


const PostState = props =>{
  
  const initialState = {
    showPopUp: false,
    showPost: {},
    newPostDisplay: false,

    allPost: {},
    showComments:[],
    friendsList:[],
    posts:[],
    
  }

  const [state, dispatch] = useReducer(postReducer, initialState)

  const handleShowPopUp = (post) =>{
    setShowPopUp(true);
    setShowPost(post);
  }
  
  const handleClosePopUp = ()=> {
    setShowPopUp(false);
    setShowPost({});
  }

  const handleNewPost = ()=> {
    setNewPostDisplay(true);
  }
  const handleNewPostClose = ()=> {
    setNewPostDisplay(false)
  }

  const addComment = async(user, post, text) =>{
    let date = new Date();
    
    let data = {
      "name": user.username,
      "text": text,
      "createdAt": date.toLocaleDateString(),
      "avatar": user.avatar
    };
    
    try{
     
      const addCommentReq = await axios.post(
        'http://localhost:5000/api/posts/' + post._id + "/addComment", data
      )
      reloadAllPost(user);
      reloadShowPost(post);
      handleClosePopUp();
      
    }catch (error){
      console.log(error)
    }

  }
  
  const handleAddNewPost = async(user, text)=>{
    let date = new Date();
    let data = {
      "name": user.username,
      "text": text,
      "createdAt": date.toLocaleDateString(),
      "avatar": user.avatar
    }
    try{
      const addNewPostReq = await axios.post(
        'http://localhost:5000/api/posts/add', data
      )
      handleNewPostClose();
      loadPost(user)
    }catch(error){
      console.log(error)
    }
  }

  

  const handlePostSorting = ()=> {
    
    let sortedBy = document.getElementById('Posts-postSortedBy').value
    let lst = state.allPost
    switch (sortedBy) {
      case 'Date':
        lst.sort(function(a, b) {
          if (a.createdAt > b.createdAt) return -1
          if (b.createdAt > a.createdAt) return 1
          return 0
        })
        break
      case 'Most thumb':
        lst.sort(function(a, b) {
          if (a.like > b.like) return -1
          if (b.like > a.like) return 1
          return 0
        })
        break
      case 'Most comment':
        lst.sort(function(a, b) {
          let a_comments_length = a.comments ? a.comments.length : 0
          let b_comments_length = b.comments ? b.comments.length : 0
          if (a_comments_length > b_comments_length) return -1
          if (b_comments_length > a_comments_length) return 1
          return 0
        })
        break
    }
    dispatch({
      type: POST_UPDATE_ALL_POST_AFTER_SORTED,
      payload: lst
    })
  }



  const setShowPopUp = (wantedState) => {
    if (wantedState){
      dispatch({type: POST_SET_SHOW_POPUP})
    }else{
      dispatch({type: POST_SET_CLOSE_POPUP})
    }
  } 

  const reloadShowPost = async(post)=>{
    try{
      const reloadPost = await axios.get(
        'http://localhost:5000/api/posts/' + post._id
      )
      dispatch({
        type: POST_RELOAD_SHOW_POST,
        payload: reloadPost.data
      })
    }catch(error){
      console.log(error)
    } 
  }

  const reloadAllPost = async(user)=>{
    try{
      let getAllPost;
      await (async ()=>{
        getAllPost = (await axios.get(
          'http://localhost:5000/api/posts'
        ))
      })()
     
      
      const everyonePost = getAllPost.data
      let NamePostMap = {}
      for(let i=0; i<everyonePost.length;i++){
        if(NamePostMap[everyonePost[i].name]){
          NamePostMap[everyonePost[i].name].push(everyonePost[i])
        }else{
          NamePostMap[everyonePost[i].name] = [everyonePost[i]]
        }
        
      }
      
      let userFriends = []
      for (let i=0; i<user.friends.length;i++){
        console.log(user.friends[i]._id)
        let friend = await findUserById(user.friends[i]._id)
        userFriends.push(friend)
      }
      // for (let id of user.friends){
      //   let friend = await findUserById(id)
      //   userFriends.push(friend)
      // }
      
      let friendsPost=[]
      
      for (let i=0; i<userFriends.length;i++){
       
        if(Object.keys(NamePostMap).indexOf(userFriends[i].username)>=0){
         
          NamePostMap[userFriends[i].username].map(post=>{
            friendsPost.push(post)
          })
        }
      }
      dispatch({
        type: POST_RELOAD_ALL_POST,
        payload: friendsPost
      })
    }catch(error){
      console.log(error)
    } 
  }

  const setShowPost = (post) => {
    dispatch({
      type: POST_SET_SHOW_POST,
      payload: post
    })
   
  } 

  const setNewPostDisplay = (wantedState) => {
    if (wantedState){
      dispatch({type: POST_SET_NEW_POST_DISPLAY})
    }else{
      dispatch({type: POST_SET_CLOSE_NEW_POST_DISPLAY})
    }
  } 

 

  const loadPost = async (user)=>{
    try{
      let getAllPost;
     
      await (async ()=>{
        getAllPost = (await axios.get(
          'http://localhost:5000/api/posts'
        ))
      })()
     
      
      const everyonePost = getAllPost.data
      
      let NamePostMap = {}
      for(let i=0; i<everyonePost.length;i++){
        if(NamePostMap[everyonePost[i].name]){
          NamePostMap[everyonePost[i].name].push(everyonePost[i])
        }else{
          NamePostMap[everyonePost[i].name] = [everyonePost[i]]
        }
        
      }
      
      let userFriends = []
      for (let i=0; i<user.friends.length;i++){
        // console.log(user.friends[i]._id)
        let friend = await findUserById(user.friends[i]._id)
        userFriends.push(friend)
      }
      
      let friendsPost=[]
      
      for (let i=0; i<userFriends.length;i++){
       
        if(Object.keys(NamePostMap).indexOf(userFriends[i].username)>=0){
         
          NamePostMap[userFriends[i].username].map(post=>{
            friendsPost.push(post)
          })
        }
      }
      for(let i=0;i<everyonePost.length;i++){
        if(everyonePost[i].name == user.username){
          friendsPost.push(everyonePost[i])
        }
      }
      friendsPost.sort(function(a, b) {
        if (a.createdAt > b.createdAt) return -1
        if (b.createdAt > a.createdAt) return 1
        return 0
      })
      dispatch({
        type: POST_POSTS,
        payload: friendsPost
      })
      dispatch({
        type: POST_LOAD_POST,
        payload: friendsPost
      })

      let showMap = []
      for(let i = 0; i < friendsPost.length; i++){
        showMap.push(false)
      }

      dispatch({
        type: POST_UPDATE_SHOW_COMMENTS_STATUS,
        payload: showMap
      })
      // console.log("load successful")
    } catch (error){
      console.log(error)
      dispatch({
        type: POST_LOAD_POST_FAIL,
        payload: {}
      })
      console.log("load fail")
    }
    
  }

  const handleThumbsUp = (user, post)=>{

    if(post.like.includes(user.username)){
      post.like.splice(post.like.indexOf(user.username),1)
    }else{
      post.like.push(user.username)
    }
    dispatch({
      type: POST_RELOAD_ALL_POST,
      payload: state.allPost
    })
  }

  const getAvatarFromName = async(name)=>{
    let data = {
      "name": name
    }
    let avatar = "./images/client_b.png"
    try{
      (async () => {
        const test = (await axios.get(
          'http://localhost:5000/api/users/name', {
            params: data
          }
        ))
        // console.log("test!!!!!!!")
        // console.log(test.data.avatar)
      }
      )()

      // await axios.get(
      //   'http://localhost:5000/api/users/name', {
      //     params: data
      //   }
      // ).then(res=>{
      //   console.log(res.data)
      //   avatar = res.data.avatar
        
      // })
      return avatar;
      
    }catch(error){
      console.log(error)
    }
  }

  const showAllComments =(index)=>{
    let newMap = state.showComments
    newMap[index] = !state.showComments[index]
    // console.log("before:  ")
    // console.log(state.showComments)
    dispatch({
      type: POST_UPDATE_SHOW_COMMENTS_STATUS,
      payload: newMap
    })
    // console.log("after:  ")
    // console.log(state.showComments)
  }

  const findUserById = async(id)=>{
    let user;
    try{
      await (async ()=>{
        // console.log("id::::")
        // console.log(id)
        user = (await axios.get(`http://localhost:5000/api/users/user${id}`)).data
        // console.log("user::::")
        // console.log(user)
      })()
      // const getUser = await axios.get(
      //   `http://localhost:5000/api/users/user${id}`,
      // )
      // return getUser.data;
      // console.log(user)
      return user

    } catch (error){
      console.log(error)
    }
  }

  const loadFriendsList = async(user)=>{
    try{
      let lst = []
      for (let i=0; i<user.friends.length;i++){
        // console.log(user.friends[i]._id)
        let friend = await findUserById(user.friends[i]._id)
        lst.push(friend)
      }
      // for (let id in user.friends){
      //   console.log("Friends:::::")
      //   console.log(id)
      //   let friend = await findUserById(id)
      //   lst.push(friend)
      // }
      dispatch({
        type: POST_LOAD_FRIENDS_LIST,
        payload: lst
      })
    }catch(error){
      console.log(error)
    }
  }

  const handleClickFriend = async (type, user, friend)=>{
    try{
      if(type!="all"){
        if(type=="default"){
          dispatch({
            type: POST_RELOAD_ALL_POST,
            payload: state.posts
          })
        }else{
          let newPost = []
          const everyonePost = state.posts
          let name = type=="one"?friend.username:user.username;
          for (let i=0; i<everyonePost.length;i++){
            if(everyonePost[i].name == name){
              newPost.push(everyonePost[i])
            }
          }
          dispatch({
            type: POST_RELOAD_ALL_POST,
            payload: newPost
          })
        }
      }else{
        reloadAllPost(user);
       
      }
      

    }catch(error){
      console.log(error)
    }
  }
  return (
    <PostContext.Provider
      value={{
        showPopUp: state.showPopUp,
        showPost: state.showPost,
        newPostDisplay: state.newPostDisplay,
        allPost: state.allPost,
        showComments: state.showComments,
        friendsList: state.friendsList,

        handleShowPopUp,
        handleClosePopUp,
        handleNewPost,
        handleNewPostClose,
        addComment,
        handlePostSorting,
        loadPost,
        handleAddNewPost,
        handleThumbsUp,
        getAvatarFromName,
        showAllComments,
        loadFriendsList,
        handleClickFriend,
      }}
    >
      {props.children}
    </PostContext.Provider>
  )

}

export default PostState