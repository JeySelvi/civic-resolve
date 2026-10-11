
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DUMMY_COMPLAINTS, DUMMY_USERS } from '../../data/dummyData';
import { Complaint, ComplaintStatus } from '../../types';
import StatCard from '../../components/StatCard';

const statusColorMap: Record<ComplaintStatus, string> = {
  [ComplaintStatus.Pending]: 'bg-yellow-100 text-yellow-800',
  [ComplaintStatus.InProgress]: 'bg-blue-100 text-blue-800',
  [ComplaintStatus.Resolved]: 'bg-green-100 text-green-800',
  [ComplaintStatus.Rejected]: 'bg-red-100 text-red-800',
};

const TotalIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const PendingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const InProgressIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 20h5v-5M20 4h-5v5" /></svg>;
const ResolvedIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


const AdminDashboardPage: React.FC = () => {
    const stats = useMemo(() => {
        return DUMMY_COMPLAINTS.reduce((acc, complaint) => {
            if (complaint.status === ComplaintStatus.Pending) acc.pending += 1;
            if (complaint.status === ComplaintStatus.InProgress) acc.inProgress += 1;
            if (complaint.status === ComplaintStatus.Resolved) acc.resolved += 1;
            return acc;
        }, { pending: 0, inProgress: 0, resolved: 0 });
    }, []);

    const getUserName = (userId: string) => DUMMY_USERS.find(u => u.id === userId)?.name || 'Unknown User';

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Complaints" value={DUMMY_COMPLAINTS.length} icon={<TotalIcon />} color="bg-indigo-500" />
                <StatCard title="Pending" value={stats.pending} icon={<PendingIcon />} color="bg-yellow-500" />
                <StatCard title="In Progress" value={stats.inProgress} icon={<InProgressIcon />} color="bg-blue-500" />
                <StatCard title="Resolved" value={stats.resolved} icon={<ResolvedIcon />} color="bg-green-500" />
            </div>

            {/* Complaints Table */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Complaints</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600 uppercase">ID</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600 uppercase">User</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600 uppercase">Title</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600 uppercase">Status</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600 uppercase">Date</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600 uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {DUMMY_COMPLAINTS.map((complaint: Complaint) => (
                                <tr key={complaint.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-4">#{complaint.id}</td>
                                    <td className="py-3 px-4">{getUserName(complaint.userId)}</td>
                                    <td className="py-3 px-4">{complaint.title}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColorMap[complaint.status]}`}>
                                            {complaint.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">{complaint.submittedDate}</td>
                                    <td className="py-3 px-4">
                                        <Link to={`/admin/complaints/${complaint.id}`} className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300">
                                            View/Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
