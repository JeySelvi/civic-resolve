
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="text-center">
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-20 rounded-lg">
        <h1 className="text-5xl font-bold mb-4">Fix your city, one complaint at a time 🚀</h1>
        <p className="text-xl mb-8">Report Social Issues Easily and Track Their Resolution.</p>
        <Link 
          to="/new-complaint"
          className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition text-lg"
        >
          Submit a Complaint Now
        </Link>
      </section>

      {/* About Section */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">About Our Portal</h2>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg">
          This portal helps citizens report civic issues like broken street lights, damaged roads, and garbage problems. It's a platform for citizens to directly connect with the municipality for faster and more transparent grievance redressal.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
