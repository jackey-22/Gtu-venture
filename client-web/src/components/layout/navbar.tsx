import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navigation = [
	{ name: 'Programs', href: '/programs' },
	{ name: 'Portfolios', href: '/portfolios' },
	{ name: 'Events', href: '/events' },
	{ name: 'Partners', href: '/partners' },
	{ name: 'About', href: '/about' },
	{ name: 'Contact', href: '/contact' },
];

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const [location] = useLocation();

	useEffect(() => {
		const handler = () => setIsScrolled(window.scrollY > 20);
		window.addEventListener('scroll', handler);
		return () => window.removeEventListener('scroll', handler);
	}, []);

	const onHome = location === '/';

	return (
		<motion.nav
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${
			isScrolled
				? 'bg-white/80 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border-b border-border/20 scale-[1.01]'
				: onHome
				? 'bg-white/60 backdrop-blur-sm border-b border-transparent'
				: 'bg-white/90 backdrop-blur-xl'
		}
      `}
		>
			<div className="max-w-10xl mx-auto px-6 lg:px-16">
				<div className="h-[85px] flex items-center justify-between">
					{/* Logo */}
					<Link href="/" className="flex items-center gap-2 cursor-pointer select-none">
						<img src="/gtulogo.png" alt="GTU" className="h-16 w-auto" />
						<img src="/gtuv.png" alt="GTU Ventures" className="h-12 w-auto" />
					</Link>

					{/* Desktop Nav */}
					<div className="hidden lg:flex items-center space-x-10">
						{navigation.map((item) => {
							const active = location === item.href;
							return (
								<Link
									key={item.name}
									href={item.href}
									className={`relative text-[16px] font-medium transition-all
										${active ? 'text-primary font-semibold' : 'text-black hover:text-primary'}
									`}
								>
									{item.name}

									{/* Underline Animation */}
									<span
										className={`absolute left-0 -bottom-1 h-[2px] rounded-full transition-all duration-300 
                      ${active ? 'w-full bg-primary' : 'w-0 bg-primary group-hover:w-full'}
                    `}
									/>
								</Link>
							);
						})}
					</div>

					{/* CTA + Mobile */}
					<div className="flex items-center gap-3">
						<Button
							asChild
							className="hidden lg:inline-flex px-5 py-2.5 text-base rounded-xl shadow-sm font-semibold bg-primary hover:bg-primary/90"
							size="xl"
						>
							<a href="/apply">Apply Now</a>
						</Button>

						{/* Mobile Menu */}
						<Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon" className="lg:hidden">
									<Menu className="h-7 w-7 text-gray-800" />
								</Button>
							</SheetTrigger>
							<SheetContent side="right" className="w-72 p-6">
								<div className="mt-8 flex flex-col gap-4">
									{navigation.map((item) => (
										<Link
											key={item.name}
											href={item.href}
											onClick={() => setIsMobileOpen(false)}
											className={`text-lg font-semibold transition-colors ${
												location === item.href
													? 'text-primary'
													: 'text-gray-800 hover:text-primary'
											}`}
										>
											{item.name}
										</Link>
									))}

									<Button asChild className="mt-6 w-full bg-primary text-white">
										<a href="/apply" onClick={() => setIsMobileOpen(false)}>
											Apply Now
										</a>
									</Button>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</motion.nav>
	);
}
