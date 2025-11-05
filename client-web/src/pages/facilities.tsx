import { motion } from 'framer-motion';
import {
	Wrench,
	Box,
	Zap,
	Users,
	Scale,
	Calculator,
	Shield,
	Download,
	FileText,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchGet } from '@/utils/fetch.utils';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function Facilities() {
	const [items, setItems] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedFacility, setSelectedFacility] = useState<any | null>(null);

	useEffect(() => {
		const fetchFacilities = async () => {
			try {
				const data = await fetchGet({ pathName: 'user/get-facilities' });
				const facilities = data?.data || [];
				setItems(facilities);
				console.log('facilities: ', facilities);
			} catch (error) {
				console.error('Error fetching facilities:', error);
				setItems([]);
			} finally {
				setLoading(false);
			}
		};
		fetchFacilities();
	}, []);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
	};
	const itemVariants = {
		hidden: { y: 10, opacity: 0 },
		visible: { y: 0, opacity: 1, transition: { duration: 0.45 } },
	};

	const categoryIcons: any = {
		infrastructure: Box,
		services: Wrench,
		tools: FileText,
		default: FileText,
	};

	const demo = [
		{
			title: 'Co-working Spaces',
			body: 'Access to shared desks, meeting rooms, and private cabins for cohort teams and visiting mentors.',
			icon: Box,
			action: 'Request Desk',
		},
		{
			title: 'Prototyping Labs',
			body: 'Electronics benches, 3D printers, and fabrication tools to help teams build MVPs.',
			icon: Wrench,
			action: 'Book Lab',
		},
		{
			title: 'Energy Testing',
			body: 'Facilities for testing energy and power systems at scale.',
			icon: Zap,
			action: 'Request Slot',
		},
	];

	const services = [
		{
			title: 'Mentoring & Coaching',
			body: 'Access to experienced mentors from industry and academia for guidance on business development, technical challenges, and scaling.',
			icon: Users,
		},
		{
			title: 'Legal Support',
			body: 'Assistance with incorporation, IP protection, contracts, and compliance to ensure startups are legally sound.',
			icon: Scale,
		},
		{
			title: 'Intellectual Property',
			body: 'Guidance on patents, trademarks, copyrights, and IP strategy to protect innovations.',
			icon: Shield,
		},
	];

	const tools = [
		{
			title: 'Business Plan Template',
			description:
				"A comprehensive template to outline your startup's vision, market analysis, and financial projections.",
			download: '/downloads/business-plan-template.docx',
			icon: FileText,
		},
		{
			title: 'Pitch Deck Template',
			description: 'Professional slide deck template for investor presentations.',
			download: '/downloads/pitch-deck-template.pptx',
			icon: FileText,
		},
		{
			title: 'Financial Model Spreadsheet',
			description: 'Excel template for financial forecasting and budgeting.',
			download: '/downloads/financial-model.xlsx',
			icon: FileText,
		},
		{
			title: 'Legal Agreement Forms',
			description: 'Standard templates for NDAs, term sheets, and partnership agreements.',
			download: '/downloads/legal-forms.zip',
			icon: FileText,
		},
	];

	// Group facilities by category
	const infrastructureItems = items.length
		? items
				.filter((it: any) => it.category === 'infrastructure')
				.map((it: any) => ({
					title: it.title,
					body: it.body,
					icon: categoryIcons[it.category] ?? categoryIcons.default,
					actions: it.action ? it.action.split(',').map((a: string) => a.trim()) : [],
				}))
		: demo.map((x) => ({ ...x, actions: x.action ? [x.action] : [] }));

	const servicesItems = items.length
		? items
				.filter((it: any) => it.category === 'services')
				.map((it: any) => ({
					title: it.title,
					body: it.body,
					icon: categoryIcons[it.category] ?? categoryIcons.default,
					actions: it.action ? it.action.split(',').map((a: string) => a.trim()) : [],
				}))
		: services.map((x) => ({ ...x, actions: [] }));

	const toolsItems = items.length
		? items
				.filter((it: any) => it.category === 'tools')
				.map((it: any) => ({
					title: it.title,
					description: it.body,
					download: it.action || '#',
					icon: categoryIcons[it.category] ?? categoryIcons.default,
				}))
		: tools;

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

				<section className="py-14">
					<div className="max-w-7xl mx-auto px-6 lg:px-16">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{Array.from({ length: 6 }).map((_, i) => (
								<div key={i} className="p-8 border rounded-xl animate-pulse">
									<div className="h-12 w-12 bg-gray-300 rounded-xl mb-4"></div>
									<div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
									<div className="h-4 w-full bg-gray-200 rounded"></div>
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
							Facilities & Resources
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
							Infrastructure, labs, and services available to startups at GTU
							Ventures.
						</p>
					</motion.div>
				</div>
			</section>

			<section className="py-14">
				<div className="max-w-7xl mx-auto px-6 lg:px-16">
					{/* Infrastructure Section */}
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="mb-16"
					>
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-foreground mb-4">
								Infrastructure
							</h2>
							<div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr md:gap-8 place-items-start">
							{infrastructureItems.map((it: any, i: number) => {
								const Icon = it.icon ?? Box;
								return (
									<motion.article
										variants={itemVariants}
										key={i}
										className="group overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 cursor-pointer h-full flex flex-col"
										onClick={() => setSelectedFacility(it)}
									>
										<div className="p-8 flex flex-col flex-1">
											<div className="flex items-start gap-6">
												<div className="p-4 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex-shrink-0">
													<Icon className="w-8 h-8" />
												</div>
												<div className="flex-1 min-w-0">
													<div className="font-bold text-xl text-foreground mb-3 line-clamp-2">
														{it.title}
													</div>
													<div className="text-muted-foreground leading-relaxed line-clamp-3">
														{it.body}
													</div>
												</div>
											</div>
											{it.actions?.length > 0 && (
												<div className="flex flex-wrap gap-2 mt-4">
													{it.actions.map(
														(action: string, idx: number) => (
															<span
																key={idx}
																className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
															>
																{action}
															</span>
														)
													)}
												</div>
											)}
										</div>
									</motion.article>
								);
							})}
						</div>
					</motion.div>

					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="mb-16 bg-muted/30 rounded-3xl p-16"
					>
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-foreground mb-4">Services</h2>
							<div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
							<p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
								Comprehensive support services to accelerate your startup journey
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
							{servicesItems.map((service, i) => {
								const Icon = service.icon ?? Users;
								return (
									<motion.article
										variants={itemVariants}
										key={i}
										className="group overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 cursor-pointer h-full flex flex-col"
										onClick={() => setSelectedFacility(service)}
									>
										<div className="p-8 flex flex-col flex-1">
											<div className="flex items-start gap-6">
												<div className="p-4 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex-shrink-0">
													<Icon className="w-8 h-8" />
												</div>
												<div className="flex-1 min-w-0">
													<div className="font-bold text-xl text-foreground mb-3 line-clamp-2">
														{service.title}
													</div>
													<div className="text-muted-foreground leading-relaxed line-clamp-3">
														{service.body}
													</div>
												</div>
											</div>
											{service.actions?.length > 0 && (
												<div className="flex flex-wrap gap-2 mt-4">
													{service.actions.map(
														(action: string, idx: number) => (
															<span
																key={idx}
																className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
															>
																{action}
															</span>
														)
													)}
												</div>
											)}
										</div>
									</motion.article>
								);
							})}
						</div>
					</motion.div>

					{/* Tools & Downloads Section */}
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="mb-16"
					>
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-foreground mb-4">
								Tools & Downloads
							</h2>
							<div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
							<p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
								Downloadable templates and resources to support your startup
								development
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{toolsItems.map((tool, i) => {
								const Icon = tool.icon ?? FileText;
								return (
									<motion.article
										variants={itemVariants}
										key={i}
										className="group overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 cursor-pointer h-full flex flex-col"
										onClick={() => setSelectedFacility(tool)}
									>
										<div className="p-8 flex flex-col flex-1">
											<div className="flex items-start gap-6">
												<div className="p-4 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex-shrink-0">
													<Icon className="w-8 h-8" />
												</div>
												<div className="flex-1 min-w-0">
													<div className="font-bold text-xl text-foreground mb-3 line-clamp-2">
														{tool.title}
													</div>
													<div className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
														{tool.description}
													</div>
													<a
														href={tool.download}
														download
														className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium"
														onClick={(e) => e.stopPropagation()}
													>
														<Download className="w-5 h-5" />
														Download
													</a>
												</div>
											</div>
										</div>
									</motion.article>
								);
							})}
						</div>
					</motion.div>

					{/* Facility Detail Modal */}
					<Dialog
						open={!!selectedFacility}
						onOpenChange={() => setSelectedFacility(null)}
					>
						<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
							{selectedFacility && (
								<>
									<DialogHeader>
										<div className="flex items-start gap-4 mb-4">
											<div className="p-4 bg-primary/10 rounded-xl text-primary flex-shrink-0">
												{(() => {
													const Icon = selectedFacility.icon
														? eval(selectedFacility.icon)
														: Box;
													return <Icon className="w-8 h-8" />;
												})()}
											</div>
											<div className="flex-1 min-w-0">
												<DialogTitle className="text-2xl font-bold text-foreground mb-2">
													{selectedFacility.title}
												</DialogTitle>
												<span>{selectedFacility.category}</span>
											</div>
										</div>
									</DialogHeader>

									<div className="space-y-4">
										{(selectedFacility.body ||
											selectedFacility.description) && (
											<DialogDescription className="text-base leading-relaxed">
												{selectedFacility.body ||
													selectedFacility.description}
											</DialogDescription>
										)}

										{selectedFacility.actions?.length > 0 && (
											<div className="flex flex-wrap gap-2 pt-4">
												{selectedFacility.actions.map(
													(a: string, idx: number) => (
														<span
															key={idx}
															className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-xl border border-primary/20"
														>
															{a}
														</span>
													)
												)}
											</div>
										)}

										{selectedFacility.download &&
											selectedFacility.download !== '#' && (
												<div className="pt-4">
													<Button asChild className="w-full">
														<a
															href={selectedFacility.download}
															download
														>
															<Download className="w-4 h-4 mr-2" />
															Download
														</a>
													</Button>
												</div>
											)}
									</div>
								</>
							)}
						</DialogContent>
					</Dialog>
				</div>
			</section>
		</div>
	);
}
