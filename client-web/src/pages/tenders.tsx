import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Search } from 'lucide-react';
import { fetchGet } from '@/utils/fetch.utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const baseURL = import.meta.env.VITE_URL;

export default function Tenders() {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState(null);
	const [selectedTenderVersions, setSelectedTenderVersions] = useState<any[] | null>(null);
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

	// Group tenders by parentId (like admin side)
	const groupedTenders = useMemo(() => {
		const tenderMap = new Map();
		const allTenders = (items || []).filter((d) => d.type === 'tender');

		allTenders.forEach((it) => {
			const parentId = (it.parentId || it._id).toString();
			if (!tenderMap.has(parentId)) {
				tenderMap.set(parentId, []);
			}
			tenderMap.get(parentId).push(it);
		});

		// Sort versions within each group (latest first)
		tenderMap.forEach((versions) => {
			versions.sort((a, b) => (b.version || 1) - (a.version || 1));
		});

		return Array.from(tenderMap.values())
			.map((versions) => {
				const latest = versions[0];
				return {
					versions: versions.map((it, i) => ({
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
						url: it.fileUrl
							? `${baseURL}${it.fileUrl.replace(/\\/g, '/')}`
							: it.url || '#',
						date: it.date
							? new Date(it.date)
							: it.created_at
							? new Date(it.created_at)
							: null,
						dateString: it.date
							? new Date(it.date).toLocaleDateString('en-GB')
							: it.created_at
							? new Date(it.created_at).toLocaleDateString('en-GB')
							: '',
						status: it.status,
						type: it.type,
						created_at: it.created_at
							? new Date(it.created_at).toISOString().split('T')[0]
							: '',
						previousData: it.previousData || null,
						version: it.version || 1,
						isLatest: it.isLatest !== false,
					})),
					latest: null,
				};
			})
			.map((group) => {
				group.latest = group.versions[0];
				return group;
			});
	}, [items]);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		return groupedTenders.filter(
			(group) =>
				!q ||
				group.latest.title.toLowerCase().includes(q) ||
				(group.latest.summary || '').toLowerCase().includes(q)
		);
	}, [groupedTenders, query]);

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
							{filtered.map((group, index) => {
								const latest = group.latest;
								const secondLatest = group.versions[1] || null;
								return (
									<tr
										key={latest.id}
										className="bg-card hover:shadow rounded-xl cursor-pointer transition"
										onClick={() => {
											setSelectedTenderVersions(group.versions);
											setSelected(latest);
										}}
									>
										<td className="p-3 text-xs text-gray-800 font-medium">
											{index + 1}
										</td>
										<td className="p-3 text-base text-gray-700 font-medium">
											<div className="flex items-center gap-2">
												{latest.title}
												{latest.version && latest.version > 1 && (
													<span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded">
														v{latest.version}
													</span>
												)}
											</div>
										</td>
										<td className="p-3 max-w-xs">
											<div className="space-y-2">
												{/* Latest Version */}
												<div className="text-xs space-y-1 p-2 bg-primary/5 rounded border-l-2 border-primary">
													<div className="font-semibold text-primary mb-1">
														v{latest.version || 1} (Latest):
													</div>
													<div className="text-base text-gray-700 font-medium">
														<strong>Title:</strong> {latest.title}
													</div>
													{latest.summary && (
														<div className="text-base text-gray-700 font-medium truncate">
															<strong>Summary:</strong>{' '}
															{latest.summary.substring(0, 80)}
															{latest.summary.length > 80 && '...'}
														</div>
													)}
												</div>
												{/* Second Latest Version (if exists) */}
												{secondLatest && (
													<div className="text-xs space-y-1 p-2 bg-muted rounded border-l-2 border-muted-foreground">
														<div className="font-semibold text-muted-foreground mb-1">
															v{secondLatest.version || 1}:
														</div>
														<div className="text-gray-600 font-medium">
															<strong>Title:</strong>{' '}
															{secondLatest.title}
														</div>
														{/* {secondLatest.summary && (
															<div className="text-gray-600 font-medium truncate">
																<strong>Summary:</strong>{' '}
																{secondLatest.summary.substring(
																	0,
																	80
																)}
																{secondLatest.summary.length > 80 &&
																	'...'}
															</div>
														)} */}
													</div>
												)}
												{group.versions.length > 2 && (
													<div className="text-xs text-muted-foreground italic">
														+ {group.versions.length - 2} more
														version(s)
													</div>
												)}
											</div>
										</td>

										<td className="p-3 flex flex-wrap gap-1">
											{latest.tags.map((tg, i) => (
												<span
													key={i}
													className="text-primary text-base font-medium px-2 py-1 rounded-full"
												>
													{tg}
												</span>
											))}
										</td>

										<td className="p-3 w-36">{latest.formattedDate}</td>

										<td className="p-3 text-right">
											<Button
												variant="ghost"
												size="sm"
												asChild
												onClick={(e) => e.stopPropagation()}
											>
												<a
													href={latest.url}
													target="_blank"
													rel="noopener noreferrer"
												>
													<Download className="w-4 h-4" />
												</a>
											</Button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</section>

			<Dialog
				open={!!selected}
				onOpenChange={() => {
					setSelected(null);
					setSelectedTenderVersions(null);
				}}
			>
				<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
					{selected && selectedTenderVersions && selectedTenderVersions.length > 0 && (
						<>
							<DialogHeader>
								<DialogTitle className="text-2xl font-bold text-foreground mb-2">
									{selected.title} - All Versions
								</DialogTitle>
								<DialogDescription>
									Total {selectedTenderVersions.length} version(s) available
								</DialogDescription>
							</DialogHeader>
							<Tabs
								defaultValue={`v${selectedTenderVersions[0].version || 1}`}
								className="w-full"
							>
								<TabsList className="grid w-full grid-cols-3 gap-2">
									{selectedTenderVersions.map((version) => (
										<TabsTrigger
											key={version.id}
											value={`v${version.version || 1}`}
											className="text-xs"
										>
											v{version.version || 1}
											{version.version !== 1 && version.isLatest && (
												<Badge variant="default" className="ml-1 text-xs">
													Latest
												</Badge>
											)}
										</TabsTrigger>
									))}
								</TabsList>
								{selectedTenderVersions.map((version) => (
									<TabsContent
										key={version.id}
										value={`v${version.version || 1}`}
										className="space-y-4 mt-4"
									>
										<div className="p-4 border rounded-lg">
											<div className="flex items-center justify-between mb-4">
												<h3 className="text-lg font-semibold">
													Version {version.version || 1}
													{version.version !== 1 && version.isLatest && (
														<Badge variant="default" className="ml-2">
															Latest
														</Badge>
													)}
												</h3>
												{version.dateString && (
													<span className="text-sm text-muted-foreground">
														Date: {version.dateString}
													</span>
												)}
											</div>
											<div className="space-y-3">
												<div>
													<strong>Title:</strong> {version.title}
												</div>
												{version.summary && (
													<div>
														<strong>Summary:</strong> {version.summary}
													</div>
												)}
												{version.tags && version.tags.length > 0 && (
													<div>
														<strong>Tags:</strong>{' '}
														{version.tags.map((tag, i) => (
															<Badge
																key={i}
																variant="outline"
																className="mr-1"
															>
																{tag}
															</Badge>
														))}
													</div>
												)}
												{version.previousData && (
													<div className="mt-4 p-3 bg-muted rounded border-l-4 border-muted-foreground">
														<strong className="text-muted-foreground">
															Previous Version Data (v
															{(version.version || 1) - 1}):
														</strong>
														<div className="mt-2 space-y-1 text-sm">
															<div>
																<strong>Title:</strong>{' '}
																{version.previousData.title}
															</div>
															{version.previousData.summary && (
																<div>
																	<strong>Summary:</strong>{' '}
																	{version.previousData.summary}
																</div>
															)}
															{version.previousData.date && (
																<div>
																	<strong>Date:</strong>{' '}
																	{new Date(
																		version.previousData.date
																	).toLocaleDateString()}
																</div>
															)}
														</div>
													</div>
												)}
												{version.url && (
													<div className="pt-4">
														<Button asChild className="w-full">
															<a
																href={version.url}
																target="_blank"
																rel="noopener noreferrer"
															>
																<Download className="w-4 h-4 mr-2" />{' '}
																Download Tender Document
															</a>
														</Button>
													</div>
												)}
											</div>
										</div>
									</TabsContent>
								))}
							</Tabs>
						</>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
