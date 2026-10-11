
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { DUMMY_COMPLAINTS } from '../../data/dummyData';
import { Complaint, ComplaintCategory, ComplaintStatus } from '../../types';

const NewComplaintPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ComplaintCategory>(ComplaintCategory.Other);
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    // In a real app, you would upload the image and get a URL.
    // Here we just simulate it.
    const newComplaint: Complaint = {
      id: `${Date.now()}`,
      userId: currentUser.id,
      title,
      description,
      category,
      location,
      imageUrl: image ? URL.createObjectURL(image) : undefined,
      status: ComplaintStatus.Pending,
      submittedDate: new Date().toISOString().split('T')[0],
      replies: [],
    };

    DUMMY_COMPLAINTS.unshift(newComplaint); // Add to the beginning of the array
    navigate('/dashboard');
  };
  
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Submit a New Complaint</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select id="category" value={category} onChange={e => setCategory(e.target.value as ComplaintCategory)} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            {Object.values(ComplaintCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image (Optional)</label>
          <input type="file" id="image" accept="image/*" onChange={e => setImage(e.target.files ? e.target.files[0] : null)} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"/>
        </div>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md transition">
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default NewComplaintPage;
