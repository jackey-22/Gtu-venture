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
		<section className="py-24 bg-gradient-to-br from-gtu-light to-gtu-base">
			<div className="max-w-7xl mx-auto px-6 lg:px-16">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
						Highlights of Success Stories
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Real achievements from our incubated startups, showcasing innovation,
						growth, and impact across Gujarat and beyond.
					</p>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-2 gap-8"
				>
					{successStories.map((story) => {
						const IconComponent = getIconComponent(story.icon);
						return (
							<motion.div
								key={story._id || story.id}
								variants={itemVariants}
								className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
							>
								<div className="relative h-48 overflow-hidden">
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
									<div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
										<IconComponent className="w-6 h-6 text-gtu-primary" />
									</div>
								</div>
								<div className="p-6">
									<h3 className="text-xl font-bold text-foreground mb-2">
										{story.title}
									</h3>
									<p className="text-muted-foreground mb-4">
										{story.description}
									</p>
									<div className="flex items-center justify-between">
										<span className="text-gtu-primary font-semibold text-lg">
											{story.metric}
										</span>
										<div className="w-8 h-8 bg-gtu-lavender rounded-full flex items-center justify-center">
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
