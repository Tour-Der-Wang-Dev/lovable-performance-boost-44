
import { useState } from "react";
import { 
  GitLabService, 
  GitLabRepository, 
  GitLabIssue, 
  GitLabWebhook, 
  PaginationParams,
  IssueFilterParams
} from "@/services/gitlabService";
import { toast } from "@/hooks/use-toast";

interface UseGitLabApiProps {
  apiToken: string;
}

export function useGitLabApi({ apiToken }: UseGitLabApiProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Repositories
  const [repositories, setRepositories] = useState<GitLabRepository[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Issues
  const [issues, setIssues] = useState<GitLabIssue[]>([]);
  
  // Webhooks
  const [webhooks, setWebhooks] = useState<GitLabWebhook[]>([]);

  const fetchRepositories = async (pagination: PaginationParams = { page: 1, per_page: 10 }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const repos = await GitLabService.fetchRepositories(apiToken, pagination);
      setRepositories(repos);
      setCurrentPage(pagination.page);
      // We don't have total pages from the API response, estimate based on length
      if (repos.length < pagination.per_page) {
        setTotalPages(pagination.page);
      } else {
        setTotalPages(pagination.page + 1);
      }
      return repos;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch repositories'));
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const createRepository = async (name: string, description?: string, visibility: 'private' | 'internal' | 'public' = 'private') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newRepo = await GitLabService.createRepository(apiToken, name, description, visibility);
      toast({
        title: "Repository Created",
        description: `Successfully created repository ${name}`,
      });
      return newRepo;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create repository'));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateRepository = async (repoId: number, updates: { name?: string; description?: string; visibility?: string }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedRepo = await GitLabService.updateRepository(apiToken, repoId, updates);
      toast({
        title: "Repository Updated",
        description: `Successfully updated repository details`,
      });
      return updatedRepo;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update repository'));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRepository = async (repoId: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await GitLabService.deleteRepository(apiToken, repoId);
      if (success) {
        toast({
          title: "Repository Deleted",
          description: "Successfully deleted repository",
        });
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete repository'));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchIssues = async (repoId: number, pagination: PaginationParams = { page: 1, per_page: 10 }, filters?: IssueFilterParams) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const fetchedIssues = await GitLabService.fetchIssues(apiToken, repoId, pagination, filters);
      setIssues(fetchedIssues);
      return fetchedIssues;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch issues'));
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWebhooks = async (repoId: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const fetchedWebhooks = await GitLabService.fetchWebhooks(apiToken, repoId);
      setWebhooks(fetchedWebhooks);
      return fetchedWebhooks;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch webhooks'));
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const createWebhook = async (repoId: number, url: string, events: { 
    push_events?: boolean; 
    issues_events?: boolean; 
    merge_requests_events?: boolean; 
  }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newWebhook = await GitLabService.createWebhook(apiToken, repoId, url, events);
      toast({
        title: "Webhook Created",
        description: `Successfully created webhook for ${url}`,
      });
      return newWebhook;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create webhook'));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // State
    repositories,
    issues,
    webhooks,
    isLoading,
    error,
    currentPage,
    totalPages,
    
    // Actions
    fetchRepositories,
    createRepository,
    updateRepository,
    deleteRepository,
    fetchIssues,
    fetchWebhooks,
    createWebhook,
  };
}
