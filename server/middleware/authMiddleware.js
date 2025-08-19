// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token missing' });

  const token = authHeader.split(' ')[1]; // Bearer token

  if (!token) return res.status(401).json({ error: 'Token missing' });

  try {
    const decoded = jwt.verify(token, 'secret123');
    req.user = decoded; 
    console.log('zafer: ', decoded)
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

module.exports = verifyToken;
