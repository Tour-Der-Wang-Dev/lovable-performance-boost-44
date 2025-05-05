
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  description?: string;
}

const CodeBlock = ({ code, language, title, description }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Code copied to clipboard!");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="my-4 bg-gray-50 rounded-lg border overflow-hidden">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b">
          <div className="font-medium text-sm text-gray-700">{title}</div>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 text-xs"
          >
            {copied ? "Copied!" : "Copy code"}
          </Button>
        </div>
      )}
      
      <pre className="p-4 overflow-x-auto text-sm">
        <code className={`language-${language}`}>
          {code}
        </code>
      </pre>
      
      {description && (
        <div className="px-4 py-2 text-sm text-gray-600 border-t bg-gray-50">
          {description}
        </div>
      )}
    </div>
  );
};

export default CodeBlock;
