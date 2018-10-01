import React from 'react';

const Message = (props) => {
    
    let userColor = {
        color: props.userColor
    }
    return (
        <div>

            <div>
                {props.type === 'connectUser' ? <span className='message system'>{props.username} user joined the chat room</span> : undefined}
            </div>

            <div>
                {props.type === 'disconnectUser' ? <span className='message system'>{props.username} disconnected from the chat room</span> : undefined}
            </div>

            <div>
                {props.type === 'incomingMessage' ? 
                    (<div>
                        <div>
                            {props.prevUser !== undefined ? <span className="message system">{props.prevUser} changed their name to {props.username}</span> : undefined}
                        </div>
                        <div className="message">
                            <span className='message-username' style={userColor}>{props.username}</span>
                            <span className="message-content">{props.content}</span>
                        </div> 
                    </div>)
                    :
                    undefined
                }
            </div>
        </div>
    )
}

export default Message;