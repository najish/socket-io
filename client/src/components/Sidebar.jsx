import React, { useState, useEffect } from "react";
import "../layout/UserLayout.css";
import { Link } from "react-router-dom";
import axios from 'axios'

function Sidebar() {
  const [isChatting, setIsChatting] = useState(false);
  const [users, setUsers] = useState([]);

  const showChatPage = async () => {
    setIsChatting((prev) => !prev);
  };


  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users')
      setUsers(response.data)      
    } catch(err) {
      console.error(err)
    }
  }


  useEffect(() => {
    fetchUsers()
  },[])

  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <button onClick={showChatPage}>
            ChatPage
          </button>
          {isChatting && (
            <ul className="chat-page-list">
              {users.map((user) => (
                <li key={user.id}>
                  <Link to={`/chatpage/${user.id}`}>
                    {user.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
