
import React, { useState, FormEvent, useEffect } from 'react';
import { useIssues } from '../../context/IssueContext';
import { Issue, Status, Priority } from '../../types';
import { STATUSES, PRIORITIES, DEPARTMENTS } from '../../constants';

interface IssueDetailModalProps {
  issue: Issue;
  onClose: () => void;
}

const IssueDetailModal: React.FC<IssueDetailModalProps> = ({ issue, onClose }) => {
  const { updateIssue } = useIssues();
  const [status, setStatus] = useState<Status>(issue.status);
  const [priority, setPriority] = useState<Priority>(issue.priority);
  const [assignedTo, setAssignedTo] = useState<string>(issue.assignedTo || '');
  const [resolutionNotes, setResolutionNotes] = useState<string>(issue.resolutionNotes || '');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const updates: Partial<Issue> = { status, priority, assignedTo, resolutionNotes };
    
    setTimeout(() => {
      updateIssue(issue.id, updates);
      setIsSaving(false);
      onClose();
    }, 1000);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center sticky top-0 bg-white dark:bg-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Issue Details - #{issue.id.slice(-6)}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-lg font-semibold text-slate-800 dark:text-white">{issue.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">{issue.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong className="block text-slate-500 dark:text-slate-400">Category:</strong> {issue.category}</div>
                <div><strong className="block text-slate-500 dark:text-slate-400">Location:</strong> {issue.location}</div>
                <div><strong className="block text-slate-500 dark:text-slate-400">Submitted:</strong> {issue.submittedAt.toLocaleString()}</div>
                <div><strong className="block text-slate-500 dark:text-slate-400">Updated:</strong> {issue.updatedAt.toLocaleString()}</div>
              </div>

              {issue.imageUrl && <img src={issue.imageUrl} alt="Issue evidence" className="rounded-lg w-full object-cover max-h-80" />}
            </div>
            
            <div className="md:col-span-1 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-800 dark:text-white">Update Status</h4>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Status</label>
                <select id="status" value={status} onChange={(e) => setStatus(e.target.value as Status)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Priority</label>
                <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value as Priority)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                  {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="assignedTo" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Assign To</label>
                <select id="assignedTo" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                  <option value="">Unassigned</option>
                  {DEPARTMENTS.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                </select>
              </div>
               <div>
                <label htmlFor="resolutionNotes" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Resolution Notes</label>
                <textarea id="resolutionNotes" rows={3} value={resolutionNotes} onChange={(e) => setResolutionNotes(e.target.value)} className="mt-1 block w-full p-2 text-base border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" placeholder="Add notes for resolution..."></textarea>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-4 sticky bottom-0">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm hover:bg-slate-50 dark:hover:bg-slate-600">Cancel</button>
            <button type="submit" disabled={isSaving} className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssueDetailModal;
