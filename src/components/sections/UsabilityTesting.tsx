
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TestEnvironment from './usability/TestEnvironment';
import ParticipantSelection from './usability/ParticipantSelection';
import TestScenarios from './usability/TestScenarios';
import TestProtocol from './usability/TestProtocol';
import MetricsAndMeasurements from './usability/MetricsAndMeasurements';
import Documentation from './usability/Documentation';
import ValidationRequirements from './usability/ValidationRequirements';

const UsabilityTesting = () => {
  const [activeTab, setActiveTab] = useState('environment');
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-4">Usability Testing Plan</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          A comprehensive plan for conducting effective usability testing that aligns with the project's requirements, 
          user base, and business goals.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Objective</CardTitle>
          <CardDescription>
            Design and document a tailored usability testing approach that provides comprehensive test coverage and actionable insights.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This usability testing plan is customized to address the specific needs of the project, ensuring that all critical user 
          journeys are validated with real users. By following this structured approach, you'll gather both quantitative metrics and qualitative feedback 
          to improve the user experience.</p>
        </CardContent>
      </Card>

      <Tabs 
        defaultValue="environment" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 w-full mb-6">
          <TabsTrigger value="environment">Environment</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          <TabsTrigger value="protocol">Protocol</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>
        <TabsContent value="environment">
          <TestEnvironment />
        </TabsContent>
        <TabsContent value="participants">
          <ParticipantSelection />
        </TabsContent>
        <TabsContent value="scenarios">
          <TestScenarios />
        </TabsContent>
        <TabsContent value="protocol">
          <TestProtocol />
        </TabsContent>
        <TabsContent value="metrics">
          <MetricsAndMeasurements />
        </TabsContent>
        <TabsContent value="validation">
          <ValidationRequirements />
        </TabsContent>
        <TabsContent value="documentation">
          <Documentation />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsabilityTesting;
