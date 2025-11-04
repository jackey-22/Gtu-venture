import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Users, TrendingUp, Lightbulb, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Using plain anchors so routing works regardless of router setup; replace with <Link> if using react-router/next/router

export default function FeaturedGrid() {
	return (
		<section className="py-[clamp(3rem,8vw,4.5rem)] bg-gray-50 overflow-hidden">
			<div className="max-w-7xl mx-auto px-[clamp(1rem,4vw,4rem)]">
				{/* Section Header */}
				<div className="text-center mb-[clamp(2rem,5vw,4rem)]">
					<h2 className="font-extrabold text-foreground mb-[clamp(0.75rem,2vw,1rem)]" style={{ fontSize: 'clamp(1.75rem, 4vw + 0.5rem, 3rem)' }}>
						Discover Your Path to Success
					</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto" style={{ fontSize: 'clamp(0.875rem, 1.5vw + 0.25rem, 1.125rem)' }}>
						Explore our comprehensive ecosystem designed to support entrepreneurs at
						every stage of their journey
					</p>
				</div>

				{/* 2x2 Grid - uniform card heights and subtle background */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(1.5rem,4vw,2rem)] max-w-6xl mx-auto">
					{/* Browse Startups Card - Big Text Card */}
					<a href="/startups" className="group">
						<motion.div
							whileHover={{ y: -6, scale: 1.02 }}
							className="lg:row-span-1 bg-gradient-to-br from-white to-gray-50 rounded-3xl p-[clamp(1.5rem,4vw,2rem)] shadow-md hover:shadow-xl transition-shadow transition-transform duration-300 card-hover cursor-pointer group overflow-hidden min-h-[clamp(260px,40vw,320px)]"
						>
							<div className="flex items-start justify-between mb-[clamp(1rem,3vw,1.5rem)]">
								<div className="flex-1">
									<h3 className="font-bold text-foreground mb-[clamp(0.75rem,2vw,1rem)] group-hover:text-purple-600 transition-colors" style={{ fontSize: 'clamp(1.25rem, 2.5vw + 0.5rem, 1.875rem)' }}>
										Browse Our Portfolio
									</h3>
									<p className="text-muted-foreground mb-[clamp(1rem,3vw,1.5rem)]" style={{ fontSize: 'clamp(0.875rem, 1.2vw + 0.25rem, 1rem)' }}>
										Discover innovative portfolios built by our founders across
										diverse industries and technologies. Explore profiles and
										connect with teams on the Portfolios page.
									</p>
								</div>
								<div className="ml-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 flex-shrink-0">
									<ArrowRight className="w-[clamp(1.25rem,2vw,1.5rem)] h-[clamp(1.25rem,2vw,1.5rem)] text-purple-600" />
								</div>
							</div>
							<div className="flex flex-wrap items-center gap-[clamp(1rem,3vw,1.5rem)]" style={{ fontSize: 'clamp(0.75rem, 1vw + 0.25rem, 0.875rem)' }}>
								<span className="flex items-center gap-2">
									<TrendingUp className="w-4 h-4 text-gtu-primary flex-shrink-0" />
									<span className="font-bold text-foreground" style={{ fontSize: 'clamp(1rem, 2vw + 0.25rem, 1.25rem)' }}>150+</span>
									<span className="text-muted-foreground">Startups</span>
								</span>
								<span className="flex items-center gap-2">
									<Users className="w-4 h-4 text-gtu-primary flex-shrink-0" />
									<span className="font-bold text-foreground" style={{ fontSize: 'clamp(1rem, 2vw + 0.25rem, 1.25rem)' }}>500+</span>
									<span className="text-muted-foreground">Founders</span>
								</span>
							</div>
						</motion.div>
					</a>
					{/* Find Your Program Card - Image Card */}
					<a href="/programs" className="group block" aria-label="Find Your Program">
						<motion.div
							whileHover={{ y: -6, scale: 1.02 }}
							className="relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl card-hover cursor-pointer group transition-transform duration-300 min-h-[clamp(260px,40vw,320px)]"
						>
							<div className="absolute inset-0">
								<img
									src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=60"
									alt="Team collaboration"
									className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
									style={{ aspectRatio: '16/9' }}
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
							</div>
							<div className="relative z-10 p-[clamp(1.5rem,4vw,2rem)] h-full flex flex-col justify-end">
								<div className="mb-[clamp(0.75rem,2vw,1rem)]">
									<span className="inline-block px-[clamp(0.75rem,2vw,0.75rem)] py-[clamp(0.25rem,1vw,0.25rem)] bg-white/20 backdrop-blur-sm rounded-full text-white font-medium mb-[clamp(0.5rem,1.5vw,0.75rem)]" style={{ fontSize: 'clamp(0.75rem, 1vw + 0.25rem, 0.875rem)' }}>
										Programs
									</span>
									<h3 className="font-bold text-white mb-2" style={{ fontSize: 'clamp(1.25rem, 2.5vw + 0.5rem, 1.5rem)' }}>
										Find Your Program
									</h3>
									<p className="text-gray-200" style={{ fontSize: 'clamp(0.75rem, 1.2vw + 0.25rem, 0.875rem)' }}>
										From pre-incubation to acceleration, discover the right
										program for your venture stage.
									</p>
								</div>
								<div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
									<ArrowRight className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)] text-white" />
								</div>
							</div>
						</motion.div>
					</a>
					{/* For Investors & Mentors Card - Image Card */}
					<a href="/partners" className="group">
						<motion.div
							whileHover={{ y: -6, scale: 1.02 }}
							className="relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl card-hover cursor-pointer group transition-transform duration-300 min-h-[clamp(260px,40vw,320px)]"
						>
							<div className="absolute inset-0">
								<img
									src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=60"
									alt="Partners collaboration"
									className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
									style={{ aspectRatio: '16/9' }}
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
							</div>
							<div className="relative z-10 p-[clamp(1.5rem,4vw,2rem)] h-full flex flex-col justify-end">
								<div className="mb-[clamp(0.75rem,2vw,1rem)]">
									<span className="inline-block px-[clamp(0.75rem,2vw,0.75rem)] py-[clamp(0.25rem,1vw,0.25rem)] bg-white/20 backdrop-blur-sm rounded-full text-white font-medium mb-[clamp(0.5rem,1.5vw,0.75rem)]" style={{ fontSize: 'clamp(0.75rem, 1vw + 0.25rem, 0.875rem)' }}>
										Partners
									</span>
									<h3 className="font-bold text-white mb-2" style={{ fontSize: 'clamp(1.25rem, 2.5vw + 0.5rem, 1.5rem)' }}>
										Our Partners
									</h3>
									<p className="text-gray-200" style={{ fontSize: 'clamp(0.75rem, 1.2vw + 0.25rem, 0.875rem)' }}>
										We collaborate with leading organizations, government
										bodies, and industry leaders to provide comprehensive
										support to our startup ecosystem.
									</p>
								</div>
								<div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
									<ArrowRight className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)] text-white" />
								</div>
							</div>
						</motion.div>
					</a>
					{/* Build for the Future CTA - Text Card with Gradient */}
					<a href="/apply" className="group">
						<motion.div
							whileHover={{ y: -6, scale: 1.02 }}
							className="rounded-3xl p-[clamp(1.5rem,4vw,2rem)] shadow-md hover:shadow-xl card-hover cursor-pointer group text-white transition-transform duration-300 min-h-[clamp(260px,40vw,320px)] bg-[#7247bd]"
						>
							<div className="flex items-start justify-between mb-[clamp(1rem,3vw,1.5rem)]">
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-[clamp(0.75rem,2vw,1rem)]">
										<Lightbulb className="w-[clamp(1.25rem,2vw,1.5rem)] h-[clamp(1.25rem,2vw,1.5rem)] flex-shrink-0" />
										<span className="text-purple-100 font-medium" style={{ fontSize: 'clamp(0.75rem, 1vw + 0.25rem, 0.875rem)' }}>
											Innovation Hub
										</span>
									</div>
									<h3 className="font-extrabold mb-[clamp(0.75rem,2vw,1rem)] group-hover:text-purple-100 transition-colors" style={{ fontSize: 'clamp(1.25rem, 2.5vw + 0.5rem, 1.875rem)' }}>
										Build for the Future
									</h3>
									<p className="text-purple-100 mb-[clamp(1rem,3vw,1.5rem)]" style={{ fontSize: 'clamp(0.875rem, 1.2vw + 0.25rem, 1rem)' }}>
										Access cutting-edge research, world-class facilities, and
										breakthrough technologies to build tomorrow's solutions
										today.
									</p>
								</div>
								<div className="ml-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 flex-shrink-0">
									<ArrowRight className="w-[clamp(1.25rem,2vw,1.5rem)] h-[clamp(1.25rem,2vw,1.5rem)] text-white" />
								</div>
							</div>
							<Button
								variant="secondary"
								className="bg-white text-[#7247bd] font-semibold px-[clamp(1rem,3vw,1.5rem)] py-[clamp(0.5rem,1.5vw,0.75rem)] rounded-full shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 w-full sm:w-auto"
								style={{ fontSize: 'clamp(0.875rem, 1.2vw + 0.25rem, 1rem)' }}
							>
								<span className="flex items-center justify-center gap-[clamp(0.5rem,1.5vw,0.75rem)]">
									<span>Get Started</span>
									<ArrowRight className="w-4 h-4 text-[#7247bd] flex-shrink-0" />
								</span>
							</Button>
						</motion.div>
					</a>
				</div>
			</div>
		</section>
	);
}
