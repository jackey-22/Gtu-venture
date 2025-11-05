import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog';
import { Lightbulb, Zap, Target, Clock, ChevronDown, Check } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import {
	Command,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
} from '@/components/ui/command';

const programIcons = {
	'pre-incubation': Lightbulb,
	'incubation': Zap,
	'acceleration': Target,
};

const baseApi = import.meta.env.VITE_URL;

export default function Programs() {
	const [selectedStage, setSelectedStage] = useState<string>('all');
	const [programs, setPrograms] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [selectedProgram, setSelectedProgram] = useState<any | null>(null);
	const [categories, setCategories] = useState<string[]>(['all']);
	const [stageOpen, setStageOpen] = useState(false);

	useEffect(() => {
		const fetchPrograms = async () => {
			try {
				const res = await fetch(`${baseApi}user/get-programs`);
				const data = await res.json();

				const programsData = data.data || [];
				setPrograms(programsData);

				const uniqueCats = ['all', ...new Set(programsData.map((p) => p.category))];
				setCategories(uniqueCats);
			} catch (err) {
				console.error('Failed to fetch programs:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchPrograms();
	}, []);

	const filteredPrograms =
		selectedStage === 'all' ? programs : programs.filter((p) => p.category === selectedStage);

	if (loading) {
		return (
			<section className="py-20 bg-background">
				<div className="max-w-7xl px-6 lg:px-16">
					<div className="space-y-4 mb-10">
						<div className="h-8 w-56 bg-white/40 rounded animate-pulse"></div>
						<div className="h-4 w-96 bg-white/30 rounded animate-pulse"></div>
					</div>

					<div className="max-w-5xl mb-10">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
							<div className="flex flex-col items-start w-full">
								<div className="h-4 w-32 bg-gray-300 rounded mb-2 animate-pulse"></div>
								<div className="h-10 w-full max-w-xs bg-gray-200 rounded-full animate-pulse"></div>
							</div>
						</div>
					</div>

					<div className="pl-[10%]">
						<div className="grid grid-cols-1 lg:grid-cols-3 justify-center items-center mx-auto gap-8">
							{Array.from({ length: 3 }).map((_, i) => (
								<div
									key={i}
									className="p-8 border rounded-2xl shadow-sm animate-pulse h-[400px] flex flex-col"
								>
									<div className="h-6 w-44 bg-gray-300 rounded mb-4"></div>
									<div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
									<div className="h-4 w-3/4 bg-gray-200 rounded mb-6"></div>

									<div className="flex items-center gap-4 mb-6">
										<div className="h-4 w-20 bg-gray-200 rounded"></div>
										<div className="h-4 w-16 bg-gray-200 rounded"></div>
									</div>

									<div className="space-y-2 flex-1">
										<div className="h-3 w-full bg-gray-200 rounded"></div>
										<div className="h-3 w-4/5 bg-gray-200 rounded"></div>
										<div className="h-3 w-2/3 bg-gray-200 rounded"></div>
									</div>

									<div className="h-10 w-full bg-gray-300 rounded-xl mt-6"></div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
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
							Our Programs
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
							Comprehensive support at every stage of your entrepreneurial journey,
							from idea validation to scaling your business.
						</p>
					</motion.div>
				</div>
			</section>

			<section className="py-5">
				<div className="max-w-5xl px-6 md:px-16">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start justify-normal">
						<div className="w-full flex flex-col items-start">
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6 }}
								className="text-start"
							>
								<h5 className="text-center mb-2 text-base font-medium">
									PROGRAM CATEGORY
								</h5>
								<Popover open={stageOpen} onOpenChange={setStageOpen}>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											className="w-full max-w-xs justify-between rounded-full capitalize"
										>
											{selectedStage === 'all'
												? 'All Programs'
												: selectedStage.replace('-', ' ')}
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
																setSelectedStage(cat);
																setStageOpen(false);
															}}
															className="cursor-pointer capitalize"
														>
															{cat === 'all'
																? 'All Programs'
																: cat.replace('-', ' ')}
															{selectedStage === cat && (
																<Check className="ml-auto h-4 w-4" />
															)}
														</CommandItem>
													))}
												</CommandGroup>
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
							</motion.div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-10 bg-background">
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
								return (
									<motion.div
										key={program.id}
										initial={{ opacity: 0, y: 30 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: index * 0.1 }}
									>
										<Card
											className="h-full hover-lift cursor-pointer group"
											onClick={(e) => {
												const ignore = ['BUTTON', 'svg', 'path'];
												if (!ignore.includes(e.target.tagName)) {
													setSelectedProgram(program);
												}
											}}
										>
											<CardContent className="p-8 flex flex-col h-full">
												<h3 className="text-2xl font-bold text-foreground mb-4 line-clamp-2">
													{program.title}
												</h3>
												<p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3">
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

												<Tabs
													defaultValue="benefits"
													className="w-full mb-5"
													onClick={(e) => e.stopPropagation()}
												>
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
													className="w-full bg-primary text-primary-foreground mt-auto"
													onClick={(e) => e.stopPropagation()}
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

			<Dialog open={!!selectedProgram} onOpenChange={() => setSelectedProgram(null)}>
				<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
					{selectedProgram && (
						<>
							<DialogHeader>
								<div className="flex items-center gap-4 mb-4">
									<div className="bg-primary/10 rounded-2xl p-4">
										{(() => {
											const Icon =
												programIcons[
													selectedProgram.stage as keyof typeof programIcons
												] || Lightbulb;
											return <Icon className="w-8 h-8 text-primary" />;
										})()}
									</div>
									<div className="flex-1 min-w-0">
										<DialogTitle className="text-2xl font-bold text-foreground mb-2">
											{selectedProgram.title}
										</DialogTitle>
										<DialogDescription className="text-base">
											{selectedProgram.description}
										</DialogDescription>
									</div>
								</div>
							</DialogHeader>

							<div className="space-y-6">
								<div className="flex items-center gap-4 text-sm text-muted-foreground">
									<div className="flex items-center gap-2">
										<Clock className="w-4 h-4" />
										<span>{selectedProgram.duration}</span>
									</div>
									<Badge variant="secondary" className="capitalize">
										{selectedProgram.category}
									</Badge>
								</div>

								<Tabs defaultValue="benefits" className="w-full">
									<TabsList className="grid w-full grid-cols-2">
										<TabsTrigger value="benefits">Benefits</TabsTrigger>
										<TabsTrigger value="eligibility">Eligibility</TabsTrigger>
									</TabsList>

									<TabsContent value="benefits" className="mt-4">
										<ul className="space-y-3 text-sm">
											{selectedProgram.benefits?.map(
												(benefit: string, i: number) => (
													<li key={i} className="flex items-start gap-3">
														<div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
														<span className="text-muted-foreground">
															{benefit}
														</span>
													</li>
												)
											)}
										</ul>
									</TabsContent>

									<TabsContent value="eligibility" className="mt-4">
										<ul className="space-y-3 text-sm">
											{selectedProgram.eligibility?.map(
												(criterion: string, i: number) => (
													<li key={i} className="flex items-start gap-3">
														<div className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0"></div>
														<span className="text-muted-foreground">
															{criterion}
														</span>
													</li>
												)
											)}
										</ul>
									</TabsContent>
								</Tabs>

								<div className="pt-4">
									<Button
										asChild
										className="w-full bg-primary text-primary-foreground"
									>
										<a href="/apply">Apply for {selectedProgram.title}</a>
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
