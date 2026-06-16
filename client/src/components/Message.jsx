import React from 'react';

const Message = ({ message }) => {
  if (message.type === 'system') {
    return (
      <div className="system-message">
        <span className="system-text">{message.content}</span>
        <span className="message-time">{message.created_at ? new Date(message.created_at).toLocaleTimeString() : ''}</span>
      </div>
    );
  }
  return (
    <div className="message">
      <div className="message-header">
        <span className="message-author">{message.username}</span>
        <span className="message-time">{message.created_at ? new Date(message.created_at).toLocaleTimeString() : ''}</span>
      </div>
      <div className="message-content">{message.content}</div>
    </div>
  );
};

export default Message;