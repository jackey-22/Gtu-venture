import React, { useState } from 'react';
import PageLayout from './layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Database, Settings } from 'lucide-react';

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
	const [activeTab, setActiveTab] = useState('overview');

	const Overview = () => (
		<div className="space-y-10">
			<div className="space-y-3">
				<h1 className="flex items-center gap-2 text-2xl mb-1">
					<Settings className="w-6 h-6" />
					Admin Dashboard Overview
				</h1>
				<span className="text-base text-gray-600">
					Manage all content types for GTU Ventures website
				</span>
			</div>
			<div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
					{contentSections.map((section) => (
						<Card
							key={section.key}
							className="cursor-pointer hover:shadow-md transition-shadow"
							onClick={() => setActiveTab(section.key)}
						>
							<CardContent className="p-4 text-center">
								<h3 className="font-medium text-sm mb-1">{section.label}</h3>
								<p className="text-xs text-muted-foreground">
									Manage {section.label.toLowerCase()} content
								</p>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="text-center py-8">
					<Database className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
					<h2 className="text-lg font-semibold mb-2">Welcome to GTU Ventures Admin</h2>
					<p className="text-muted-foreground mb-4">
						Select a section from the sidebar to manage your website content.
					</p>
				</div>
			</div>
		</div>
	);

	const ActiveComponent =
		contentSections.find((section) => section.key === activeTab)?.component || Overview;

	return (
		<PageLayout activeTab={activeTab} setActiveTab={setActiveTab}>
			{activeTab === 'overview' ? <Overview /> : <ActiveComponent />}
		</PageLayout>
	);
}
