import PageShell from './page-shell';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Lightbox from '@/components/ui/lightbox';

export default function Gallery() {
	const [galleries, setGalleries] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const baseURL = import.meta.env.VITE_URL;

	// Fetch galleries from backend
	useEffect(() => {
		const fetchGalleries = async () => {
			try {
				const res = await fetch(`${baseURL}admin/get-galleries`);
				const data = await res.json();
				// Filter only published galleries
				const published = data.filter((g: any) => g.status === 'published');
				setGalleries(published);
			} catch (error) {
				console.error('Error fetching galleries:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchGalleries();
	}, []);

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

	if (loading) {
		return (
			<PageShell
				title="Gallery"
				subtitle="Photos and videos from our events, campus, startups, and community."
			>
				<div className="flex justify-center items-center h-64">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
						<p className="mt-3 text-primary">Loading Gallery...</p>
					</div>
				</div>
			</PageShell>
		);
	}

	return (
		<PageShell
			title="Gallery"
			subtitle="Photos and videos from our events, campus, startups, and community."
		>
			<Tabs defaultValue="photos" value={tab} onValueChange={setTab} className="w-full">
				<TabsList className="flex gap-2 mb-8 justify-center">
					<TabsTrigger value="photos">Photos</TabsTrigger>
					<TabsTrigger value="videos">Videos</TabsTrigger>
				</TabsList>

				{/* Photos Tab */}
				<TabsContent value="photos">
					{galleries.length === 0 ? (
						<div className="text-center text-muted-foreground py-10">
							No galleries found.
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
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
										className="grid grid-cols-1 gap-4"
									>
										{gallery.images &&
											gallery.images.map((img: string, idx: number) => (
												<motion.div
													variants={itemVariants}
													key={`${gallery._id}-${idx}`}
													className="overflow-hidden rounded-2xl shadow-lg bg-card border border-transparent transform hover:scale-105 transition cursor-pointer"
													onClick={() =>
														setActive({ galleryId: gallery._id, idx })
													}
												>
													<div className="relative h-48">
														<img
															src={`${baseURL}${img}`}
															alt={`${gallery.title} - ${idx + 1}`}
															className="w-full h-full object-cover"
														/>
														<div className="absolute inset-0 flex items-end p-3">
															<div className="bg-black/50 text-white px-3 py-1 rounded text-sm">
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
					)}
					{/* Lightbox for photos */}
					{active && tab === 'photos' ? (
						<Lightbox
							src={`${baseURL}${
								galleries.find((g) => g._id === active.galleryId)?.images[
									active.idx
								] || ''
							}`}
							alt={galleries.find((g) => g._id === active.galleryId)?.title || ''}
							onClose={() => setActive(null)}
						/>
					) : null}
				</TabsContent>

				{/* Videos Tab */}
				<TabsContent value="videos">
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
				</TabsContent>
			</Tabs>
		</PageShell>
	);
}
