import React from 'react';

const ChatBar = (props) => {

    const onKeyPressHandlerMsg = (event) => {
        if(event.key === 'Enter' && event.target.value !== '') {
            props.updateMessages({username: props.currentUser.name, content: event.target.value})
            event.target.value = '';
        }
    }

    const onKeyDownHandlerUser = (event) => {
        props.updateUser(event.target.value);
    }

    return(
        <footer className="chatbar">
            <input className="chatbar-username" onChange={onKeyDownHandlerUser} placeholder="Your username" />
            <input className="chatbar-message" onKeyPress={onKeyPressHandlerMsg} placeholder="Type a message and hit ENTER" />
        </footer>
    )
}

export default ChatBar;
