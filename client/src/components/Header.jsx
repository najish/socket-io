import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../layout/UserLayout.css';
import './Header.css';
import { UserContext } from '../context/UserContext'; // import your context

function Header() {
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(); // clears user and localStorage
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="header-left">ChatUs</div>
      <div className="header-right">
        {user ? (
          <>
            <span className="header-user">Hi, {user.name}</span>
            <button onClick={handleLogout} className="header-link">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="header-link">Login</Link>
            <Link to="/signup" className="header-link">Signup</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
