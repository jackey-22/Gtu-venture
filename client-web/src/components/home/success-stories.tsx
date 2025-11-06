import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchGet } from '@/utils/fetch.utils';
import { getIconComponent } from '@/utils/icon.utils';

const baseURL = import.meta.env.VITE_URL;

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.6,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

export default function SuccessStories() {
	const [successStories, setSuccessStories] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchStories = async () => {
			try {
				const response = await fetchGet({ pathName: 'user/get-success-stories' });
				if (response?.success && response?.data) {
					setSuccessStories(response.data);
				} else {
					setSuccessStories([]);
				}
			} catch (error) {
				console.error('Error fetching success stories:', error);
				setSuccessStories([]);
			} finally {
				setLoading(false);
			}
		};

		fetchStories();
	}, []);

	if (loading || successStories.length === 0) return null;

	return (
		<section className="py-[clamp(3rem,8vw,6rem)] bg-gradient-to-br from-gtu-light to-gtu-base overflow-hidden">
			<div className="max-w-7xl mx-auto px-[clamp(1rem,4vw,4rem)]">
				{/* Title */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="text-center mb-[clamp(2rem,5vw,4rem)]"
				>
					<h2
						className="font-extrabold text-foreground mb-[clamp(0.75rem,2vw,1rem)]"
						style={{ fontSize: 'clamp(1.75rem, 4vw + 0.5rem, 3rem)' }}
					>
						Highlights of Success Stories
					</h2>
					<p
						className="text-muted-foreground max-w-2xl mx-auto"
						style={{ fontSize: 'clamp(0.875rem,1.5vw+0.25rem,1.125rem)' }}
					>
						Real achievements from our incubated startups, showcasing innovation,
						growth, and impact across Gujarat and beyond.
					</p>
				</motion.div>

				{/* Masonry Grid */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
				>
					{successStories.map((story) => {
						const IconComponent = story.icon ? getIconComponent(story.icon) : null;

						return (
							<motion.div
								key={story._id || story.id}
								variants={itemVariants}
								className="break-inside-avoid bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"
							>
								{/* Image */}
								<div className="relative overflow-hidden">
									<img
										src={
											story.image?.startsWith('http')
												? story.image
												: `${baseURL}${
														story.image.startsWith('/')
															? story.image.slice(1)
															: story.image
												  }`
										}
										alt={story.title}
										className="w-full h-auto max-h-[240px] object-cover group-hover:scale-105 transition-transform duration-300"
									/>

									{/* Icon only if valid */}
									{IconComponent && (
										<div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-full p-2">
											<IconComponent className="w-5 h-5 text-gtu-primary" />
										</div>
									)}
								</div>

								{/* Content */}
								<div className="p-5">
									<h3 className="font-bold text-foreground mb-2 text-lg">
										{story.title}
									</h3>
									<p className="text-muted-foreground mb-4 text-sm leading-relaxed">
										{story.description}
									</p>

									<div className="flex items-center justify-between">
										<span className="text-gtu-primary font-semibold text-lg">
											{story.metric}
										</span>
										<div className="w-10 h-10 bg-gtu-lavender rounded-full flex items-center justify-center">
											<TrendingUp className="w-4 h-4 text-gtu-primary" />
										</div>
									</div>
								</div>
							</motion.div>
						);
					})}
				</motion.div>
			</div>
		</section>
	);
}
