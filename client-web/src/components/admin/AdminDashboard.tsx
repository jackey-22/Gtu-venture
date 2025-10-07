import React, { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Database, Settings } from 'lucide-react';

// Import all CRUD components
import NewsCRUD from './NewsCRUD';
import EventsCRUD from './EventsCRUD';
import ProgramsCRUD from './ProgramsCRUD';
import StartupsCRUD from './StartupsCRUD';
import GalleryCRUD from './GalleryCRUD';
import ReportsCRUD from './ReportsCRUD';
import FAQsCRUD from './FAQsCRUD';
import TeamCRUD from './TeamCRUD';

const contentSections = [
  { key: 'news', label: 'News', component: NewsCRUD },
  { key: 'events', label: 'Events', component: EventsCRUD },
  { key: 'programs', label: 'Programs', component: ProgramsCRUD },
  { key: 'startups', label: 'Startups', component: StartupsCRUD },
  { key: 'gallery', label: 'Gallery', component: GalleryCRUD },
  { key: 'reports', label: 'Reports', component: ReportsCRUD },
  { key: 'faqs', label: 'FAQs', component: FAQsCRUD },
  { key: 'team', label: 'Team', component: TeamCRUD },
];

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header without navbar styling */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Database className="w-6 h-6 text-gtu-primary" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">GTU Ventures Admin</h1>
              <p className="text-sm text-gray-600">Complete Content Management</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content - Full Width */}
      <main className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-6">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            {contentSections.map((section) => (
              <TabsTrigger key={section.key} value={section.key} className="text-xs">
                {section.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Admin Dashboard Overview
                </CardTitle>
                <CardDescription>
                  Manage all content types for GTU Ventures website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {contentSections.map((section) => (
                    <Card
                      key={section.key}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setActiveTab(section.key)}
                    >
                      <CardContent className="p-4">
                        <div className="text-center">
                          <h3 className="font-medium text-sm mb-2">{section.label}</h3>
                          <p className="text-xs text-muted-foreground">
                            Manage {section.label.toLowerCase()} content
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center py-8">
                  <Database className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h2 className="text-lg font-semibold mb-2">Welcome to GTU Ventures Admin</h2>
                  <p className="text-muted-foreground mb-4">
                    Select a content type from the tabs above to manage your website content.
                    All CRUD operations are available for each section.
                  </p>
                  <div className="flex justify-center gap-4 text-sm text-muted-foreground">
                    <span>• Create new content</span>
                    <span>• Edit existing items</span>
                    <span>• Delete unwanted content</span>
                    <span>• Manage status and visibility</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Render all CRUD components */}
          {contentSections.map((section) => {
            const Component = section.component;
            return (
              <TabsContent key={section.key} value={section.key}>
                <Component />
              </TabsContent>
            );
          })}
        </Tabs>
      </main>
    </div>
  );
}