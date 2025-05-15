
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import GitLabRepositories from "./GitLabRepositories";
import GitLabIssues from "./GitLabIssues";
import GitLabWebhooks from "./GitLabWebhooks";

interface GitLabProps {
  apiToken?: string;
  repoId?: number;
}

export default function GitLab({ apiToken: initialToken, repoId: initialRepoId }: GitLabProps) {
  const [apiToken, setApiToken] = useState(initialToken || "");
  const [repoId, setRepoId] = useState(initialRepoId || 0);
  const [isConfigured, setIsConfigured] = useState(!!initialToken);
  const [activeTab, setActiveTab] = useState("repositories");
  
  const handleSetup = () => {
    if (apiToken) {
      setIsConfigured(true);
    }
  };

  if (!isConfigured) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">GitLab API Setup</h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="api-token">GitLab API Token</Label>
            <Input
              id="api-token"
              type="password"
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
              placeholder="Enter your GitLab API token"
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              You can create a personal access token in your GitLab account settings.
            </p>
          </div>
          
          <Button 
            onClick={handleSetup}
            disabled={!apiToken}
            className="w-full"
          >
            Connect to GitLab
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList className="grid grid-cols-3 w-[400px]">
            <TabsTrigger value="repositories">Repositories</TabsTrigger>
            <TabsTrigger 
              value="issues" 
              disabled={!repoId}
              title={!repoId ? "Select a repository first" : ""}
            >
              Issues
            </TabsTrigger>
            <TabsTrigger 
              value="webhooks"
              disabled={!repoId}
              title={!repoId ? "Select a repository first" : ""}
            >
              Webhooks
            </TabsTrigger>
          </TabsList>
          
          {activeTab !== "repositories" && (
            <div className="flex items-center">
              <Label htmlFor="repo-id" className="mr-2">Repository ID:</Label>
              <Input
                id="repo-id"
                type="number"
                value={repoId || ""}
                onChange={(e) => setRepoId(Number(e.target.value))}
                className="w-24"
              />
            </div>
          )}
        </div>
        
        <TabsContent value="repositories" className="mt-0">
          <GitLabRepositories apiToken={apiToken} />
        </TabsContent>
        
        <TabsContent value="issues" className="mt-0">
          {repoId ? (
            <GitLabIssues apiToken={apiToken} repoId={repoId} />
          ) : (
            <div className="text-center py-12">
              Please select a repository ID to view issues
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="webhooks" className="mt-0">
          {repoId ? (
            <GitLabWebhooks apiToken={apiToken} repoId={repoId} />
          ) : (
            <div className="text-center py-12">
              Please select a repository ID to manage webhooks
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
