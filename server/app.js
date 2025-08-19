const express = require('express');
const http = require('http');
const cors = require('cors');
const initSocket = require('./socket');
const morgan = require('morgan')

const app = express();
const PORT = 5000;
app.use(morgan('dev'))
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.use('/', (req, res) => res.send('hello from server'));

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO (all logic in ./socket/index.js)
initSocket(server);

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
