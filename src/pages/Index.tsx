
import { useState } from 'react';
import GuideHeader from '../components/GuideHeader';
import SectionNavigation from '../components/SectionNavigation';
import PerformanceFundamentals from '../components/sections/PerformanceFundamentals';
import DatabaseOptimization from '../components/sections/DatabaseOptimization';
import BackendPerformance from '../components/sections/BackendPerformance';
import FrontendOptimization from '../components/sections/FrontendOptimization';
import InfrastructureScaling from '../components/sections/InfrastructureScaling';
import PerformanceAnalysis from '../components/sections/PerformanceAnalysis';
import DatabaseSchema from '../components/DatabaseSchema';
import ErrorAnalysis from '../components/ErrorAnalysis';
import Footer from '../components/Footer';

// Define all available sections
const sections = [
  { id: 'analysis', title: 'Performance Analysis Report', component: PerformanceAnalysis },
  { id: 'fundamentals', title: 'Performance Fundamentals', component: PerformanceFundamentals },
  { id: 'database', title: 'Database Optimization', component: DatabaseOptimization },
  { id: 'backend', title: 'Backend Performance', component: BackendPerformance },
  { id: 'frontend', title: 'Frontend Optimization', component: FrontendOptimization },
  { id: 'infrastructure', title: 'Infrastructure & Scaling', component: InfrastructureScaling },
  { id: 'schema', title: 'Database Schema', component: DatabaseSchema },
  { id: 'error', title: 'Error Analysis', component: ErrorAnalysis },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('analysis');
  
  // Find the active section component to render
  const ActiveSectionComponent = sections.find(section => section.id === activeSection)?.component || PerformanceAnalysis;

  return (
    <div className="min-h-screen bg-gray-50">
      <GuideHeader />
      
      <div className="container mx-auto px-4 py-6 md:px-6">
        <main className="flex flex-col lg:flex-row gap-8">
          {/* Side Navigation */}
          <div className="lg:w-1/4">
            <SectionNavigation 
              sections={sections} 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
            />
          </div>
          
          {/* Main Content */}
          <div className="lg:w-3/4 bg-white rounded-lg shadow-md p-6">
            <ActiveSectionComponent />
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
