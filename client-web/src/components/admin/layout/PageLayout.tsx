import React, { useState, ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface PageLayoutProps {
	children: ReactNode;
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, activeTab, setActiveTab }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const handleMenuToggle = () => setIsSidebarOpen(true);
	const handleCloseSidebar = () => setIsSidebarOpen(false);

	return (
		<div className="flex flex-col min-h-screen bg-gray-50 overflow-hidden">
			<Header onMenuToggle={handleMenuToggle} />

			{isSidebarOpen && (
				<div
					className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
					onClick={handleCloseSidebar}
				></div>
			)}

			<div className="flex flex-1 pt-16">
				<Sidebar
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					isOpen={isSidebarOpen}
					onClose={handleCloseSidebar}
				/>

				<main
					className="flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-300"
					style={{ height: 'calc(100vh - 4rem)' }}
				>
					{children}
				</main>
			</div>
		</div>
	);
};

export default PageLayout;
