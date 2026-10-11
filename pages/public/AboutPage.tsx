
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">About the Civic Issue Reporting Portal</h1>
      <div className="text-gray-700 space-y-4 text-lg">
        <p>
          This portal is managed by the City Municipality to provide faster grievance redressal. Our mission is to bridge the communication gap between citizens and the local government, ensuring that civic issues are addressed promptly and efficiently.
        </p>
        <p>
          Citizens can register complaints online, upload photographic evidence, and track the status of their complaints in real-time. We believe that empowering citizens to report issues is the first step towards building a smarter, cleaner, and better city for everyone.
        </p>
        <p>
          Our dedicated team of officers reviews each complaint and assigns it to the relevant department for action. We are committed to transparency and will provide regular updates on the progress of each complaint.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
