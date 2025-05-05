
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ParticipantSelection = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold mb-4">Participant Selection</h3>

      <Card>
        <CardHeader>
          <CardTitle>Number of Participants</CardTitle>
          <CardDescription>Recommended participant counts based on research methodology</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              <span className="font-medium">Minimum recommendation:</span> 5 participants per distinct user group
            </p>
            
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Participant Distribution:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li><Badge variant="outline">5-8 participants</Badge> For qualitative insights and discovering major usability issues</li>
                <li><Badge variant="outline">10-12 participants</Badge> For more comprehensive coverage and statistical significance</li>
                <li><Badge variant="outline">15+ participants</Badge> For quantitative metrics with higher confidence levels</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recruitment Criteria</CardTitle>
          <CardDescription>Key characteristics for selecting appropriate test participants</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Demographics</h4>
              <ul className="list-disc pl-5">
                <li>Age range aligned with target users</li>
                <li>Gender representation balanced with user base</li>
                <li>Geographic distribution if relevant to product</li>
                <li>Educational/professional background aligned with target audience</li>
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-2">Experience Level</h4>
              <ul className="list-disc pl-5">
                <li>Mix of novice and experienced users</li>
                <li>Varying levels of domain expertise</li>
                <li>Different technical proficiency levels</li>
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-2">Usage Patterns</h4>
              <ul className="list-disc pl-5">
                <li>Frequency of using similar products</li>
                <li>Specific feature usage relevant to test scenarios</li>
                <li>Platform preferences (mobile vs. desktop)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Screening Questionnaire</CardTitle>
          <CardDescription>Sample screening questions to identify suitable participants</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Basic Information</h4>
              <ul className="list-decimal pl-5">
                <li>Age and geographic location</li>
                <li>Occupation and industry</li>
                <li>Technology devices used regularly</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Product Experience</h4>
              <ul className="list-decimal pl-5">
                <li>How often do you use [related products]?</li>
                <li>Which features do you use most frequently?</li>
                <li>What challenges have you encountered using similar products?</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Task-Specific Questions</h4>
              <ul className="list-decimal pl-5">
                <li>How often do you perform [specific task]?</li>
                <li>What tools do you currently use for [specific activity]?</li>
                <li>Rate your confidence level in performing [specific task] (1-5 scale)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Participant Incentives</CardTitle>
          <CardDescription>Recommended compensation for participants' time and feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-medium">Remote testing (30-45 min):</span> $50-75 gift card or cash equivalent</li>
            <li><span className="font-medium">In-person testing (60-90 min):</span> $75-150 gift card or cash equivalent</li>
            <li><span className="font-medium">Longitudinal studies:</span> Tiered compensation based on engagement level</li>
            <li><span className="font-medium">Non-monetary options:</span> Product subscriptions, early feature access, or exclusive content</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Diversity & Representation</CardTitle>
          <CardDescription>Ensuring inclusive participant selection</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Include participants from underrepresented groups</li>
            <li>Consider accessibility needs and impairments</li>
            <li>Recruit from diverse socioeconomic backgrounds</li>
            <li>Balance novice and expert users</li>
            <li>Include participants with varying device preferences</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParticipantSelection;
