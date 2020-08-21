import React from 'react'
import AuthState from '../../context/auth/AuthState'
import UserState from '../../context/user/UserState'
import AlertState from '../../context/alert/AlertState'
import MiscState from '../../context/misc/MiscState'
import AdminState from '../../context/admin/AdminState'
import HomeState from '../../context/home/HomeState'
import PostState from '../../context/post/postState'
import ChatState from '../../context/chat/ChatState'

const context = Component => props => {
  return (
    <ChatState>
      <AdminState>
        <MiscState>
          <HomeState>
            <UserState>
              <PostState>
                <AuthState>
                  <AlertState>
                    <Component {...props} />
                  </AlertState>
                </AuthState>
              </PostState>
            </UserState>
          </HomeState>
        </MiscState>
      </AdminState>
    </ChatState>
  )
}

export default context
