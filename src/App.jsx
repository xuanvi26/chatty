import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [    {
        username: "Bob",
        content: "Has anyone seen my marbles?",
      },
      {
        username: "Anonymous",
        content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
      }],
      currentUser: {name: "Bob"}
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
