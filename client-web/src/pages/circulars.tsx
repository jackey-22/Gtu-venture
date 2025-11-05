import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Search, ChevronDown, Check } from 'lucide-react';
import { fetchGet } from '@/utils/fetch.utils';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import {
	Command,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
} from '@/components/ui/command';

const baseURL = import.meta.env.VITE_URL;

type Circular = {
	id: string;
	title: string;
	summary?: string;
	tags?: string[];
	url?: string; // PDF download
	date?: string;
};

const DEMO: Circular[] = [
	{
		id: 'c1',
		title: 'Circular: Startup Intake 2025-1',
		summary: 'Open call for startups for the 2025 cohort.',
		tags: ['intake', 'program'],
		url: '#',
		date: '2025-07-01',
	},
	{
		id: 'c2',
		title: 'Circular: Lab Access Policy',
		summary: 'Updated safety and access policy for campus labs.',
		tags: ['policy', 'facilities'],
		url: '#',
		date: '2025-06-12',
	},
	{
		id: 'c3',
		title: 'Circular: Funding Opportunity - Seed Grants',
		summary: 'Information on seed grants for incubated startups.',
		tags: ['funding'],
		url: '#',
		date: '2025-05-20',
	},
	{
		id: 't1',
		title: 'Tender: IT Infrastructure Upgrade',
		summary: 'Procurement notice for campus IT infrastructure modernization.',
		tags: ['tender', 'procurement', 'IT'],
		url: '#',
		date: '2025-06-25',
	},
	{
		id: 't2',
		title: 'Tender: Lab Equipment Procurement',
		summary: 'Public tender for advanced prototyping equipment and tools.',
		tags: ['tender', 'procurement', 'equipment'],
		url: '#',
		date: '2025-06-18',
	},
	{
		id: 't3',
		title: 'Tender: Event Management Services',
		summary: 'Procurement for startup demo day and networking event services.',
		tags: ['tender', 'procurement', 'events'],
		url: '#',
		date: '2025-06-10',
	},
];

