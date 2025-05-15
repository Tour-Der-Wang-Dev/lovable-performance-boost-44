
import { useState, useEffect } from "react";
import { useGitLabApi } from "@/hooks/useGitLabApi";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Search } from "lucide-react";
import { IssueFilterParams } from "@/services/gitlabService";

interface GitLabIssuesProps {
  apiToken: string;
  repoId: number;
}

export default function GitLabIssues({ apiToken, repoId }: GitLabIssuesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<IssueFilterParams>({
    state: "all",
    sort: "desc",
    order_by: "created_at"
  });
  const [labels, setLabels] = useState("");

  const { 
    issues,
    isLoading,
    error,
    fetchIssues
  } = useGitLabApi({ apiToken });

  useEffect(() => {
    if (apiToken && repoId) {
      const issueFilters = {
        ...filters,
        labels: labels || undefined
      };
      
      fetchIssues(repoId, { page: currentPage, per_page: 10 }, issueFilters);
    }
  }, [apiToken, repoId, currentPage]);

  const handleFilterChange = (filterName: keyof IssueFilterParams, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };
  
  const applyFilters = () => {
    const issueFilters = {
      ...filters,
      labels: labels || undefined
    };
    
    fetchIssues(repoId, { page: 1, per_page: 10 }, issueFilters);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Repository Issues</h2>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <h3 className="font-medium mb-3">Filter Issues</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={filters.state}
              onChange={(e) => handleFilterChange('state', e.target.value as "opened" | "closed" | "all")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="all">All</option>
              <option value="opened">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div>
            <Label htmlFor="sort">Sort Direction</Label>
            <select
              id="sort"
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value as "asc" | "desc")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
          <div>
            <Label htmlFor="order_by">Order By</Label>
            <select
              id="order_by"
              value={filters.order_by}
              onChange={(e) => handleFilterChange('order_by', e.target.value as "created_at" | "updated_at" | "priority")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="created_at">Created Date</option>
              <option value="updated_at">Updated Date</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div>
            <Label htmlFor="labels">Labels (comma separated)</Label>
            <div className="flex">
              <Input
                id="labels"
                value={labels}
                onChange={(e) => setLabels(e.target.value)}
                placeholder="bug,feature,documentation"
                className="flex-1 rounded-r-none"
              />
              <Button 
                onClick={applyFilters}
                className="rounded-l-none"
              >
                <Search size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-md mb-4">
          Error: {error.message}
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <Table>
            <TableCaption>Issues for repository ID: {repoId}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Labels</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Author</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issues.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No issues found with the selected filters.
                  </TableCell>
                </TableRow>
              ) : (
                issues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell className="font-medium">
                      <a href={issue.web_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {issue.title}
                      </a>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        issue.state === "opened" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {issue.state}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {issue.labels && issue.labels.length > 0 ? 
                          issue.labels.map((label, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {label}
                            </span>
                          )) : 
                          "-"
                        }
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(issue.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {issue.author.avatar_url && (
                          <img 
                            src={issue.author.avatar_url} 
                            alt={issue.author.name} 
                            className="w-6 h-6 rounded-full mr-2"
                          />
                        )}
                        {issue.author.name}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {issues.length > 0 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => {
                      if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                      }
                    }} 
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                <PaginationItem>
                  <PaginationLink isActive={true}>
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => {
                      setCurrentPage(currentPage + 1);
                    }} 
                    className="cursor-pointer"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}
