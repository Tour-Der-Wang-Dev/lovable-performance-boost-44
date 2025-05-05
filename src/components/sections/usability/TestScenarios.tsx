
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TestScenarios = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold mb-4">Test Scenarios</h3>
      
      <Card>
        <CardHeader>
          <CardTitle>Task List with Complexity Levels</CardTitle>
          <CardDescription>Structured scenarios organized by complexity and priority</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Complexity</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>User Path</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Create a new account</TableCell>
                <TableCell><Badge variant="outline" className="bg-green-50">Low</Badge></TableCell>
                <TableCell><Badge>High</Badge></TableCell>
                <TableCell>Homepage → Registration form → Confirmation</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Search for a specific item</TableCell>
                <TableCell><Badge variant="outline" className="bg-green-50">Low</Badge></TableCell>
                <TableCell><Badge>High</Badge></TableCell>
                <TableCell>Homepage → Search bar → Results page → Filter/refine</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Complete checkout process</TableCell>
                <TableCell><Badge variant="outline" className="bg-amber-50">Medium</Badge></TableCell>
                <TableCell><Badge>High</Badge></TableCell>
                <TableCell>Cart → Checkout → Address → Payment → Confirmation</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Configure advanced settings</TableCell>
                <TableCell><Badge variant="outline" className="bg-red-50">High</Badge></TableCell>
                <TableCell><Badge variant="outline">Medium</Badge></TableCell>
                <TableCell>Settings → Advanced tab → Configuration options</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Generate custom report</TableCell>
                <TableCell><Badge variant="outline" className="bg-red-50">High</Badge></TableCell>
                <TableCell><Badge variant="outline">Medium</Badge></TableCell>
                <TableCell>Dashboard → Reports → Custom → Configure → Export</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Success Criteria Per Task</CardTitle>
          <CardDescription>Clear definitions of what constitutes successful task completion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Account Creation</h4>
              <ul className="list-disc pl-5">
                <li>User completes form with valid information</li>
                <li>Receives confirmation email</li>
                <li>Can login with created credentials</li>
                <li>Time to complete: under 2 minutes</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Search Functionality</h4>
              <ul className="list-disc pl-5">
                <li>User finds specific item within first 3 search results</li>
                <li>Can refine search results using filters</li>
                <li>Time to complete: under 1 minute</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Checkout Process</h4>
              <ul className="list-disc pl-5">
                <li>User completes all checkout stages without assistance</li>
                <li>Shipping and payment information saved correctly</li>
                <li>Order confirmation displayed</li>
                <li>Time to complete: under 3 minutes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Time Estimations</CardTitle>
          <CardDescription>Expected completion times for each task</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Novice User</TableHead>
                <TableHead>Experienced User</TableHead>
                <TableHead>Max Allowable Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Create account</TableCell>
                <TableCell>2-3 minutes</TableCell>
                <TableCell>1-2 minutes</TableCell>
                <TableCell>5 minutes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Product search</TableCell>
                <TableCell>1-2 minutes</TableCell>
                <TableCell>30-45 seconds</TableCell>
                <TableCell>3 minutes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Checkout process</TableCell>
                <TableCell>3-5 minutes</TableCell>
                <TableCell>2-3 minutes</TableCell>
                <TableCell>7 minutes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Settings configuration</TableCell>
                <TableCell>5-7 minutes</TableCell>
                <TableCell>2-4 minutes</TableCell>
                <TableCell>10 minutes</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Required User Interactions</CardTitle>
          <CardDescription>Specific actions users need to perform during testing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Form Interactions</h4>
              <ul className="list-disc pl-5">
                <li>Text input completion</li>
                <li>Dropdown selection</li>
                <li>File upload</li>
                <li>Form validation error handling</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Navigation Patterns</h4>
              <ul className="list-disc pl-5">
                <li>Menu exploration</li>
                <li>Breadcrumb usage</li>
                <li>Tab switching</li>
                <li>Back button navigation</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Content Consumption</h4>
              <ul className="list-disc pl-5">
                <li>Reading documentation</li>
                <li>Watching instructional videos</li>
                <li>Interpreting data visualizations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Edge Cases to Consider</CardTitle>
          <CardDescription>Non-standard scenarios that should be tested</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Connection interruption during checkout</li>
            <li>Invalid payment information handling</li>
            <li>Out-of-stock items appearing in search results</li>
            <li>Form submission with maximum character limits</li>
            <li>Browser back/forward button usage during multi-step processes</li>
            <li>Extremely large data sets in reporting features</li>
            <li>Content display on unusually small or large screens</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestScenarios;
