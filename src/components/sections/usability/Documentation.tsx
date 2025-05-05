
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FileText, Download, Clipboard, Info } from "lucide-react";

const Documentation = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold mb-4">Documentation</h3>

      <Card>
        <CardHeader>
          <CardTitle>Test Plan Document</CardTitle>
          <CardDescription>Comprehensive planning document for the testing process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span className="font-medium">Usability_Test_Plan.docx</span>
              </div>
              <div className="flex gap-2">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Info className="h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Test Plan Document</h4>
                      <p className="text-sm">
                        Master document detailing all aspects of the usability testing process, including goals, methodology, participants, tasks, and analysis approach.
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
              </div>
            </div>

            <div className="text-sm space-y-2">
              <h4 className="font-medium">Key Document Sections:</h4>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Executive Summary</li>
                <li>Testing Objectives & Research Questions</li>
                <li>Methodology</li>
                <li>Participant Profile</li>
                <li>Testing Environment Setup</li>
                <li>Task Scenarios</li>
                <li>Metrics & Success Criteria</li>
                <li>Timeline & Resources</li>
                <li>Reporting Process</li>
                <li>Appendices (Scripts, Forms, etc.)</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Participant Consent Forms</CardTitle>
          <CardDescription>Legal documentation for participant agreement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span className="font-medium">Participant_Consent.pdf</span>
              </div>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Clipboard className="h-4 w-4 mr-2" />
                      View Sample
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Consent Form Elements</h4>
                      <ul className="list-disc pl-4 text-sm">
                        <li>Purpose of the study</li>
                        <li>Data collection methods</li>
                        <li>Privacy & confidentiality policies</li>
                        <li>Rights as a participant</li>
                        <li>Compensation details</li>
                        <li>Contact information</li>
                        <li>Signature blocks</li>
                      </ul>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
              </div>
            </div>

            <div className="text-sm space-y-2">
              <h4 className="font-medium">Consent Form Requirements:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Written in clear, accessible language</li>
                <li>Explicit permission for recording</li>
                <li>Data usage and retention policies</li>
                <li>Option to opt out at any time</li>
                <li>Participant and researcher signature blocks</li>
                <li>Legal review and approval</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Task Scenarios</CardTitle>
          <CardDescription>Detailed descriptions of testing activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span className="font-medium">Task_Scenarios.xlsx</span>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Template
              </Button>
            </div>

            <div className="text-sm space-y-2">
              <h4 className="font-medium">Task Documentation Format:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Task ID:</strong> Unique identifier</li>
                <li><strong>Task Name:</strong> Short descriptive title</li>
                <li><strong>User Story:</strong> Context for the participant</li>
                <li><strong>Specific Instructions:</strong> What they need to accomplish</li>
                <li><strong>Starting Point:</strong> Where in the application to begin</li>
                <li><strong>Success Criteria:</strong> How to determine completion</li>
                <li><strong>Optimal Path:</strong> Expected user journey</li>
                <li><strong>Estimated Time:</strong> Expected completion time</li>
                <li><strong>Task Complexity:</strong> Low, Medium, High classification</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Collection Templates</CardTitle>
          <CardDescription>Standardized formats for gathering test results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span className="font-medium">Observer_Notes_Template.xlsx</span>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span className="font-medium">Post_Task_Questionnaire.docx</span>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span className="font-medium">System_Usability_Scale.pdf</span>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span className="font-medium">Metrics_Tracking_Sheet.xlsx</span>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Results Reporting Format</CardTitle>
          <CardDescription>Templates for analyzing and presenting findings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span className="font-medium">Usability_Report_Template.pptx</span>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Template
              </Button>
            </div>

            <div className="text-sm space-y-2">
              <h4 className="font-medium">Report Structure:</h4>
              <ol className="list-decimal pl-5 space-y-1">
                <li><strong>Executive Summary:</strong> Key findings and recommendations</li>
                <li><strong>Methodology:</strong> Testing approach and participant demographics</li>
                <li><strong>Overall Results:</strong> Success rates, completion times, satisfaction scores</li>
                <li><strong>Task-by-Task Analysis:</strong> Performance metrics and observations per task</li>
                <li><strong>Issue Inventory:</strong> Usability problems ranked by severity and frequency</li>
                <li><strong>Recommendations:</strong> Proposed solutions with implementation prioritization</li>
                <li><strong>Visual Evidence:</strong> Screenshots, user quotes, and video highlights</li>
                <li><strong>Next Steps:</strong> Action items and implementation plan</li>
                <li><strong>Appendices:</strong> Detailed data and supplementary materials</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Documentation;
