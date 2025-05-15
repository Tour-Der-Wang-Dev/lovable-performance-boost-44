
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
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Webhook } from "lucide-react";

interface GitLabWebhooksProps {
  apiToken: string;
  repoId: number;
}

export default function GitLabWebhooks({ apiToken, repoId }: GitLabWebhooksProps) {
  const [newWebhook, setNewWebhook] = useState({
    url: "",
    push_events: true,
    issues_events: false,
    merge_requests_events: false,
  });

  const { 
    webhooks,
    isLoading,
    error,
    fetchWebhooks,
    createWebhook
  } = useGitLabApi({ apiToken });

  useEffect(() => {
    if (apiToken && repoId) {
      fetchWebhooks(repoId);
    }
  }, [apiToken, repoId]);

  const handleCreateWebhook = async () => {
    if (newWebhook.url) {
      await createWebhook(repoId, newWebhook.url, {
        push_events: newWebhook.push_events,
        issues_events: newWebhook.issues_events,
        merge_requests_events: newWebhook.merge_requests_events
      });
      
      setNewWebhook({
        url: "",
        push_events: true,
        issues_events: false,
        merge_requests_events: false,
      });
      
      fetchWebhooks(repoId);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Repository Webhooks</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus size={16} className="mr-2" />
              New Webhook
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Webhook</DialogTitle>
              <DialogDescription>
                Create a new webhook to integrate with external services.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="url">Webhook URL</Label>
                <Input
                  id="url"
                  value={newWebhook.url}
                  onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
                  placeholder="https://example.com/webhook"
                />
              </div>
              <div className="space-y-2">
                <Label>Trigger Events</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="push"
                    checked={newWebhook.push_events}
                    onCheckedChange={(checked) => 
                      setNewWebhook({ ...newWebhook, push_events: checked === true })
                    }
                  />
                  <Label htmlFor="push" className="cursor-pointer">Push events</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="issues"
                    checked={newWebhook.issues_events}
                    onCheckedChange={(checked) => 
                      setNewWebhook({ ...newWebhook, issues_events: checked === true })
                    }
                  />
                  <Label htmlFor="issues" className="cursor-pointer">Issue events</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="merge"
                    checked={newWebhook.merge_requests_events}
                    onCheckedChange={(checked) => 
                      setNewWebhook({ ...newWebhook, merge_requests_events: checked === true })
                    }
                  />
                  <Label htmlFor="merge" className="cursor-pointer">Merge request events</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateWebhook} disabled={!newWebhook.url || isLoading}>
                {isLoading ? "Creating..." : "Create Webhook"}
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
            <TableCaption>Webhooks for repository ID: {repoId}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Events</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {webhooks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8">
                    No webhooks configured for this repository.
                  </TableCell>
                </TableRow>
              ) : (
                webhooks.map((webhook) => (
                  <TableRow key={webhook.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Webhook size={16} className="mr-2" />
                        {webhook.url}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(webhook.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {webhook.push_events && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Push</span>
                        )}
                        {webhook.issues_events && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Issues</span>
                        )}
                        {webhook.merge_requests_events && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Merge Requests</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
}
