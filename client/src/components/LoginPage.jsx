import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../store/authSlice';
import '../styles/Login.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

  React.useEffect(() => { if (isAuthenticated) navigate('/chat'); }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest({ username, password }));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Chat App</h1>
        <p className="login-subtitle">React + Redux + WebSocket</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button" disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</button>
        </form>
        <div className="test-credentials">
          <p><strong>Test accounts:</strong></p>
          <p>test_user / test123</p>
          <p>admin / admin123</p>
          <p>student / student123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;