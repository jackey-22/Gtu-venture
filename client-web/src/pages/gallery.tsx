import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Lightbox from '@/components/ui/lightbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ChevronDown, Check } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import {
	Command,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
} from '@/components/ui/command';

export default function Gallery() {
	const [galleries, setGalleries] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState('');
	const baseURL = import.meta.env.VITE_URL;

	// Fetch galleries from backend
	useEffect(() => {
		const fetchGalleries = async () => {
			try {
				const res = await fetch(`${baseURL}user/get-gallery`);
				if (!res.ok) throw new Error('Failed to fetch galleries');
				const json = await res.json();
				const data = json.data || [];
				setGalleries(data);
			} catch (error) {
				console.error('Error fetching galleries:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchGalleries();
	}, [baseURL]);

	// Demo videos
	const demoVideos = [
		{
			src: 'https://www.youtube.com/embed/2Vv-BfVoq4g',
			title: 'Event Highlights: GTU Demo Day 2025',
		},
		{
			src: 'https://www.youtube.com/embed/1wZw7Rv2wrw',
			title: 'Startup Pitch: AgriTech Solutions',
		},
		{
			src: 'https://www.youtube.com/embed/3fumBcKC6RE',
			title: 'Media Clip: GTU Ventures in News',
		},
	];

	const filteredGalleries = galleries.filter((g) => {
		const txt = `${g.title} ${g.description}`.toLowerCase();
		return txt.includes(search.toLowerCase());
	});

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
	};
	const itemVariants = {
		hidden: { scale: 0.98, opacity: 0 },
		visible: { scale: 1, opacity: 1, transition: { duration: 0.45 } },
	};

	const [active, setActive] = useState<{ galleryId: string; idx: number } | null>(null);
	const [tab, setTab] = useState('photos');
	const [tabOpen, setTabOpen] = useState(false);
	const tabs = ['photos', 'videos'];

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
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{Array.from({ length: 6 }).map((_, i) => (
								<div
									key={i}
									className="h-48 bg-gray-300 rounded animate-pulse"
								></div>
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
							Gallery
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
							Photos and videos from our events, campus, startups, and community.
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
								<h5 className="text-center mb-2 text-base font-medium">
									MEDIA TYPE
								</h5>
								<Popover open={tabOpen} onOpenChange={setTabOpen}>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											className="w-full max-w-xs justify-between rounded-full capitalize"
										>
											{tab}
											<ChevronDown className="ml-2 h-4 w-4 opacity-50" />
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-[250px] p-0">
										<Command>
											<CommandInput placeholder="Search type…" />
											<CommandList className="max-h-60 overflow-y-auto">
												<CommandEmpty>No type found.</CommandEmpty>
												<CommandGroup>
													{tabs.map((t) => (
														<CommandItem
															key={t}
															onSelect={() => {
																setTab(t);
																setTabOpen(false);
															}}
															className="cursor-pointer capitalize"
														>
															{t}
															{tab === t && (
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
										value={search}
										onChange={(e) => setSearch(e.target.value)}
										placeholder="Search photos..."
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
					{tab === 'photos' ? (
						galleries.length === 0 ? (
							<div className="text-center text-muted-foreground py-10">
								No galleries found.
							</div>
						) : (
							<div className="grid grid-cols-1 gap-10 mb-8">
								{galleries.map((gallery) => (
									<div key={gallery._id} className="">
										<div className="text-lg font-semibold text-foreground mb-4 text-center md:text-left">
											{gallery.title}
										</div>
										{gallery.description && (
											<p className="text-sm text-muted-foreground mb-3">
												{gallery.description}
											</p>
										)}
										<motion.div
											variants={containerVariants}
											initial="hidden"
											animate="visible"
											className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
										>
											{gallery.images &&
												gallery.images.map((img: string, idx: number) => (
													<motion.div
														variants={itemVariants}
														key={`${gallery._id}-${idx}`}
														className="group overflow-hidden rounded-2xl shadow-lg bg-card border border-border transform hover:scale-[1.03] hover:shadow-xl transition-all duration-300 cursor-pointer"
														onClick={() =>
															setActive({
																galleryId: gallery._id,
																idx,
															})
														}
													>
														<div className="relative h-48">
															<img
																src={`${baseURL}${img.replace(
																	/\\/g,
																	'/'
																)}`}
																alt={`${gallery.title} - ${
																	idx + 1
																}`}
																className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
															/>

															<div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500" />

															<div className="absolute inset-0 flex items-end p-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
																<div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded text-sm font-medium shadow-md">
																	{gallery.title}
																</div>
															</div>
														</div>
													</motion.div>
												))}
										</motion.div>
									</div>
								))}
							</div>
						)
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
							{demoVideos.map((vid, i) => (
								<div
									key={vid.src}
									className="rounded-2xl shadow-lg bg-card border border-transparent overflow-hidden"
								>
									<div className="aspect-w-16 aspect-h-9 w-full">
										<iframe
											src={vid.src}
											title={vid.title}
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
											allowFullScreen
											className="w-full h-56 rounded-t-2xl"
										/>
									</div>
									<div className="p-4 text-center text-base text-foreground font-medium">
										{vid.title}
									</div>
								</div>
							))}
						</div>
					)}

					{active && tab === 'photos' && (
						<Lightbox
							src={`${baseURL}${(
								galleries.find((g) => g._id === active.galleryId)?.images[
									active.idx
								] || ''
							).replace(/\\/g, '/')}`}
							alt={galleries.find((g) => g._id === active.galleryId)?.title || ''}
							onClose={() => setActive(null)}
						/>
					)}
				</div>
			</section>
		</div>
	);
}
