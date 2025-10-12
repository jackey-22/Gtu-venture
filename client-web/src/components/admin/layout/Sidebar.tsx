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

interface SidebarProps {
	activeTab: string;
	setActiveTab: (tab: string) => void;
	isOpen: boolean;
	onClose: () => void;
}

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

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, onClose }) => {
	return (
		<aside
			className={cn(
				'fixed md:static top-16 md:top-0 left-0 h-[calc(100vh-4rem)] md:h-screen w-60 hero-depth text-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out',
				isOpen ? 'translate-x-0' : '-translate-x-full',
				'md:translate-x-0'
			)}
			style={{
				height: 'calc(100vh - 4rem)',
			}}
		>
			<div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-700">
				<h2 className="text-lg font-semibold">GTU Ventures</h2>
				<button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100/20">
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
									? 'bg-white text-primary shadow-md'
									: 'hover:bg-white/10'
							)}
						>
							<Icon className="w-5 h-5" />
							<span className="text-lg">{item.label}</span>
						</button>
					);
				})}
			</nav>
		</aside>
	);
};

export default Sidebar;
