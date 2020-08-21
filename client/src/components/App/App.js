import React from 'react'
import AppRouter from '../Routing/AppRouter'
import context from './context'
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'SIGNIN',
      user: 'random',

      showMessage: false,
      messageText: ''
    }
    this.handleCloseMessage = this.handleCloseMessage.bind(this)
    this.handleNewMessage = this.handleNewMessage.bind(this)
  }
  handleNewMessage(text) {
    this.setState(() => ({ showMessage: true, messageText: text }))
  }

  handleCloseMessage() {
    this.setState(() => ({ showMessage: false, messageText: '' }))
  }

  render() {
    return <AppRouter />
  }
}

export default context(App)
