
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DUMMY_COMPLAINTS, DUMMY_USERS } from '../../data/dummyData';
import { ComplaintStatus, AdminReply } from '../../types';
import { useAuth } from '../../hooks/useAuth';

const AdminComplaintDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // In a real app, you would use state management like Redux/Context and not directly mutate.
  // For this demo, we'll find and update the item in the dummy data array.
  const complaintIndex = DUMMY_COMPLAINTS.findIndex(c => c.id === id);
  const complaint = complaintIndex !== -1 ? DUMMY_COMPLAINTS[complaintIndex] : null;

  const [newStatus, setNewStatus] = useState<ComplaintStatus | undefined>(complaint?.status);
  const [replyText, setReplyText] = useState('');

  const getUserName = (userId: string) => DUMMY_USERS.find(u => u.id === userId)?.name || 'Unknown User';

  const handleUpdate = () => {
    if (complaintIndex !== -1 && newStatus) {
      DUMMY_COMPLAINTS[complaintIndex].status = newStatus;
      
      if (replyText.trim()) {
        const newReply: AdminReply = {
          id: `r-${Date.now()}`,
          officerName: currentUser?.name || 'Admin',
          reply: replyText,
          date: new Date().toISOString().split('T')[0],
        };
        DUMMY_COMPLAINTS[complaintIndex].replies.push(newReply);
      }
      
      alert('Complaint updated successfully!');
      navigate('/admin/dashboard');
    }
  };

  if (!complaint) {
    return <div className="text-center text-red-500">Complaint not found.</div>;
  }
  
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <Link to="/admin/dashboard" className="text-indigo-600 hover:underline mb-6 block">&larr; Back to Admin Dashboard</Link>
      
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{complaint.title}</h1>
      <p className="text-gray-500 mb-6">Submitted by: {getUserName(complaint.userId)} on {complaint.submittedDate}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="font-semibold text-gray-700">Description</h2>
          <p className="text-gray-600 bg-gray-50 p-4 rounded-md mt-1">{complaint.description}</p>
        </div>
        {complaint.imageUrl && (
          <div>
            <h2 className="font-semibold text-gray-700">Submitted Image</h2>
            <img src={complaint.imageUrl} alt="Complaint evidence" className="mt-2 rounded-lg w-full object-cover shadow-md" />
          </div>
        )}
      </div>

      <div className="mt-10 pt-6 border-t">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Status & Reply</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Update Status</label>
            <select
              id="status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as ComplaintStatus)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {Object.values(ComplaintStatus).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="reply" className="block text-sm font-medium text-gray-700">Add Admin Reply</label>
            <textarea
              id="reply"
              rows={3}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="e.g., We have assigned an electrician."
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            onClick={handleUpdate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminComplaintDetailsPage;
