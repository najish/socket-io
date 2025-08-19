const router = require('express').Router()
const {getUsers, getUser, getUserMessageHistory} = require('../controllers/userController')
const verifyToken = require('../middleware/authMiddleware')
router.get('/',getUsers)
router.get('/:id', getUser)
router.get('/messages/:senderId/:receiverId',verifyToken, getUserMessageHistory)

module.exports = router