import React, { useState, useEffect } from 'react';
import PageLayout from './layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import {
	Database,
	Newspaper,
	Calendar,
	Award,
	Building,
	Image,
	FileText,
	HelpCircle,
	Users,
	Settings,
	Users as TeamIcon,
	Home,
	BarChart3,
	Star,
	MessageSquare,
	Mail,
	Clipboard,
} from 'lucide-react';
import { Skeleton } from 'primereact/skeleton';
import CountUp from 'react-countup';
import { fetchGet } from '../../utils/fetch.utils';
import NewsCRUD from './NewsCRUD';
import EventsCRUD from './EventsCRUD';
import ProgramsCRUD from './ProgramsCRUD';
import StartupsCRUD from './StartupsCRUD';
import GalleryCRUD from './GalleryCRUD';
import ReportsCRUD from './ReportsCRUD';
import FAQsCRUD from './FAQsCRUD';
import TeamCRUD from './TeamCRUD';
import CareersCRUD from './CareersCRUD';
import ApplicationsCRUD from './ApplicationsCRUD';
import PartnersCRUD from './PartnersCRUD';
import FacilitiesCRUD from './FacilitiesCRUD';
import InitiativesCRUD from './InitiativesCRUD';
import ContactMessagesCRUD from './ContactMessagesCRUD';
import CircularsCRUD from './CircularsCRUD';
import TendersCRUD from './TendersCRUD';
import HeroCRUD from './HeroCRUD';
import CarouselItemsCRUD from './CarouselItemsCRUD';
import FeaturedGridCRUD from './FeaturedGridCRUD';
import ProgramHighlightsCRUD from './ProgramHighlightsCRUD';
import MetricsCRUD from './MetricsCRUD';
import AboutSectionCRUD from './AboutSectionCRUD';
import SuccessStoriesCRUD from './SuccessStoriesCRUD';
import TestimonialsCRUD from './TestimonialsCRUD';
import NewsletterSubscriptionsCRUD from './NewsletterSubscriptionsCRUD';
import HomePageSections from './HomePageSections';
import { setGlobalCursorStyle } from 'node_modules/react-resizable-panels/dist/declarations/src/utils/cursor';

// Home page sections (not shown in overview counts)
const homePageSectionKeys = [
	'hero',
	'carouselItems',
	'featuredGrid',
	'programHighlights',
	'metrics',
	'aboutSection',
	'successStories',
	'testimonials',
	'newsletterSubscriptions',
];

const contentSections = [
	{
		key: 'homePageSections',
		label: 'Home Page Sections',
		component: HomePageSections,
		icon: Home,
	},
	{ key: 'news', label: 'News', component: NewsCRUD, icon: Newspaper },
	{ key: 'events', label: 'Events', component: EventsCRUD, icon: Calendar },
	{ key: 'programs', label: 'Programs', component: ProgramsCRUD, icon: Award },
	{ key: 'startups', label: 'Startups', component: StartupsCRUD, icon: Building },
	{ key: 'gallery', label: 'Gallery', component: GalleryCRUD, icon: Image },
	{ key: 'reports', label: 'Reports', component: ReportsCRUD, icon: FileText },
	{ key: 'faqs', label: 'FAQs', component: FAQsCRUD, icon: HelpCircle },
	{ key: 'team', label: 'Team Members', component: TeamCRUD, icon: TeamIcon },
	{ key: 'applications', label: 'Applications', component: ApplicationsCRUD, icon: FileText },
	{ key: 'careers', label: 'Careers', component: CareersCRUD, icon: Users },
	{ key: 'partners', label: 'Partners', component: PartnersCRUD, icon: Building },
	{ key: 'facilities', label: 'Facilities', component: FacilitiesCRUD, icon: Settings },
	{ key: 'initiatives', label: 'Initiatives', component: InitiativesCRUD, icon: Award },
	{
		key: 'contactMessages',
		label: 'Contact Messages',
		component: ContactMessagesCRUD,
		icon: Newspaper,
	},
	{ key: 'circulars', label: 'Circulars', component: CircularsCRUD, icon: FileText },
	{ key: 'tenders', label: 'Tenders', component: TendersCRUD, icon: Clipboard },
];

export default function AdminDashboard() {
	const [activeTab, setActiveTab] = useState('overview');
	const [loading, setLoading] = useState(false);
	const [counts, setCounts] = useState({});

	useEffect(() => {
		setLoading(true);
		const fetchCounts = async () => {
			try {
				const data = await fetchGet({ pathName: 'admin/get-counts' });
				setCounts(data);
			} catch (error) {
				console.error('Failed to fetch counts', error);
			} finally {
				setLoading(false);
			}
		};
		fetchCounts();
	}, []);

	const Overview = () => (
		<div className="space-y-10">
			<div className="space-y-3">
				<h1 className="flex items-center gap-2 text-3xl font-bold mb-1 text-gray-800">
					<Database className="w-7 h-7 text-primary font-bold" />
					Admin Dashboard
				</h1>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
				{loading
					? Array.from({ length: contentSections.length }).map((_, idx) => (
							<div
								key={idx}
								className="relative group overflow-hidden rounded-lg p-5 bg-gradient-to-br from-primary/10 to-accent/10 shadow-lg"
							>
								<div className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-3xl opacity-70"></div>

								<div className="flex justify-between items-start relative z-10">
									<div>
										<Skeleton
											width="100px"
											height="20px"
											className="mb-3 bg-gray-200"
										/>
										<Skeleton
											width="60px"
											height="36px"
											className="bg-gray-200"
										/>
									</div>
									<div>
										<Skeleton
											shape="circle"
											size="40px"
											className="bg-gray-200"
										/>
									</div>
								</div>
							</div>
					  ))
					: contentSections
							.filter((section) => section.key !== 'homePageSections')
							.map((section) => {
								const Icon = section.icon;
								const count = counts[section.key] || 0;

								return (
									<div
										key={section.key}
										className="relative group cursor-pointer overflow-hidden rounded-lg p-5 bg-gradient-to-br from-primary/10 to-accent/10 shadow-lg transition hover:shadow-2xl"
										onClick={() => setActiveTab(section.key)}
									>
										<div className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-3xl opacity-70 group-hover:scale-110 transition"></div>

										<div className="flex justify-between items-start relative z-10">
											<div>
												<div className="text-lg font-medium text-gray-500">
													{section.label}
												</div>
												<div className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
													<CountUp
														end={count}
														duration={1.5}
														separator=","
														start={0}
													/>
												</div>
											</div>
											<div className="flex-shrink-0 p-3 bg-transparent">
												<Icon className="w-10 h-10 text-primary" />
											</div>
										</div>
									</div>
								);
							})}
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
