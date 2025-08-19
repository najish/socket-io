import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ChatDashboard from './ChatDashboard';
import './ChatPage.css';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { SocketContext } from '../context/SocketContext';

function ChatPage() {
  const { userId } = useParams();
  const socket = useContext(SocketContext); 
  const { user, token } = useContext(UserContext);
  const [other, setOther] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    // Send message to server
    socket.emit('private_message', { to: userId, from: user.id, text: message });

    // Add message to state immediately
    setMessages([...messages, { from: 'me', text: message }]);
    setMessage('');
  };

  const changeHandler = (e) => {
    setMessage(e.target.value);
  };


  useEffect(() => {
    console.log('user id is changed')
    setMessages([])
  },[userId])

  // **Load previous messages**
  useEffect(() => {
    const fetchMessageHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/messages/${user.id}/${userId}`, // your backend route
          {
            headers: { Authorization: `Bearer ${token}` } // if you require auth
          }
        );

        // Map backend messages to expected format
        const mappedMessages = response.data.map((msg) => ({
          from: msg.senderId === user.id ? 'me' : 'other',
          text: msg.message,
        }));

        setMessages(mappedMessages);
      } catch (err) {
        console.error('Failed to fetch messages:', err);
      }
    };

    if (userId && user) fetchMessageHistory();
  }, [userId, user, token]);

  // Fetch other user details
  useEffect(() => {
    const fetchOtherUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${userId}`);
        setOther(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (userId) fetchOtherUser();
  }, [userId]);

  // Listen for incoming messages
  useEffect(() => {
    if (!socket) return;

    const handleMessage = (data) => {
      if (String(data.from) === String(userId)) {
        setMessages((prev) => [...prev, { from: 'other', text: data.text }]);
      }
    };

    socket.on('private_message', handleMessage);

    return () => {
      socket.off('private_message', handleMessage);
    };
  }, [socket, userId]);

  return (
    <div className="chatting-user">
      {userId ? (
        <div className="chatting-specific">
          <div className="chatting-header">
            <span>{other ? other.name : userId}</span>
          </div>

          <div className="chatting-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-message ${msg.from === 'me' ? 'me' : 'other'}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="form-message">
            <form className="form-form" onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Start chatting.."
                name="message"
                value={message}
                onChange={changeHandler}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      ) : (
        <ChatDashboard />
      )}
    </div>
  );
}

export default ChatPage;
