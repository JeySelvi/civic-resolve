
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { DUMMY_COMPLAINTS } from '../../data/dummyData';
import { ComplaintStatus } from '../../types';

const statusColorMap: Record<ComplaintStatus, string> = {
  [ComplaintStatus.Pending]: 'bg-yellow-100 text-yellow-800',
  [ComplaintStatus.InProgress]: 'bg-blue-100 text-blue-800',
  [ComplaintStatus.Resolved]: 'bg-green-100 text-green-800',
  [ComplaintStatus.Rejected]: 'bg-red-100 text-red-800',
};

const UserDashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const userComplaints = DUMMY_COMPLAINTS.filter(c => c.userId === currentUser?.id);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Hello, {currentUser?.name} 👋</h1>
        <Link 
            to="/new-complaint"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition font-semibold"
        >
          + New Complaint
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">My Recent Complaints</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600 uppercase">Complaint ID</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600 uppercase">Title</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600 uppercase">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600 uppercase">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600 uppercase"></th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {userComplaints.length > 0 ? userComplaints.map(complaint => (
                        <tr key={complaint.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-3 px-4">#{complaint.id}</td>
                            <td className="py-3 px-4">{complaint.title}</td>
                            <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColorMap[complaint.status]}`}>
                                    {complaint.status}
                                </span>
                            </td>
                            <td className="py-3 px-4">{complaint.submittedDate}</td>
                            <td className="py-3 px-4">
                                <Link to={`/complaints/${complaint.id}`} className="text-indigo-600 hover:underline">
                                    View Details
                                </Link>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={5} className="text-center py-6 text-gray-500">You have not submitted any complaints yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
