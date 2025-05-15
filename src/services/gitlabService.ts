
import { toast } from "@/hooks/use-toast";

// Define types for GitLab API responses
export interface GitLabRepository {
  id: number;
  name: string;
  description: string | null;
  web_url: string;
  visibility: string;
  created_at: string;
  last_activity_at: string;
}

export interface GitLabIssue {
  id: number;
  iid: number;
  title: string;
  description: string | null;
  state: string;
  created_at: string;
  updated_at: string;
  web_url: string;
  author: {
    id: number;
    name: string;
    avatar_url: string | null;
  };
  labels: string[];
}

export interface GitLabWebhook {
  id: number;
  url: string;
  created_at: string;
  push_events: boolean;
  issues_events: boolean;
  merge_requests_events: boolean;
}

export interface PaginationParams {
  page: number;
  per_page: number;
}

export interface IssueFilterParams {
  state?: 'opened' | 'closed' | 'all';
  labels?: string;
  sort?: 'asc' | 'desc';
  order_by?: 'created_at' | 'updated_at' | 'priority';
}

const GITLAB_API_URL = 'https://gitlab.com/api/v4';

// Helper function to validate token before making requests
const validateToken = (token: string): boolean => {
  return token && token.length > 0;
};

// Helper function to handle API errors
const handleApiError = (error: any): never => {
  console.error('GitLab API Error:', error);
  
  if (error.response) {
    const { status } = error.response;
    
    if (status === 401) {
      toast({
        title: "Authentication Error",
        description: "Invalid or expired GitLab API token. Please check your credentials.",
        variant: "destructive",
      });
      throw new Error('Unauthorized: Invalid or expired GitLab API token');
    } else if (status === 500) {
      toast({
        title: "Server Error",
        description: "GitLab server encountered an error. Please try again later.",
        variant: "destructive",
      });
      throw new Error('Internal Server Error: GitLab server issue');
    } else {
      toast({
        title: "API Error",
        description: `GitLab API error: ${error.response.data?.message || 'Unknown error'}`,
        variant: "destructive",
      });
      throw new Error(`GitLab API error: ${error.response.data?.message || 'Unknown error'}`);
    }
  }
  
  toast({
    title: "Connection Error",
    description: "Failed to connect to GitLab. Please check your network connection.",
    variant: "destructive",
  });
  throw new Error('Network error: Failed to connect to GitLab API');
};

// GitLab API Service
export const GitLabService = {
  // Repositories
  fetchRepositories: async (token: string, { page = 1, per_page = 10 }: PaginationParams): Promise<GitLabRepository[]> => {
    if (!validateToken(token)) throw new Error('Invalid GitLab API token');
    
    try {
      const response = await fetch(`${GITLAB_API_URL}/projects?page=${page}&per_page=${per_page}&membership=true&order_by=updated_at`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const error = { response: { status: response.status, data: await response.json() } };
        return handleApiError(error);
      }
      
      return await response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  createRepository: async (token: string, name: string, description?: string, visibility: 'private' | 'internal' | 'public' = 'private'): Promise<GitLabRepository> => {
    if (!validateToken(token)) throw new Error('Invalid GitLab API token');
    
    try {
      const response = await fetch(`${GITLAB_API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          description,
          visibility
        })
      });
      
      if (!response.ok) {
        const error = { response: { status: response.status, data: await response.json() } };
        return handleApiError(error);
      }
      
      return await response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  updateRepository: async (token: string, repoId: number, updates: { name?: string; description?: string; visibility?: string }): Promise<GitLabRepository> => {
    if (!validateToken(token)) throw new Error('Invalid GitLab API token');
    
    try {
      const response = await fetch(`${GITLAB_API_URL}/projects/${repoId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });
      
      if (!response.ok) {
        const error = { response: { status: response.status, data: await response.json() } };
        return handleApiError(error);
      }
      
      return await response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  deleteRepository: async (token: string, repoId: number): Promise<boolean> => {
    if (!validateToken(token)) throw new Error('Invalid GitLab API token');
    
    try {
      const response = await fetch(`${GITLAB_API_URL}/projects/${repoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const error = { response: { status: response.status, data: await response.json() } };
        return handleApiError(error);
      }
      
      return true;
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  // Issues
  fetchIssues: async (token: string, repoId: number, pagination: PaginationParams, filters?: IssueFilterParams): Promise<GitLabIssue[]> => {
    if (!validateToken(token)) throw new Error('Invalid GitLab API token');
    
    try {
      let url = `${GITLAB_API_URL}/projects/${repoId}/issues?page=${pagination.page}&per_page=${pagination.per_page}`;
      
      if (filters) {
        if (filters.state) url += `&state=${filters.state}`;
        if (filters.labels) url += `&labels=${filters.labels}`;
        if (filters.sort) url += `&sort=${filters.sort}`;
        if (filters.order_by) url += `&order_by=${filters.order_by}`;
      }
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const error = { response: { status: response.status, data: await response.json() } };
        return handleApiError(error);
      }
      
      return await response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  // Webhooks
  fetchWebhooks: async (token: string, repoId: number): Promise<GitLabWebhook[]> => {
    if (!validateToken(token)) throw new Error('Invalid GitLab API token');
    
    try {
      const response = await fetch(`${GITLAB_API_URL}/projects/${repoId}/hooks`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const error = { response: { status: response.status, data: await response.json() } };
        return handleApiError(error);
      }
      
      return await response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  createWebhook: async (token: string, repoId: number, url: string, events: { 
    push_events?: boolean; 
    issues_events?: boolean; 
    merge_requests_events?: boolean; 
  }): Promise<GitLabWebhook> => {
    if (!validateToken(token)) throw new Error('Invalid GitLab API token');
    
    try {
      const response = await fetch(`${GITLAB_API_URL}/projects/${repoId}/hooks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url,
          ...events
        })
      });
      
      if (!response.ok) {
        const error = { response: { status: response.status, data: await response.json() } };
        return handleApiError(error);
      }
      
      return await response.json();
    } catch (error) {
      return handleApiError(error);
    }
  }
};
