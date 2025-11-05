import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function News() {
	const baseURL = import.meta.env.VITE_URL;
	const [articles, setArticles] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [search, setSearch] = useState('');
	const [selected, setSelected] = useState<any | null>(null);

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const res = await fetch(`${baseURL}user/get-news`);
				if (!res.ok) throw new Error('Failed to fetch news');
				const json = await res.json();
				const data = json.data || [];
				setArticles(data);
			} catch (err: any) {
				setError(err.message || 'Error fetching news');
			} finally {
				setLoading(false);
			}
		};
		fetchNews();
	}, [baseURL]);

	const filteredArticles = useMemo(() => {
		const term = search.toLowerCase();
		return articles.filter(
			(a: any) =>
				(a.title?.toLowerCase() || '').includes(term) ||
				(a.category?.toLowerCase() || '').includes(term) ||
				(a.content?.toLowerCase() || '').includes(term) ||
				(a.description?.toLowerCase() || '').includes(term)
		);
	}, [search, articles]);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
	};

	const itemVariants = {
		hidden: { y: 12, opacity: 0 },
		visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
	};

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
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
							{Array.from({ length: 6 }).map((_, i) => (
								<div key={i} className="p-6 border rounded-xl animate-pulse">
									<div className="h-48 bg-gray-300 rounded mb-4"></div>
									<div className="h-3 bg-gray-200 rounded mb-2 w-full"></div>
									<div className="h-3 bg-gray-200 rounded mb-2 w-5/6"></div>
									<div className="h-3 bg-gray-200 rounded mb-4 w-4/6"></div>
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
							News, Media & Insights
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
							Stay updated with the latest announcements, media coverage, thought leadership articles, and startup ecosystem insights from GTU Ventures.
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
										placeholder="Search news..."
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
					{/* Results Count */}
					<p className="text-center text-muted-foreground mb-6 text-sm">
						Showing {filteredArticles.length} of {articles.length} results
					</p>
					{/* Articles Grid */}
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
					>
				{filteredArticles.map((article, idx) => (
					<motion.div
						key={article._id ?? idx}
						variants={itemVariants}
						className="bg-card rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all"
						onClick={() => setSelected(article)}
					>
						{article.images && article.images.length > 0 && (
							<img
								src={`${baseURL}${article.images[0].replace(/\\/g, '/')}`}
								alt={article.title}
								className="w-full h-48 object-cover"
								onError={(e) => (e.currentTarget.style.display = 'none')}
							/>
						)}
						<div className="p-5">
							<div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
								<span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">
									{article.category || 'Uncategorized'}
								</span>
								<span className="text-xs text-muted-foreground whitespace-nowrap">
									{article.date
										? new Date(article.date).toLocaleDateString()
										: article.created_at
										? new Date(article.created_at).toLocaleDateString()
										: ''}
								</span>
							</div>
							<h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
								{article.title}
							</h3>
							<p className="text-sm text-muted-foreground line-clamp-3">
								{article.content || article.description || ''}
							</p>
						</div>
					</motion.div>
					))}
					</motion.div>
				</div>
			</section>

			{/* Modal */}
			<Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
				<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
					{selected && (
						<>
							<DialogHeader>
								<div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
									<span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">
										{selected.category || 'Uncategorized'}
									</span>
									<span className="text-xs text-muted-foreground whitespace-nowrap">
										{selected.date
											? new Date(selected.date).toLocaleDateString()
											: selected.created_at
											? new Date(selected.created_at).toLocaleDateString()
											: ''}
									</span>
								</div>
								<DialogTitle className="text-2xl font-bold text-foreground mb-2">
									{selected.title}
								</DialogTitle>
							</DialogHeader>

							{selected.images && selected.images.length > 0 && (
								<img
									src={`${baseURL}${selected.images[0].replace(/\\/g, '/')}`}
									className="w-full h-64 object-cover rounded-lg mb-4"
									onError={(e) => (e.currentTarget.style.display = 'none')}
								/>
							)}

							<DialogDescription className="text-base leading-relaxed whitespace-pre-line">
								{selected.content || selected.body || selected.description || ''}
							</DialogDescription>
						</>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
