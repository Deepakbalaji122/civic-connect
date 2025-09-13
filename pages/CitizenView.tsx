
import React, { useState } from 'react';
import ReportIssueForm from '../components/citizen/ReportIssueForm';
import IssueTracker from '../components/citizen/IssueTracker';

const CitizenView: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Citizen Portal</h2>
            <p className="mt-1 text-slate-500 dark:text-slate-400">Report and track issues in your community.</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            {showForm ? 'Cancel Report' : 'Report New Issue'}
          </button>
        </div>
      </div>

      {showForm && <ReportIssueForm onFormSubmit={() => setShowForm(false)} />}
      
      <IssueTracker />
    </div>
  );
};

export default CitizenView;
