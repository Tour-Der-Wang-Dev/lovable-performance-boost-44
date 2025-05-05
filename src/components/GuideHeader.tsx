
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const GuideHeader = () => {
  const { toast } = useToast();
  
  const handleDownloadPDF = () => {
    toast({
      title: "Download started",
      description: "The guide PDF is being prepared for download.",
    });
  };

  return (
    <header className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 md:p-10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Web Application Performance Optimization Guide
            </h1>
            <p className="text-lg opacity-90 max-w-2xl">
              A comprehensive, implementation-focused approach to optimizing performance across the entire stack, with measurable outcomes.
            </p>
          </div>
          
          <div className="flex items-center">
            <img 
              src="public/lovable-uploads/65b42630-b1ce-49ff-a7b0-9449081ef8ab.png"
              alt="Performance Optimization Logo" 
              className="h-20 mr-4 hidden md:block"
            />
            <Button 
              onClick={handleDownloadPDF} 
              variant="outline" 
              className="bg-white text-orange-600 hover:bg-orange-50"
            >
              Download PDF Guide
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GuideHeader;
