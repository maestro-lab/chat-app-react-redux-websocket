import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../store/chatSlice';

const AddMessage = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const { isConnected } = useSelector((state) => state.chat);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && isConnected) { dispatch(addMessage(text.trim())); setText(''); }
  };

  return (
    <div className="add-message">
      <form onSubmit={handleSubmit} className="message-form">
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder={isConnected ? "Type a message..." : "Connecting..."} disabled={!isConnected} className="message-input" />
        <button type="submit" disabled={!text.trim() || !isConnected} className="send-button">Send</button>
      </form>
    </div>
  );
};

export default AddMessage;