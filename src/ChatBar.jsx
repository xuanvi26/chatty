import React from 'react';

const ChatBar = (props) => {
    return(
        <footer className="chatbar">
            <input className="chatbar-username" placeholder={props.currentUser.name} />
            <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
        </footer>
    )
}

export default ChatBar;
