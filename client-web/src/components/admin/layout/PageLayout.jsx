import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const PageLayout = ({ children, activeTab, setActiveTab }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className="flex flex-col min-h-screen bg-gray-50">
			<Header onMenuToggle={() => setIsSidebarOpen(true)} />
			<div className="flex flex-1 min-h-0">
				<div className="relative max-h-screen">
					<Sidebar
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						isOpen={isSidebarOpen}
						onClose={() => setIsSidebarOpen(false)}
					/>
				</div>
				<main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
			</div>
		</div>
	);
};

export default PageLayout;
