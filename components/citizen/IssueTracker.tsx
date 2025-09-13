
import React, { useState } from 'react';
import { useIssues } from '../../context/IssueContext';
import { Status, Issue } from '../../types';
import IssueCard from './IssueCard';

const statusTabs: { status: Status, label: string }[] = [
  { status: Status.InProgress, label: 'In Progress' },
  { status: Status.Submitted, label: 'Submitted' },
  { status: Status.Resolved, label: 'Resolved' },
];

const IssueTracker: React.FC = () => {
  const { issues } = useIssues();
  const [activeTab, setActiveTab] = useState<Status>(Status.InProgress);

  const filteredIssues = issues.filter(issue => issue.status === activeTab);

  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">My Reported Issues</h3>
      
      <div className="border-b border-slate-200 dark:border-slate-700">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {statusTabs.map(tab => (
            <button
              key={tab.status}
              onClick={() => setActiveTab(tab.status)}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.status
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-600'
              }`}
            >
              {tab.label} ({issues.filter(i => i.status === tab.status).length})
            </button>
          ))}
        </nav>
      </div>
      
      <div className="mt-6">
        {filteredIssues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIssues.map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-white">No issues found</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">There are no issues with the status "{activeTab}".</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueTracker;
