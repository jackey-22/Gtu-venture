import React from 'react';
import {
	Newspaper,
	Calendar,
	Award,
	Building,
	Image,
	FileText,
	HelpCircle,
	Users,
	Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
	{ key: 'overview', label: 'Overview', icon: Settings },
	{ key: 'news', label: 'News', icon: Newspaper },
	{ key: 'events', label: 'Events', icon: Calendar },
	{ key: 'programs', label: 'Programs', icon: Award },
	{ key: 'startups', label: 'Startups', icon: Building },
	{ key: 'gallery', label: 'Gallery', icon: Image },
	{ key: 'reports', label: 'Reports', icon: FileText },
	{ key: 'faqs', label: 'FAQs', icon: HelpCircle },
	{ key: 'team', label: 'Team', icon: Users },
];

const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose }) => {
	return (
		<aside
			className={cn(
				'fixed md:relative hero-depth border-r z-30 w-64 h-full transform transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col',
				isOpen ? 'translate-x-0' : '-translate-x-full'
			)}
		>
			<div className="md:hidden flex items-center justify-between px-4 py-3 border-b">
				<h2 className="text-lg font-semibold">GTU Ventures</h2>
				<button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">
					✕
				</button>
			</div>

			<nav className="flex-1 overflow-y-auto p-4 space-y-1">
				{navItems.map((item) => {
					const Icon = item.icon;
					return (
						<button
							key={item.key}
							onClick={() => {
								setActiveTab(item.key);
								onClose();
							}}
							className={cn(
								'w-full flex items-center gap-4 px-3 py-2 rounded-lg text-sm font-medium transition-all',
								activeTab === item.key
									? 'bg-gtu-primary text-white shadow-sm '
									: 'text-white hover:bg-primary'
							)}
						>
							<Icon className="w-6 h-6" />
							<span className="text-lg">{item.label}</span>
						</button>
					);
				})}
			</nav>
		</aside>
	);
};

export default Sidebar;
