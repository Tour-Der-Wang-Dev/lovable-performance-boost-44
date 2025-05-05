
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TestEnvironment = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold mb-4">Test Environment Setup</h3>

      <Card>
        <CardHeader>
          <CardTitle>Testing Environment Specifications</CardTitle>
          <CardDescription>Requirements for the physical or digital testing environment</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Quiet, distraction-free location (for in-person testing)</li>
            <li>Neutral setting with minimal branding bias</li>
            <li>Stable internet connection (min. 10Mbps download/upload)</li>
            <li>Testing devices that match target user demographics</li>
            <li>Consistent testing environment across all sessions</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Required Tools & Software</CardTitle>
          <CardDescription>Tools needed to conduct and analyze user testing sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Screen Recording Software</h4>
              <ul className="list-disc pl-5">
                <li>Zoom or Microsoft Teams for remote sessions</li>
                <li>Camtasia or OBS for local recording</li>
                <li>Lookback.io or UserTesting for specialized user research</li>
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-2">Analytics Tools</h4>
              <ul className="list-disc pl-5">
                <li>Hotjar for heatmaps and session recordings</li>
                <li>Google Analytics for quantitative metrics</li>
                <li>Excel or Google Sheets for data collection</li>
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-2">Additional Equipment</h4>
              <ul className="list-disc pl-5">
                <li>External microphone for clear audio recording</li>
                <li>Webcam for facial expressions (optional)</li>
                <li>Secondary monitor for moderator notes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Requirements</CardTitle>
          <CardDescription>Test data needed to simulate realistic scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Sanitized production data (with PII removed)</li>
            <li>Test accounts with various permission levels</li>
            <li>Sample content that mimics real-world usage</li>
            <li>Predefined testing states (e.g., empty state, error state)</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Considerations</CardTitle>
          <CardDescription>Measures to protect sensitive information during testing</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>NDAs for all test participants</li>
            <li>Secure storage for test recordings and data</li>
            <li>Isolated test environment separate from production</li>
            <li>Data deletion protocol after testing completion</li>
            <li>Use of dummy data when testing sensitive features</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestEnvironment;
