import { motion } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Reports() {
	const baseURL = import.meta.env.VITE_URL;
	const [reports, setReports] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [filter, setFilter] = useState<string>('All');
	const [selectedReport, setSelectedReport] = useState<any | null>(null);
	const [search, setSearch] = useState('');

	useEffect(() => {
		const fetchReports = async () => {
			try {
				const res = await fetch(`${baseURL}user/get-reports`);
				if (!res.ok) throw new Error('Failed to fetch reports');
				const json = await res.json();
				const data = json.data || [];
				setReports(data);
			} catch (err: any) {
				setError(err.message || 'Error fetching reports');
			} finally {
				setLoading(false);
			}
		};
		fetchReports();
	}, [baseURL]);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
	};

	const itemVariants = {
		hidden: { y: 12, opacity: 0 },
		visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
	};

	const visible = useMemo(() => {
		return reports.filter((r: any) => {
			const text = `${r.title} ${r.description}`.toLowerCase();
			return text.includes(search.toLowerCase());
		});
	}, [reports, search]);

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
								<div className="h-4 w-16 bg-gray-300 rounded mb-2 animate-pulse"></div>
								<div className="h-10 w-full max-w-sm bg-gray-200 rounded-full animate-pulse"></div>
							</div>
						</div>
					</div>
				</section>

				<section className="py-14">
					<div className="max-w-7xl mx-auto px-6 lg:px-16">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{Array.from({ length: 6 }).map((_, i) => (
								<div key={i} className="p-6 border rounded-xl animate-pulse">
									<div className="h-48 bg-gray-300 rounded mb-4"></div>
									<div className="h-5 w-3/4 bg-gray-300 rounded mb-2"></div>
									<div className="h-4 w-full bg-gray-200 rounded"></div>
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
				<p className="text-red-500">{error}</p>
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
							Annual & Impact Reports
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
							Download our annual and impact reports to review GTU Ventures' performance and outcomes.
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
								<h5 className="text-center mb-2 text-base font-medium">SEARCH</h5>
								<div className="relative w-full max-w-sm">
									<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
									<Input
										type="text"
										placeholder="Search reports..."
										value={search}
										onChange={(e) => setSearch(e.target.value)}
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
					<div className="mb-8 text-sm text-muted-foreground text-center">
						{visible.length} reports
					</div>

			{visible.length === 0 ? (
				<div className="text-center text-muted-foreground py-10">No reports found.</div>
			) : (
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					{visible.map((it: any, i: number) => (
						<motion.article
							variants={itemVariants}
							key={it._id ?? i}
							className="bg-card rounded-3xl overflow-hidden border shadow-sm hover-lift cursor-pointer"
							onClick={() => setSelectedReport(it)}
						>
							<div className="w-full h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
								<svg
									className="w-16 h-16 text-primary/30"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
									/>
								</svg>
							</div>

							<div className="p-6">
								<div className="flex items-start justify-between gap-2 mb-2">
									<div className="font-semibold text-lg line-clamp-2 flex-1 min-w-0">
										{it.title}
									</div>
									{it.category && (
										<div className="text-xs px-2 py-1 bg-accent/10 text-accent rounded flex-shrink-0">
											{it.category}
										</div>
									)}
								</div>

								{it.description && (
									<div className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
										{it.description}
									</div>
								)}

								<div className="mt-2">
									<a
										href={
											it.fileUrl
												? `${baseURL}${it.fileUrl.replace(/\\/g, '/')}`
												: '#'
										}
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary font-medium hover:underline text-sm"
										onClick={(e) => e.stopPropagation()}
									>
										Download PDF
									</a>
								</div>
							</div>
						</motion.article>
					))}
				</motion.div>
			)}

			{/* Report Detail Modal */}
			<Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
				<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
					{selectedReport && (
						<>
							<DialogHeader>
								<div className="flex items-center justify-between gap-4 mb-4">
									<DialogTitle className="text-2xl font-bold text-foreground flex-1 min-w-0">
										{selectedReport.title}
									</DialogTitle>
									{selectedReport.category && (
										<div className="text-xs px-2 py-1 bg-accent/10 text-accent rounded flex-shrink-0">
											{selectedReport.category}
										</div>
									)}
								</div>
								{selectedReport.description && (
									<DialogDescription className="text-base">
										{selectedReport.description}
									</DialogDescription>
								)}
							</DialogHeader>

							<div className="space-y-4">
								<div className="flex items-center justify-center p-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
									<svg
										className="w-20 h-20 text-primary/30"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
										/>
									</svg>
								</div>

								{selectedReport.date && (
									<div className="text-sm text-muted-foreground">
										<strong>Date:</strong>{' '}
										{new Date(selectedReport.date).toLocaleDateString()}
									</div>
								)}

								{selectedReport.created_at && (
									<div className="text-sm text-muted-foreground">
										<strong>Published:</strong>{' '}
										{new Date(selectedReport.created_at).toLocaleDateString()}
									</div>
								)}

								<div className="pt-4">
									<Button asChild className="w-full">
										<a
											href={
												selectedReport.fileUrl
													? `${baseURL}${selectedReport.fileUrl.replace(
															/\\/g,
															'/'
													  )}`
													: '#'
											}
											target="_blank"
											rel="noopener noreferrer"
										>
											<Download className="w-4 h-4 mr-2" />
											Download PDF
										</a>
									</Button>
								</div>
							</div>
						</>
					)}
				</DialogContent>
			</Dialog>
				</div>
			</section>
		</div>
	);
}
