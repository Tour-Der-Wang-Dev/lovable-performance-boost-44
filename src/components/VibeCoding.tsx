
import React, { useState } from 'react';
import CodeBlock from "@/components/CodeBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, Copy, CheckCircle } from "lucide-react";

const VibeCoding = () => {
  const [copied, setCopied] = useState('');
  
  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  const snippets = [
    {
      id: 'react-component',
      title: 'React Component',
      language: 'tsx',
      code: `import React from 'react';

const VibeComponent = () => {
  return (
    <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
      <h2 className="font-bold text-2xl mb-3">Good Vibes Only</h2>
      <p>Building with joy creates better products.</p>
    </div>
  );
};

export default VibeComponent;`
    },
    {
      id: 'tailwind-gradient',
      title: 'Tailwind Gradient',
      language: 'html',
      code: `<div class="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 rounded-xl shadow-lg">
  <h3 class="text-white text-xl font-medium">Ocean Vibes</h3>
  <p class="text-blue-50 mt-2">Calm, focused, and productive coding.</p>
  <button class="mt-4 px-4 py-2 bg-white bg-opacity-20 rounded-lg text-white backdrop-blur-sm 
    hover:bg-opacity-30 transition-all">Dive In</button>
</div>`
    },
    {
      id: 'animation',
      title: 'Animation',
      language: 'css',
      code: `.vibe-element {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
    box-shadow: 0 5px 15px 0px rgba(0,0,0,0.2);
  }
  50% {
    transform: translateY(-20px);
    box-shadow: 0 25px 15px 0px rgba(0,0,0,0.1);
  }
  100% {
    transform: translateY(0px);
    box-shadow: 0 5px 15px 0px rgba(0,0,0,0.2);
  }
}`
    }
  ];

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
        <h2 className="text-3xl font-bold mb-2">Vibe Coding</h2>
        <p className="text-lg opacity-90">Create beautiful interfaces with these vibrant code snippets.</p>
      </div>
      
      <Tabs defaultValue="react-component" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          {snippets.map(snippet => (
            <TabsTrigger key={snippet.id} value={snippet.id} className="text-sm">
              {snippet.title}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {snippets.map(snippet => (
          <TabsContent key={snippet.id} value={snippet.id} className="relative">
            <div className="absolute top-2 right-2 z-10">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleCopy(snippet.id, snippet.code)}
                className="h-8 w-8 p-0 rounded-full"
              >
                {copied === snippet.id ? 
                  <CheckCircle className="h-4 w-4 text-green-500" /> : 
                  <Copy className="h-4 w-4" />
                }
              </Button>
            </div>
            <CodeBlock 
              language={snippet.language} 
              title={snippet.title}
              code={snippet.code}
            />
            
            <div className="mt-6 p-4 border rounded-lg bg-background">
              <h3 className="text-lg font-medium mb-2">Try it out:</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Copy this snippet and integrate it into your project to add some vibes!
              </p>
              <Button size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Component
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Why Vibe Coding Works</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="bg-purple-100 text-purple-800 font-medium p-1 rounded mr-2">01</span>
              <span>Improves mood and creativity during development sessions</span>
            </li>
            <li className="flex items-start">
              <span className="bg-pink-100 text-pink-800 font-medium p-1 rounded mr-2">02</span>
              <span>Creates visually appealing interfaces that users love</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 font-medium p-1 rounded mr-2">03</span>
              <span>Makes your codebase more enjoyable to work with</span>
            </li>
          </ul>
        </div>
        
        <div className="p-6 rounded-lg border bg-gradient-to-br from-sky-400 to-blue-500 text-white">
          <h3 className="text-lg font-semibold mb-2">Get in the Flow</h3>
          <p className="mb-4 text-sm opacity-90">
            The right environment can transform your coding experience from mundane to inspired.
          </p>
          <div className="flex space-x-3">
            <div className="h-8 w-8 rounded-full bg-white bg-opacity-20 animate-pulse"></div>
            <div className="h-8 w-8 rounded-full bg-white bg-opacity-20 animate-pulse delay-150"></div>
            <div className="h-8 w-8 rounded-full bg-white bg-opacity-20 animate-pulse delay-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VibeCoding;
