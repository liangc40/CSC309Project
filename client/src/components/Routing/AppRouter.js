import React, { useEffect, useContext } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from '../Home/Home'
import SignIn from '../Login/SignIn'
import SignUp from '../Login/SignUp'
import HomeQuestion from '../HomeQuestion/HomeQuestion'
import PostPageDisplay from '../Posts/Posts'
import MessagePage from '../Chat/MessagePage'
import Admin from '../Admin/Admin'
import NotFound from '../MetaPage/NotFound'
import authContext from '../../context/auth/authContext'
import Header from '../layout/Header'
import Alerts from '../layout/Alerts'

const AppRouter = (props) => {
  const { isAuthenticated } = useContext(authContext)

  return isAuthenticated ? (
    <BrowserRouter>
      <Header />
      <Alerts />
      <Switch>
        <Route exact path='/'>
          {true && <Redirect to={'/signin'} />}
        </Route>
        <Route path='/home' component={Home} exact={true} />
        <Route path='/signin' component={SignIn} exact={true} />
        <Route path='/signup' component={SignUp} exact={true} />
        <Route path='/posts' component={PostPageDisplay} exact={true} />
        <Route path='/message' component={MessagePage} exact={true} />
        <Route path='/admin' component={Admin} exact={true} />
        <Route path='/question' component={HomeQuestion} exact={true} />
        <Route component={NotFound} exact={true} />
      </Switch>
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <Header />
      <Alerts />
      <Switch>
        <Route path='/signin' component={SignIn} exact={true} />
        <Route path='/signup' component={SignUp} exact={true} />
        <Route path='*' render={() => <Redirect to={'signin'} />} />
        <Route component={NotFound} exact={true} />
      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter
