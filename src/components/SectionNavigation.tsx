
import React from 'react';
import { cn } from "@/lib/utils";

type Section = {
  id: string;
  title: string;
  component: React.ComponentType;
};

interface SectionNavigationProps {
  sections: Section[];
  activeSection: string;
  setActiveSection: (id: string) => void;
}

const SectionNavigation = ({ sections, activeSection, setActiveSection }: SectionNavigationProps) => {
  return (
    <nav className="bg-white rounded-lg shadow-md p-4 sticky top-4">
      <h2 className="text-lg font-bold mb-4 text-orange-600 border-b pb-2">
        Guide Sections
      </h2>
      
      <ul className="space-y-1">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-md transition-colors text-sm md:text-base",
                activeSection === section.id
                  ? "bg-orange-100 text-orange-700 font-medium"
                  : "hover:bg-gray-100 text-gray-700"
              )}
            >
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SectionNavigation;
