
import React, { createContext, useContext, ReactNode } from 'react';
import { Issue, Status } from '../types';
import { MOCK_ISSUES } from '../constants';
import useLocalStorage from '../hooks/useLocalStorage';

interface IssueContextType {
  issues: Issue[];
  addIssue: (issue: Omit<Issue, 'id' | 'submittedAt' | 'updatedAt' | 'status'>) => void;
  updateIssue: (issueId: string, updates: Partial<Issue>) => void;
  getIssuesByStatus: (status: Status) => Issue[];
}

const IssueContext = createContext<IssueContextType | undefined>(undefined);

export const IssueProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [issues, setIssues] = useLocalStorage<Issue[]>('civic-connect-issues', MOCK_ISSUES);

  const addIssue = (issueData: Omit<Issue, 'id' | 'submittedAt' | 'updatedAt' | 'status'>) => {
    const newIssue: Issue = {
      ...issueData,
      id: `issue-${Date.now()}`,
      status: Status.Submitted,
      submittedAt: new Date(),
      updatedAt: new Date(),
    };
    setIssues(prevIssues => [newIssue, ...prevIssues]);
  };

  const updateIssue = (issueId: string, updates: Partial<Issue>) => {
    setIssues(prevIssues =>
      prevIssues.map(issue =>
        issue.id === issueId ? { ...issue, ...updates, updatedAt: new Date() } : issue
      )
    );
  };

  const getIssuesByStatus = (status: Status) => {
    return issues.filter(issue => issue.status === status);
  };
  
  const value = { issues, addIssue, updateIssue, getIssuesByStatus };

  return (
    <IssueContext.Provider value={value}>
      {children}
    </IssueContext.Provider>
  );
};

export const useIssues = (): IssueContextType => {
  const context = useContext(IssueContext);
  if (context === undefined) {
    throw new Error('useIssues must be used within an IssueProvider');
  }
  return context;
};
