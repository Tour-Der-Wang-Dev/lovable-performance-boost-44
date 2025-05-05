
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const TestProtocol = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold mb-4">Testing Protocol</h3>

      <Card>
        <CardHeader>
          <CardTitle>Test Script Template</CardTitle>
          <CardDescription>Standardized script for test moderators to follow</CardDescription>
        </CardHeader>
        <CardContent>
          <Collapsible className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">
                Introduction Script
              </h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <ChevronDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="bg-slate-50 p-4 rounded-md">
              <p className="text-sm">
                "Thank you for participating in our usability testing session today. My name is [Moderator Name], and I'll be guiding you through this session.
                <br /><br />
                During the next [Duration] minutes, I'll ask you to complete a few tasks using our [Product/Website/Application]. Our goal is to see how real users interact with our product so we can improve it.
                <br /><br />
                I want to emphasize that we're testing the product, not you. There are no right or wrong ways to complete these tasks, so please don't worry about making mistakes. In fact, identifying areas where users have difficulty helps us make improvements.
                <br /><br />
                As you work through each task, please think aloud – share what you're looking at, thinking, and doing. This helps us understand your experience better.
                <br /><br />
                Do you have any questions before we begin?"
              </p>
            </CollapsibleContent>
          </Collapsible>

          <Separator className="my-4" />

          <Collapsible className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">
                Task Instructions Format
              </h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <ChevronDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="bg-slate-50 p-4 rounded-md">
              <p className="text-sm mb-2">For each task:</p>
              <ol className="list-decimal pl-5 text-sm space-y-2">
                <li>"I'm going to present you with a scenario. Please try to complete the task as you normally would."</li>
                <li>Present task context: "[Scenario description]"</li>
                <li>Present specific task: "Your task is to [specific action]."</li>
                <li>"Please think aloud as you work through this."</li>
                <li>After completion: "Thank you. On a scale from 1-5, how difficult was this task?"</li>
              </ol>
            </CollapsibleContent>
          </Collapsible>

          <Separator className="my-4" />

          <Collapsible className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">
                Conclusion Script
              </h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <ChevronDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="bg-slate-50 p-4 rounded-md">
              <p className="text-sm">
                "That completes all the tasks for today. Thank you for your valuable input.
                <br /><br />
                Before we wrap up, I have a few final questions about your overall experience:
                <br /><br />
                1. What aspects of the [Product] did you find most useful or intuitive?
                <br />
                2. What parts were confusing or difficult to use?
                <br />
                3. Is there anything you expected to see that wasn't there?
                <br />
                4. Do you have any other suggestions for improvement?
                <br /><br />
                Thank you again for your participation. Your feedback will directly help us improve the product."
              </p>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Moderator Guidelines</CardTitle>
          <CardDescription>Best practices for test facilitation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Before the Session</h4>
              <ul className="list-disc pl-5">
                <li>Test all equipment 15 minutes before start time</li>
                <li>Have backup plans for technical issues</li>
                <li>Review participant information and testing objectives</li>
                <li>Prepare testing environment and have materials ready</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">During the Session</h4>
              <ul className="list-disc pl-5">
                <li>Remain neutral; avoid leading the participant</li>
                <li>Prompt participants to think aloud if they become quiet</li>
                <li>Allow participants to struggle (within reason)</li>
                <li>Take notes on non-verbal cues and reactions</li>
                <li>Use probing questions: "What are you looking for?" rather than "Did you see the button?"</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">After Each Task</h4>
              <ul className="list-disc pl-5">
                <li>Ask for difficulty rating (1-5 scale)</li>
                <li>Capture immediate impressions before moving to next task</li>
                <li>Reset the test environment for the next task</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Note-Taking Format</CardTitle>
          <CardDescription>Structured template for documenting observations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-50 p-4 rounded-md space-y-4">
            <div>
              <h4 className="font-medium mb-2">Participant information</h4>
              <p className="text-sm">
                ID: [P01] | Age group: [25-34] | Experience level: [Novice/Intermediate/Expert]<br />
                Date/Time: [YYYY-MM-DD, HH:MM] | Session type: [Remote/In-person]
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Task: [Task name]</h4>
              <ul className="list-none text-sm space-y-2">
                <li><strong>Time to complete:</strong> [MM:SS]</li>
                <li><strong>Successful completion:</strong> [Yes/No/Partial]</li>
                <li><strong>Path taken:</strong> [Note navigation steps]</li>
                <li><strong>Errors/Confusion points:</strong> [Description + timestamp]</li>
                <li><strong>Notable quotes:</strong> ["Direct participant quote"]</li>
                <li><strong>Non-verbal observations:</strong> [Describe body language, facial expressions]</li>
                <li><strong>Self-reported difficulty:</strong> [1-5 rating]</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recording Requirements</CardTitle>
          <CardDescription>Technical specifications for session documentation</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-medium">Screen recording:</span> 1080p resolution, 30fps minimum</li>
            <li><span className="font-medium">Audio quality:</span> Clear voice capture, minimal background noise</li>
            <li><span className="font-medium">Webcam (optional):</span> 720p minimum for facial expressions</li>
            <li><span className="font-medium">File format:</span> MP4 with H.264 encoding</li>
            <li><span className="font-medium">Storage:</span> Secure cloud storage with access controls</li>
            <li><span className="font-medium">Retention period:</span> 90 days unless otherwise specified</li>
            <li><span className="font-medium">Naming convention:</span> ProjectName_ParticipantID_YYYYMMDD</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Remote Testing Procedures</CardTitle>
          <CardDescription>Special considerations for conducting tests online</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Pre-Session Preparation</h4>
              <ul className="list-disc pl-5">
                <li>Send calendar invite with clear joining instructions</li>
                <li>Conduct tech check 24 hours before session</li>
                <li>Provide backup communication channel</li>
                <li>Share consent form and testing instructions in advance</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">During Remote Sessions</h4>
              <ul className="list-disc pl-5">
                <li>Join 5-10 minutes early to greet participant</li>
                <li>Confirm audio/video quality before beginning</li>
                <li>Use screen sharing with participant controls</li>
                <li>Have a backup moderator for technical support</li>
                <li>Be prepared for connection issues with recovery plan</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Remote Tool Requirements</h4>
              <ul className="list-disc pl-5">
                <li>Video conferencing with screen sharing capability</li>
                <li>Session recording functionality</li>
                <li>Chat feature for sharing links or instructions</li>
                <li>Virtual whiteboard for collaborative exercises (optional)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestProtocol;
