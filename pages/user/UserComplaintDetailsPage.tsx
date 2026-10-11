
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { DUMMY_COMPLAINTS } from '../../data/dummyData';
import { ComplaintStatus } from '../../types';

const statusColorMap: Record<ComplaintStatus, string> = {
  [ComplaintStatus.Pending]: 'bg-yellow-100 text-yellow-800',
  [ComplaintStatus.InProgress]: 'bg-blue-100 text-blue-800',
  [ComplaintStatus.Resolved]: 'bg-green-100 text-green-800',
  [ComplaintStatus.Rejected]: 'bg-red-100 text-red-800',
};

const UserComplaintDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const complaint = DUMMY_COMPLAINTS.find(c => c.id === id);

  if (!complaint) {
    return <div className="text-center text-red-500">Complaint not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <Link to="/dashboard" className="text-indigo-600 hover:underline mb-6 block">&larr; Back to Dashboard</Link>
      
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold text-gray-800">{complaint.title}</h1>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColorMap[complaint.status]}`}>
            {complaint.status}
        </span>
      </div>
      <p className="text-gray-500 mb-6">Complaint ID: #{complaint.id} | Submitted on: {complaint.submittedDate}</p>

      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-gray-700">Category</h2>
          <p>{complaint.category}</p>
        </div>
        <div>
          <h2 className="font-semibold text-gray-700">Location</h2>
          <p>{complaint.location}</p>
        </div>
        <div>
          <h2 className="font-semibold text-gray-700">Description</h2>
          <p className="text-gray-600 bg-gray-50 p-4 rounded-md">{complaint.description}</p>
        </div>
        {complaint.imageUrl && (
          <div>
            <h2 className="font-semibold text-gray-700">Submitted Image</h2>
            <img src={complaint.imageUrl} alt="Complaint evidence" className="mt-2 rounded-lg max-w-sm shadow-md" />
          </div>
        )}
      </div>

      <div className="mt-10 pt-6 border-t">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Replies</h2>
        <div className="space-y-4">
            {complaint.replies.length > 0 ? complaint.replies.map(reply => (
                <div key={reply.id} className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-800">{reply.reply}</p>
                    <p className="text-sm text-gray-500 mt-2">- {reply.officerName} on {reply.date}</p>
                </div>
            )) : (
                <p className="text-gray-500">No replies from the admin yet.</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default UserComplaintDetailsPage;
