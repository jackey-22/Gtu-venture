import React, { useMemo, useState, useEffect } from 'react';
import PageShell from './page-shell';
import { Download } from 'lucide-react';
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

	return (
		<PageShell
			title="Circulars"
			subtitle="Official notices, policies, and program circulars from GTU Ventures."
		>
			<div className="space-y-7 mb-10">
				<div className="flex justify-center gap-3 items-center">
					{[
						{ key: 'all', label: 'All' },
						{ key: 'circular', label: 'Circulars' },
						{ key: 'tender', label: 'Tenders' },
					].map(({ key, label }) => (
						<button
							key={key}
							onClick={() => setTypeFilter(key as any)}
							className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
								typeFilter === key
									? 'bg-primary text-white shadow-md'
									: 'bg-muted text-muted-foreground hover:bg-muted/70'
							}`}
						>
							{label}
						</button>
					))}
				</div>
				<div className="flex justify-center items-center">
					<Input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search circulars..."
						className="w-full md:w-1/3 px-4 py-2 border text-sm"
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{filtered.map((c) => (
					<article
						key={c.id}
						className="rounded-2xl bg-card p-6 shadow border border-transparent cursor-pointer hover:shadow-lg transition-all"
						onClick={() => setSelectedCircular(c)}
					>
						<div className="flex items-start justify-between gap-4">
							<div className="flex-1 min-w-0">
								<h3 className="font-semibold text-lg line-clamp-2">{c.title}</h3>
								<div className="text-sm text-muted-foreground mt-1">{c.date}</div>
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

								{selectedCircular.tags && selectedCircular.tags.length > 0 && (
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
		</PageShell>
	);
}
