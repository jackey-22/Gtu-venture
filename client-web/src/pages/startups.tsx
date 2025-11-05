import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import LogoWall from '@/components/startups/logo-wall';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import {
	Command,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
} from '@/components/ui/command';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

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
	const [stages, setStages] = useState<string[]>(['All']);
	const [industryOpen, setIndustryOpen] = useState(false);
	const [stageOpen, setStageOpen] = useState(false);

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

				const sortedStages = [
					'All',
					...[...new Set(formatted.map((s) => s.stage))].filter(Boolean).sort(),
				];
				setStages(sortedStages);
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
				<section className="pt-20 pb-5">
					<div className="max-w-7xl px-6 lg:px-16 text-start">
						<div className="flex flex-col gap-4">
							<div className="h-10 w-64 bg-white/40 rounded animate-pulse"></div>
							<div className="h-5 w-96 bg-white/30 rounded animate-pulse"></div>
						</div>
					</div>
				</section>

				<section className="py-5">
					<div className="max-w-5xl px-6 md:px-16">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start justify-normal">
							{[...Array(3)].map((_, i) => (
								<div key={i} className="w-full flex flex-col items-start gap-2">
									<div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
									<div className="h-10 w-full bg-gray-200 rounded-full animate-pulse"></div>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className="py-14">
					<div className="max-w-7xl mx-auto px-6 lg:px-16">
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
							{[...Array(10)].map((_, i) => (
								<div
									key={i}
									className="aspect-square rounded-2xl shadow-lg bg-gray-200 border animate-pulse"
								></div>
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
		<div className="min-h-screen pt-7">
			<section className="pt-20 pb-5">
				<div className="max-w-7xl px-6 lg:px-16 text-start">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-start"
					>
						<h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-2">
							Our Portfolio
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
							Explore portfolios nurtured and powered by GTU Ventures.
						</p>
					</motion.div>
				</div>
			</section>

			<section className="py-5">
				<div className="max-w-5xl px-6 md:px-16">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-start"
					>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start justify-normal">
							<div className="w-full flex flex-col items-start">
								<h5 className="text-center mb-2 text-base font-medium">SECTOR</h5>
								<Popover open={industryOpen} onOpenChange={setIndustryOpen}>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											className="w-full max-w-xs justify-between rounded-full"
										>
											{selectedIndustry}
											<ChevronDown className="ml-2 h-4 w-4 opacity-50" />
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-[250px] p-0">
										<Command>
											<CommandInput placeholder="Search sector…" />
											<CommandList className="max-h-60 overflow-y-auto">
												<CommandEmpty>No sector found.</CommandEmpty>
												<CommandGroup>
													{industries.map((ind) => (
														<CommandItem
															key={ind}
															onSelect={() => {
																setSelectedIndustry(ind);
																setIndustryOpen(false); // ✅ close popover on select
															}}
															className="cursor-pointer"
														>
															{ind}
															{selectedIndustry === ind && (
																<Check className="ml-auto h-4 w-4" />
															)}
														</CommandItem>
													))}
												</CommandGroup>
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
							</div>

							<div className="w-full flex flex-col items-start">
								<h5 className="text-center mb-2 text-base font-medium">STAGE</h5>
								<Popover open={stageOpen} onOpenChange={setStageOpen}>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											className="w-full max-w-xs justify-between rounded-full"
										>
											{selectedStage}
											<ChevronDown className="ml-2 h-4 w-4 opacity-50" />
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-[250px] p-0">
										<Command>
											<CommandInput placeholder="Search stage…" />
											<CommandList className="max-h-60 overflow-y-auto">
												<CommandEmpty>No stage found.</CommandEmpty>
												<CommandGroup>
													{stages.map((st) => (
														<CommandItem
															key={st}
															onSelect={() => {
																setSelectedStage(st);
																setStageOpen(false); // ✅ close popover on select
															}}
															className="cursor-pointer"
														>
															{st}
															{selectedStage === st && (
																<Check className="ml-auto h-4 w-4" />
															)}
														</CommandItem>
													))}
												</CommandGroup>
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
							</div>

							<div className="w-full flex flex-col items-start">
								<h5 className="text-center mb-2 text-base font-medium">SEARCH</h5>
								<div className="relative w-full max-w-sm">
									<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
									<Input
										placeholder="Search portfolios..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="pl-10 rounded-full"
									/>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			<section className="py-14">
				<div className="max-w-7xl mx-auto px-6 lg:px-16">
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
						{filteredStartups.map((s, i) => (
							<motion.div
								key={s.id ?? i}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: i * 0.05, duration: 0.4 }}
								onClick={() => setSelectedStartup(s)}
								className="cursor-pointer group"
							>
								<div className="aspect-square rounded-2xl shadow-lg bg-white flex items-center justify-center border hover:shadow-xl hover:-translate-y-2 transition-all p-4 relative">
									<img
										src={
											s.logo.startsWith('http')
												? s.logo
												: `${baseURL.replace(/\/$/, '')}${s.logo.replace(
														/\\/g,
														'/'
												  )}`
										}
										className="object-contain max-h-full max-w-full"
										alt={s.name}
									/>

									<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all rounded-2xl">
										<p className="text-white text-sm font-semibold text-center px-2">
											{s.name}
										</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			<Dialog open={!!selectedStartup} onOpenChange={() => setSelectedStartup(null)}>
				<DialogContent className="max-w-md backdrop-blur-xl">
					<DialogHeader>
						<DialogTitle className="text-center text-2xl font-bold">
							{selectedStartup?.name}
						</DialogTitle>
					</DialogHeader>

					<div className="flex flex-col items-center gap-4">
						<img
							src={
								selectedStartup?.logo?.startsWith('http')
									? selectedStartup.logo
									: `${baseURL.replace(
											/\/$/,
											''
									  )}${selectedStartup?.logo?.replace(/\\/g, '/')}`
							}
							className="w-24 h-24 object-cover rounded-xl border shadow"
						/>

						<div className="flex gap-2 flex-wrap justify-center">
							<Badge>{selectedStartup?.industry}</Badge>
							<Badge variant="secondary">{selectedStartup?.stage}</Badge>
						</div>

						<div className="text-sm space-y-1 text-center">
							<p>
								<b>Founders:</b>{' '}
								{Array.isArray(selectedStartup?.founders)
									? selectedStartup?.founders.join(', ')
									: 'N/A'}
							</p>
							<p>
								<b>Location:</b> {selectedStartup?.location ?? 'N/A'}
							</p>
						</div>

						<p className="text-muted-foreground text-center text-sm">
							{selectedStartup?.description}
						</p>

						<Button asChild className="w-full mt-4">
							<a
								href={selectedStartup?.website}
								target="_blank"
								rel="noopener noreferrer"
							>
								Visit Website
							</a>
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
