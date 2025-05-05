
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const UsabilityTestingPlan = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-orange-600">Usability Testing Plan</h1>
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Web Application Performance Optimization Guide</h2>
        <p className="text-gray-600">Version 1.0 | May 5, 2025</p>
      </div>

      <Tabs defaultValue="project-context" className="mb-8">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="project-context">Project Context</TabsTrigger>
          <TabsTrigger value="test-environment">Environment</TabsTrigger>
          <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
          <TabsTrigger value="test-design">Test Design</TabsTrigger>
          <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
        </TabsList>
        
        <TabsContent value="project-context" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
              <CardDescription>Essential context for the usability testing initiative</CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className="font-semibold text-gray-700">Project Name</dt>
                  <dd className="mt-1 text-gray-600">Web Application Performance Optimization Guide</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-700">Project Lead</dt>
                  <dd className="mt-1 text-gray-600">Alex Morgan, Performance Engineering Lead</dd>
                </div>
                <div className="md:col-span-2">
                  <dt className="font-semibold text-gray-700">Description</dt>
                  <dd className="mt-1 text-gray-600">
                    A comprehensive, implementation-focused guide to optimizing web application performance across the entire stack. 
                    The guide covers frontend optimization, database tuning, backend performance, and infrastructure scaling.
                  </dd>
                </div>
                <div className="md:col-span-2">
                  <dt className="font-semibold text-gray-700">Testing Timeline</dt>
                  <dd className="mt-1 text-gray-600">
                    <ul className="list-disc pl-5">
                      <li>Preparation: May 10-15, 2025</li>
                      <li>Participant Recruitment: May 16-23, 2025</li>
                      <li>Testing Sessions: May 26-June 6, 2025</li>
                      <li>Analysis & Reporting: June 9-13, 2025</li>
                    </ul>
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>User Personas</CardTitle>
              <CardDescription>Target users for the performance optimization guide</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h4 className="font-semibold text-lg mb-2">Frontend Developer</h4>
                  <p className="mb-2 text-gray-700">Mid-level web developers focused on JavaScript frameworks and UI optimization.</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">React</Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">3-5 years experience</Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Performance-focused</Badge>
                  </div>
                </div>
                
                <div className="border-b pb-4">
                  <h4 className="font-semibold text-lg mb-2">Backend Engineer</h4>
                  <p className="mb-2 text-gray-700">Server-side developers working with Node.js/Express and database optimization.</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Node.js</Badge>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">PostgreSQL</Badge>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">API Design</Badge>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg mb-2">DevOps Specialist</h4>
                  <p className="mb-2 text-gray-700">Infrastructure and deployment specialists responsible for system reliability and scalability.</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Cloud Services</Badge>
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">CI/CD</Badge>
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Monitoring</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Key User Journeys</CardTitle>
              <CardDescription>Critical paths users will take through the guide</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Journey 1: Performance Diagnostics</h4>
                  <p className="text-gray-700 mb-2">
                    Users identify performance issues in their application and use the guide to diagnose root causes.
                  </p>
                  <ol className="list-decimal pl-5 text-gray-600">
                    <li>Review performance fundamentals section</li>
                    <li>Understand core metrics and their impact</li>
                    <li>Navigate to relevant specialized section (frontend, database, etc.)</li>
                    <li>Follow diagnostic procedures to identify bottlenecks</li>
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Journey 2: Implementation of Specific Optimizations</h4>
                  <p className="text-gray-700 mb-2">
                    Users with known performance issues seeking specific optimization techniques.
                  </p>
                  <ol className="list-decimal pl-5 text-gray-600">
                    <li>Navigate directly to relevant section</li>
                    <li>Find specific code example or configuration</li>
                    <li>Understand implementation requirements</li>
                    <li>Adapt solution to their specific codebase</li>
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Journey 3: Educational Exploration</h4>
                  <p className="text-gray-700 mb-2">
                    Users seeking to improve their general knowledge about performance optimization.
                  </p>
                  <ol className="list-decimal pl-5 text-gray-600">
                    <li>Start with performance fundamentals</li>
                    <li>Progress through each section in order</li>
                    <li>Review case studies and examples</li>
                    <li>Reference implementation strategies</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Business Objectives</CardTitle>
              <CardDescription>Goals and success metrics for the guide</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">Primary Objectives</h4>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Enable developers to implement performance optimizations that yield measurable improvements</li>
                    <li>Establish industry leadership in web application performance expertise</li>
                    <li>Drive adoption of performance optimization as a standard development practice</li>
                    <li>Reduce support inquiries related to application performance issues</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-1">Success Metrics</h4>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>90% of test participants can successfully implement at least one optimization technique</li>
                    <li>Average task completion rate of 85% or higher across all test scenarios</li>
                    <li>User satisfaction rating of 4.2/5 or higher</li>
                    <li>Average time-to-implementation reduced by 50% compared to current documentation</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-1">Known Usability Concerns</h4>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Technical complexity may overwhelm less experienced developers</li>
                    <li>Navigation between related topics across different sections may be challenging</li>
                    <li>Code examples may not be immediately applicable to all frameworks/languages</li>
                    <li>Finding specific optimization techniques quickly within comprehensive content</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="test-environment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Testing Environment Setup</CardTitle>
              <CardDescription>Hardware, software, and configurations needed for testing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Hardware Requirements</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Component</TableHead>
                        <TableHead>Minimum Specification</TableHead>
                        <TableHead>Recommended Specification</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Computer</TableCell>
                        <TableCell>Modern laptop with 8GB RAM</TableCell>
                        <TableCell>Development workstation with 16GB+ RAM</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Display</TableCell>
                        <TableCell>1080p resolution</TableCell>
                        <TableCell>1440p or higher, dual monitors</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Internet</TableCell>
                        <TableCell>Stable broadband connection (25+ Mbps)</TableCell>
                        <TableCell>High-speed fiber connection (100+ Mbps)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Recording</TableCell>
                        <TableCell>Built-in webcam and microphone</TableCell>
                        <TableCell>HD webcam, professional microphone</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Software Environment</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Component</TableHead>
                        <TableHead>Required</TableHead>
                        <TableHead>Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Operating System</TableCell>
                        <TableCell>Windows 10/11, macOS 12+, or Ubuntu 20.04+</TableCell>
                        <TableCell>Cross-platform testing required</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Browsers</TableCell>
                        <TableCell>Chrome, Firefox, Safari, Edge (latest versions)</TableCell>
                        <TableCell>Emphasis on Chrome Developer Tools usage</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Development Tools</TableCell>
                        <TableCell>VS Code, Node.js (v16+), npm/yarn</TableCell>
                        <TableCell>Pre-installed extensions for React, PostgreSQL</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Database</TableCell>
                        <TableCell>PostgreSQL 14+</TableCell>
                        <TableCell>With sample database for optimization testing</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Test Data Requirements</h4>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li><span className="font-medium">Sample Application:</span> Pre-configured React application with performance issues</li>
                    <li><span className="font-medium">Database:</span> PostgreSQL database with 1M+ records for query optimization testing</li>
                    <li><span className="font-medium">API Endpoints:</span> Mock server with intentionally unoptimized endpoints</li>
                    <li><span className="font-medium">User Accounts:</span> Test accounts with different permission levels</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Testing Tools</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-1">Recording & Analysis</h5>
                      <ul className="list-disc pl-5 text-gray-700">
                        <li>Zoom (for remote session recording)</li>
                        <li>Lighthouse (performance auditing)</li>
                        <li>React Profiler (component profiling)</li>
                        <li>Chrome DevTools (network analysis)</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-1">Observation & Notes</h5>
                      <ul className="list-disc pl-5 text-gray-700">
                        <li>Miro (collaborative observation)</li>
                        <li>Maze (remote usability testing)</li>
                        <li>Google Forms (survey collection)</li>
                        <li>Notion (testing notes and collaboration)</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Security & Privacy Considerations</h4>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>All test environments use sanitized, non-production data</li>
                    <li>Participants must sign NDAs before accessing any proprietary code or techniques</li>
                    <li>Recording consent forms required for all session recordings</li>
                    <li>Test environments isolated from production networks</li>
                    <li>Personally identifiable information (PII) removed from all test databases</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recruitment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Participant Recruitment</CardTitle>
              <CardDescription>Selection criteria and recruitment strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Participant Requirements</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User Group</TableHead>
                        <TableHead>Target Count</TableHead>
                        <TableHead>Required Experience</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Frontend Developers</TableCell>
                        <TableCell>6 participants</TableCell>
                        <TableCell>3+ years React experience, performance optimization interest</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Backend Engineers</TableCell>
                        <TableCell>5 participants</TableCell>
                        <TableCell>2+ years Node.js experience, database optimization familiarity</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>DevOps Specialists</TableCell>
                        <TableCell>4 participants</TableCell>
                        <TableCell>2+ years infrastructure experience, performance monitoring knowledge</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Full-Stack Developers</TableCell>
                        <TableCell>3 participants</TableCell>
                        <TableCell>3+ years experience across frontend and backend technologies</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Screening Criteria</h4>
                    <p className="text-gray-700 mb-3">Participants must meet these requirements:</p>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Professional experience in relevant role</li>
                      <li>Familiarity with web application performance concepts</li>
                      <li>Experience implementing at least one optimization technique</li>
                      <li>Currently working on projects where performance is relevant</li>
                      <li>Ability to read and adapt code examples</li>
                      <li>Willingness to think aloud during testing</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Diversity & Inclusion</h4>
                    <p className="text-gray-700 mb-3">Recruitment will prioritize diversity across:</p>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Professional background (agency, in-house, freelance)</li>
                      <li>Experience levels (mid-level to senior)</li>
                      <li>Industry sectors (fintech, e-commerce, healthcare, etc.)</li>
                      <li>Gender and ethnic representation</li>
                      <li>Geographic distribution (for remote testing)</li>
                      <li>Company sizes (startups to enterprises)</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Recruitment Methods</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="border rounded p-3">
                      <h5 className="font-medium mb-1">Internal Network</h5>
                      <ul className="list-disc pl-5 text-sm text-gray-700">
                        <li>Partner engineering teams</li>
                        <li>Previous user research participants</li>
                        <li>Community forum members</li>
                        <li>Workshop attendees</li>
                      </ul>
                    </div>
                    <div className="border rounded p-3">
                      <h5 className="font-medium mb-1">External Sources</h5>
                      <ul className="list-disc pl-5 text-sm text-gray-700">
                        <li>Developer community groups</li>
                        <li>Tech meetup participants</li>
                        <li>Social media outreach</li>
                        <li>Professional networks</li>
                      </ul>
                    </div>
                    <div className="border rounded p-3">
                      <h5 className="font-medium mb-1">Specialized Platforms</h5>
                      <ul className="list-disc pl-5 text-sm text-gray-700">
                        <li>User testing recruitment services</li>
                        <li>Developer forums and communities</li>
                        <li>Professional user research panels</li>
                        <li>Tech conference networks</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Participant Compensation</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Test Type</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Compensation</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Remote guided session</TableCell>
                        <TableCell>60 minutes</TableCell>
                        <TableCell>$150 gift card or equivalent</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>In-person guided session</TableCell>
                        <TableCell>90 minutes</TableCell>
                        <TableCell>$200 gift card or equivalent</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Extended implementation session</TableCell>
                        <TableCell>120 minutes</TableCell>
                        <TableCell>$250 gift card or equivalent</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Follow-up interview</TableCell>
                        <TableCell>30 minutes</TableCell>
                        <TableCell>$50 gift card or equivalent</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <p className="text-sm text-gray-600 mt-2">
                    Participants can alternatively choose to have equivalent donations made to tech education nonprofits.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="test-design" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Test Design & Methodology</CardTitle>
              <CardDescription>Task scenarios, testing procedures, and measurement framework</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Task Scenarios</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Task ID</TableHead>
                        <TableHead>Scenario Description</TableHead>
                        <TableHead>Complexity</TableHead>
                        <TableHead>Est. Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>T1</TableCell>
                        <TableCell>Find a solution for slow-loading product images in an e-commerce app</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Low</Badge>
                        </TableCell>
                        <TableCell>5 min</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>T2</TableCell>
                        <TableCell>Implement code splitting on a React application using an example from the guide</TableCell>
                        <TableCell>
                          <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                        </TableCell>
                        <TableCell>12 min</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>T3</TableCell>
                        <TableCell>Optimize a slow database query using the techniques in the Database section</TableCell>
                        <TableCell>
                          <Badge className="bg-red-100 text-red-800">High</Badge>
                        </TableCell>
                        <TableCell>15 min</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>T4</TableCell>
                        <TableCell>Configure a Redis caching solution based on the Backend Performance section</TableCell>
                        <TableCell>
                          <Badge className="bg-red-100 text-red-800">High</Badge>
                        </TableCell>
                        <TableCell>18 min</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>T5</TableCell>
                        <TableCell>Set up a basic NGINX load balancing configuration using the guide examples</TableCell>
                        <TableCell>
                          <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                        </TableCell>
                        <TableCell>15 min</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>T6</TableCell>
                        <TableCell>Analyze error reports to identify performance bottlenecks in a sample application</TableCell>
                        <TableCell>
                          <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                        </TableCell>
                        <TableCell>10 min</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Success Criteria</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Task ID</TableHead>
                        <TableHead>Success Criteria</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>T1</TableCell>
                        <TableCell>
                          <ul className="list-disc pl-5">
                            <li>Identify at least two image optimization techniques from the guide</li>
                            <li>Explain which technique would be most appropriate for the scenario</li>
                          </ul>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>T2</TableCell>
                        <TableCell>
                          <ul className="list-disc pl-5">
                            <li>Successfully implement React.lazy() with dynamic imports</li>
                            <li>Successfully implement a loading state component</li>
                            <li>Verify implementation reduces initial bundle size</li>
                          </ul>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>T3</TableCell>
                        <TableCell>
                          <ul className="list-disc pl-5">
                            <li>Correctly identify the performance issue in the provided query</li>
                            <li>Create appropriate index(es) for the query</li>
                            <li>Rewrite the query using optimization techniques from the guide</li>
                            <li>Achieve at least 40% performance improvement</li>
                          </ul>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>T4</TableCell>
                        <TableCell>
                          <ul className="list-disc pl-5">
                            <li>Set up Redis cache service based on the example</li>
                            <li>Implement the getOrSet caching pattern</li>
                            <li>Configure appropriate TTL values</li>
                            <li>Implement cache invalidation for modified data</li>
                          </ul>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>T5</TableCell>
                        <TableCell>
                          <ul className="list-disc pl-5">
                            <li>Configure NGINX with at least 2 upstream servers</li>
                            <li>Implement health checks and failure detection</li>
                            <li>Configure appropriate caching headers</li>
                          </ul>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>T6</TableCell>
                        <TableCell>
                          <ul className="list-disc pl-5">
                            <li>Correctly identify at least 3 performance issues from the error logs</li>
                            <li>Prioritize the issues by impact</li>
                            <li>Suggest appropriate solutions from the guide</li>
                          </ul>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Testing Methodology</h4>
                  <div className="space-y-4">
                    <div className="border-b pb-3">
                      <h5 className="font-medium mb-1">Moderated Testing Procedure</h5>
                      <ol className="list-decimal pl-5 text-gray-700">
                        <li>Welcome participant and explain session goals (5 min)</li>
                        <li>Collect background information and experience level (5 min)</li>
                        <li>Introduce the Performance Optimization Guide (3 min)</li>
                        <li>Allow participant to freely explore the guide (5 min)</li>
                        <li>Present task scenarios one at a time (5-18 min each)</li>
                        <li>Encourage think-aloud during task completion</li>
                        <li>Collect feedback after each task completion</li>
                        <li>Conduct post-test interview and collect overall feedback (10 min)</li>
                      </ol>
                    </div>
                    
                    <div className="border-b pb-3">
                      <h5 className="font-medium mb-1">Data Collection Methods</h5>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h6 className="font-medium">Quantitative Data</h6>
                          <ul className="list-disc pl-5 text-gray-700">
                            <li>Task completion rates (success/partial/failure)</li>
                            <li>Time-on-task measurements</li>
                            <li>Error frequency and types</li>
                            <li>Page navigation paths and frequency</li>
                            <li>System Usability Scale (SUS) scores</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium">Qualitative Data</h6>
                          <ul className="list-disc pl-5 text-gray-700">
                            <li>Think-aloud observations</li>
                            <li>Verbal feedback during tasks</li>
                            <li>Observed points of confusion</li>
                            <li>Post-task interview responses</li>
                            <li>Suggestions for improvement</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-1">Remote Testing Specifications</h5>
                      <ul className="list-disc pl-5 text-gray-700">
                        <li><span className="font-medium">Video Conferencing:</span> Zoom with screen sharing enabled</li>
                        <li><span className="font-medium">Recording:</span> Full session recording with participant permission</li>
                        <li><span className="font-medium">Environment Access:</span> Temporary development environment with pre-installed tools</li>
                        <li><span className="font-medium">Collaboration:</span> Shared editor access for implementing examples</li>
                        <li><span className="font-medium">Troubleshooting:</span> Technical support person on standby for environment issues</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Measurement Framework</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-2">Quantitative Metrics</h5>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Metric</TableHead>
                            <TableHead>Target</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Task Success Rate</TableCell>
                            <TableCell>≥ 85%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Time on Task</TableCell>
                            <TableCell>≤ 120% of estimated time</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Error Rate</TableCell>
                            <TableCell>≤ 2 errors per task</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>SUS Score</TableCell>
                            <TableCell>≥ 80/100</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Task Difficulty Rating</TableCell>
                            <TableCell>≤ 3/7 (7-point scale)</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Qualitative Assessment Areas</h5>
                      <ul className="space-y-3 text-gray-700">
                        <li>
                          <span className="font-medium">Information Architecture:</span>
                          <p className="text-sm mt-1">How easily can users locate relevant information within the guide structure?</p>
                        </li>
                        <li>
                          <span className="font-medium">Technical Comprehension:</span>
                          <p className="text-sm mt-1">Do users understand the concepts and implementation details presented?</p>
                        </li>
                        <li>
                          <span className="font-medium">Implementation Confidence:</span>
                          <p className="text-sm mt-1">How confident do users feel about applying the techniques in their own projects?</p>
                        </li>
                        <li>
                          <span className="font-medium">Pain Points:</span>
                          <p className="text-sm mt-1">What specific sections or concepts cause confusion or frustration?</p>
                        </li>
                        <li>
                          <span className="font-medium">Documentation Gaps:</span>
                          <p className="text-sm mt-1">What additional information or examples would improve understanding?</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="deliverables" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Deliverables & Analysis</CardTitle>
              <CardDescription>Testing outputs, analysis approach, and recommendations format</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div>
                  <h4 className="font-semibold mb-2">Testing Documentation</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="border rounded p-3">
                      <h5 className="font-medium mb-1">Pre-Testing Documents</h5>
                      <ul className="list-disc pl-5 text-sm text-gray-700">
                        <li>Detailed test plan</li>
                        <li>Screening questionnaire</li>
                        <li>Participant consent forms</li>
                        <li>Task scenario descriptions</li>
                        <li>Moderator script</li>
                      </ul>
                    </div>
                    <div className="border rounded p-3">
                      <h5 className="font-medium mb-1">Data Collection Tools</h5>
                      <ul className="list-disc pl-5 text-sm text-gray-700">
                        <li>Task success evaluation forms</li>
                        <li>System Usability Scale (SUS)</li>
                        <li>Post-task questionnaires</li>
                        <li>Observation note templates</li>
                        <li>Technical issue log</li>
                      </ul>
                    </div>
                    <div className="border rounded p-3">
                      <h5 className="font-medium mb-1">Final Deliverables</h5>
                      <ul className="list-disc pl-5 text-sm text-gray-700">
                        <li>Executive summary report</li>
                        <li>Detailed findings document</li>
                        <li>Video highlights compilation</li>
                        <li>Quantitative data analysis</li>
                        <li>Prioritized recommendations</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Analysis Framework</h4>
                  <p className="text-gray-700 mb-3">
                    Test results will be analyzed using the following framework to ensure comprehensive insights:
                  </p>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Analysis Category</TableHead>
                        <TableHead>Key Questions</TableHead>
                        <TableHead>Data Sources</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Usability Issues</TableCell>
                        <TableCell>
                          <ul className="list-disc pl-5 text-sm">
                            <li>Where did users struggle or make errors?</li>
                            <li>Which tasks had lowest completion rates?</li>
                            <li>What patterns emerged across users?</li>
                          </ul>
                        </TableCell>
                        <TableCell>Task success rates, error logs, observation notes</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Content Effectiveness</TableCell>
                        <TableCell>
                          <ul className="list-disc pl-5 text-sm">
                            <li>Were code examples understandable?</li>
                            <li>Was technical language appropriate?</li>
                            <li>Were concepts explained clearly?</li>
                          </ul>
                        </TableCell>
                        <TableCell>Think-aloud data, post-task interviews, comprehension exercises</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Information Architecture</TableCell>
                        <TableCell>
                          <ul className="list-disc pl-5 text-sm">
                            <li>Could users find needed information?</li>
                            <li>Was navigation intuitive?</li>
                            <li>Did section organization make sense?</li>
                          </ul>
                        </TableCell>
                        <TableCell>Navigation paths, task times, user feedback</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Implementation Success</TableCell>
                        <TableCell>
                          <ul className="list-disc pl-5 text-sm">
                            <li>Could users apply techniques successfully?</li>
                            <li>What implementation obstacles were encountered?</li>
                            <li>Were performance gains achieved?</li>
                          </ul>
                        </TableCell>
                        <TableCell>Task outcomes, implementation results, performance metrics</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Recommendations Format</h4>
                  <p className="text-gray-700 mb-3">
                    Recommendations will be prioritized using this framework:
                  </p>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Priority</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Impact</TableHead>
                          <TableHead>Implementation Effort</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <Badge className="bg-red-100 text-red-800">Critical</Badge>
                          </TableCell>
                          <TableCell>Issues preventing task completion or causing significant confusion</TableCell>
                          <TableCell>High – Directly affects user success</TableCell>
                          <TableCell>Varies – Will specify for each item</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Badge className="bg-yellow-100 text-yellow-800">Important</Badge>
                          </TableCell>
                          <TableCell>Issues causing delays, frustration, or affecting comprehension</TableCell>
                          <TableCell>Medium – Impacts user efficiency</TableCell>
                          <TableCell>Varies – Will specify for each item</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Badge className="bg-blue-100 text-blue-800">Enhancement</Badge>
                          </TableCell>
                          <TableCell>Opportunities to improve experience or deepen understanding</TableCell>
                          <TableCell>Low – Improves satisfaction</TableCell>
                          <TableCell>Varies – Will specify for each item</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    Each recommendation will include specific reference to user data, concrete implementation guidance, and expected outcome.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Final Report Structure</h4>
                  <ol className="list-decimal pl-5 text-gray-700 space-y-1">
                    <li><span className="font-medium">Executive Summary</span> – Key findings and critical recommendations</li>
                    <li><span className="font-medium">Test Methodology</span> – Overview of participants, tasks, and collection methods</li>
                    <li><span className="font-medium">Quantitative Results</span> – Task success, SUS scores, and metrics analysis</li>
                    <li><span className="font-medium">Qualitative Findings</span> – User feedback patterns and observations</li>
                    <li><span className="font-medium">Usability Issues</span> – Detailed description of identified problems</li>
                    <li><span className="font-medium">Prioritized Recommendations</span> – Actionable improvements with effort estimates</li>
                    <li><span className="font-medium">Success Stories</span> – What worked well and should be maintained</li>
                    <li><span className="font-medium">Next Steps</span> – Implementation plan and follow-up testing recommendations</li>
                    <li><span className="font-medium">Appendices</span> – Supporting data, participant quotes, and testing artifacts</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsabilityTestingPlan;
