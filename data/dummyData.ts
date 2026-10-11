
import { User, Admin, Complaint, ComplaintStatus, ComplaintCategory } from '../types';

export const DUMMY_USERS: User[] = [
  { id: 'user-1', name: 'Ravi Kumar', email: 'ravi@example.com', role: 'user' },
  { id: 'user-2', name: 'Anitha M', email: 'anitha@example.com', role: 'user' },
  { id: 'user-3', name: 'Arun S', email: 'arun@example.com', role: 'user' },
];

export const DUMMY_ADMINS: Admin[] = [
  { id: 'admin-1', name: 'Admin Officer', email: 'admin@cityportal.gov', role: 'admin' },
];

export const DUMMY_COMPLAINTS: Complaint[] = [
  {
    id: '101',
    userId: 'user-1',
    title: 'Street Light Broken',
    description: 'Street light near park is not working for 2 weeks. It is causing issues for people walking at night.',
    category: ComplaintCategory.Electricity,
    location: 'Near Central Park, Sector 12',
    status: ComplaintStatus.Pending,
    submittedDate: '2025-09-01',
    replies: [],
  },
  {
    id: '102',
    userId: 'user-2',
    title: 'Potholes on MG Road',
    description: 'Large potholes making road unsafe near the main market entrance. Multiple vehicles have been damaged.',
    category: ComplaintCategory.Roads,
    location: 'MG Road, Main Market Area',
    status: ComplaintStatus.InProgress,
    submittedDate: '2025-09-03',
    replies: [
      { id: 'r-1', officerName: 'Officer A', reply: 'Assigned repair team.', date: '2025-09-04' },
      { id: 'r-2', officerName: 'Officer B', reply: 'Work started. Expected completion in 2 days.', date: '2025-09-06' },
    ],
  },
  {
    id: '103',
    userId: 'user-3',
    title: 'Garbage not collected',
    description: 'Garbage has not been collected from our street for the past 4 days. It is causing a foul smell and attracting pests.',
    category: ComplaintCategory.Garbage,
    location: 'Street 5, Sunshine Colony',
    status: ComplaintStatus.Resolved,
    submittedDate: '2025-09-05',
    replies: [
        { id: 'r-3', officerName: 'Officer C', reply: 'Informed the sanitation department.', date: '2025-09-05' },
        { id: 'r-4', officerName: 'Sanitation Dept.', reply: 'The garbage has been cleared.', date: '2025-09-06' },
    ],
  },
   {
    id: '104',
    userId: 'user-1',
    title: 'Broken Drainage near Bus Stop',
    description: 'Open drainage near central bus stop causing foul smell and is a health hazard.',
    category: ComplaintCategory.Water,
    location: 'Central Bus Stop, Chennai',
    imageUrl: 'https://picsum.photos/400/300',
    status: ComplaintStatus.InProgress,
    submittedDate: '2025-09-08',
    replies: [
        { id: 'r-5', officerName: 'Officer D', reply: 'Team dispatched to investigate.', date: '2025-09-08' },
    ],
  }
];
