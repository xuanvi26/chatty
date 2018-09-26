import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      currentUser: ''
    }
    this.socket = new WebSocket('ws:localhost:3001')
  }

  componentDidMount() {
    this.socket.onmessage = (event) => {
      const updatedMessages = this.state.messages.concat(JSON.parse(event.data))
      this.setState({messages: updatedMessages})
    }
  }

  updateMessages = (inputMessage) => {
    this.socket.send(JSON.stringify(inputMessage))
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar updateMessages={this.updateMessages} currentUser={this.state.currentUser}/>
      </div>
    );
  }
}

export default App;
