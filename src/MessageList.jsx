import React from 'react';
import Message from './Message.jsx';

const MessageList = () => {
    // const MessageItems = props.messages.map((message) => {
    //     return <Message />
    // })
    return (
        <main className="messages">
            <Message />
        </main>
    )
}

export default MessageList;