import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Briefcase, Users, GraduationCap, Heart, DollarSign, Code, Search, ChevronDown, Check } from 'lucide-react';
import { fetchGet } from '@/utils/fetch.utils';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import {
	Command,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
} from '@/components/ui/command';

export default function Careers() {
	const [openings, setOpenings] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedOpening, setSelectedOpening] = useState<any | null>(null);
	const [search, setSearch] = useState('');

	useEffect(() => {
		const fetchCareers = async () => {
			try {
				const data = await fetchGet({ pathName: 'user/get-careers' });
				const careers = data?.data || [];
				// Map backend fields to UI structure
				const mappedCareers = careers.map((c: any) => ({
					title: c.title,
					body: c.body || `${c.type}, ${c.location || ''}`,
					type: c.type,
					category: c.category || 'General',
					icon: Briefcase,
					startup: c.startup || 'GTU Ventures',
					details: c.details || c.body || '',
					requirements: c.requirements || [],
					benefits: c.benefits || [],
					location: c.location || '',
				}));
				setOpenings(mappedCareers);
			} catch (error) {
				console.error('Error fetching careers:', error);
				setOpenings([]);
			} finally {
				setLoading(false);
			}
		};
		fetchCareers();
	}, []);

	const demo = [
		{
			title: 'Program Coordinator',
			body: 'Full-time, Ahmedabad',
			type: 'Full-time',
			category: 'Operations',
			icon: Briefcase,
			startup: 'GTU Ventures',
			details:
				'Lead program coordination for startup incubation initiatives, manage cohort activities, and support entrepreneurs through their journey.',
			requirements: ["Bachelor's degree", '2+ years experience', 'Project management skills'],
			benefits: ['Competitive salary', 'Health insurance', 'Professional development'],
			location: 'Ahmedabad, Gujarat',
		},
		{
			title: 'Intern - Community Engagement',
			body: '3 months internship',
			type: 'Internship',
			category: 'Marketing',
			icon: Users,
			startup: 'EduTech Solutions',
			details:
				'Support community outreach programs, organize startup events, and engage with student entrepreneurs across Gujarat.',
			requirements: [
				'Currently pursuing degree',
				'Communication skills',
				'Social media experience',
			],
			benefits: ['Stipend', 'Certificate', 'Networking opportunities'],
			location: 'Remote/Hybrid',
		},
		{
			title: 'Technical Mentor (Part-time)',
			body: 'Mentor startups on product development',
			type: 'Part-time',
			category: 'Tech',
			icon: Code,
			startup: 'AgriTech Innovations',
			details:
				'Provide technical guidance to early-stage startups in product development, coding best practices, and technology stack selection.',
			requirements: ['5+ years experience', 'Tech background', 'Mentoring experience'],
			benefits: ['Flexible hours', 'Equity options', 'Professional network'],
			location: 'Virtual/On-site',
		},
		{
			title: 'Innovation Fellowship',
			body: '6-month fellowship for student innovators',
			type: 'Fellowship',
			category: 'Education',
			icon: GraduationCap,
			startup: 'GTU Ventures',
			details:
				'Work on innovative projects, collaborate with startups, and develop entrepreneurial skills through hands-on experience.',
			requirements: ['Current student', 'Innovation mindset', 'Basic tech skills'],
			benefits: ['Full stipend', 'Mentorship', 'Project funding'],
			location: 'GTU Campus',
		},
		{
			title: 'Healthcare Startup Advisor',
			body: 'Part-time advisory role for health tech startups',
			type: 'Part-time',
			category: 'Healthcare',
			icon: Heart,
			startup: 'MediCare Solutions',
			details:
				'Advise healthcare startups on regulatory compliance, market strategy, and scaling healthcare technology solutions.',
			requirements: ['Healthcare background', 'Business experience', 'Regulatory knowledge'],
			benefits: ['Flexible schedule', 'Industry insights', 'Potential equity'],
			location: 'Ahmedabad',
		},
		{
			title: 'Finance Analyst Intern',
			body: 'Summer internship in startup finance',
			type: 'Internship',
			category: 'Finance',
			icon: DollarSign,
			startup: 'FinTech Hub',
			details:
				'Analyze financial data, support fundraising efforts, and learn about startup financial management and investment strategies.',
			requirements: ['Finance/Commerce student', 'Excel skills', 'Analytical mindset'],
			benefits: ['Learning experience', 'Stipend', 'Industry exposure'],
			location: 'Ahmedabad Office',
		},
	];

	const displayOpenings = openings.length ? openings : demo;

	const categories = [
		'All',
		...Array.from(new Set(displayOpenings.map((o) => o.category || 'General'))),
	];

	const [selectedCategory, setSelectedCategory] = useState('All');
	const [categoryOpen, setCategoryOpen] = useState(false);

	const filteredOpenings = displayOpenings.filter((o) => {
		const matchesCategory = selectedCategory === 'All' || o.category === selectedCategory;
		const matchesSearch =
			o.title.toLowerCase().includes(search.toLowerCase()) ||
			o.startup.toLowerCase().includes(search.toLowerCase()) ||
			o.details.toLowerCase().includes(search.toLowerCase());

		return matchesCategory && matchesSearch;
	});

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
	};
	const itemVariants = {
		hidden: { y: 10, opacity: 0 },
		visible: { y: 0, opacity: 1, transition: { duration: 0.45 } },
	};

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
								<div className="h-4 w-20 bg-gray-300 rounded mb-2 animate-pulse"></div>
								<div className="h-10 w-full max-w-xs bg-gray-200 rounded-full animate-pulse"></div>
							</div>
							<div className="w-full flex flex-col items-start">
								<div className="h-4 w-16 bg-gray-300 rounded mb-2 animate-pulse"></div>
								<div className="h-10 w-full max-w-sm bg-gray-200 rounded-full animate-pulse"></div>
							</div>
						</div>
					</div>
				</section>

				<section className="py-14">
					<div className="max-w-7xl mx-auto px-6 lg:px-16">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{Array.from({ length: 6 }).map((_, i) => (
								<div key={i} className="p-8 border rounded-xl animate-pulse">
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
							Careers
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
							Join GTU Ventures — current openings, internships, and fellowship opportunities across various startup categories.
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
								<h5 className="text-center mb-2 text-base font-medium">CATEGORY</h5>
								<Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											className="w-full max-w-xs justify-between rounded-full"
										>
											{selectedCategory}
											<ChevronDown className="ml-2 h-4 w-4 opacity-50" />
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-[250px] p-0">
										<Command>
											<CommandInput placeholder="Search category…" />
											<CommandList className="max-h-60 overflow-y-auto">
												<CommandEmpty>No category found.</CommandEmpty>
												<CommandGroup>
													{categories.map((cat) => (
														<CommandItem
															key={cat}
															onSelect={() => {
																setSelectedCategory(cat);
																setCategoryOpen(false);
															}}
															className="cursor-pointer"
														>
															{cat}
															{selectedCategory === cat && (
																<Check className="ml-auto h-4 w-4" />
															)}
														</CommandItem>
													))}
												</CommandGroup>
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
							</div>

							<div className="w-full flex flex-col items-start">
								<h5 className="text-center mb-2 text-base font-medium">SEARCH</h5>
								<div className="relative w-full max-w-sm">
									<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
									<Input
										type="text"
										placeholder="Search role, startup, skills..."
										value={search}
										onChange={(e) => setSearch(e.target.value)}
										className="pl-10 rounded-full"
									/>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			<section className="py-14">
				<div className="max-w-7xl mx-auto px-6 lg:px-16">
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
					>
				{filteredOpenings.map((o: any, i: number) => {
					return (
						<motion.article
							variants={itemVariants}
							key={i}
							className="group overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-2xl hover:border-primary/20 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
							onClick={() => setSelectedOpening(o)}
						>
							<div className="p-8 flex flex-col h-full">
								<div className="flex items-start gap-4 mb-6">
									<div className="flex-1 min-w-0">
										<div className="font-bold text-xl text-foreground mb-1 line-clamp-2">
											{o.title}
										</div>
										<div className="text-primary font-medium mb-2 truncate">
											{o.startup}
										</div>
										<div className="text-muted-foreground leading-relaxed mb-4 line-clamp-2">
											{o.details}
										</div>
										<div className="flex items-center gap-3 flex-wrap mb-4">
											<span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium whitespace-nowrap">
												{o.type}
											</span>
											<span className="text-xs px-3 py-1 bg-secondary/10 text-secondary rounded-full font-medium whitespace-nowrap">
												{o.category || 'General'}
											</span>
											<span className="text-xs px-3 py-1 bg-accent/10 text-accent-foreground rounded-full font-medium truncate max-w-[120px]">
												{o.location}
											</span>
										</div>
									</div>
								</div>

								<div className="space-y-4 mb-6">
									<div>
										<h4 className="font-semibold text-sm text-foreground mb-2">
											Requirements
										</h4>
										<ul className="text-sm text-muted-foreground space-y-1">
											{o.requirements.map((req: string, idx: number) => (
												<li key={idx} className="flex items-center gap-2">
													<div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
													{req}
												</li>
											))}
										</ul>
									</div>

									<div>
										<h4 className="font-semibold text-sm text-foreground mb-2">
											Benefits
										</h4>
										<ul className="text-sm text-muted-foreground space-y-1">
											{o.benefits.map((benefit: string, idx: number) => (
												<li key={idx} className="flex items-center gap-2">
													<div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
													{benefit}
												</li>
											))}
										</ul>
									</div>
								</div>

								<div className="mt-auto">
									<a
										href="#"
										className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium w-full justify-center"
										onClick={(e) => e.stopPropagation()}
									>
										Apply Now
									</a>
								</div>
							</div>
						</motion.article>
					);
				})}
			</motion.div>

			{/* Call to Action */}
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="mt-16 text-center"
			>
				<div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-12">
					<h3 className="text-2xl font-bold mb-4">Don't see the perfect role?</h3>
					<p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
						We're always looking for talented individuals to join our mission. Send us
						your resume and let's discuss opportunities.
					</p>
					<a
						href="#"
						className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium"
					>
						Send Resume
					</a>
				</div>
			</motion.div>
				</div>
			</section>

			{/* Career Detail Modal */}
			<Dialog open={!!selectedOpening} onOpenChange={() => setSelectedOpening(null)}>
				<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
					{selectedOpening && (
						<>
							<DialogHeader>
								<div className="flex items-start gap-4 mb-4">
									<div className="p-4 bg-primary/10 rounded-xl text-primary">
										{(() => {
											const Icon = selectedOpening.icon || Briefcase;
											return <Icon className="w-8 h-8" />;
										})()}
									</div>
									<div className="flex-1 min-w-0">
										<DialogTitle className="text-2xl font-bold text-foreground mb-2">
											{selectedOpening.title}
										</DialogTitle>
										<DialogDescription className="text-primary font-medium mb-2">
											{selectedOpening.startup}
										</DialogDescription>
										<div className="flex items-center gap-3 flex-wrap">
											<Badge variant="secondary">
												{selectedOpening.type}
											</Badge>
											<Badge variant="outline">
												{selectedOpening.category || 'General'}
											</Badge>
											<Badge variant="outline">
												{selectedOpening.location}
											</Badge>
										</div>
									</div>
								</div>
							</DialogHeader>

							<div className="space-y-6">
								{selectedOpening.details && (
									<div>
										<h4 className="font-semibold text-foreground mb-2">
											Job Description
										</h4>
										<p className="text-muted-foreground leading-relaxed">
											{selectedOpening.details}
										</p>
									</div>
								)}

								{selectedOpening.requirements &&
									selectedOpening.requirements.length > 0 && (
										<div>
											<h4 className="font-semibold text-foreground mb-3">
												Requirements
											</h4>
											<ul className="space-y-2 text-sm">
												{selectedOpening.requirements.map(
													(req: string, idx: number) => (
														<li
															key={idx}
															className="flex items-start gap-3"
														>
															<div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
															<span className="text-muted-foreground">
																{req}
															</span>
														</li>
													)
												)}
											</ul>
										</div>
									)}

								{selectedOpening.benefits &&
									selectedOpening.benefits.length > 0 && (
										<div>
											<h4 className="font-semibold text-foreground mb-3">
												Benefits
											</h4>
											<ul className="space-y-2 text-sm">
												{selectedOpening.benefits.map(
													(benefit: string, idx: number) => (
														<li
															key={idx}
															className="flex items-start gap-3"
														>
															<div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
															<span className="text-muted-foreground">
																{benefit}
															</span>
														</li>
													)
												)}
											</ul>
										</div>
									)}

								<div className="pt-4">
									<Button asChild className="w-full">
										<a href="#" onClick={(e) => e.stopPropagation()}>
											Apply Now
										</a>
									</Button>
								</div>
							</div>
						</>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
