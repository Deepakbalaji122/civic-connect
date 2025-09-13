
import React from 'react';
import { Issue, Status, Priority } from '../../types';

interface IssueTableProps {
  issues: Issue[];
  onRowClick: (issue: Issue) => void;
}

const statusBadge: Record<Status, string> = {
  [Status.Submitted]: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
  [Status.InProgress]: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
  [Status.Resolved]: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
};

const priorityText: Record<Priority, string> = {
  [Priority.High]: "text-red-600 dark:text-red-400",
  [Priority.Medium]: "text-yellow-600 dark:text-yellow-400",
  [Priority.Low]: "text-green-600 dark:text-green-400",
};


const IssueTable: React.FC<IssueTableProps> = ({ issues, onRowClick }) => {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-full align-middle">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 dark:ring-slate-700 rounded-lg">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 dark:text-white sm:pl-6">Title</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white">Status</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white">Priority</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white hidden lg:table-cell">Category</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white hidden md:table-cell">Last Updated</th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">View</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800">
              {issues.length > 0 ? issues.map((issue) => (
                <tr key={issue.id} onClick={() => onRowClick(issue)} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div className="font-medium text-slate-900 dark:text-white">{issue.title}</div>
                    <div className="text-slate-500 dark:text-slate-400 hidden sm:block">{issue.location}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${statusBadge[issue.status]}`}>
                      {issue.status}
                    </span>
                  </td>
                  <td className={`whitespace-nowrap px-3 py-4 text-sm font-medium ${priorityText[issue.priority]}`}>{issue.priority}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400 hidden lg:table-cell">{issue.category}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400 hidden md:table-cell">{issue.updatedAt.toLocaleDateString()}</td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200">View<span className="sr-only">, {issue.title}</span></button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-500 dark:text-slate-400">
                    No issues match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IssueTable;
