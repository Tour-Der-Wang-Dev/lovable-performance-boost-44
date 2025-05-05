
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="mt-12 pt-8 pb-12 border-t">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold mb-2 text-orange-600">Web Application Performance Guide</h2>
            <p className="text-gray-600">Implementation-focused strategies for performance optimization</p>
          </div>
          
          <div className="flex gap-4">
            <Button variant="outline" className="text-sm">
              Request Custom Optimization
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700 text-sm">
              Schedule Consultation
            </Button>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 Lovable.dev - All rights reserved</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-orange-600">Terms</a>
            <a href="#" className="hover:text-orange-600">Privacy</a>
            <a href="#" className="hover:text-orange-600">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
