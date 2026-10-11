
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
      <div className="space-y-6 text-gray-700">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Email</h2>
          <p className="text-indigo-600">support@cityportal.gov</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Phone</h2>
          <p>+91 98765 43210</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Address</h2>
          <p>City Municipality Office, 123 Civic Center, Chennai, Tamil Nadu, 600001</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
