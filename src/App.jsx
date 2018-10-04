import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      currentUser: {
        name: 'Anonymous',
        prevName: 'Anonymous'
      },
      numOnlineUsers: 0
    }
  }

  sendMessage = (inputMessage) => {
    if (this.state.currentUser.prevName !== inputMessage.username) {
      inputMessage.prevUser = this.state.currentUser.prevName;
      this.setState({currentUser: {...this.state.currentUser, prevName: this.state.currentUser.name}});
    } 
      this.socket.send(JSON.stringify(inputMessage));
  }

  updateUser = (inputUser) => {
      this.setState({currentUser: {...this.state.currentUser, name: inputUser}});
  }

  changeMessageState = (data) => {
    const updatedMessages = this.state.messages.concat(data);
    this.setState({messages: updatedMessages});
  }

  componentDidMount() {
    this.socket = new WebSocket('ws:localhost:3001');

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch(data.type) {
        case "incomingMessage":
        case "incomingImage":
        case "connectUser":
        case "disconnectUser":
          this.changeMessageState(data);
          break;
        case "onlineUsers":
          this.setState({numOnlineUsers: data.count});
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
        <ChatBar currentUser={this.state.currentUser} sendMessage={this.sendMessage} updateUser={this.updateUser}/>
      </div>
    );
  }
}

export default App;
