import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Search } from 'lucide-react';
import { fetchGet } from '@/utils/fetch.utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog';

const baseURL = import.meta.env.VITE_URL;

export default function Tenders() {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState(null);
	const [query, setQuery] = useState('');

	useEffect(() => {
		const fetchTenders = async () => {
			try {
				const data = await fetchGet({ pathName: 'user/get-circulars' });
				const tenders = (data?.data || []).filter((d) => d.type === 'tender');
				setItems(tenders);
			} catch (err) {
				console.error('Error fetching tenders:', err);
				setItems([]);
			} finally {
				setLoading(false);
			}
		};
		fetchTenders();
	}, []);

	const tenders = useMemo(() => {
		return (items || []).map((it, i) => ({
			formattedDate: (() => {
				const d = it.date
					? new Date(it.date)
					: it.created_at
					? new Date(it.created_at)
					: null;
				if (!d) return '';
				const day = String(d.getDate()).padStart(2, '0');
				const month = String(d.getMonth() + 1).padStart(2, '0');
				const year = d.getFullYear();
				return `${day}/${month}/${year}`;
			})(),

			id: it._id || `t_${i}`,
			_id: it._id,
			title: it.title,
			summary: it.summary || '',
			tags: it.tags || [],
			url: it.fileUrl ? `${baseURL}${it.fileUrl.replace(/\\/g, '/')}` : it.url || '#',
			date: it.date ? new Date(it.date) : it.created_at ? new Date(it.created_at) : null,
			status: it.status,
			type: it.type,
			created_at: it.created_at ? new Date(it.created_at).toISOString().split('T')[0] : '',
		}));
	}, [items]);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		return tenders.filter(
			(t) =>
				!q ||
				t.title.toLowerCase().includes(q) ||
				(t.summary || '').toLowerCase().includes(q)
		);
	}, [tenders, query]);

	return (
		<div className="min-h-screen pt-7">
			<section className="pt-20 pb-5">
				<div className="max-w-7xl px-6 lg:px-16 text-start">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-2">
							Tenders
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
							Official tender notices & procurement from GTU Ventures
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
					>
						<h5 className="mb-2 text-base font-medium">SEARCH</h5>
						<div className="relative w-full max-w-sm">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
							<Input
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								placeholder="Search tenders..."
								className="pl-10 rounded-full"
							/>
						</div>
					</motion.div>
				</div>
			</section>

			<section className="py-5 px-6 lg:px-16">
				<div className="mx-auto px-6 lg:px-16 overflow-x-auto">
					<table className="w-full text-sm text-left border-separate border-spacing-y-2">
						<thead>
							<tr className="text-black text-sm md:text-base uppercase bg-gray-200">
								<th className="p-3">Sr No.</th>
								<th className="p-3">Title</th>
								<th className="p-3">DESCRIPTION</th>
								<th className="p-3">Tags</th>
								<th className="p-3">POSTING Date</th>
								<th className="p-3 text-right">Action</th>
							</tr>
						</thead>

						<tbody>
							{filtered.map((t, index) => (
								<tr
									key={t.id}
									className="bg-card hover:shadow rounded-xl cursor-pointer transition"
									onClick={() => setSelected(t)}
								>
									<td className="p-3 text-xs text-gray-800 font-medium">
										{index + 1}
									</td>
									<td className="p-3 text-base text-gray-700 font-medium">
										{t.title}
									</td>
									<td className="p-3 max-w-xs text-base text-gray-700 font-medium truncate">
										{t.summary}
									</td>

									<td className="p-3 flex flex-wrap gap-1">
										{t.tags.map((tg, i) => (
											<span
												key={i}
												className="text-primary text-base font-medium px-2 py-1 rounded-full"
											>
												{tg}
											</span>
										))}
									</td>

									<td className="p-3 w-36">{t.formattedDate}</td>

									<td className="p-3 text-right">
										<Button
											variant="ghost"
											size="sm"
											asChild
											onClick={(e) => e.stopPropagation()}
										>
											<a
												href={t.url}
												target="_blank"
												rel="noopener noreferrer"
											>
												<Download className="w-4 h-4" />
											</a>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			<Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
				<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
					{selected && (
						<>
							<DialogHeader>
								<DialogTitle className="text-2xl font-bold text-foreground mb-2">
									{selected.title}
								</DialogTitle>
								{selected.date && (
									<DialogDescription>
										Published: {selected.date}
									</DialogDescription>
								)}
							</DialogHeader>

							{selected.url && (
								<div className="pt-4">
									<Button asChild className="w-full">
										<a
											href={selected.url}
											target="_blank"
											rel="noopener noreferrer"
										>
											<Download className="w-4 h-4 mr-2" /> Download Tender
											Document
										</a>
									</Button>
								</div>
							)}
						</>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
