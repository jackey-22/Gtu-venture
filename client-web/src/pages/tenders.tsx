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
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, File } from 'lucide-react';

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
						fileUrl: it.fileUrl || null,
						externalUrl: it.url || null,
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
						closingDate: it.closingDate || null,
						closingDateString: it.closingDate
							? new Date(it.closingDate).toLocaleDateString('en-GB')
							: '',
						formattedClosingDate: it.closingDate
							? (() => {
									const d = new Date(it.closingDate);
									const day = String(d.getDate()).padStart(2, '0');
									const month = String(d.getMonth() + 1).padStart(2, '0');
									const year = d.getFullYear();
									return `${day}/${month}/${year}`;
							  })()
							: '',
						status: it.status,
						type: it.type,
						created_at: it.created_at
							? new Date(it.created_at).toISOString().split('T')[0]
							: '',
						previousData: it.previousData || null,
						version: it.version || 1,
						docNumber: it.version || 1,
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
						{loading ? (
							<div className="space-y-3 max-w-sm">
								<Skeleton className="h-4 w-20" />
								<Skeleton className="h-10 w-full rounded-full" />
							</div>
						) : (
							<>
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
							</>
						)}
					</motion.div>
				</div>
			</section>

			<section className="py-5 px-6 lg:px-16">
				<div className="mx-auto px-6 lg:px-16 overflow-x-auto">
					<table className="w-full text-sm text-left border-separate border-spacing-y-2">
						<thead>
							<tr className="text-black text-sm md:text-base uppercase bg-gray-200">
								<th className="p-3 font-bold">Sr No.</th>
								<th className="p-3 font-bold">Title</th>
								<th className="p-3 font-bold">Summary</th>
								<th className="p-3 font-bold">Tags</th>
								<th className="p-3 font-bold">Date</th>
								<th className="p-3 font-bold">Closing Date</th>
								<th className="p-3 font-bold">Action</th>
							</tr>
						</thead>

						<tbody>
							{loading ? (
								Array.from({ length: 5 }).map((_, i) => (
									<tr key={i} className="bg-card rounded-xl">
										<td className="p-3">
											<Skeleton className="h-4 w-6 rounded" />
										</td>
										<td className="p-3">
											<Skeleton className="h-4 w-40 rounded mb-1" />
											<Skeleton className="h-4 w-28 rounded" />
										</td>
										<td className="p-3">
											<div className="space-y-2">
												<Skeleton className="h-4 w-48 rounded" />
												<Skeleton className="h-4 w-60 rounded" />
											</div>
										</td>
										<td className="p-3">
											<Skeleton className="h-4 w-20 rounded" />
										</td>
										<td className="p-3">
											<div className="flex gap-1">
												<Skeleton className="h-6 w-16 rounded-full" />
												<Skeleton className="h-6 w-12 rounded-full" />
											</div>
										</td>
										<td className="p-3">
											<Skeleton className="h-4 w-24 rounded" />
										</td>
										<td className="p-3">
											<Skeleton className="h-4 w-24 rounded" />
										</td>
										<td className="p-3 text-right">
											<Skeleton className="h-6 w-6 rounded-full ml-auto" />
										</td>
									</tr>
								))
							) : filtered.length > 0 ? (
								filtered.flatMap((group, index) =>
									group.versions.map((doc, vIndex) => {
										const isLatest = vIndex === 0;

										return (
											<tr
												key={doc._id || `${index}-${vIndex}`}
												className={`bg-card rounded-xl transition cursor-pointer ${
													isLatest
														? 'font-semibold'
														: 'text-muted-foreground'
												} ${!isLatest ? 'border-t border-gray-300' : ''}`}
												onClick={() => {
													setSelectedTenderVersions(group.versions);
													setSelected(doc);
												}}
											>
												<td className="p-3 text-base font-medium">
													{isLatest ? index + 1 : ''}
												</td>

												<td className="p-3 text-base">
													{doc.title}{' '}
													{isLatest && (
														<span className="text-primary text-sm">
															(Latest)
														</span>
													)}
												</td>

												<td className="p-3 max-w-xs">
													{doc.summary
														? doc.summary.length > 100
															? doc.summary.substring(0, 100) + '...'
															: doc.summary
														: '-'}
												</td>

												<td className="p-3 flex flex-wrap gap-1">
													{doc.tags?.map((tg, i) => (
														<span
															key={i}
															className="text-sm font-medium px-2 py-1 rounded-full"
														>
															{tg}
														</span>
													))}
												</td>

												<td className="p-3 text-base">
													{doc.formattedDate}
												</td>

												<td className="p-3 text-base">
													{doc.formattedClosingDate || '-'}
												</td>

												<td className="p-3">
													<Button
														variant="outline"
														size="sm"
														className="h-10 w-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
														asChild
														onClick={(e) => e.stopPropagation()}
													>
														<a
															href={
																doc.fileUrl
																	? `${baseURL}${doc.fileUrl.replace(
																			/\\/g,
																			'/'
																	  )}`
																	: doc.externalUrl || doc.url
															}
															target="_blank"
															rel="noopener noreferrer"
														>
															<FileText className="h-6 w-6" />
														</a>
													</Button>
												</td>
											</tr>
										);
									})
								)
							) : (
								<tr>
									<td
										colSpan={7}
										className="text-center py-6 text-muted-foreground"
									>
										No tenders found
									</td>
								</tr>
							)}
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
									{selected.title} - All Documents
								</DialogTitle>
								<DialogDescription>
									{selectedTenderVersions.length} document(s)
								</DialogDescription>
							</DialogHeader>
							<Tabs
								defaultValue={`v${selectedTenderVersions[0].version || 1}`}
								className="w-full"
							>
								<TabsList className="grid w-full grid-cols-3 gap-2 text-sm font-semibold">
									{selectedTenderVersions.map((doc) => (
										<TabsTrigger
											key={doc.id}
											value={`v${doc.version || 1}`}
											className="text-sm font-semibold"
										>
											<File className="w-4 h-4 mr-1 font-semibold" />
											Doc {doc.docNumber || 1}
											{doc.version !== 1 && doc.isLatest && (
												<Badge variant="default" className="ml-1 text-xs">
													Latest
												</Badge>
											)}
										</TabsTrigger>
									))}
								</TabsList>
								{selectedTenderVersions.map((doc) => (
									<TabsContent
										key={doc.id}
										value={`v${doc.version || 1}`}
										className="space-y-4 mt-4"
									>
										<div className="p-4 border rounded-lg">
											<div className="flex items-center justify-between mb-4">
												<div className="flex items-center gap-4 text-sm text-muted-foreground">
													{doc.dateString && (
														<span>Date: {doc.dateString}</span>
													)}
													{doc.closingDateString && (
														<span>Closing Date: {doc.closingDateString}</span>
													)}
												</div>
											</div>
											<div className="space-y-3">
												<div>
													<strong>Title:</strong> {doc.title}
												</div>
												{doc.summary && (
													<div>
														<strong>Summary:</strong> {doc.summary}
													</div>
												)}
												{doc.tags && doc.tags.length > 0 && (
													<div>
														<strong>Tags:</strong>{' '}
														{doc.tags.map((tag, i) => (
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
												{doc.previousData && (
													<div className="mt-4 px-3 py-2 bg-muted rounded border-l-4 border-muted-foreground">
														<strong className="text-muted-foreground font-semibold">
															Previous Document (Doc{' '}
															{doc.docNumber - 1}):
														</strong>
														<div className="mt-2 space-y-1 text-sm">
															<div>
																<strong>Title:</strong>{' '}
																{doc.previousData.title}
															</div>
															{doc.previousData.date && (
																<div>
																	<strong>Date:</strong>{' '}
																	{new Date(
																		doc.previousData.date
																	).toLocaleDateString()}
																</div>
															)}
															{doc.previousData.closingDate && (
																<div>
																	<strong>Closing Date:</strong>{' '}
																	{new Date(
																		doc.previousData.closingDate
																	).toLocaleDateString()}
																</div>
															)}
														</div>
													</div>
												)}
												{doc.url && (
													<div className="pt-4">
														<Button asChild className="w-full">
															<a
																href={doc.url}
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
