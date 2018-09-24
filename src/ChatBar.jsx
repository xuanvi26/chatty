import React from 'react';

const ChatBar = (props) => {
    const onKeyPressHandler = (event) => {
        if(event.key === 'Enter') {
            props.updateMessages({username: props.currentUser.name, content: event.target.value})
        }
    }
    return(
        <footer className="chatbar">
            <input className="chatbar-username" placeholder={props.currentUser.name} />
            <input className="chatbar-message" onKeyPress={onKeyPressHandler} placeholder="Type a message and hit ENTER" />
        </footer>
    )
}

export default ChatBar;
