import React from 'react';

const Message = (props) => {
    
    let userColor = {
        color: props.userColor
    }

    const getUserChange = () => (
        <div>
            {props.prevUser !== undefined ? <span className="message system">{props.prevUser} changed their name to {props.username}</span> : undefined}
        </div>
    )

    const getMessageBody = (type) => (
        <div className="message">
            <span className='message-username' style={userColor}>{props.username}</span>
            {type === 'incomingImage' ? 
                <div className='message-content'>
                    <img className='message-image' src={props.content}></img> 
                </div>
                : 
                <span className="message-content">{props.content}</span>}
        </div> 
    )

    const generateMessageHTML = (type) => {
        return (<div>
            {getUserChange()}
            {getMessageBody(type)}
        </div>
        )
    }

    return (
        <div>

            {props.type === 'connectUser' ? <span className='message system'>{props.username} user joined the chat room.</span> : undefined}

            {props.type === 'disconnectUser' ? <span className='message system'>{props.username} disconnected from the chat room.</span> : undefined}

            {props.type === 'incomingMessage' || props.type === 'incomingImage' ? generateMessageHTML(props.type) : undefined}

        </div>
    )
}

export default Message;