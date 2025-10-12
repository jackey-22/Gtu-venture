import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Menu } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

interface HeaderProps {
	onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
	const { logout } = useAuth();

	return (
		<header className="flex justify-between items-center hero-depth text-white px-4 md:px-6 py-3 shadow-md fixed top-0 left-0 right-0 z-50">
			<div className="flex items-center gap-3">
				<button
					className="md:hidden p-2 rounded-md hover:bg-primary/80 transition"
					onClick={onMenuToggle}
				>
					<Menu className="w-6 h-6 text-white" />
				</button>

				<div>
					<h1 className="text-lg md:text-xl font-semibold">GTU Ventures Admin</h1>
					<p className="text-xs text-gray-200">Content Management System</p>
				</div>
			</div>

			<Button
				onClick={logout}
				variant="outline"
				size="sm"
				className="flex items-center gap-2 bg-white text-primary hover:bg-gray-100 transition"
			>
				<LogOut className="w-4 h-4" />
				Logout
			</Button>
		</header>
	);
};

export default Header;
