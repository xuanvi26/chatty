import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      currentUser: {
        name: '',
        prevName: ''
      },
      numOnlineUsers: 0
    }
  }

  updateMessages = (inputMessage) => {
    inputMessage.type = 'postMessage'
    this.socket.send(JSON.stringify(inputMessage))
  }

  updateUser = (enter, inputUser) => {
    if (enter && this.state.currentUser.prevName !== inputUser.name) {
      inputUser.type = 'updateUsername';
      this.socket.send(JSON.stringify(inputUser));
      this.setState({currentUser: {name: inputUser.name, prevName: inputUser.name}})
    } else {
      this.setState({currentUser: {name: inputUser.name}})
    }
  }

  componentDidMount() {
    this.socket = new WebSocket('ws:localhost:3001')

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      switch(data.type) {
        case "incomingMessage":
          const updatedMessages = this.state.messages.concat(data)
          this.setState({messages: updatedMessages})
          break;
        case "incomingNotification":
          // handle incoming notification
          break;
        case "onlineUsers":
          console.log('did we get online users')
          this.setState({numOnlineUsers: data.count})
          break;
        default:
          throw new Error("Unknown event type " + data.type);
      }
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-users">{this.state.numOnlineUsers === 0 ? 'Loading...' : `${this.state.numOnlineUsers} user(s) online`} </span>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar updateMessages={this.updateMessages} updateUser={this.updateUser} currentUser={this.state.currentUser}/>
      </div>
    );
  }
}

export default App;
