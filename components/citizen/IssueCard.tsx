
import React from 'react';
import { Issue, Status, Priority } from '../../types';

interface IssueCardProps {
  issue: Issue;
}

const statusStyles: Record<Status, string> = {
  [Status.Submitted]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  [Status.InProgress]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  [Status.Resolved]: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
};

const priorityStyles: Record<Priority, string> = {
  [Priority.Low]: 'border-green-500',
  [Priority.Medium]: 'border-yellow-500',
  [Priority.High]: 'border-red-500',
};


const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  const timeSince = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  }

  return (
    <div className={`flex flex-col bg-white dark:bg-slate-800/50 rounded-lg shadow-md border-l-4 ${priorityStyles[issue.priority]} overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-105`}>
      {issue.imageUrl && (
        <img src={issue.imageUrl} alt={issue.title} className="w-full h-40 object-cover" />
      )}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[issue.status]}`}>
            {issue.status}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">{issue.category}</span>
        </div>
        <h4 className="text-lg font-bold text-slate-800 dark:text-white flex-grow">{issue.title}</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{issue.description}</p>
        
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
              <span>{issue.location}</span>
            </div>
            <span>Updated {timeSince(issue.updatedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
