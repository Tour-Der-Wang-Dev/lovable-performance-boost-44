
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-orange-600">404</h1>
        <h2 className="text-3xl font-semibold mt-4 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          The performance optimization guide page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link to="/">
            Return to Guide
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
