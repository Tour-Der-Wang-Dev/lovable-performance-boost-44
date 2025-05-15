
import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { GitBranch, GitFork, Plus, Edit, Trash2 } from "lucide-react";
import { GitLabRepository } from "@/services/gitlabService";

interface GitLabRepositoriesProps {
  apiToken: string;
}

export default function GitLabRepositories({ apiToken }: GitLabRepositoriesProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<GitLabRepository | null>(null);
  const [newRepo, setNewRepo] = useState({
    name: "",
    description: "",
    visibility: "private" as "private" | "internal" | "public",
  });

  const { 
    repositories,
    isLoading,
    error,
    currentPage,
    totalPages,
    fetchRepositories,
    createRepository,
    updateRepository,
    deleteRepository 
  } = useGitLabApi({ apiToken });

  // Form handlers
  const handleCreateRepo = async () => {
    if (newRepo.name) {
      await createRepository(newRepo.name, newRepo.description, newRepo.visibility);
      setNewRepo({ name: "", description: "", visibility: "private" });
      fetchRepositories({ page: currentPage, per_page: 10 });
    }
  };

  const handleUpdateRepo = async () => {
    if (selectedRepo) {
      await updateRepository(selectedRepo.id, {
        name: newRepo.name,
        description: newRepo.description,
        visibility: newRepo.visibility
      });
      setSelectedRepo(null);
      fetchRepositories({ page: currentPage, per_page: 10 });
    }
  };

  const handleDeleteRepo = async () => {
    if (selectedRepo) {
      await deleteRepository(selectedRepo.id);
      setIsDeleteDialogOpen(false);
      setSelectedRepo(null);
      fetchRepositories({ page: currentPage, per_page: 10 });
    }
  };

  const openEditDialog = (repo: GitLabRepository) => {
    setSelectedRepo(repo);
    setNewRepo({
      name: repo.name,
      description: repo.description || "",
      visibility: repo.visibility as "private" | "internal" | "public",
    });
  };

  const openDeleteDialog = (repo: GitLabRepository) => {
    setSelectedRepo(repo);
    setIsDeleteDialogOpen(true);
  };

  // Load repositories on component mount
  if (repositories.length === 0 && !isLoading && !error) {
    fetchRepositories();
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">GitLab Repositories</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus size={16} className="mr-2" />
              New Repository
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Repository</DialogTitle>
              <DialogDescription>
                Enter details for your new GitLab repository.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Repository Name</Label>
                <Input
                  id="name"
                  value={newRepo.name}
                  onChange={(e) => setNewRepo({ ...newRepo, name: e.target.value })}
                  placeholder="my-new-repo"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newRepo.description}
                  onChange={(e) => setNewRepo({ ...newRepo, description: e.target.value })}
                  placeholder="Repository description"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="visibility">Visibility</Label>
                <select
                  id="visibility"
                  value={newRepo.visibility}
                  onChange={(e) => setNewRepo({ ...newRepo, visibility: e.target.value as "private" | "internal" | "public" })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="private">Private</option>
                  <option value="internal">Internal</option>
                  <option value="public">Public</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateRepo} disabled={!newRepo.name || isLoading}>
                {isLoading ? "Creating..." : "Create Repository"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
            <TableCaption>Your GitLab repositories list</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {repositories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No repositories found. Create your first repository!
                  </TableCell>
                </TableRow>
              ) : (
                repositories.map((repo) => (
                  <TableRow key={repo.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <GitBranch size={16} className="mr-2" />
                        <a href={repo.web_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {repo.name}
                        </a>
                      </div>
                    </TableCell>
                    <TableCell>{repo.description || "-"}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        repo.visibility === "private" 
                          ? "bg-red-100 text-red-800" 
                          : repo.visibility === "internal" 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-green-100 text-green-800"
                      }`}>
                        {repo.visibility}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(repo.last_activity_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => openEditDialog(repo)}>
                            <Edit size={16} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Repository</DialogTitle>
                            <DialogDescription>
                              Update the details of {selectedRepo?.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="edit-name">Repository Name</Label>
                              <Input
                                id="edit-name"
                                value={newRepo.name}
                                onChange={(e) => setNewRepo({ ...newRepo, name: e.target.value })}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-description">Description</Label>
                              <Input
                                id="edit-description"
                                value={newRepo.description}
                                onChange={(e) => setNewRepo({ ...newRepo, description: e.target.value })}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-visibility">Visibility</Label>
                              <select
                                id="edit-visibility"
                                value={newRepo.visibility}
                                onChange={(e) => setNewRepo({ ...newRepo, visibility: e.target.value as "private" | "internal" | "public" })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <option value="private">Private</option>
                                <option value="internal">Internal</option>
                                <option value="public">Public</option>
                              </select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={handleUpdateRepo} disabled={isLoading}>
                              {isLoading ? "Updating..." : "Save Changes"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => openDeleteDialog(repo)}>
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {repositories.length > 0 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => fetchRepositories({ page: Math.max(currentPage - 1, 1), per_page: 10 })} 
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === currentPage}
                      onClick={() => fetchRepositories({ page, per_page: 10 })}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => fetchRepositories({ page: currentPage + 1, per_page: 10 })} 
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}

      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Repository</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedRepo?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteRepo}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
