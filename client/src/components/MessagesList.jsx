import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Message from './Message';

const MessagesList = () => {
  const { messages } = useSelector((state) => state.chat);
  const messagesEndRef = useRef(null);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  return (
    <div className="messages-list">
      {messages.length === 0 && <div className="empty-state"><p>No messages yet. Start the conversation!</p></div>}
      {messages.map((message, index) => <Message key={message.id || index} message={message} />)}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesList;