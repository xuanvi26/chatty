import React from 'react';
import Message from './Message.jsx';

const MessageList = (props) => {
    const MessageItems = props.messages.map((message) => {
        return <Message type={message.type} username={message.username} content={message.content} key={message.id} prevUser={message.prevUser} userColor={message.userColor}/>
    })
    return (
        <main className="messages">
            {MessageItems}
        </main>
    )
}

export default MessageList;