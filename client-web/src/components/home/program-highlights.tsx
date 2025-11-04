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
		<section className="py-[clamp(3rem,8vw,6rem)] bg-background overflow-hidden" id="programs" data-testid="program-highlights">
			<div className="max-w-7xl mx-auto px-[clamp(1rem,4vw,4rem)]">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-[clamp(2rem,5vw,4rem)]"
				>
					<h2 className="font-bold text-foreground mb-[clamp(1rem,3vw,1.5rem)]" style={{ fontSize: 'clamp(1.75rem, 4vw + 0.5rem, 3rem)' }}>Our Programs</h2>
					<p className="text-muted-foreground max-w-3xl mx-auto" style={{ fontSize: 'clamp(0.875rem, 1.5vw + 0.25rem, 1.25rem)' }}>
						Comprehensive support at every stage of your entrepreneurial journey
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(1.5rem,4vw,2rem)]">
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
								className="bg-card rounded-3xl p-[clamp(1.5rem,4vw,2rem)] border shadow-sm hover-lift cursor-pointer"
								data-testid={`program-card-${program._id || program.id}`}
							>
								<motion.div
									whileHover={{ scale: 1.1 }}
									className={`${
										program.color || 'bg-primary/10 text-primary'
									} rounded-2xl p-[clamp(0.75rem,2vw,1rem)] w-fit mb-[clamp(1rem,3vw,1.5rem)]`}
								>
									<Icon className="w-[clamp(1.5rem,3vw,2rem)] h-[clamp(1.5rem,3vw,2rem)]" />
								</motion.div>
								<h3 className="font-bold text-foreground mb-[clamp(0.75rem,2vw,1rem)]" style={{ fontSize: 'clamp(1.25rem, 2.5vw + 0.5rem, 1.5rem)' }}>
									{program.title}
								</h3>
								<p className="text-muted-foreground mb-[clamp(1rem,3vw,1.5rem)] leading-relaxed" style={{ fontSize: 'clamp(0.875rem, 1.2vw + 0.25rem, 1rem)' }}>
									{program.description}
								</p>
								{program.link && (
									<motion.a
										href={program.link}
										whileHover={{ x: 5 }}
										className="text-primary font-semibold hover:underline inline-flex items-center"
										style={{ fontSize: 'clamp(0.75rem, 1vw + 0.25rem, 0.875rem)' }}
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
