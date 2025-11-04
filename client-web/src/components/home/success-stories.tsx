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

	if (loading || successStories.length === 0) {
		return null;
	}

	return (
		<section className="py-[clamp(3rem,8vw,6rem)] bg-gradient-to-br from-gtu-light to-gtu-base overflow-hidden">
			<div className="max-w-7xl mx-auto px-[clamp(1rem,4vw,4rem)]">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="text-center mb-[clamp(2rem,5vw,4rem)]"
				>
					<h2 className="font-extrabold text-foreground mb-[clamp(0.75rem,2vw,1rem)]" style={{ fontSize: 'clamp(1.75rem, 4vw + 0.5rem, 3rem)' }}>
						Highlights of Success Stories
					</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto" style={{ fontSize: 'clamp(0.875rem, 1.5vw + 0.25rem, 1.125rem)' }}>
						Real achievements from our incubated startups, showcasing innovation,
						growth, and impact across Gujarat and beyond.
					</p>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(1.5rem,4vw,2rem)]"
				>
					{successStories.map((story) => {
						const IconComponent = getIconComponent(story.icon);
						return (
							<motion.div
								key={story._id || story.id}
								variants={itemVariants}
								className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
							>
								<div className="relative overflow-hidden" style={{ aspectRatio: '16/9', minHeight: 'clamp(12rem, 25vw, 12rem)' }}>
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
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									/>
									<div className="absolute top-[clamp(0.75rem,2vw,1rem)] left-[clamp(0.75rem,2vw,1rem)] bg-white/90 backdrop-blur-sm rounded-full p-[clamp(0.375rem,1vw,0.5rem)]">
										<IconComponent className="w-[clamp(1.25rem,2vw,1.5rem)] h-[clamp(1.25rem,2vw,1.5rem)] text-gtu-primary" />
									</div>
								</div>
								<div className="p-[clamp(1rem,3vw,1.5rem)]">
									<h3 className="font-bold text-foreground mb-2" style={{ fontSize: 'clamp(1rem, 2vw + 0.25rem, 1.25rem)' }}>
										{story.title}
									</h3>
									<p className="text-muted-foreground mb-[clamp(0.75rem,2vw,1rem)]" style={{ fontSize: 'clamp(0.875rem, 1.2vw + 0.25rem, 1rem)' }}>
										{story.description}
									</p>
									<div className="flex items-center justify-between">
										<span className="text-gtu-primary font-semibold" style={{ fontSize: 'clamp(1rem, 2vw + 0.25rem, 1.125rem)' }}>
											{story.metric}
										</span>
										<div className="w-[clamp(2rem,3vw,2rem)] h-[clamp(2rem,3vw,2rem)] bg-gtu-lavender rounded-full flex items-center justify-center flex-shrink-0">
											<TrendingUp className="w-[clamp(1rem,1.5vw,1rem)] h-[clamp(1rem,1.5vw,1rem)] text-gtu-primary" />
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
