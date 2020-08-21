import React, { useReducer } from 'react'
import adminReducer from './adminReducer'
import AdminContext from './adminContext'
import axios from 'axios'

import { GET_ALL_USER, REQ_FAIL, SET_ADMIN_EDIT, LOADING } from '../types'

const AdminState = (props) => {
  const initialState = {
    users: [],
    showEditStatus: false,
    currEditUser: {},
    loading: false,
  }
  const [state, dispatch] = useReducer(adminReducer, initialState)

  const setEdit = (user = {}) => {
    dispatch({
      type: SET_ADMIN_EDIT,
      payload: {
        status: Object.keys(user).length !== 0,
        user: user,
      },
    })
  }

  const getUsers = async () => {
    dispatch({ type: LOADING })
    try {
      const res = await axios.get('http://localhost:5000/api/users/all')
      dispatch({
        type: GET_ALL_USER,
        payload: res.data,
      })
    } catch (error) {
      dispatch({
        type: REQ_FAIL,
        payload: error.response.data.msg,
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
    } catch (error) {
      dispatch({
        type: REQ_FAIL,
        payload: error.response.data.msg,
      })
    }
  }

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/user${id}`)
    } catch (error) {
      dispatch({
        type: REQ_FAIL,
        payload: error.response.data.msg,
      })
    }
  }

  return (
    <AdminContext.Provider
      value={{
        users: state.users,
        showEditStatus: state.showEditStatus,
        currEditUser: state.currEditUser,
        loading: state.loading,
        setEdit,
        getUsers,
        updateUser,
        deleteUser,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  )
}

export default AdminState
