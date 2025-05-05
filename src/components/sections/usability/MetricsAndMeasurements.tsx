
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const MetricsAndMeasurements = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold mb-4">Metrics & Measurements</h3>

      <Card>
        <CardHeader>
          <CardTitle>Quantitative Metrics</CardTitle>
          <CardDescription>Measurable data points to evaluate usability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">Task Completion Rates</h4>
                <span className="text-sm text-muted-foreground">Target: 85%+</span>
              </div>
              <Progress value={85} className="h-2 mb-2" />
              <p className="text-sm text-muted-foreground">
                Percentage of users who successfully complete each task without assistance. 
                A fundamental metric for evaluating task usability.
              </p>
              <div className="mt-2 text-sm">
                <strong>Collection method:</strong> Binary success/failure recording per task
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">Time on Task</h4>
                <span className="text-sm text-muted-foreground">Benchmark against targets</span>
              </div>
              <Progress value={70} className="h-2 mb-2" />
              <p className="text-sm text-muted-foreground">
                Measure how long it takes users to complete specific tasks. Compare against expected completion times.
              </p>
              <div className="mt-2 text-sm">
                <strong>Collection method:</strong> Timer from task start to successful completion
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">Error Rates</h4>
                <span className="text-sm text-muted-foreground">Target: Below 5%</span>
              </div>
              <Progress value={95} className="h-2 mb-2" />
              <p className="text-sm text-muted-foreground">
                Count of errors made during task completion. Includes form validation errors, 
                wrong navigation paths, and misclicks.
              </p>
              <div className="mt-2 text-sm">
                <strong>Collection method:</strong> Tally errors during session observation
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">Satisfaction Scores</h4>
                <span className="text-sm text-muted-foreground">Target: 4.0+ out of 5</span>
              </div>
              <Progress value={80} className="h-2 mb-2" />
              <p className="text-sm text-muted-foreground">
                Post-task or post-test ratings of user satisfaction, typically on a 5-point scale.
              </p>
              <div className="mt-2 text-sm">
                <strong>Collection method:</strong> Post-task questionnaires (e.g., SUS, CSUQ)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Qualitative Feedback Collection</CardTitle>
          <CardDescription>Methods for gathering subjective user insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-2">Think-Aloud Protocols</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Participants verbalize their thoughts, feelings, and reasoning while completing tasks.
              </p>
              <div className="bg-slate-50 p-4 rounded-md">
                <h5 className="font-medium mb-2 text-sm">Implementation Guidelines:</h5>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Provide clear instructions for thinking aloud at session start</li>
                  <li>Use gentle prompts if participant stops verbalizing ("What are you thinking now?")</li>
                  <li>Record exact quotes that indicate confusion or satisfaction</li>
                  <li>Note emotional reactions expressed verbally</li>
                  <li>Focus on collecting raw thoughts rather than explanations</li>
                </ul>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Post-Task Questions</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Specific questions asked immediately after each task to capture fresh impressions.
              </p>
              <div className="bg-slate-50 p-4 rounded-md">
                <h5 className="font-medium mb-2 text-sm">Sample Questions:</h5>
                <ol className="list-decimal pl-5 text-sm space-y-1">
                  <li>On a scale from 1-5, how difficult was this task?</li>
                  <li>What, if anything, was confusing about completing this task?</li>
                  <li>How would you expect this feature to work?</li>
                  <li>What would make this task easier to complete?</li>
                  <li>Did anything surprise you while completing this task?</li>
                </ol>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Exit Interviews</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Comprehensive debrief at the end of testing session to gather overall impressions.
              </p>
              <div className="bg-slate-50 p-4 rounded-md">
                <h5 className="font-medium mb-2 text-sm">Key Areas to Cover:</h5>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li><strong>Overall Impression:</strong> General thoughts about the product</li>
                  <li><strong>Navigation:</strong> Ease of finding information and features</li>
                  <li><strong>Visual Design:</strong> Reaction to layout, colors, and organization</li>
                  <li><strong>Terminology:</strong> Clarity of labels, instructions, and messaging</li>
                  <li><strong>Feature Expectations:</strong> Missing functionality or unexpected behaviors</li>
                  <li><strong>Comparison:</strong> How it compares to similar tools they've used</li>
                  <li><strong>Recommendation:</strong> Would they recommend it to others?</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Analysis Approach</CardTitle>
          <CardDescription>Methods for interpreting and presenting findings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Quantitative Analysis</h4>
              <ul className="list-disc pl-5">
                <li>Calculate average completion times per task</li>
                <li>Determine success rates as percentages</li>
                <li>Compare metrics against established benchmarks</li>
                <li>Segment analysis by user experience level</li>
                <li>Identify statistical patterns and outliers</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Qualitative Analysis</h4>
              <ul className="list-disc pl-5">
                <li>Code and categorize user comments by theme</li>
                <li>Identify recurring pain points and positive aspects</li>
                <li>Extract representative quotes for each issue</li>
                <li>Create affinity diagrams to group related feedback</li>
                <li>Develop user journey maps with emotional indicators</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Reporting Format</h4>
              <ul className="list-disc pl-5">
                <li>Executive summary with key findings and recommendations</li>
                <li>Detailed metrics with visual representations</li>
                <li>Problem inventory ranked by severity and frequency</li>
                <li>Video highlights showing critical issues</li>
                <li>Recommendations prioritized by impact and implementation effort</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsAndMeasurements;
