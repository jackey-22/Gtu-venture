import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Zap, Target, Clock } from 'lucide-react';

const programIcons = {
	'pre-incubation': Lightbulb,
	'incubation': Zap,
	'acceleration': Target,
};

export default function Programs() {
	const [selectedStage, setSelectedStage] = useState<string>('all');
	const [programs, setPrograms] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchPrograms = async () => {
			try {
				const res = await fetch('http://localhost:5000/user/get-programs');
				const data = await res.json();
        // console.log(data);
				setPrograms(data.data || []);
			} catch (err) {
				console.error('Failed to fetch programs:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchPrograms();
	}, []);

	const filteredPrograms =
		selectedStage === 'all'
			? programs
			: programs.filter((program) => program.category === selectedStage);

	return (
		<div className="min-h-screen pt-20">
			{/* Hero Section */}
			<section className="py-24 bg-gradient-to-br from-gtu-base to-gtu-light">
				<div className="max-w-7xl mx-auto px-6 lg:px-16">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center"
					>
						<h1 className="text-hero font-extrabold text-foreground mb-6">
							Our Programs
						</h1>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
							Comprehensive support at every stage of your entrepreneurial journey,
							from idea validation to scaling your business.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Program Filters */}
			<section className="py-12 bg-background border-b">
				<div className="max-w-7xl mx-auto px-6 lg:px-16">
					<div className="flex flex-wrap justify-center gap-4">
						<Button
							variant={selectedStage === 'all' ? 'default' : 'outline'}
							onClick={() => setSelectedStage('all')}
						>
							All Programs
						</Button>
						<Button
							variant={selectedStage === 'pre-incubation' ? 'default' : 'outline'}
							onClick={() => setSelectedStage('pre-incubation')}
						>
							Early Stage
						</Button>
						<Button
							variant={selectedStage === 'incubation' ? 'default' : 'outline'}
							onClick={() => setSelectedStage('incubation')}
						>
							Growth Stage
						</Button>
						<Button
							variant={selectedStage === 'acceleration' ? 'default' : 'outline'}
							onClick={() => setSelectedStage('acceleration')}
						>
							Scale Stage
						</Button>
					</div>
				</div>
			</section>

			{/* Program Cards */}
			<section className="py-24 bg-background">
				<div className="max-w-7xl mx-auto px-6 lg:px-16">
					{loading ? (
						<p className="text-center text-muted-foreground">Loading programs...</p>
					) : filteredPrograms.length === 0 ? (
						<p className="text-center text-muted-foreground">
							No programs found for this stage.
						</p>
					) : (
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
							{filteredPrograms.map((program, index) => {
								const Icon =
									programIcons[program.stage as keyof typeof programIcons] ||
									Lightbulb;

								return (
									<motion.div
										key={program.id}
										initial={{ opacity: 0, y: 30 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: index * 0.1 }}
									>
										<Card className="h-full hover-lift">
											<CardContent className="p-8">
												<div className="bg-primary/10 rounded-2xl p-4 w-fit mb-6">
													<Icon className="w-8 h-8 text-primary" />
												</div>
												<h3 className="text-2xl font-bold text-foreground mb-4">
													{program.title}
												</h3>
												<p className="text-muted-foreground mb-6 leading-relaxed">
													{program.description}
												</p>
												<div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
													<div className="flex items-center gap-2">
														<Clock className="w-4 h-4" />
														{program.duration}
													</div>
													<Badge
                    
														variant="secondary"
														className="capitalize p-1"
													>
														{program.category}
													</Badge>
												</div>

												<Tabs defaultValue="benefits" className="w-full">
													<TabsList className="grid w-full grid-cols-2">
														<TabsTrigger value="benefits">
															Benefits
														</TabsTrigger>
														<TabsTrigger value="eligibility">
															Eligibility
														</TabsTrigger>
													</TabsList>

													<TabsContent value="benefits" className="mt-4">
														<ul className="space-y-2 text-sm text-muted-foreground">
															{program.benefits.map(
																(benefit: string, i: number) => (
																	<li
																		key={i}
																		className="flex items-start gap-2"
																	>
																		<div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
																		{benefit}
																	</li>
																)
															)}
														</ul>
													</TabsContent>

													<TabsContent
														value="eligibility"
														className="mt-4"
													>
														<ul className="space-y-2 text-sm text-muted-foreground">
															{program.eligibility.map(
																(criterion: string, i: number) => (
																	<li
																		key={i}
																		className="flex items-start gap-2"
																	>
																		<div className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0"></div>
																		{criterion}
																	</li>
																)
															)}
														</ul>
													</TabsContent>
												</Tabs>

												<Button
													asChild
													className="w-full mb-2 bg-primary text-primary-foreground"
												>
													<a href="/apply">Apply for {program.title}</a>
												</Button>
											</CardContent>
										</Card>
									</motion.div>
								);
							})}
						</div>
					)}
				</div>
			</section>
		</div>
	);
}
