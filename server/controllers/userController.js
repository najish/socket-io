const { User, Message } = require('../models');
const {Op} = require('sequelize')
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] } // avoid leaking password
    });
    
    return res.status(200).json(users)
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Sequelize method is findByPk, not findByPK
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] } // optional: hide password
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


const getUserMessageHistory = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    // Convert params to integers (Sequelize INTEGER)
    const senderInt = parseInt(senderId);
    const receiverInt = parseInt(receiverId);

    if (isNaN(senderInt) || isNaN(receiverInt)) {
      return res.status(400).json({ error: 'Invalid senderId or receiverId' });
    }

    // Optional: ensure logged-in user can only access their messages
    if (req.user && req.user.id !== senderInt) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: senderInt, receiverId: receiverInt },
          { senderId: receiverInt, receiverId: senderInt }
        ]
      },
      order: [['createdAt', 'ASC']]
    });

    res.status(200).json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Failed to fetch messages', details: err.message });
  }
};



module.exports = { getUsers,getUser,getUserMessageHistory };
