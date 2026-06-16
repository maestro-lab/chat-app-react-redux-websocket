import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { addUser, initSocket } from '../store/chatSlice';
import Sidebar from './Sidebar';
import MessagesList from './MessagesList';
import AddMessage from './AddMessage';
import '../styles/Chat.css';

const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { currentUser, isConnected, users } = useSelector((state) => state.chat);

  useEffect(() => {
    if (!isAuthenticated) { navigate('/'); return; }
    dispatch(initSocket());
    if (user && !currentUser) dispatch(addUser(user.username));
  }, [isAuthenticated, user, currentUser, dispatch, navigate]);

  const handleLogout = () => { dispatch(logout()); navigate('/'); };
  if (!isAuthenticated) return null;

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>Chat Room</h1>
        <div className="header-info">
          <span className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>{isConnected ? '● Online' : '● Offline'}</span>
          <span className="current-user">{currentUser}</span>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </header>
      <div className="chat-layout">
        <Sidebar users={users} currentUser={currentUser} />
        <div className="chat-main">
          <MessagesList />
          <AddMessage />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;