import React, { useReducer } from 'react'
import MiscContext from './miscContext'
import miscReducer from './miscReducer'
import {} from '../types'

const MiscState = props => {
  const initialState = {}
  const [state, dispatch] = useReducer(miscReducer, initialState)

  return (
    <MiscContext.Provider value={{}}>{props.children}</MiscContext.Provider>
  )
}

export default MiscState
