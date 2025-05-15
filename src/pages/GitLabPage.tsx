
import { useState } from 'react';
import GitLab from '@/components/GitLab';
import Navbar from '@/components/Navbar';
import { toast } from '@/hooks/use-toast';

export default function GitLabPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto py-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-8">GitLab Integration</h1>
          
          <GitLab />
        </div>
      </main>
      
      <footer className="bg-white border-t p-4 text-center text-sm text-gray-500">
        GitLab API Integration with TypeScript, React, and Tailwind CSS
      </footer>
    </div>
  );
}
