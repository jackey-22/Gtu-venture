import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, Image, BarChart3, Award, HelpCircle, Star, MessageSquare, Mail } from 'lucide-react';
import HeroCRUD from './HeroCRUD';
import CarouselItemsCRUD from './CarouselItemsCRUD';
import FeaturedGridCRUD from './FeaturedGridCRUD';
import ProgramHighlightsCRUD from './ProgramHighlightsCRUD';
import MetricsCRUD from './MetricsCRUD';
import AboutSectionCRUD from './AboutSectionCRUD';
import SuccessStoriesCRUD from './SuccessStoriesCRUD';
import TestimonialsCRUD from './TestimonialsCRUD';
import NewsletterSubscriptionsCRUD from './NewsletterSubscriptionsCRUD';

const homePageSections = [
	{ key: 'hero', label: 'Hero Section', component: HeroCRUD, icon: Home },
	{ key: 'carouselItems', label: 'Carousel Items', component: CarouselItemsCRUD, icon: Image },
	{ key: 'featuredGrid', label: 'Featured Grid', component: FeaturedGridCRUD, icon: BarChart3 },
	{
		key: 'programHighlights',
		label: 'Program Highlights',
		component: ProgramHighlightsCRUD,
		icon: Award,
	},
	{ key: 'metrics', label: 'Metrics', component: MetricsCRUD, icon: BarChart3 },
	{ key: 'aboutSection', label: 'About Section', component: AboutSectionCRUD, icon: HelpCircle },
	{ key: 'successStories', label: 'Success Stories', component: SuccessStoriesCRUD, icon: Star },
	{
		key: 'testimonials',
		label: 'Testimonials',
		component: TestimonialsCRUD,
		icon: MessageSquare,
	},
	{
		key: 'newsletterSubscriptions',
		label: 'Newsletter Subscriptions',
		component: NewsletterSubscriptionsCRUD,
		icon: Mail,
	},
];

export default function HomePageSections() {
	const [activeTab, setActiveTab] = useState('hero');

	return (
		<div className="space-y-6">
			<div className="">
				<h1 className="flex items-center gap-2 text-3xl font-bold mb-1.5 text-gray-800">
					<Home className="w-7 h-7 text-primary font-bold" />
					Home Page Sections
				</h1>
				<p className="text-muted-foreground">
					Manage all sections displayed on the home page
				</p>
			</div>

			<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
				<TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 gap-2 h-auto p-1">
					{homePageSections.map((section) => {
						const Icon = section.icon;
						return (
							<TabsTrigger
								key={section.key}
								value={section.key}
								className="flex items-center gap-2 py-2 px-3"
							>
								<Icon className="w-4 h-4" />
								<span className="hidden sm:inline">{section.label}</span>
								<span className="sm:hidden">{section.label.split(' ')[0]}</span>
							</TabsTrigger>
						);
					})}
				</TabsList>

				{homePageSections.map((section) => {
					const Component = section.component;
					return (
						<TabsContent key={section.key} value={section.key} className="mt-6">
							<Component />
						</TabsContent>
					);
				})}
			</Tabs>
		</div>
	);
}
