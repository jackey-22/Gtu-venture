import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Lightbulb, Award } from 'lucide-react';
import { useEffect, useState } from 'react';

const values = [
	{
		icon: Lightbulb,
		title: 'Innovation First',
		description:
			'Championing breakthrough ideas and disruptive technologies that solve real-world challenges and create market opportunities',
	},
	{
		icon: Users,
		title: 'Collaborative Growth',
		description:
			'Cultivating a thriving ecosystem where entrepreneurs, mentors, industry experts, and investors connect to drive collective success',
	},
	{
		icon: Target,
		title: 'Excellence & Quality',
		description:
			'Upholding world-class standards in mentorship, infrastructure, and support services to nurture sustainable, high-growth ventures',
	},
	{
		icon: Award,
		title: 'Measurable Impact',
		description:
			'Driving tangible economic value through job creation, technology commercialization, and fostering Gujarat startup ecosystem',
	},
];

const sampleTimeline = [
	{ year: '2012', event: 'First batch of student entrepreneurs supported' },
	{ year: '2015', event: 'First startup incubation programs launched' },
	{ year: '2018', event: '100+ startups milestone achieved' },
	{ year: '2019', event: 'Seed funding program launched' },
	{ year: '2022', event: '₹10cr funding milestone crossed' },
	{ year: '2023', event: 'GTU Ventures officially launched' },
	{ year: '2024', event: '730+ startups supported, ₹21.17cr funding disbursed' },
	{ year: '2025', event: 'International partnerships established' },
];

