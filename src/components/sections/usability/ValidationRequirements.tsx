
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const ValidationRequirements = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold mb-4">Validation Requirements</h3>

      <Card>
        <CardHeader>
          <CardTitle>Pilot Test Completion</CardTitle>
          <CardDescription>Initial test run to validate testing approach</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox id="pilot1" />
              <div className="grid gap-1.5">
                <Label htmlFor="pilot1" className="text-sm font-medium">Conduct pilot test with 1-2 participants</Label>
                <p className="text-sm text-muted-foreground">
                  Complete a full test run with internal team members or representative users to identify issues with the test protocol.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox id="pilot2" />
              <div className="grid gap-1.5">
                <Label htmlFor="pilot2" className="text-sm font-medium">Verify task clarity and timing</Label>
                <p className="text-sm text-muted-foreground">
                  Ensure task instructions are clear and time estimates are realistic based on pilot performance.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox id="pilot3" />
              <div className="grid gap-1.5">
                <Label htmlFor="pilot3" className="text-sm font-medium">Test recording equipment and software</Label>
                <p className="text-sm text-muted-foreground">
                  Confirm that all recording tools function properly and produce usable output for analysis.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox id="pilot4" />
              <div className="grid gap-1.5">
                <Label htmlFor="pilot4" className="text-sm font-medium">Refine test protocol based on pilot feedback</Label>
                <p className="text-sm text-muted-foreground">
                  Make necessary adjustments to the test approach before proceeding with full testing.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stakeholder Review and Approval</CardTitle>
          <CardDescription>Ensuring alignment with business objectives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox id="stakeholder1" />
              <div className="grid gap-1.5">
                <Label htmlFor="stakeholder1" className="text-sm font-medium">Product team review of testing plan</Label>
                <p className="text-sm text-muted-foreground">
                  Product managers and designers confirm that the test scenarios address key concerns and priorities.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox id="stakeholder2" />
              <div className="grid gap-1.5">
                <Label htmlFor="stakeholder2" className="text-sm font-medium">Executive sponsor approval</Label>
                <p className="text-sm text-muted-foreground">
                  Secure sign-off from project sponsor on testing approach, timeline, and resource allocation.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox id="stakeholder3" />
              <div className="grid gap-1.5">
                <Label htmlFor="stakeholder3" className="text-sm font-medium">Technical team verification</Label>
                <p className="text-sm text-muted-foreground">
                  Engineering confirms that the test environment accurately represents the product functionality.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox id="stakeholder4" />
              <div className="grid gap-1.5">
                <Label htmlFor="stakeholder4" className="text-sm font-medium">Task acceptance criteria validation</Label>
                <p className="text-sm text-muted-foreground">
                  Agreement on what constitutes successful task completion for each scenario.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Legal/Privacy Compliance Check</CardTitle>
          <CardDescription>Ensuring testing follows all legal requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox id="legal1" />
              <div className="grid gap-1.5">
                <Label htmlFor="legal1" className="text-sm font-medium">Participant consent forms approved by legal</Label>
                <p className="text-sm text-muted-foreground">
                  Ensure consent forms clearly explain data collection, usage, and retention policies.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox id="legal2" />
              <div className="grid gap-1.5">
                <Label htmlFor="legal2" className="text-sm font-medium">Data handling procedures comply with privacy regulations</Label>
                <p className="text-sm text-muted-foreground">
                  Verify GDPR, CCPA, or other relevant privacy regulation compliance for participant data.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox id="legal3" />
              <div className="grid gap-1.5">
                <Label htmlFor="legal3" className="text-sm font-medium">Recording permissions secured</Label>
                <p className="text-sm text-muted-foreground">
                  Ensure participants are informed about and consent to audio/video recording procedures.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox id="legal4" />
              <div className="grid gap-1.5">
                <Label htmlFor="legal4" className="text-sm font-medium">Non-disclosure agreements for sensitive products</Label>
                <p className="text-sm text-muted-foreground">
                  Implement NDAs for testing that involves unreleased features or confidential information.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Technical Feasibility Confirmation</CardTitle>
          <CardDescription>Ensuring all technical requirements can be met</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Environment Readiness</h4>
              <div className="pl-5 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="tech1" />
                  <Label htmlFor="tech1" className="text-sm">Test environment deployment verified</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="tech2" />
                  <Label htmlFor="tech2" className="text-sm">Test data populated and validated</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="tech3" />
                  <Label htmlFor="tech3" className="text-sm">Feature flags configured for test scenarios</Label>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-2">Tool Functionality</h4>
              <div className="pl-5 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="tech4" />
                  <Label htmlFor="tech4" className="text-sm">Recording software tested and configured</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="tech5" />
                  <Label htmlFor="tech5" className="text-sm">Analytics tools properly integrated</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="tech6" />
                  <Label htmlFor="tech6" className="text-sm">Data export functionality verified</Label>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-2">Access Control</h4>
              <div className="pl-5 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="tech7" />
                  <Label htmlFor="tech7" className="text-sm">User accounts created for test participants</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="tech8" />
                  <Label htmlFor="tech8" className="text-sm">Appropriate permissions configured</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="tech9" />
                  <Label htmlFor="tech9" className="text-sm">Login process documented and tested</Label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValidationRequirements;
