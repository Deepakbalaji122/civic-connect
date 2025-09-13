
import React, { useMemo } from 'react';
import { useIssues } from '../../context/IssueContext';
import { Category, Status, Issue } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Analytics: React.FC = () => {
    const { issues } = useIssues();

    const issuesByCategory = useMemo(() => {
        const counts: { [key in Category]?: number } = {};
        for (const issue of issues) {
            counts[issue.category] = (counts[issue.category] || 0) + 1;
        }
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [issues]);

    const issuesByStatus = useMemo(() => {
        const counts: { [key in Status]?: number } = {};
        for (const issue of issues) {
            counts[issue.status] = (counts[issue.status] || 0) + 1;
        }
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [issues]);
    
    const avgResolutionTime = useMemo(() => {
      const resolvedIssues = issues.filter(i => i.status === Status.Resolved);
      if (resolvedIssues.length === 0) return 0;
      
      const totalTime = resolvedIssues.reduce((acc, issue) => {
        const diff = issue.updatedAt.getTime() - issue.submittedAt.getTime();
        return acc + diff;
      }, 0);

      const avgMilliseconds = totalTime / resolvedIssues.length;
      return (avgMilliseconds / (1000 * 60 * 60)).toFixed(1); // in hours
    }, [issues]);

    const summaryStats = useMemo(() => ({
      total: issues.length,
      open: issues.filter(i => i.status !== Status.Resolved).length,
      resolved: issues.filter(i => i.status === Status.Resolved).length,
    }), [issues]);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Reports" value={summaryStats.total} />
                <StatCard title="Open Issues" value={summaryStats.open} />
                <StatCard title="Resolved Issues" value={summaryStats.resolved} />
                <StatCard title="Avg. Resolution Time" value={`${avgResolutionTime} hrs`} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ChartContainer title="Issues by Category">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={issuesByCategory} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)"/>
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis allowDecimals={false} />
                            <Tooltip 
                              cursor={{fill: 'rgba(240, 240, 240, 0.2)'}}
                              contentStyle={{ backgroundColor: 'rgba(30,41,59,0.9)', border: '1px solid #475569', borderRadius: '0.5rem' }}
                            />
                            <Legend />
                            <Bar dataKey="value" name="Reports" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>

                <ChartContainer title="Issues by Status">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={issuesByStatus}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {issuesByStatus.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                             <Tooltip 
                                contentStyle={{ backgroundColor: 'rgba(30,41,59,0.9)', border: '1px solid #475569', borderRadius: '0.5rem' }}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </div>
        </div>
    );
};

const ChartContainer: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">{title}</h3>
        {children}
    </div>
);

const StatCard: React.FC<{ title: string; value: string | number }> = ({ title, value }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">{title}</p>
        <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{value}</p>
    </div>
);

export default Analytics;