export default function Circulars() {
	const [items, setItems] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedCircular, setSelectedCircular] = useState<Circular | null>(null);
	const [typeFilter, setTypeFilter] = useState<'all' | 'circular' | 'tender'>('all');
	const [typeFilterOpen, setTypeFilterOpen] = useState(false);
	const typeFilters = [
		{ key: 'all', label: 'All' },
		{ key: 'circular', label: 'Circulars' },
		{ key: 'tender', label: 'Tenders' },
	];

	useEffect(() => {
		const fetchCirculars = async () => {
			try {
				const data = await fetchGet({ pathName: 'user/get-circulars' });
				const circulars = data?.data || [];
				setItems(circulars);
			} catch (error) {
				console.error('Error fetching circulars:', error);
				setItems([]);
			} finally {
				setLoading(false);
			}
		};
		fetchCirculars();
	}, []);

	const circulars: Circular[] = useMemo(() => {
		if (items.length) {
			return items.map((it: any, i: number) => ({
				id: it._id || it.id || `c_${i}`,
				title: it.title || it.name,
				summary: it.summary || it.body,
				tags: it.tags || [],
				type: it.type || (it.id?.startsWith('t') ? 'tender' : 'circular'),
				url: it.fileUrl ? `${baseURL}${it.fileUrl.replace(/\\/g, '/')}` : it.url || '#',
				date: it.date
					? new Date(it.date).toISOString().split('T')[0]
					: it.created_at
					? new Date(it.created_at).toISOString().split('T')[0]
					: '',
			}));
		}
		return DEMO;
	}, [items]);

	const [query, setQuery] = useState('');
	const [tag, setTag] = useState<string | null>(null);

	const tags = useMemo(
		() => Array.from(new Set(circulars.flatMap((c) => c.tags || []))),
		[circulars]
	);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();

		return circulars.filter((c) => {
			const matchesType = typeFilter === 'all' || c.type === typeFilter;
			const matchesQ =
				!q ||
				c.title.toLowerCase().includes(q) ||
				(c.summary || '').toLowerCase().includes(q);
			const matchesTag = !tag || (c.tags || []).includes(tag);

			return matchesType && matchesQ && matchesTag;
		});
	}, [circulars, query, tag, typeFilter]);

	if (loading) {
		return (
			<div className="min-h-screen pt-7">
				<section className="pt-20 pb-5">
					<div className="max-w-7xl px-6 lg:px-16 text-start">
						<div className="mx-auto flex flex-col items-start gap-4">
							<div className="h-10 w-64 bg-white/40 rounded animate-pulse"></div>
							<div className="h-4 w-96 bg-white/30 rounded animate-pulse"></div>
						</div>
					</div>
				</section>

				<section className="py-5">
					<div className="max-w-5xl px-6 md:px-16">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start justify-normal">
							<div className="w-full flex flex-col items-start">
								<div className="h-4 w-20 bg-gray-300 rounded mb-2 animate-pulse"></div>
								<div className="h-10 w-full max-w-xs bg-gray-200 rounded-full animate-pulse"></div>
							</div>
							<div className="w-full flex flex-col items-start">
								<div className="h-4 w-16 bg-gray-300 rounded mb-2 animate-pulse"></div>
								<div className="h-10 w-full max-w-sm bg-gray-200 rounded-full animate-pulse"></div>
							</div>
						</div>
					</div>
				</section>

				<section className="py-14">
					<div className="max-w-7xl mx-auto px-6 lg:px-16">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{Array.from({ length: 4 }).map((_, i) => (
								<div key={i} className="p-6 border rounded-xl animate-pulse">
									<div className="h-6 w-3/4 bg-gray-300 rounded mb-4"></div>
									<div className="h-4 w-full bg-gray-200 rounded"></div>
								</div>
							))}
						</div>
					</div>
				</section>
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
							Circulars
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
							Official notices, policies, and program circulars from GTU Ventures.
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
								<h5 className="text-center mb-2 text-base font-medium">TYPE</h5>
								<Popover open={typeFilterOpen} onOpenChange={setTypeFilterOpen}>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											className="w-full max-w-xs justify-between rounded-full"
										>
											{typeFilters.find((f) => f.key === typeFilter)?.label ||
												'All'}
											<ChevronDown className="ml-2 h-4 w-4 opacity-50" />
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-[250px] p-0">
										<Command>
											<CommandInput placeholder="Search type…" />
											<CommandList className="max-h-60 overflow-y-auto">
												<CommandEmpty>No type found.</CommandEmpty>
												<CommandGroup>
													{typeFilters.map((f) => (
														<CommandItem
															key={f.key}
															onSelect={() => {
																setTypeFilter(f.key as any);
																setTypeFilterOpen(false);
															}}
															className="cursor-pointer"
														>
															{f.label}
															{typeFilter === f.key && (
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
										value={query}
										onChange={(e) => setQuery(e.target.value)}
										placeholder="Search circulars..."
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
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{filtered.map((c) => (
							<article
								key={c.id}
								className="rounded-2xl bg-card p-6 shadow border border-transparent cursor-pointer hover:shadow-lg transition-all"
								onClick={() => setSelectedCircular(c)}
							>
								<div className="flex items-start justify-between gap-4">
									<div className="flex-1 min-w-0">
										<h3 className="font-semibold text-lg line-clamp-2">
											{c.title}
										</h3>
										<div className="text-sm text-muted-foreground mt-1">
											{c.date}
										</div>
									</div>
									<a
										href={c.url}
										className="text-muted-foreground hover:text-primary flex items-center gap-2 flex-shrink-0"
										onClick={(e) => e.stopPropagation()}
									>
										<Download className="w-4 h-4" />
										<span className="text-sm hidden sm:inline">Download</span>
									</a>
								</div>
								{c.summary ? (
									<p className="mt-4 text-sm text-muted-foreground line-clamp-2">
										{c.summary}
									</p>
								) : null}
								{c.tags?.length ? (
									<div className="mt-4 flex flex-wrap gap-2">
										{c.tags.map((t) => (
											<span
												key={t}
												className="text-xs px-2 py-1 bg-muted rounded whitespace-nowrap"
											>
												{t}
											</span>
										))}
									</div>
								) : null}
							</article>
						))}
					</div>
				</div>
			</section>

			{/* Circular Detail Modal */}
			<Dialog open={!!selectedCircular} onOpenChange={() => setSelectedCircular(null)}>
				<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
					{selectedCircular && (
						<>
							<DialogHeader>
								<DialogTitle className="text-2xl font-bold text-foreground mb-2">
									{selectedCircular.title}
								</DialogTitle>
								{selectedCircular.date && (
									<DialogDescription className="text-sm">
										Published: {selectedCircular.date}
									</DialogDescription>
								)}
							</DialogHeader>

							<div className="space-y-4">
								{selectedCircular.summary && (
									<p className="text-muted-foreground leading-relaxed">
										{selectedCircular.summary}
									</p>
								)}

								{selectedCircular.tags?.length > 0 && (
									<div className="flex flex-wrap gap-2">
										{selectedCircular.tags.map((t) => (
											<Badge key={t} variant="secondary">
												{t}
											</Badge>
										))}
									</div>
								)}

								{selectedCircular.url && (
									<div className="pt-4">
										<Button asChild className="w-full">
											<a
												href={selectedCircular.url}
												target="_blank"
												rel="noopener noreferrer"
											>
												<Download className="w-4 h-4 mr-2" />
												Download Document
											</a>
										</Button>
									</div>
								)}
							</div>
						</>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
