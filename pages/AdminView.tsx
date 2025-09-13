
import React, { useState } from 'react';
import Dashboard from '../components/admin/Dashboard';
import Analytics from '../components/admin/Analytics';

const AdminView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analytics'>('dashboard');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Admin Portal</h2>
        <p className="mt-1 text-slate-500 dark:text-slate-400">Manage, assign, and resolve community-reported issues.</p>
      </div>

      <div className="border-b border-slate-200 dark:border-slate-700">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'dashboard'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-600'
            }`}
          >
            Issue Dashboard
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'analytics'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-600'
            }`}
          >
            Reporting Analytics
          </button>
        </nav>
      </div>

      <div>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'analytics' && <Analytics />}
      </div>
    </div>
  );
};

export default AdminView;
