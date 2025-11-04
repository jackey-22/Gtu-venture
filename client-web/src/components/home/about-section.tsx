import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { fetchGet } from '@/utils/fetch.utils';

export default function AboutSection() {
	const [aboutData, setAboutData] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchAbout = async () => {
			try {
				const response = await fetchGet({ pathName: 'user/get-about-section' });
				if (response?.success && response?.data) {
					setAboutData(response.data);
				} else {
					// Fallback to default values
					setAboutData({
						title: 'GTU Ventures',
						description:
							'Gujarat Technological University (GTU), established in 2007, has consistently been at the forefront of fostering innovation, entrepreneurship, and skills development in Gujarat. With a rich history of supporting over 750 startups and generating thousands of jobs, GTU has carved its niche as a leader in the startup ecosystem of the state.',
						description2:
							"The launch of GTU Ventures aligns with the broader vision of scaling up the university's contributions to the state's economic development, supporting Hon'ble Prime Minister Shri Narendra Modi's vision for a Viksit Bharat@2047.",
						image: '/incub12.jpeg',
						statCardValue: '10,000',
						statCardLabel: 'Sq. Ft. Incubation Area',
						buttonText: 'Learn More',
						buttonLink: '/about',
					});
				}
			} catch (error) {
				console.error('Error fetching about section:', error);
				setAboutData({
					title: 'GTU Ventures',
					description:
						'Gujarat Technological University (GTU), established in 2007, has consistently been at the forefront of fostering innovation, entrepreneurship, and skills development in Gujarat.',
					description2:
						"The launch of GTU Ventures aligns with the broader vision of scaling up the university's contributions to the state's economic development.",
					image: '/incub12.jpeg',
					statCardValue: '10,000',
					statCardLabel: 'Sq. Ft. Incubation Area',
					buttonText: 'Learn More',
					buttonLink: '/about',
				});
			} finally {
				setLoading(false);
			}
		};

		fetchAbout();
	}, []);

	const cleanImagePath = aboutData?.image.startsWith('/')
		? aboutData?.image.slice(1)
		: aboutData?.image;

	const imageUrl = aboutData?.image?.startsWith('http')
		? aboutData.image
		: `${import.meta.env.VITE_URL}${cleanImagePath}`;
	if (loading || !aboutData) {
		return null;
	}

	return (
		<section className="py-[clamp(3rem,8vw,6rem)] bg-background overflow-hidden" id="about" data-testid="about-section">
			<div className="max-w-7xl mx-auto px-[clamp(1rem,4vw,4rem)]">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(2rem,5vw,4rem)] items-center">
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
					>
						<h2 className="font-bold text-foreground mb-[clamp(1rem,3vw,1.5rem)]" style={{ fontSize: 'clamp(1.75rem, 4vw + 0.5rem, 3rem)' }}>
							{aboutData.title || 'GTU Ventures'}
						</h2>
						<p className="text-muted-foreground leading-relaxed mb-[clamp(1rem,3vw,1.5rem)]" style={{ fontSize: 'clamp(0.875rem, 1.5vw + 0.25rem, 1.125rem)' }}>
							{aboutData.description ||
								'Gujarat Technological University (GTU), established in 2007, has consistently been at the forefront of fostering innovation, entrepreneurship, and skills development in Gujarat.'}
						</p>
						{aboutData.description2 && (
							<p className="text-muted-foreground leading-relaxed mb-[clamp(1.5rem,4vw,2rem)]" style={{ fontSize: 'clamp(0.875rem, 1.5vw + 0.25rem, 1.125rem)' }}>
								{aboutData.description2}
							</p>
						)}
						{aboutData.buttonText && aboutData.buttonLink && (
							<Button
								asChild
								className="btn-primary bg-primary text-primary-foreground px-[clamp(1.5rem,4vw,2rem)] py-[clamp(0.75rem,2vw,1rem)] rounded-full font-semibold w-full sm:w-auto"
								style={{ fontSize: 'clamp(0.875rem, 1.2vw + 0.25rem, 1rem)' }}
								data-testid="about-learn-more"
							>
								<a href={aboutData.buttonLink}>{aboutData.buttonText}</a>
							</Button>
						)}
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
						className="relative"
					>
						<img
							src={imageUrl}
							alt="GTU Ventures"
							className="rounded-3xl shadow-lg w-full h-auto"
							style={{ aspectRatio: '16/10' }}
						/>

						{aboutData.statCardValue && aboutData.statCardLabel && (
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.3 }}
								className="absolute -bottom-[clamp(0.75rem,2vw,1.5rem)] -right-[clamp(0.75rem,2vw,1.5rem)] bg-accent rounded-2xl p-[clamp(1rem,3vw,1.5rem)] text-center shadow-lg"
								data-testid="about-stat-card"
							>
								<div className="font-bold text-accent-foreground" style={{ fontSize: 'clamp(1.25rem, 2.5vw + 0.5rem, 1.5rem)' }}>
									{aboutData.statCardValue}
								</div>
								<div className="text-accent-foreground" style={{ fontSize: 'clamp(0.75rem, 1vw + 0.25rem, 0.875rem)' }}>
									{aboutData.statCardLabel}
								</div>
							</motion.div>
						)}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
