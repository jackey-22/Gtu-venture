import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchGet } from '@/utils/fetch.utils';
import { getIconComponent } from '@/utils/icon.utils';

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

export default function ProgramHighlights() {
	const [programs, setPrograms] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPrograms = async () => {
			try {
				const response = await fetchGet({ pathName: 'user/get-program-highlights' });
				if (response?.success && response?.data) {
					setPrograms(response.data);
				} else {
					setPrograms([]);
				}
			} catch (error) {
				console.error('Error fetching program highlights:', error);
				setPrograms([]);
			} finally {
				setLoading(false);
			}
		};

		fetchPrograms();
	}, []);

	if (loading || programs.length === 0) {
		return null;
	}

	return (
		<section className="py-24 bg-background" id="programs" data-testid="program-highlights">
			<div className="max-w-7xl mx-auto px-6 lg:px-16">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h2 className="text-display font-bold text-foreground mb-6">Our Programs</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						Comprehensive support at every stage of your entrepreneurial journey
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{programs.map((program, index) => {
						const Icon = getIconComponent(program.icon);
						return (
							<motion.div
								key={program._id || program.id}
								variants={itemVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, margin: '-50px' }}
								transition={{ delay: index * 0.2 }}
								className="bg-card rounded-3xl p-8 border shadow-sm hover-lift cursor-pointer"
								data-testid={`program-card-${program._id || program.id}`}
							>
								<motion.div
									whileHover={{ scale: 1.1 }}
									className={`${
										program.color || 'bg-primary/10 text-primary'
									} rounded-2xl p-4 w-fit mb-6`}
								>
									<Icon className="w-8 h-8" />
								</motion.div>
								<h3 className="text-2xl font-bold text-foreground mb-4">
									{program.title}
								</h3>
								<p className="text-muted-foreground mb-6 leading-relaxed">
									{program.description}
								</p>
								{program.link && (
									<motion.a
										href={program.link}
										whileHover={{ x: 5 }}
										className="text-primary font-semibold text-sm hover:underline inline-flex items-center"
										data-testid={`program-link-${program._id || program.id}`}
									>
										Learn More →
									</motion.a>
								)}
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
