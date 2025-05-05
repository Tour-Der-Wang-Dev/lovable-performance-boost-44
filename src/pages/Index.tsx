import React, { useState } from 'react';
import GuideHeader from '@/components/GuideHeader';
import SectionNavigation from '@/components/SectionNavigation';
import PerformanceFundamentals from '@/components/sections/PerformanceFundamentals';
import DatabaseOptimization from '@/components/sections/DatabaseOptimization';
import BackendPerformance from '@/components/sections/BackendPerformance';
import FrontendOptimization from '@/components/sections/FrontendOptimization';
import InfrastructureScaling from '@/components/sections/InfrastructureScaling';
import PerformanceAnalysis from '@/components/sections/PerformanceAnalysis';
import DatabaseSchema from '@/components/DatabaseSchema';
import ErrorAnalysis from '@/components/ErrorAnalysis';
import UsabilityTestingPlan from '@/components/UsabilityTestingPlan';
import Footer from '@/components/Footer';
import Navbar from "@/components/Navbar";

// Define the available sections
type Section = {
  id: string;
  title: string;
  component: React.ComponentType;
};

const Index = () => {
  // Define all available sections
  const sections: Section[] = [
    { id: 'performance-fundamentals', title: 'Performance Fundamentals', component: PerformanceFundamentals },
    { id: 'database-optimization', title: 'Database Optimization', component: DatabaseOptimization },
    { id: 'backend-performance', title: 'Backend Performance', component: BackendPerformance },
    { id: 'frontend-optimization', title: 'Frontend Optimization', component: FrontendOptimization },
    { id: 'infrastructure-scaling', title: 'Infrastructure & Scaling', component: InfrastructureScaling },
    { id: 'performance-analysis', title: 'Performance Analysis', component: PerformanceAnalysis },
    { id: 'database-schema', title: 'Database Schema', component: DatabaseSchema },
    { id: 'error-analysis', title: 'Error Analysis', component: ErrorAnalysis },
    { id: 'usability-testing', title: 'Usability Testing Plan', component: UsabilityTestingPlan },
  ];

  // Track the active section
  const [activeSection, setActiveSection] = useState('usability-testing');

  // Find the active section component
  const ActiveSectionComponent = sections.find(section => section.id === activeSection)?.component || PerformanceFundamentals;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar with navigation */}
          <div className="md:w-1/4">
            <SectionNavigation 
              sections={sections}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </div>
          
          {/* Main content area */}
          <div className="md:w-3/4 bg-white p-6 rounded-lg shadow-sm">
            <ActiveSectionComponent />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
