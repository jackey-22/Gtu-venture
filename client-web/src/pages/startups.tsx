import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import LogoWall from '@/components/startups/logo-wall';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const stages = ['All', 'Idea', 'MVP', 'Early', 'Growth', 'scale', 'Mature'];

export default function Startups() {
	const baseURL = import.meta.env.VITE_URL;
	const [startups, setStartups] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedIndustry, setSelectedIndustry] = useState('All');
	const [selectedStage, setSelectedStage] = useState('All');
	const [industries, setIndustries] = useState<string[]>(['All']);
	const [selectedStartup, setSelectedStartup] = useState<any | null>(null);

	useEffect(() => {
		const fetchStartups = async () => {
			try {
				let apiBase = baseURL || '';
				if (!apiBase.endsWith('/')) apiBase += '/';

				const url = `${apiBase}user/get-startups`;

				const res = await fetch(url);
				if (!res.ok) throw new Error('Failed to fetch startups');

				const data = await res.json();

				const formatted = (data?.data || [])
					.filter((s: any) => s.status === 'published')
					.map((s: any) => ({
						id: s._id,
						name: s.name,
						description: s.description,
						founders: s.founderName || [],
						industry: s.sector,
						stage: s.stage,
						website: s.url,
						logo: s.logo,
						location: s.location,
					}));

				setStartups(formatted);
				const uniqueIndustries = [
					'All',
					...new Set(formatted.map((s) => s.industry).filter(Boolean)),
				];
				setIndustries(uniqueIndustries);
			} catch (err: any) {
				setError(err.message || 'Error fetching startups');
			} finally {
				setLoading(false);
			}
		};

		fetchStartups();
	}, [baseURL]);

	const filteredStartups = startups.filter((startup) => {
		const matchesSearch =
			(startup.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
			(startup.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
		const matchesIndustry = selectedIndustry === 'All' || startup.industry === selectedIndustry;
		const matchesStage =
			selectedStage === 'All' || startup.stage?.toLowerCase() === selectedStage.toLowerCase();
		return matchesSearch && matchesIndustry && matchesStage;
	});

	if (loading) {
		return (
			<div className="min-h-screen pt-20">
				<section className="py-24 bg-gradient-to-br from-gtu-base to-gtu-light">
					<div className="max-w-7xl mx-auto px-6 lg:px-16 text-center">
						<div className="mx-auto flex flex-col items-center gap-4">
							<div className="h-10 w-64 bg-white/40 rounded animate-pulse"></div>
							<div className="h-4 w-96 bg-white/30 rounded animate-pulse"></div>
						</div>
					</div>
				</section>

				<section className="py-12 bg-background border-b">
					<div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-10">
						<div className="text-center space-y-3">
							<div className="h-4 w-24 bg-gray-300 rounded mx-auto animate-pulse"></div>
							<div className="flex flex-wrap justify-center gap-2">
								{Array.from({ length: 6 }).map((_, i) => (
									<div
										key={i}
										className="h-8 w-20 bg-gray-200 rounded animate-pulse"
									/>
								))}
							</div>
						</div>

						<div className="text-center space-y-3">
							<div className="h-4 w-20 bg-gray-300 rounded mx-auto animate-pulse"></div>
							<div className="flex flex-wrap justify-center gap-2">
								{Array.from({ length: 6 }).map((_, i) => (
									<div
										key={i}
										className="h-8 w-20 bg-gray-200 rounded animate-pulse"
									/>
								))}
							</div>
						</div>

						<div className="max-w-md mx-auto">
							<div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
						</div>
					</div>
				</section>

				<section className="py-6">
					<div className="max-w-7xl mx-auto px-6 lg:px-16 text-center">
						<div className="h-4 w-48 mx-auto bg-gray-200 rounded animate-pulse"></div>
					</div>
				</section>

				<section className="py-12">
					<div className="max-w-7xl mx-auto px-6 lg:px-16">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{Array.from({ length: 6 }).map((_, i) => (
								<div key={i} className="p-6 border rounded-xl animate-pulse">
									<div className="h-5 w-40 bg-gray-300 rounded mb-4"></div>
									<div className="w-20 h-20 bg-gray-200 rounded-xl mx-auto mb-4"></div>
									<div className="h-3 bg-gray-200 rounded mb-2 w-full"></div>
									<div className="h-3 bg-gray-200 rounded mb-2 w-5/6"></div>
									<div className="h-3 bg-gray-200 rounded mb-4 w-4/6"></div>
									<div className="flex gap-2 mb-4">
										<div className="h-6 w-20 bg-gray-200 rounded"></div>
										<div className="h-6 w-16 bg-gray-200 rounded"></div>
									</div>
									<div className="h-3 bg-gray-200 rounded mb-6 w-2/3"></div>
									<div className="h-10 bg-gray-300 rounded"></div>
								</div>
							))}
						</div>
					</div>
				</section>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="text-center">
					<p className="text-red-500">{error}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen pt-20">
			{/* Hero Section */}
			<section className="py-24 bg-gradient-to-br from-gtu-base to-gtu-light">
				<div className="max-w-7xl mx-auto px-6 lg:px-16">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center"
					>
						<h1 className="text-hero font-extrabold text-foreground mb-6">
							Our Startups
						</h1>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
							Discover the innovative companies that have emerged from GTU Ventures,
							transforming ideas into market-ready solutions.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Logo wall inserted directly after hero */}
			{/* <LogoWall /> */}

			{/* Filters and Search */}
			<section className="py-12 bg-background border-b">
				<div className="max-w-7xl mx-auto px-6 lg:px-16">
					<div className="space-y-10">
						<div className="text-center">
							<h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
								Sector
							</h3>
							<div className="flex flex-wrap justify-center gap-2">
								{industries.map((industry) => (
									<Button
										key={industry}
										variant={
											selectedIndustry === industry ? 'default' : 'outline'
										}
										size="sm"
										onClick={() => setSelectedIndustry(industry)}
									>
										{industry}
									</Button>
								))}
							</div>
						</div>

						<div className="text-center">
							<h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
								Stage
							</h3>
							<div className="flex flex-wrap justify-center gap-2">
								{stages.map((stage) => (
									<Button
										key={stage}
										variant={selectedStage === stage ? 'default' : 'outline'}
										size="sm"
										onClick={() => setSelectedStage(stage)}
										data-testid={`filter-stage-${stage.toLowerCase()}`}
									>
										{stage}
									</Button>
								))}
							</div>
						</div>

						<div className="max-w-md mx-auto relative">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
							<Input
								type="text"
								placeholder="Search startups..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
								data-testid="search-input"
							/>
						</div>
					</div>
				</div>
			</section>

			<section className="py-6 bg-background">
				<div className="max-w-7xl mx-auto px-6 lg:px-16">
					<p className="text-muted-foreground text-center" data-testid="results-count">
						Showing {filteredStartups.length} of {startups.length} startups
					</p>
				</div>
			</section>

			<section className="py-12 bg-background">
				<div className="max-w-7xl mx-auto px-6 lg:px-16">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{filteredStartups.map((startup, index) => (
							<motion.div
								key={startup.id ?? index}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								data-testid={`startup-card-${startup.id ?? index}`}
								onClick={() => setSelectedStartup(startup)}
								className="cursor-pointer"
							>
								<Card className="h-full hover-lift cursor-pointer">
									<CardContent className="p-6">
										<div className="flex-1 min-w-0">
											<h3 className="text-xl font-bold text-foreground mb-1 line-clamp-2">
												{startup.name}
											</h3>
										</div>
										<div className="flex items-center gap-4 mb-7">
											{startup?.logo && (
												<img
													src={
														startup.logo.startsWith('http')
															? startup.logo
															: `${baseURL.replace(
																	/\/$/,
																	''
															  )}${startup.logo.replace(/\\/g, '/')}`
													}
													alt={startup.name}
													className="w-20 h-20 rounded-xl object-cover mx-auto"
												/>
											)}
										</div>
										<p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3 break-words">
											{startup.description}
										</p>
										<div className="flex flex-wrap gap-2 mb-4">
											<Badge variant="secondary">{startup.industry}</Badge>
											<Badge variant="outline">{startup.stage}</Badge>
										</div>
										<div className="space-y-2 mb-4 text-sm">
											<div className="flex items-center gap-2">
												<span className="font-medium flex-shrink-0">Founders:</span>
												<span className="text-muted-foreground truncate">
													{Array.isArray(startup.founders)
														? startup.founders.join(', ')
														: 'N/A'}
												</span>
											</div>
										</div>
										<Button
											variant="outline"
											size="sm"
											className="w-full"
											asChild
											data-testid={`startup-visit-${startup.id ?? index}`}
										>
											<a
												href={startup.website}
												target="_blank"
												rel="noopener noreferrer"
											>
												<ExternalLink className="w-4 h-4 mr-2" />
												Visit Website
											</a>
										</Button>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			<Dialog open={!!selectedStartup} onOpenChange={() => setSelectedStartup(null)}>
				<DialogContent className="max-w-lg">
					<DialogHeader className="text-center">
						<DialogTitle>{selectedStartup?.name}</DialogTitle>
					</DialogHeader>

					<div className="flex flex-col items-center mb-4">
						{selectedStartup?.logo ? (
							<img
								src={
									selectedStartup.logo.startsWith('http')
										? selectedStartup.logo
										: `${baseURL.replace(
												/\/$/,
												''
										  )}${selectedStartup.logo.replace(/\\/g, '/')}`
								}
								alt={`${selectedStartup?.name} logo`}
								className="w-20 h-20 rounded-lg object-cover border mb-2"
								onError={(e) => (e.currentTarget.style.display = 'none')}
							/>
						) : null}
					</div>

					<div className="space-y-3 text-sm mt-2">
						<p className="break-words">
							<strong>Description:</strong> {selectedStartup?.description}
						</p>
						<p className="break-words">
							<strong>Founders:</strong>{' '}
							{Array.isArray(selectedStartup?.founders)
								? selectedStartup?.founders.join(', ')
								: 'N/A'}
						</p>
						<p>
							<strong>Sector:</strong> {selectedStartup?.industry}
						</p>
						<p>
							<strong>Stage:</strong> {selectedStartup?.stage}
						</p>
						<p>
							<strong>Location:</strong> {selectedStartup?.location ?? 'N/A'}
						</p>
						<p className="break-words">
							<strong>Website:</strong>{' '}
							<a
								href={selectedStartup?.website}
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary underline ml-1 break-all"
							>
								{selectedStartup?.website}
							</a>
						</p>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
