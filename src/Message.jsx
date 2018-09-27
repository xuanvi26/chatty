import React from 'react';

const Message = (props) => {
    return (
        <div>
            <div className="message">
                <span className="message-username">{props.username}</span>
                <span className="message-content">{props.content}</span>
            </div>
            <div className="message system">
                <span>{props.prevUser !== undefined ? `${props.prevUser} changed their name to ${props.username}` : ''}</span>
            </div>
        </div>
    )
}

export default Message;