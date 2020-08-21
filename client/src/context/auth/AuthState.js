import React, { useReducer } from 'react'
import AuthContext from './authContext'
import authReducer from './authReducer'
import axios from 'axios'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  SHOW_ACCOUNT,
  CLOSE_ACCOUNT,
  REQ_FAIL,
  LOADING,
} from '../types'
import setAuthToken from '../../utils/setAuthToken'

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
    showAccountStatus: false,
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  // Load User
  const loadUser = async () => {
    dispatch({ type: LOADING })
    setAuthToken(localStorage.token)

    try {
      const res = await axios.get('http://localhost:5000/api/auth')

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    } catch (err) {
      dispatch({ type: AUTH_ERROR })
    }
  }

  // Register
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/users',
        formData,
        config
      )

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })

      loadUser()
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      })
    }
  }

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth',
        formData,
        config
      )

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })

      loadUser()
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      })
    }
  }

  const updateUser = async (user) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      await axios.put(
        `http://localhost:5000/api/users/user${user.id}`,
        user,
        config
      )
      loadUser()
    } catch (error) {
      dispatch({
        type: REQ_FAIL,
        payload: error.response.data.msg,
      })
    }
  }

  const sendFriendReq = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/users/friend${id}`)
      loadUser()
    } catch (error) {
      dispatch({
        type: REQ_FAIL,
        payload: error.response.data.msg,
      })
    }
  }

  const respondFriendReq = async (rid, response) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const res = { response }
      await axios.post(
        `http://localhost:5000/api/users/resfriend${rid}`,
        res,
        config
      )
      loadUser()
    } catch (error) {
      dispatch({
        type: REQ_FAIL,
        payload: error.response.data.msg,
      })
    }
  }

  // Logout
  const logout = () => dispatch({ type: LOGOUT })

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS })

  const showAccount = () => {
    dispatch({
      type: SHOW_ACCOUNT,
      showAccountStatus: true,
    })
  }

  const closeAccount = () => {
    dispatch({
      type: CLOSE_ACCOUNT,
      showAccountStatus: false,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        showAccountStatus: state.showAccountStatus,
        register,
        loadUser,
        updateUser,
        login,
        logout,
        clearErrors,
        showAccount,
        closeAccount,
        sendFriendReq,
        respondFriendReq,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
