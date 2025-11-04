import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Rocket, DollarSign, Users, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchGet } from '@/utils/fetch.utils';

function AnimatedNumber({
	target,
	format,
	duration = 900,
}: {
	target: number;
	format: (n: number) => string;
	duration?: number;
}) {
	const [value, setValue] = useState(0);

	useEffect(() => {
		let start = 0;
		const diff = target - start;
		const stepTime = Math.max(Math.floor(duration / 60), 8);
		let current = start;
		const increment = diff / (duration / stepTime);

		const id = window.setInterval(() => {
			current += increment;
			if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
				setValue(target);
				window.clearInterval(id);
			} else {
				setValue(current);
			}
		}, stepTime);

		return () => window.clearInterval(id);
	}, [target, duration]);

	return <div className="text-white font-bold" style={{ fontSize: 'clamp(1.25rem, 2vw + 0.5rem, 1.5rem)' }}>{format(value)}</div>;
}

export default function Hero() {
	const [heroData, setHeroData] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchHero = async () => {
			try {
				const response = await fetchGet({ pathName: 'user/get-hero' });
				if (response?.success && response?.data) {
					setHeroData(response.data);
				} else {
					// Fallback to default values
					setHeroData({
						title: "Ignite Your Startup Journey in Gujarat's Largest Student Ecosystem",
						subtitle: null,
						description:
							'Transform your bold ideas into thriving ventures with expert mentorship, substantial funding, and a dynamic community of innovators. Join GTU Ventures and turn your entrepreneurial dreams into reality.',
						primaryButtonText: 'Apply Now',
						primaryButtonLink: '/apply',
						secondaryButtonText: 'Explore Programs',
						secondaryButtonLink: '#programs',
					});
				}
			} catch (error) {
				console.error('Error fetching hero:', error);
				// Fallback to default values
				setHeroData({
					title: "Ignite Your Startup Journey in Gujarat's Largest Student Ecosystem",
					subtitle: null,
					description:
						'Transform your bold ideas into thriving ventures with expert mentorship, substantial funding, and a dynamic community of innovators. Join GTU Ventures and turn your entrepreneurial dreams into reality.',
					primaryButtonText: 'Apply Now',
					primaryButtonLink: '/apply',
					secondaryButtonText: 'Explore Programs',
					secondaryButtonLink: '#programs',
				});
			} finally {
				setLoading(false);
			}
		};

		fetchHero();
	}, []);

	if (loading || !heroData) {
		return (
			<section className="hero-depth relative min-h-screen lg:h-screen pt-[max(4rem,calc(4rem+env(safe-area-inset-top)))] pb-[max(2rem,calc(2rem+env(safe-area-inset-bottom)))] my-0 flex items-center justify-center overflow-hidden"></section>
		);
	}

	const titleParts = heroData.title
		? heroData.title.split("Gujarat's Largest")
		: ['Ignite Your Startup Journey in ', "Gujarat's Largest", ' Student Ecosystem'];
	return (
		<section className="hero-depth relative min-h-screen lg:h-screen pt-[max(4rem,calc(4rem+env(safe-area-inset-top)))] pb-[max(2rem,calc(2rem+env(safe-area-inset-bottom)))] my-0 flex items-center justify-center overflow-hidden">
			<div
				className="absolute left-0 right-0 top-0 bottom-0 pointer-events-none"
				style={{ zIndex: 5 }}
			>
				<div
					className="absolute inset-0 bg-center bg-no-repeat bg-cover"
					style={{
						backgroundImage: `url('/World-Map-Dots.svg')`,
						backgroundPosition: 'center',
						backgroundSize: 'clamp(100%, 130%, 150%) auto',
						opacity: 0.24,
						filter: 'brightness(0.9)',
						mixBlendMode: 'normal',
						zIndex: 5,
					}}
				/>
			</div>

			<div className="absolute inset-0" style={{ opacity: 0.21, zIndex: 0 }}>
				<div className="absolute top-1/4 left-1/4 w-[clamp(200px,25vw,384px)] h-[clamp(200px,25vw,384px)] bg-accent rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
				<div className="absolute top-1/3 right-1/4 w-[clamp(200px,25vw,384px)] h-[clamp(200px,25vw,384px)] bg-primary rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
				<div className="absolute bottom-1/4 left-1/3 w-[clamp(200px,25vw,384px)] h-[clamp(200px,25vw,384px)] bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
			</div>

			<div className="relative z-10 w-full max-w-7xl mx-auto px-[clamp(1rem,4vw,4rem)] text-center text-white">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
					className="max-w-5xl mx-auto"
				>
					<motion.h1
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
						className="font-display font-black tracking-tight mb-[clamp(1rem,3vw,1.5rem)] leading-[1.1] text-hero"
						data-testid="hero-headline"
						style={{ fontSize: 'clamp(1.875rem, 5vw + 0.5rem, 4.5rem)' }}
					>
						{heroData.title ||
							"Ignite Your Startup Journey in Gujarat's Largest Student Ecosystem"}
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
						className="text-white/90 mb-[clamp(2rem,5vw,3rem)] max-w-4xl mx-auto leading-relaxed font-medium"
						data-testid="hero-description"
						style={{ fontSize: 'clamp(1rem, 2vw + 0.5rem, 1.5rem)' }}
					>
						{heroData.description ||
							'Transform your bold ideas into thriving ventures with expert mentorship, substantial funding, and a dynamic community of innovators. Join GTU Ventures and turn your entrepreneurial dreams into reality.'}
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
						className="flex flex-col sm:flex-row items-center justify-center gap-[clamp(1rem,3vw,1.5rem)] mb-[clamp(2rem,5vw,4rem)]"
					>
						{heroData.primaryButtonText && heroData.primaryButtonLink && (
							<Button
								asChild
								size="lg"
								className="btn-gradient text-white px-[clamp(1.5rem,4vw,2.5rem)] py-[clamp(0.75rem,2vw,1.25rem)] rounded-full font-bold shadow-2xl hover:shadow-purple-500/25 w-full sm:w-auto"
								style={{ fontSize: 'clamp(0.875rem, 1.5vw + 0.25rem, 1.125rem)' }}
								data-testid="hero-apply-button"
							>
								<a
									href={heroData.primaryButtonLink}
									className="flex items-center justify-center gap-2"
								>
									<Rocket className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)]" />
									<span className="whitespace-nowrap">{heroData.primaryButtonText}</span>
								</a>
							</Button>
						)}
						{heroData.secondaryButtonText && heroData.secondaryButtonLink && (
							<Button
								asChild
								variant="outline"
								size="lg"
								className="text-white border-2 border-white/30 px-[clamp(1.5rem,4vw,2.5rem)] py-[clamp(0.75rem,2vw,1.25rem)] rounded-full font-semibold hover:bg-white/10 hover:border-white/50 bg-transparent backdrop-blur-sm w-full sm:w-auto"
								style={{ fontSize: 'clamp(0.875rem, 1.5vw + 0.25rem, 1.125rem)' }}
								data-testid="hero-explore-button"
							>
								<a
									href={heroData.secondaryButtonLink}
									className="flex items-center justify-center gap-2"
								>
									<span className="whitespace-nowrap">{heroData.secondaryButtonText}</span>
									<ChevronDown className="w-4 h-4" />
								</a>
							</Button>
						)}
					</motion.div>

					{/* KPI Chips */}
					{/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-8"
          >
            {kpiData.map((kpi, index) => {
              const Icon = kpi.icon;
              return (
                <motion.div
                  key={kpi.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 1 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center bg-white/15 backdrop-blur-md rounded-full px-8 py-4 border border-white/20 shadow-lg counter-animation"
                  data-testid={`kpi-chip-${index}`}
                >
                  <Icon className="kpi-icon text-accent" />
                  <div className="text-center">
                    <AnimatedNumber target={kpi.target} format={kpi.format} />
                    <div className="text-sm font-medium text-white/80">{kpi.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div> */}
				</motion.div>
			</div>

			{/* Scroll Indicator */}
			{/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="scroll-indicator"
      >
        <ChevronDown className="w-8 h-8 text-white/60" />
      </motion.div> */}
		</section>
	);
}
