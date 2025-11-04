import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageShell from './page-shell';
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
			<div className="flex justify-center items-center h-64">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
					<p className="mt-3 text-primary">Loading News...</p>
				</div>
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
		<PageShell
			title="News, Media & Insights"
			subtitle="Stay updated with the latest announcements, media coverage, thought leadership articles, and startup ecosystem insights from GTU Ventures."
		>
			<div className="max-w-md mx-auto mb-10 relative">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
				<Input
					placeholder="Search news..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="pl-10"
				/>
			</div>
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
		</PageShell>
	);
}
