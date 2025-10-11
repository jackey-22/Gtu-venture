import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Menu } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const Header = ({ onMenuToggle }) => {
	const { logout } = useAuth();

	return (
		<header className="hero-depth border-b px-4 md:px-6 py-3 flex justify-between items-center sticky top-0 z-40 shadow-sm border border-transparent">
			<div className="flex items-center gap-3">
				<button
					className="md:hidden p-2 rounded-md hover:bg-gray-100"
					onClick={onMenuToggle}
				>
					<Menu className="w-5 h-5 text-gtu-primary" />
				</button>

				<div>
					<h1 className="text-lg md:text-xl font-semibold text-white">
						GTU Ventures Admin
					</h1>
					<p className="text-xs text-gray-200">Content Management System</p>
				</div>
			</div>

			<Button
				onClick={logout}
				variant="outline"
				size="sm"
				className="flex items-center gap-2"
			>
				<LogOut className="w-4 h-4" />
				Logout
			</Button>
		</header>
	);
};

export default Header;
