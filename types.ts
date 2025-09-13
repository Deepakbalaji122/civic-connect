
export enum Status {
  Submitted = 'Submitted',
  InProgress = 'In Progress',
  Resolved = 'Resolved',
}

export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export enum Category {
  Pothole = 'Pothole',
  Graffiti = 'Graffiti',
  Streetlight = 'Broken Streetlight',
  Waste = 'Waste Management',
  Traffic = 'Traffic Signal Issue',
  Other = 'Other',
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: Category;
  status: Status;
  priority: Priority;
  location: string;
  imageUrl?: string;
  submittedAt: Date;
  updatedAt: Date;
  assignedTo?: string; // Department name
  resolutionNotes?: string;
}

export interface Department {
  id: string;
  name: string;
}
