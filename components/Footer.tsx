
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} City Municipality. All Rights Reserved.</p>
        <div className="mt-2">
            <Link to="/contact" className="text-gray-400 hover:text-white mx-2">Contact Us</Link>
            <Link to="/about" className="text-gray-400 hover:text-white mx-2">About</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
