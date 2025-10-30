import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageShell from './page-shell';

export default function News() {
	const baseURL = import.meta.env.VITE_URL;
	const [articles, setArticles] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [filter, setFilter] = useState<string>('All');
	const [selected, setSelected] = useState<any | null>(null);

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const res = await fetch(`${baseURL}admin/get-news`);
				if (!res.ok) throw new Error('Failed to fetch news');
				const data = await res.json();
				setArticles(data);
			} catch (err: any) {
				setError(err.message || 'Error fetching news');
			} finally {
				setLoading(false);
			}
		};
		fetchNews();
	}, [baseURL]);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
	};

	const itemVariants = {
		hidden: { y: 12, opacity: 0 },
		visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
	};

	// Derive categories dynamically from article data
	const categories = useMemo(() => {
		const cats = Array.from(new Set(articles.map((d: any) => d.category || 'Uncategorized')));
		const priority = ['Announcements', 'Media Coverage', 'Blogs/Articles', 'Events', 'Funding'];
		cats.sort((a: string, b: string) => {
			const ai = priority.indexOf(a);
			const bi = priority.indexOf(b);
			if (ai !== -1 || bi !== -1) return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
			return a.localeCompare(b);
		});
		return ['All', ...cats];
	}, [articles]);

	const visibleArticles = articles.filter((a: any) => filter === 'All' || a.category === filter);

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
			{/* Filter Tabs */}
			<div className="flex flex-wrap justify-center gap-3 mt-6 mb-10">
				{categories.map((cat) => (
					<button
						key={cat}
						className={`px-4 py-2 rounded-full text-sm font-medium border ${
							filter === cat
								? 'bg-primary text-white border-primary'
								: 'bg-background text-foreground border-muted hover:bg-muted/50'
						}`}
						onClick={() => setFilter(cat)}
					>
						{cat}
					</button>
				))}
			</div>

			{/* Articles Grid */}
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
			>
				{visibleArticles.map((article, idx) => (
					<motion.div
						key={article.id ?? idx}
						variants={itemVariants}
						className="bg-card rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all"
						onClick={() => setSelected(article)}
					>
						<img
							src={article.thumb}
							alt={article.title}
							className="w-full h-48 object-cover"
							onError={(e) => {
								e.currentTarget.style.display = 'none';
							}}
						/>
						<div className="p-5">
							<div className="flex items-center justify-between mb-2">
								<span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
									{article.category}
								</span>
								<span className="text-xs text-muted-foreground">
									{article.date}
								</span>
							</div>
							<h3 className="text-lg font-bold text-foreground mb-2">
								{article.title}
							</h3>
							<p className="text-sm text-muted-foreground line-clamp-3">
								{article.description}
							</p>
						</div>
					</motion.div>
				))}
			</motion.div>

			{/* News Detail Modal */}
			{selected && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
					<div className="bg-background rounded-3xl shadow-2xl max-w-lg w-full mx-4 relative animate-in fade-in zoom-in-95">
						<button
							className="absolute top-4 right-4 text-xl text-muted-foreground hover:text-foreground"
							onClick={() => setSelected(null)}
							aria-label="Close"
						>
							×
						</button>
						{selected.thumb && (
							<img
								src={selected.thumb}
								alt={selected.title}
								className="w-full h-56 object-cover rounded-t-3xl"
							/>
						)}
						<div className="p-8">
							<div className="flex items-center justify-between mb-2">
								<span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
									{selected.category}
								</span>
								<span className="text-xs text-muted-foreground">
									{selected.date}
								</span>
							</div>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								{selected.title}
							</h2>
							<div className="text-muted-foreground text-base leading-relaxed whitespace-pre-line mb-4">
								{selected.body}
							</div>
							{selected.description && (
								<div className="prose prose-neutral max-w-none text-foreground text-base leading-relaxed">
									{selected.description}
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</PageShell>
	);
}
