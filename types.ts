
export enum ComplaintStatus {
  Pending = 'Pending',
  InProgress = 'In Progress',
  Resolved = 'Resolved',
  Rejected = 'Rejected',
}

export enum ComplaintCategory {
  Roads = 'Roads',
  Electricity = 'Electricity',
  Water = 'Water',
  Garbage = 'Garbage',
  Other = 'Other',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user';
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'admin';
}

export interface AdminReply {
  id: string;
  officerName: string;
  reply: string;
  date: string;
}

export interface Complaint {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  location: string;
  imageUrl?: string;
  status: ComplaintStatus;
  submittedDate: string;
  replies: AdminReply[];
}
