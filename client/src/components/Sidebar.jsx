import React from 'react';

const Sidebar = ({ users, currentUser }) => (
  <aside className="sidebar">
    <h2 className="sidebar-title">Users ({users.length})</h2>
    <ul className="users-list">
      {users.map((username, index) => (
        <li key={index} className={`user-item ${username === currentUser ? 'current' : ''}`}>
          <span className="user-status"></span>
          {username}
          {username === currentUser && <span className="you-badge">You</span>}
        </li>
      ))}
    </ul>
  </aside>
);

export default Sidebar;