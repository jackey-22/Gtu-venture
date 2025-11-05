import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type FAQ = {
	id: string;
	question: string;
	answer: string;
	category: string;
};

export default function FAQs() {
	const baseURL = import.meta.env.VITE_URL;
	const [faqs, setFaqs] = useState<FAQ[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [query, setQuery] = useState('');
	const [activeCategory, setActiveCategory] = useState<string | null>(null);

	useEffect(() => {
		const fetchFAQs = async () => {
			try {
				const res = await fetch(`${baseURL}user/get-faqs`);
				if (!res.ok) throw new Error('Failed to fetch FAQs');
				const json = await res.json();
				const data = json.data || [];
				const mappedFAQs: FAQ[] = data.map((it: any, i: number) => ({
					id: it._id || `f_${i}`,
					question: it.question || `Question ${i + 1}`,
					answer: it.answer || '',
					category: 'General',
				}));
				setFaqs(mappedFAQs);
			} catch (err: any) {
				setError(err.message || 'Error fetching FAQs');
			} finally {
				setLoading(false);
			}
		};
		fetchFAQs();
	}, [baseURL]);

	const categories = useMemo(() => Array.from(new Set(faqs.map((f) => f.category))), [faqs]);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		return faqs.filter((f) => {
			const matchQ =
				!q || f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
			const matchCat = !activeCategory || f.category === activeCategory;
			return matchQ && matchCat;
		});
	}, [faqs, query, activeCategory]);

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
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{Array.from({ length: 4 }).map((_, i) => (
								<div key={i} className="p-6 border rounded-xl animate-pulse">
									<div className="h-6 w-3/4 bg-gray-300 rounded mb-4"></div>
									<div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
									<div className="h-4 w-5/6 bg-gray-200 rounded"></div>
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
							FAQs
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
							Frequently asked questions about GTU Ventures & the incubation program.
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
										value={query}
										onChange={(e) => setQuery(e.target.value)}
										placeholder="Search questions, keywords..."
										className="pl-10 rounded-full"
										aria-label="Search FAQs"
									/>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			<section className="py-14">
				<div className="max-w-7xl mx-auto px-6 lg:px-16">
					<div>
						{filtered.length === 0 ? (
							<div className="text-center text-muted-foreground py-12">
								No results — try a different keyword or category.
							</div>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{filtered.map((f) => (
									<Card key={f.id} className="overflow-hidden">
										<CardHeader>
											<CardTitle>{f.question}</CardTitle>
											{f.category !== 'General' && (
												<CardDescription className="mt-1">
													Category: {f.category}
												</CardDescription>
											)}
										</CardHeader>
										<CardContent className="pb-6 pt-2">
											<div
												className="text-sm text-muted-foreground"
												dangerouslySetInnerHTML={{ __html: f.answer }}
											/>
										</CardContent>
									</Card>
								))}
							</div>
						)}
					</div>
				</div>
			</section>
		</div>
	);
}
