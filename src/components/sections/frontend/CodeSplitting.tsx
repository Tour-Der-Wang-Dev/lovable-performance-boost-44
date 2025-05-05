
import React from 'react';
import CodeBlock from "../../CodeBlock";

const CodeSplitting = () => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-orange-600">Code Splitting Strategies</h3>
      
      <p className="mb-4 text-gray-700">
        Code splitting is a technique that breaks your bundle into smaller chunks, loading only what's necessary.
        This significantly improves initial load time and time-to-interactive.
      </p>
      
      <div className="mb-6">
        <h4 className="font-semibold mb-2">React.lazy and Suspense</h4>
        <CodeBlock
          language="jsx"
          title="Route-based Code Splitting"
          code={`// Before code splitting
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

// After code splitting with React.lazy and Suspense
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';

// Lazily load route components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Settings = lazy(() => import('./pages/Settings'));
const UserProfile = lazy(() => import('./pages/UserProfile'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}`}
        />
      </div>
      
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Component-Level Code Splitting</h4>
        <CodeBlock
          language="jsx"
          title="On-demand Component Loading"
          code={`// Before optimization
import React, { useState } from 'react';
import HighlySophisticatedChart from './HighlySophisticatedChart';
import ComplexDataTable from './ComplexDataTable';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div>
      <nav className="tabs">
        <button onClick={() => setActiveTab('overview')}>Overview</button>
        <button onClick={() => setActiveTab('analytics')}>Analytics</button>
        <button onClick={() => setActiveTab('reports')}>Reports</button>
      </nav>
      
      <div className="content">
        {activeTab === 'overview' && <div>Overview Content</div>}
        {activeTab === 'analytics' && <HighlySophisticatedChart />}
        {activeTab === 'reports' && <ComplexDataTable />}
      </div>
    </div>
  );
}

// After optimization with component-level code splitting
import React, { useState, Suspense, lazy } from 'react';

const HighlySophisticatedChart = lazy(() => 
  import('./HighlySophisticatedChart')
);
const ComplexDataTable = lazy(() => 
  import('./ComplexDataTable')
);

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div>
      <nav className="tabs">
        <button onClick={() => setActiveTab('overview')}>Overview</button>
        <button onClick={() => setActiveTab('analytics')}>Analytics</button>
        <button onClick={() => setActiveTab('reports')}>Reports</button>
      </nav>
      
      <div className="content">
        {activeTab === 'overview' && <div>Overview Content</div>}
        {activeTab === 'analytics' && (
          <Suspense fallback={<div>Loading chart...</div>}>
            <HighlySophisticatedChart />
          </Suspense>
        )}
        {activeTab === 'reports' && (
          <Suspense fallback={<div>Loading table...</div>}>
            <ComplexDataTable />
          </Suspense>
        )}
      </div>
    </div>
  );
}`}
        />
      </div>
    </div>
  );
};

export default CodeSplitting;
