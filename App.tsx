
import React from 'react';
import { HashRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import CitizenView from './pages/CitizenView';
import AdminView from './pages/AdminView';
import { IssueProvider } from './context/IssueContext';

const App: React.FC = () => {
  return (
    <IssueProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col font-sans text-slate-800 dark:text-slate-200">
          <header className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-10">
            <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <h1 className="text-xl font-bold text-slate-800 dark:text-white">Civic Connect</h1>
              </div>
              <div className="flex space-x-2 sm:space-x-4 border border-slate-200 dark:border-slate-700 rounded-full p-1">
                <NavLink 
                  to="/citizen" 
                  className={({ isActive }) => `px-4 py-2 text-sm font-medium rounded-full transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                >
                  Citizen
                </NavLink>
                <NavLink 
                  to="/admin" 
                  className={({ isActive }) => `px-4 py-2 text-sm font-medium rounded-full transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                >
                  Admin
                </NavLink>
              </div>
            </nav>
          </header>
          
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Navigate to="/citizen" replace />} />
              <Route path="/citizen" element={<CitizenView />} />
              <Route path="/admin" element={<AdminView />} />
            </Routes>
          </main>

          <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
            <div className="container mx-auto px-4 py-4 text-center text-sm text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} Civic Connect. Empowering Communities.
            </div>
          </footer>
        </div>
      </HashRouter>
    </IssueProvider>
  );
};

export default App;
