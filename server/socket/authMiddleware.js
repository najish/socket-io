const jwt = require('jsonwebtoken');

const verifySocketJWT = (token) => {
  try {
    const decoded = jwt.verify(token, 'secret123'); 
    return decoded.id;
  } catch (err) {
    return null;
  }
};

module.exports = verifySocketJWT;