export default function About() {
	const [expandedYear, setExpandedYear] = useState<string | null>(null);

	const toggleExpand = (year: string) => {
		setExpandedYear(expandedYear === year ? null : year);
	};
	return (
		<div className="min-h-screen pt-20">
			{/* Hero Section - Gen Z Enhanced */}
			<section className="relative py-16 bg-gradient-to-br from-gtu-base via-gtu-light to-white overflow-hidden">
				{/* Animated background elements */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
					<div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-700"></div>
				</div>

				<div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center"
					>
						<h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-6 leading-tight">
							About{' '}
							<span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
								GTU Ventures
							</span>
						</h1>
						<p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10">
							Empowering Gujarat's entrepreneurial ecosystem through innovation,
							education, and strategic partnerships since 2007.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Mission & Vision - Enhanced with Images */}
			<section className="py-16 bg-background">
				<div className="max-w-7xl mx-auto px-6 lg:px-16">
					{/* Vision Section - Image on Right */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="mb-16"
					>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
							{/* Vision Content - Left */}
							<div className="order-2 lg:order-1">
								<div className="inline-block mb-3">
									<span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
										Our Vision
									</span>
								</div>
								<h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
									Building India's Leading Innovation Hub
								</h2>
								<div className="space-y-3">
									<p className="text-lg text-muted-foreground leading-relaxed">
										To be recognized as India's leading university-based startup
										ecosystem, nurturing the next generation of entrepreneurs
										who will shape the future of technology and innovation.
									</p>
									<p className="text-lg text-muted-foreground leading-relaxed">
										We envision a future where every student with an
										entrepreneurial spirit has access to the resources,
										mentorship, and opportunities needed to build impactful
										businesses that solve real-world challenges.
									</p>
								</div>

								{/* Vision Highlights */}
								<div className="mt-6 space-y-2">
									<div className="flex items-start gap-3">
										<div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
											<svg
												className="w-4 h-4 text-primary"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd"
												/>
											</svg>
										</div>
										<p className="text-foreground font-medium">
											Leading university-based innovation ecosystem
										</p>
									</div>
									<div className="flex items-start gap-3">
										<div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
											<svg
												className="w-4 h-4 text-primary"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd"
												/>
											</svg>
										</div>
										<p className="text-foreground font-medium">
											Empowering next-gen entrepreneurs
										</p>
									</div>
									<div className="flex items-start gap-3">
										<div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
											<svg
												className="w-4 h-4 text-primary"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd"
												/>
											</svg>
										</div>
										<p className="text-foreground font-medium">
											Solving real-world challenges through innovation
										</p>
									</div>
								</div>
							</div>

							{/* Vision Image - Right */}
							<div className="order-1 lg:order-2">
								<div className="relative h-80">
									<img
										src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
										alt="Vision - Team collaboration and innovation"
										className="w-full h-full object-cover rounded-2xl shadow-2xl"
									/>
									{/* Overlay with text */}
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-2xl flex items-end justify-center pb-8">
										<h3 className="text-3xl font-bold text-white drop-shadow-lg">
											Vision 2030
										</h3>
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Mission Section - Image on Left */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
							{/* Mission Image - Left */}
							<div className="order-1">
								<div className="relative h-80">
									<img
										src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop"
										alt="Mission - Startup ecosystem and growth"
										className="w-full h-full object-cover rounded-2xl shadow-2xl"
									/>
									{/* Overlay with text */}
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-2xl flex items-end justify-center pb-8">
										<h3 className="text-3xl font-bold text-white drop-shadow-lg">
											Our Mission
										</h3>
									</div>
								</div>
							</div>

							{/* Mission Content - Right */}
							<div className="order-2">
								<div className="inline-block mb-3">
									<span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold">
										Our Mission
									</span>
								</div>
								<h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
									Creating a Thriving Startup Ecosystem
								</h2>
								<div className="space-y-3">
									<p className="text-lg text-muted-foreground leading-relaxed">
										To create a thriving startup ecosystem that transforms
										innovative ideas into successful businesses, contributing to
										Gujarat's economic growth and supporting India's vision of
										becoming a global innovation hub.
									</p>
									<p className="text-lg text-muted-foreground leading-relaxed">
										We are committed to providing comprehensive support to
										student entrepreneurs, from ideation to market success,
										through our integrated programs and extensive network of
										mentors and partners.
									</p>
								</div>

								{/* Mission Highlights */}
								<div className="mt-6 space-y-2">
									<div className="flex items-start gap-3">
										<div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center mt-1">
											<svg
												className="w-4 h-4 text-secondary"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd"
												/>
											</svg>
										</div>
										<p className="text-foreground font-medium">
											Transform ideas into successful businesses
										</p>
									</div>
									<div className="flex items-start gap-3">
										<div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center mt-1">
											<svg
												className="w-4 h-4 text-secondary"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd"
												/>
											</svg>
										</div>
										<p className="text-foreground font-medium">
											Support from ideation to market success
										</p>
									</div>
									<div className="flex items-start gap-3">
										<div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center mt-1">
											<svg
												className="w-4 h-4 text-secondary"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd"
												/>
											</svg>
										</div>
										<p className="text-foreground font-medium">
											Extensive network of mentors and partners
										</p>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			<section className="py-16 bg-muted">
				<div className="max-w-7xl mx-auto px-6 lg:px-16">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center mb-12"
					>
						<h2 className="text-display font-bold text-foreground mb-4">Our Values</h2>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
							Core principles that define who we are and guide our actions
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.1 }}
							className="group"
						>
							<Card className="text-center h-full hover-lift border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-primary/5">
								<CardContent className="p-6">
									<div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-4 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
										<Lightbulb className="w-8 h-8 text-white" />
									</div>
									<h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
										Innovation First
									</h3>
									<p className="text-muted-foreground leading-relaxed">
										Championing breakthrough ideas and disruptive technologies
										that solve real-world challenges and create market
										opportunities
									</p>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="group"
						>
							<Card className="text-center h-full hover-lift border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-secondary/5">
								<CardContent className="p-6">
									<div className="bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl p-4 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
										<Users className="w-8 h-8 text-white" />
									</div>
									<h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors">
										Collaborative Growth
									</h3>
									<p className="text-muted-foreground leading-relaxed">
										Cultivating a thriving ecosystem where entrepreneurs,
										mentors, industry experts, and investors connect to drive
										collective success
									</p>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className="group"
						>
							<Card className="text-center h-full hover-lift border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-purple-500/10">
								<CardContent className="p-6">
									<div className="bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl p-4 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
										<Award className="w-8 h-8 text-white" />
									</div>
									<h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-purple-600 transition-colors">
										Measurable Impact
									</h3>
									<p className="text-muted-foreground leading-relaxed">
										Driving tangible economic value through job creation,
										technology commercialization, and fostering Gujarat startup
										ecosystem
									</p>
								</CardContent>
							</Card>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Institutional Background */}
			<section className="py-16 bg-gradient-to-br from-gtu-light via-white to-gtu-base relative overflow-hidden">
				{/* Background decoration */}
				<div className="absolute inset-0 opacity-5">
					<div className="absolute top-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
					<div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
				</div>

				<div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center mb-12"
					>
						<div className="inline-block mb-3">
							<span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
								Our Foundation
							</span>
						</div>
						<h2 className="text-display font-bold text-foreground mb-4">
							Institutional Background
						</h2>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
							Built on the strong foundation of Gujarat's leading institutions
						</p>
					</motion.div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-primary/5">
								<CardContent className="p-8">
									<div className="flex items-start gap-4 mb-6">
										<div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
											<svg
												className="w-8 h-8 text-white"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
												/>
											</svg>
										</div>
										<div>
											<h3 className="text-2xl font-bold text-foreground mb-2">
												Gujarat Technological University
											</h3>
											<span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-semibold">
												Est. 2007
											</span>
										</div>
									</div>

									<div className="space-y-4">
										<p className="text-muted-foreground leading-relaxed">
											A premier academic and research institution dedicated to
											providing quality education and fostering innovation in
											engineering and technology. As Gujarat's largest
											technical university, GTU serves over{' '}
											<span className="font-bold text-foreground">
												4 lakh students
											</span>{' '}
											across{' '}
											<span className="font-bold text-foreground">
												500+ affiliated colleges
											</span>
											.
										</p>
										<div className="pt-4 border-t border-gray-200">
											<h4 className="font-semibold text-foreground mb-3">
												Key Focus Areas:
											</h4>
											<div className="grid grid-cols-2 gap-3">
												<div className="flex items-center gap-2">
													<div className="w-2 h-2 bg-primary rounded-full"></div>
													<span className="text-sm text-muted-foreground">
														Academic Excellence
													</span>
												</div>
												<div className="flex items-center gap-2">
													<div className="w-2 h-2 bg-primary rounded-full"></div>
													<span className="text-sm text-muted-foreground">
														Research & Innovation
													</span>
												</div>
												<div className="flex items-center gap-2">
													<div className="w-2 h-2 bg-primary rounded-full"></div>
													<span className="text-sm text-muted-foreground">
														Industry Collaboration
													</span>
												</div>
												<div className="flex items-center gap-2">
													<div className="w-2 h-2 bg-primary rounded-full"></div>
													<span className="text-sm text-muted-foreground">
														Entrepreneurship
													</span>
												</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-secondary/5">
								<CardContent className="p-8">
									<div className="flex items-start gap-4 mb-6">
										<div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl flex items-center justify-center shadow-lg">
											<svg
												className="w-8 h-8 text-white"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
												/>
											</svg>
										</div>
										<div>
											<h3 className="text-2xl font-bold text-foreground mb-2">
												GICT Society
											</h3>
											<span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full font-semibold">
												Nodal ICT Agency
											</span>
										</div>
									</div>

									<div className="space-y-4">
										<p className="text-muted-foreground leading-relaxed">
											The Gujarat Information & Communication Technology
											Society serves as the{' '}
											<span className="font-bold text-foreground">
												nodal agency
											</span>{' '}
											for implementing ICT initiatives across Gujarat. Through
											various centers and programs, GICT Society drives{' '}
											<span className="font-bold text-foreground">
												digital transformation and innovation
											</span>{' '}
											statewide.
										</p>
										<div className="pt-4 border-t border-gray-200">
											<h4 className="font-semibold text-foreground mb-3">
												Key Initiatives:
											</h4>
											<div className="grid grid-cols-2 gap-3">
												<div className="flex items-center gap-2">
													<div className="w-2 h-2 bg-secondary rounded-full"></div>
													<span className="text-sm text-muted-foreground">
														Digital Infrastructure
													</span>
												</div>
												<div className="flex items-center gap-2">
													<div className="w-2 h-2 bg-secondary rounded-full"></div>
													<span className="text-sm text-muted-foreground">
														ICT Innovation
													</span>
												</div>
												<div className="flex items-center gap-2">
													<div className="w-2 h-2 bg-secondary rounded-full"></div>
													<span className="text-sm text-muted-foreground">
														Startup Ecosystem
													</span>
												</div>
												<div className="flex items-center gap-2">
													<div className="w-2 h-2 bg-secondary rounded-full"></div>
													<span className="text-sm text-muted-foreground">
														Tech Transfer
													</span>
												</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Timeline - Professional Zigzag Style */}
			<section className="py-16 bg-gradient-to-br from-gtu-base via-white to-gtu-light relative overflow-visible">
				{/* Background decoration */}
				<div className="absolute inset-0 opacity-5">
					<div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
					<div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
				</div>

				<div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10 overflow-visible">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center mb-12"
					>
						<div className="inline-block mb-3">
							<span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
								Our Story
							</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
							Our Journey Timeline
						</h2>
						<p className="text-base text-muted-foreground max-w-3xl mx-auto">
							Key milestones that shaped GTU Ventures
						</p>
					</motion.div>

					{/* Timeline */}
					<div className="relative max-w-6xl mx-auto overflow-visible">
						<div className="hidden md:block overflow-visible">
							{[0, 1].map((rowIndex) => {
								const itemsPerRow = 4;
								const startIndex = rowIndex * itemsPerRow;
								const endIndex = startIndex + itemsPerRow;
								const rowItems = sampleTimeline.slice(startIndex, endIndex);
								const isEvenRow = rowIndex % 2 === 0;

								if (rowItems.length === 0) return null;

								return (
									<div key={rowIndex} className="relative mb-16 overflow-visible">
										{/* CONNECTING LINE - dynamic to each circle center */}
										{rowItems.length > 1 && (
											<div className="absolute w-full top-[30px] left-0 z-[1] overflow-visible">
												<div
													className="mx-auto h-[2px] bg-gray-300"
													style={{
														width: `calc(100% - ${
															100 / rowItems.length / 2
														}% - ${100 / rowItems.length / 2}%)`,
														marginLeft: `${100 / rowItems.length / 2}%`,
													}}
												></div>
											</div>
										)}

										{/* ROW ITEMS */}
										<div
											className={`relative flex justify-between items-start ${
												isEvenRow ? 'flex-row' : 'flex-row-reverse'
											} px-12 overflow-visible`}
										>
											{(isEvenRow ? rowItems : [...rowItems].reverse()).map(
												(item, idx) => {
													const actualIndex = isEvenRow
														? startIndex + idx
														: startIndex + (rowItems.length - 1 - idx);
													const isExpanded = expandedYear === item.year;

													const colors = [
														'from-green-500 to-green-600',
														'from-orange-500 to-orange-600',
														'from-blue-500 to-blue-600',
														'from-purple-600 to-purple-700',
														'from-yellow-500 to-yellow-600',
														'from-red-600 to-red-700',
														'from-cyan-500 to-cyan-600',
														'from-indigo-600 to-indigo-700',
														'from-pink-600 to-pink-700',
														'from-teal-500 to-teal-600',
													];
													const colorClass =
														colors[actualIndex % colors.length];

													return (
														<div
															key={item.year}
															className="relative flex flex-col items-center text-center overflow-visible"
															style={{
																flex: '0 0 25%',
																zIndex: isExpanded ? 9999 : 10,
															}}
														>
															{/* Year Circle */}
															<motion.button
																onClick={() =>
																	toggleExpand(item.year)
																}
																whileHover={{ scale: 1.08 }}
																whileTap={{ scale: 0.95 }}
																initial={{ opacity: 0, scale: 0 }}
																whileInView={{
																	opacity: 1,
																	scale: 1,
																}}
																viewport={{ once: true }}
																transition={{
																	duration: 0.4,
																	delay: actualIndex * 0.08,
																}}
																className={`relative w-[60px] h-[60px] rounded-full bg-gradient-to-br ${colorClass} text-white shadow-md flex items-center justify-center border-4 border-white transition-all duration-300 ${
																	isExpanded
																		? 'ring-4 ring-primary ring-offset-2 scale-110 shadow-xl'
																		: 'hover:shadow-lg'
																}`}
															>
																<span className="text-sm font-bold">
																	{item.year}
																</span>
															</motion.button>

															{/* Label */}
															<motion.div
																initial={{ opacity: 0, y: -5 }}
																whileInView={{ opacity: 1, y: 0 }}
																viewport={{ once: true }}
																transition={{
																	delay: actualIndex * 0.1 + 0.15,
																}}
																className="mt-3 text-center px-2"
															>
																<p className="text-xs text-foreground font-semibold leading-snug">
																	{item.event}
																</p>
															</motion.div>

															{/* Detail Card */}
															{isExpanded && (
																<motion.div
																	initial={{
																		opacity: 0,
																		scale: 0.85,
																		y: -10,
																	}}
																	animate={{
																		opacity: 1,
																		scale: 1,
																		y: 0,
																	}}
																	exit={{
																		opacity: 0,
																		scale: 0.85,
																		y: -10,
																	}}
																	transition={{
																		duration: 0.25,
																		ease: 'easeOut',
																	}}
																	className="absolute top-20 w-72 bg-white rounded-2xl shadow-2xl p-5 border-2 border-primary/20 z-[9999]"
																>
																	<div className="flex items-start gap-3 mb-3">
																		<div
																			className={`w-10 h-10 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center flex-shrink-0 shadow-md`}
																		>
																			<span className="text-white text-sm font-bold">
																				{item.year}
																			</span>
																		</div>
																		<div className="flex-1">
																			<h4 className="text-base font-bold text-foreground mb-1">
																				Milestone{' '}
																				{actualIndex + 1}
																			</h4>
																			<p className="text-sm text-muted-foreground leading-relaxed">
																				{item.event}
																			</p>
																		</div>
																	</div>
																	<div className="pt-3 border-t border-gray-200">
																		<p className="text-sm text-muted-foreground leading-relaxed mb-3">
																			This milestone marked
																			significant progress in
																			our journey toward
																			building a world-class
																			innovation ecosystem.
																		</p>
																		<div className="flex flex-wrap gap-2">
																			<span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
																				Innovation
																			</span>
																			<span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
																				Growth
																			</span>
																			<span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
																				Impact
																			</span>
																		</div>
																	</div>
																</motion.div>
															)}
														</div>
													);
												}
											)}
										</div>

										{/* VERTICAL CONNECTOR */}
										{rowIndex < 1 && sampleTimeline.length > endIndex && (
											<div
												className="absolute w-[2px] bg-gray-300"
												style={{
													top: '30px',
													height: 'calc(100% + 4rem + 1px)',
													left: isEvenRow ? 'calc(87.5%)' : 'calc(12.5%)',
													zIndex: 1,
												}}
											></div>
										)}
									</div>
								);
							})}
						</div>

						{/* MOBILE VIEW */}
						<div className="block md:hidden relative pl-8">
							<div className="absolute left-5 top-0 bottom-0 w-[2px] bg-gray-300"></div>

							{sampleTimeline.map((item, index) => {
								const colorClass = [
									'from-green-500 to-green-600',
									'from-orange-500 to-orange-600',
									'from-blue-500 to-blue-600',
									'from-purple-600 to-purple-700',
									'from-yellow-500 to-yellow-600',
									'from-red-600 to-red-700',
									'from-indigo-600 to-indigo-700',
									'from-pink-600 to-pink-700',
								][index % 8];
								const isExpanded = expandedYear === item.year;

								return (
									<motion.div
										key={item.year}
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ delay: index * 0.1 }}
										className="relative mb-10 pb-6"
									>
										<motion.button
											onClick={() => toggleExpand(item.year)}
											whileTap={{ scale: 0.9 }}
											className={`absolute -left-3 w-10 h-10 rounded-full bg-gradient-to-br ${colorClass} text-white shadow-lg flex items-center justify-center border-4 border-white transition-all duration-300 ${
												isExpanded ? 'ring-4 ring-primary scale-110' : ''
											}`}
										>
											<span className="text-xs font-bold">{item.year}</span>
										</motion.button>

										<div className="ml-6 pl-2">
											<h4 className="text-sm font-bold text-foreground mb-1">
												Milestone {index + 1}
											</h4>
											<p className="text-xs text-muted-foreground leading-relaxed">
												{item.event}
											</p>

											{isExpanded && (
												<motion.div
													initial={{ opacity: 0, height: 0 }}
													animate={{ opacity: 1, height: 'auto' }}
													exit={{ opacity: 0, height: 0 }}
													className="mt-3 pt-3 border-t border-gray-200"
												>
													<p className="text-xs text-muted-foreground leading-relaxed mb-2">
														This milestone marked significant progress
														in our journey toward building a world-class
														innovation ecosystem.
													</p>
													<div className="flex flex-wrap gap-1">
														<span className="px-2 py-1 bg-primary/10 text-primary text-[10px] rounded-full font-medium">
															Innovation
														</span>
														<span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] rounded-full font-medium">
															Growth
														</span>
														<span className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] rounded-full font-medium">
															Impact
														</span>
													</div>
												</motion.div>
											)}
										</div>
									</motion.div>
								);
							})}
						</div>
					</div>

					{/* Info Text */}
					<div className="text-center mt-8">
						<p className="text-xs text-muted-foreground">
							Click on any year circle to view detailed information
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
