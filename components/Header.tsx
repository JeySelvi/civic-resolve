
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          CivicPortal
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-indigo-600">Home</Link>
          <Link to="/about" className="text-gray-600 hover:text-indigo-600">About</Link>
          
          {currentUser ? (
            <>
              {currentUser.role === 'user' && <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600">Dashboard</Link>}
              {currentUser.role === 'admin' && <Link to="/admin/dashboard" className="text-gray-600 hover:text-indigo-600">Admin Dashboard</Link>}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="text-gray-600 hover:text-indigo-600">Register</Link>
              <Link to="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
