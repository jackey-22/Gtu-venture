import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchGet } from '@/utils/fetch.utils';

interface CarouselItem {
	id: number;
	_id?: string;
	image: string;
	title: string;
	description: string;
}

export default function Carousel3D() {
	const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [isPaused, setIsPaused] = useState<boolean>(false);
	const [loading, setLoading] = useState(true);
	const intervalRef = useRef<number | null>(null);

	// keep total in a ref so callbacks always see latest value
	const totalRef = useRef<number>(0);
	const totalItems = carouselItems.length;
	totalRef.current = totalItems;

	useEffect(() => {
		const fetchCarouselItems = async () => {
			try {
				const response = await fetchGet({ pathName: 'user/get-carousel-items' });
				if (response?.success && response?.data) {
					const items = response.data
						.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
						.map((item: any, index: number) => ({
							id: index,
							_id: item._id,
							image:
								item.image &&
								(item.image.startsWith('http') || item.image.startsWith('//'))
									? item.image
									: `${import.meta.env.VITE_URL}${item.image}`,
							title: item.title,
							description: item.description,
						}));
					setCarouselItems(items);
				} else {
					setCarouselItems([
						{
							id: 0,
							image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
							title: 'Innovation Workspace',
							description: 'Modern facilities for startup growth',
						},
						{
							id: 1,
							image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
							title: 'Student Entrepreneurs',
							description: '4,30,000 students sensitised',
						},
					]);
				}
			} catch (error) {
				console.error('Error fetching carousel items:', error);
				setCarouselItems([]);
			} finally {
				setLoading(false);
			}
		};

		fetchCarouselItems();
	}, []);

	const nextSlide = useCallback(() => {
		const t = totalRef.current;
		if (t < 2) return;
		setCurrentIndex((prev) => (prev + 1) % t);
	}, []);

	const prevSlide = useCallback(() => {
		const t = totalRef.current;
		if (t < 2) return;
		setCurrentIndex((prev) => (prev - 1 + t) % t);
	}, []);

	useEffect(() => {
		if (!isPaused && totalItems > 1) {
			intervalRef.current = window.setInterval(() => {
				nextSlide();
			}, 3000);
		}
		return () => {
			if (intervalRef.current) {
				window.clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	}, [isPaused, totalItems, nextSlide]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'ArrowRight') {
				nextSlide();
			} else if (e.key === 'ArrowLeft') {
				prevSlide();
			}
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [nextSlide, prevSlide]);

	useEffect(() => {
		if (currentIndex >= totalItems) {
			setCurrentIndex(0);
		}
	}, [totalItems, currentIndex]);

	const shouldHide = loading || totalItems === 0;

	const getItemPosition = (index: number) => {
		if (totalItems <= 1) return 'active';
		const diff = (index - currentIndex + totalItems) % totalItems;

		switch (diff) {
			case 0:
				return 'active';
			case 1:
				return 'next';
			case totalItems - 1:
				return 'prev';
			case 2:
				return 'far-next';
			case totalItems - 2:
				return 'far-prev';
			default:
				return 'hidden';
		}
	};

	const goToSlide = (index: number) => {
		if (totalItems < 1) return;
		setCurrentIndex(index % totalItems);
	};

	return shouldHide ? (
		<div className="h-[clamp(12rem,30vw,18rem)] w-full flex items-center justify-center"></div>
	) : (
		<section className="w-full flex justify-center py-[clamp(3rem,8vw,8rem)] overflow-hidden">
			<div className="w-full max-w-4xl px-[clamp(1rem,4vw,1rem)]">
				<div className="relative pt-[clamp(2rem,5vw,5rem)]">
					<div
						className="carousel-3d w-full overflow-hidden relative z-10"
						style={{ height: 'clamp(14rem, 35vw, 20rem)' }}
						onMouseEnter={() => setIsPaused(true)}
						onMouseLeave={() => setIsPaused(false)}
						aria-roledescription="carousel"
					>
						<div className="carousel-container">
							{carouselItems.map((item, index) => (
								<div
									key={item._id ?? item.id}
									className={`carousel-item ${getItemPosition(index)}`}
									role="group"
									aria-roledescription="slide"
									aria-label={`${index + 1} of ${totalItems} - ${item.title}`}
								>
									<img
										src={item.image}
										alt={item.title}
										className="w-full h-full object-cover rounded-2xl"
										loading="lazy"
										onError={(e) => {
											(e.currentTarget as HTMLImageElement).style.display =
												'none';
										}}
									/>

									<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-[clamp(0.75rem,2vw,1rem)] rounded-2xl">
										<div className="text-white">
											<h3 className="font-semibold" style={{ fontSize: 'clamp(0.875rem, 1.5vw + 0.25rem, 1.125rem)' }}>
												{item.title}
											</h3>
											<p className="opacity-90" style={{ fontSize: 'clamp(0.75rem, 1.2vw + 0.25rem, 0.875rem)' }}>
												{item.description}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="flex justify-center items-center gap-[clamp(0.5rem,2vw,1rem)] mt-[clamp(2rem,5vw,4rem)]">
							<button
								className="carousel-btn flex-shrink-0"
								onClick={() => {
									prevSlide();
									setIsPaused(true);
									window.setTimeout(() => setIsPaused(false), 3000);
								}}
								aria-label="Previous slide"
							>
								<ChevronLeft className="text-primary bg-white rounded-full shadow hover:bg-primary hover:text-white transition-colors" style={{ width: 'clamp(2rem, 5vw, 2.5rem)', height: 'clamp(2rem, 5vw, 2.5rem)', padding: 'clamp(0.375rem, 1vw, 0.5rem)' }} />
							</button>

							<div className="flex gap-[clamp(0.25rem,1vw,0.5rem)]">
								{carouselItems.map((_, index) => (
									<button
										key={index}
										className={`rounded-full transition-colors ${
											index === currentIndex
												? 'bg-gtu-primary'
												: 'bg-gray-300'
										}`}
										style={{ width: 'clamp(0.375rem, 1vw, 0.625rem)', height: 'clamp(0.375rem, 1vw, 0.625rem)' }}
										onClick={() => {
											goToSlide(index);
											setIsPaused(true);
											window.setTimeout(() => setIsPaused(false), 3000);
										}}
										aria-label={`Go to slide ${index + 1}`}
									/>
								))}
							</div>

							<button
								className="carousel-btn flex-shrink-0"
								onClick={() => {
									nextSlide();
									setIsPaused(true);
									window.setTimeout(() => setIsPaused(false), 3000);
								}}
								aria-label="Next slide"
							>
								<ChevronRight className="text-primary bg-white rounded-full shadow hover:bg-primary hover:text-white transition-colors" style={{ width: 'clamp(2rem, 5vw, 2.5rem)', height: 'clamp(2rem, 5vw, 2.5rem)', padding: 'clamp(0.375rem, 1vw, 0.5rem)' }} />
							</button>
						</div>
					</div>

					<div className="h-[clamp(1rem,3vw,2.5rem)]" />
				</div>
			</div>
		</section>
	);
}
