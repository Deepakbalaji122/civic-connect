
import React, { useState, useMemo } from 'react';
import { useIssues } from '../../context/IssueContext';
import { Issue, Category, Status, Priority } from '../../types';
import { CATEGORIES, STATUSES, PRIORITIES } from '../../constants';
import IssueTable from './IssueTable';
import IssueDetailModal from './IssueDetailModal';

const Dashboard: React.FC = () => {
  const { issues } = useIssues();
  const [filters, setFilters] = useState<{
    category: string;
    status: string;
    priority: string;
    searchTerm: string;
  }>({
    category: 'all',
    status: 'all',
    priority: 'all',
    searchTerm: '',
  });
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredIssues = useMemo(() => {
    return issues.filter(issue => {
      const term = filters.searchTerm.toLowerCase();
      return (
        (filters.category === 'all' || issue.category === filters.category) &&
        (filters.status === 'all' || issue.status === filters.status) &&
        (filters.priority === 'all' || issue.priority === filters.priority) &&
        (issue.title.toLowerCase().includes(term) ||
         issue.description.toLowerCase().includes(term) ||
         issue.location.toLowerCase().includes(term) ||
         issue.id.toLowerCase().includes(term))
      );
    });
  }, [issues, filters]);

  const handleRowClick = (issue: Issue) => {
    setSelectedIssue(issue);
  };

  const handleCloseModal = () => {
    setSelectedIssue(null);
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Filter Issues</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            name="searchTerm"
            placeholder="Search by keyword, ID..."
            value={filters.searchTerm}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <select name="category" value={filters.category} onChange={handleFilterChange} className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option value="all">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select name="status" value={filters.status} onChange={handleFilterChange} className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option value="all">All Statuses</option>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select name="priority" value={filters.priority} onChange={handleFilterChange} className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option value="all">All Priorities</option>
            {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>
      
      <IssueTable issues={filteredIssues} onRowClick={handleRowClick} />
      
      {selectedIssue && (
        <IssueDetailModal issue={selectedIssue} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Dashboard;
