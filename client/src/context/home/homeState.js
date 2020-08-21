import React, { useReducer } from 'react'
import HomeContext from './HomeContext'
import homeReducer from './homeReducer'
import {
  HOME_SET_SHOW_POPUP,
  HOME_SET_SHOW_USER,
  HOME_SET_CLOSE_POPUP,
  HOME_GET_USER_MATCHES,
  HOME_HANDLE_CHANGE,
  HOME_HANDLE_SUBMIT,
  HOME_SET_ALL_MATCHES,
} from '../types'
import axios from 'axios'

const hardCodeSamples = {
  Yifei: { name: 'Yifei', interests: 'Girls', age: 18, school: 'McGill' },
  Tang: { name: 'Tang', interests: 'Gals', age: 12, school: 'UUUT' },
  YF: { name: 'YF', interests: 'REACT', age: 21, school: 'TofU' },
  TYF: { name: 'TYF', interests: 'Non Males', age: 22, school: 'UofU' },
  'McGill Boy': {
    name: 'McGill Boy',
    interests: 'JS',
    age: 21,
    school: 'TofT'
  },
  YFT: { name: 'YFT', interests: 'HTML', age: 32, school: 'UofT' },
  yft: { name: 'yft', interests: 'HTML', age: 32, school: 'UofT' },
  fyt: { name: 'fyt', interests: 'HTML', age: 32, school: 'UofT' },
  qwe: { name: 'qwe', interests: 'HTML', age: 32, school: 'UofT' },
  asd: { name: 'asd', interests: 'HTML', age: 32, school: 'UofT' },
  zxc: { name: 'zxxc', interests: 'HTML', age: 32, school: 'UofT' }
}

const HomeState = props => {
  //get all users

  const initialState = {
    showMessage: false,
    messageText: '',

    showPopUp: false,
    showUser: {},

    allMatches:{},
    userMatches: {},

    value: ''
  }

  const [state, dispatch] = useReducer(homeReducer, initialState)

  const handleClosePopUp = () => {
    setShowPopUp(false)

    dispatch({
      type: HOME_SET_SHOW_USER,
      payload: {}
    })
  }

  const handleShowPopUp = name => {
    setShowPopUp(true)
    let chosenShowUser = NaN

    for(let i=0; i<state.userMatches.length;i++){
      if ((state.userMatches[i].username == name)) {
        chosenShowUser = state.userMatches[i]
      }
    }

    dispatch({
      type: HOME_SET_SHOW_USER,
      payload: chosenShowUser
    })
  }

  const setUserMatches = async (user) => {
    try {
      const getUserMatches = await axios.get(
        'http://localhost:5000/api/users/home'
      )

      let allPeople = []
      // console.log(getUserMatches.data)

      for(let i=0; i <  getUserMatches.data.length; i++){
        // console.log(getUserMatches.data[i])
        if(getUserMatches.data[i].username != "admin" && getUserMatches.data[i].username != user.username){
          allPeople.push(getUserMatches.data[i])
        }
      }

      dispatch({
        type: HOME_GET_USER_MATCHES,
        payload: allPeople
      })
      dispatch({
        type: HOME_SET_ALL_MATCHES,
        payload: allPeople
      })
    } catch (error) {
      dispatch({
        type: HOME_GET_USER_MATCHES,
        payload: {}
      })
    }
  }
  const setShowPopUp = wantedState => {
    if (wantedState) {
      dispatch({ type: HOME_SET_SHOW_POPUP })
    } else {
      dispatch({ type: HOME_SET_CLOSE_POPUP })
    }
  }

  const handleChange = event => {
    
    dispatch({
      type: HOME_HANDLE_CHANGE,
      payload: event.target.value.toUpperCase()
    })
  }
  const handleSearchSubmit = (event)=>{
    dispatch({
      type: HOME_HANDLE_SUBMIT,
      payload: event.target.value.toUpperCase()
    })
  }

  function containElement(value, elements) {
    var tokens = elements.split(/\s+/)
    for (let i = 0; i < tokens.length; i++) {
      var ele = tokens[i]
      if (
        value.includes(ele.toUpperCase()) ||
        ele.toUpperCase().includes(value)
      ) {
        return true
      }
    }
    return false
  }

  function deleteElement(lst) {
    // console.log(lst)
    let temp = state.allMatches
    let newlst = []
    for(let i = 0; i<lst.length; i++){
      if(lst[i]){
        newlst.push(temp[i])
      }
    }
    dispatch({
      type: HOME_GET_USER_MATCHES,
      payload: newlst
    })
  }

  const handleSubmit = event => {
    let searchWord = document.getElementById('searchBar').value
    // console.log(searchWord)
    dispatch({
      type: HOME_HANDLE_SUBMIT,
      payload: searchWord
    })
    event.preventDefault()
    // console.log(state.value)
    if(!searchWord){
      // console.log("HERE")
      dispatch({
        type: HOME_GET_USER_MATCHES,
        payload: state.allMatches
      })
    }else{
      let flaglst=[]
      for (let key in state.allMatches) {
        let flag = false
        // console.log(state.allMatches)
        if (state.allMatches.hasOwnProperty(key)) {
          for (let innerKey in state.allMatches[key]) {
            if (['interests', 'school', 'major', 'courses', 'username'].includes(innerKey)) {
              // console.log(state.value)
              if (containElement(state.value, state.allMatches[key][innerKey])) {
                // console.log("!")
                // console.log(state.value)
                // console.log(state.allMatches[key][innerKey])
                flag = true
              }
            }
          } 
        }
        flaglst.push(flag)
       
      }
      deleteElement(flaglst)
    }
    
  }

  return (
    <HomeContext.Provider
      value={{
        messageText: state.messageText,
        showMessage: state.showMessage,
        showPopUp: state.showPopUp,
        showUser: state.showUser,
        userMatches: state.userMatches,
        value: state.value,
        handleShowPopUp,
        handleClosePopUp,
        handleChange,
        handleSubmit,
        setUserMatches,
        handleSearchSubmit
      }}
    >
      {props.children}
    </HomeContext.Provider>
  )
}

export default HomeState
