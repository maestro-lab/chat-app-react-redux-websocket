const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const db = require('./db/database');
const Message = require('./models/Message');
const authRoutes = require('./routes/auth');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || "http://localhost:5173", methods: ["GET", "POST"] }
});

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.get('/api/messages', (req, res) => {
  Message.getRecent(50, (err, messages) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(messages);
  });
});

const activeUsers = new Map();

io.on('connection', (socket) => {
  console.log('Connected:', socket.id);

  Message.getRecent(50, (err, messages) => {
    if (!err) socket.emit('CHAT_HISTORY', messages);
  });

  socket.on('ADD_USER', ({ username }) => {
    activeUsers.set(socket.id, { username });
    const usersList = Array.from(activeUsers.values()).map(u => u.username);
    io.emit('USERS_LIST', usersList);
    socket.broadcast.emit('USER_JOINED', { username, time: new Date().toISOString() });
  });

  socket.on('ADD_MESSAGE', ({ message, username }) => {
    Message.create(username, message, (err, saved) => {
      if (!err) {
        io.emit('MESSAGE_RECEIVED', {
          id: saved.id, username: saved.username, content: saved.content, created_at: new Date().toISOString()
        });
      }
    });
  });

  socket.on('disconnect', () => {
    const user = activeUsers.get(socket.id);
    if (user) {
      activeUsers.delete(socket.id);
      io.emit('USERS_LIST', Array.from(activeUsers.values()).map(u => u.username));
      socket.broadcast.emit('USER_LEFT', { username: user.username, time: new Date().toISOString() });
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server on port ${PORT}`));