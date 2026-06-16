import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './store/store';
import LoginPage from './components/LoginPage';
import ChatPage from './components/ChatPage';
import './styles/App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;