import React from 'react';
import Message from './Message.jsx';

const MessageList = (props) => {
    const MessageItems = props.messages.map((message, index) => {
        return <Message username={message.username} content={message.content} key={index}/>
    })
    return (
        <main className="messages">
            {MessageItems}
        </main>
    )
}

export default MessageList;