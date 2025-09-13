
import { Issue, Status, Priority, Category, Department } from './types';

export const CATEGORIES: Category[] = Object.values(Category);
export const STATUSES: Status[] = Object.values(Status);
export const PRIORITIES: Priority[] = Object.values(Priority);

export const DEPARTMENTS: Department[] = [
  { id: 'dept-1', name: 'Public Works' },
  { id: 'dept-2', name: 'Sanitation' },
  { id: 'dept-3', name: 'Transportation' },
  { id: 'dept-4', name: 'Parks and Recreation' },
  { id: 'dept-5', name: 'Code Enforcement' },
];

export const MOCK_ISSUES: Issue[] = [
  {
    id: 'issue-1',
    title: 'Deep pothole on Main St',
    description: 'A large and dangerous pothole has formed in the eastbound lane of Main St, just past the intersection with Oak Ave. It has already caused one flat tire.',
    category: Category.Pothole,
    status: Status.InProgress,
    priority: Priority.High,
    location: '123 Main St, Cityville',
    imageUrl: 'https://picsum.photos/seed/pothole/800/600',
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    assignedTo: 'Public Works',
  },
  {
    id: 'issue-2',
    title: 'Streetlight out at park entrance',
    description: 'The streetlight at the main entrance to Central Park is completely out, making the area very dark and unsafe at night.',
    category: Category.Streetlight,
    status: Status.Submitted,
    priority: Priority.Medium,
    location: '456 Park Ave, Cityville',
    imageUrl: 'https://picsum.photos/seed/streetlight/800/600',
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    assignedTo: 'Public Works',
  },
  {
    id: 'issue-3',
    title: 'Overflowing trash can',
    description: 'The public trash can on the corner of 5th and Elm is overflowing with garbage, and litter is spreading onto the sidewalk.',
    category: Category.Waste,
    status: Status.Resolved,
    priority: Priority.Low,
    location: 'Corner of 5th and Elm, Cityville',
    submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    assignedTo: 'Sanitation',
    resolutionNotes: 'Trash can was emptied and the surrounding area was cleaned.'
  },
  {
    id: 'issue-4',
    title: 'Graffiti on bridge',
    description: 'Offensive graffiti has been spray-painted on the side of the Miller St bridge.',
    category: Category.Graffiti,
    status: Status.Submitted,
    priority: Priority.Medium,
    location: 'Miller St Bridge, Cityville',
    imageUrl: 'https://picsum.photos/seed/graffiti/800/600',
    submittedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    assignedTo: 'Code Enforcement',
  },
];
