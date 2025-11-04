import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Clock, Users, ExternalLink, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const baseURL = import.meta.env.VITE_URL;

export default function Events() {
	const [events, setEvents] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [activeTab, setActiveTab] = useState('all');
	const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
	const [modalLoading, setModalLoading] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [categories, setCategories] = useState<string[]>(['All']);
	const [selectedCategory, setSelectedCategory] = useState('All');

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const res = await fetch(`${baseURL}user/get-events`);
				if (!res.ok) throw new Error('Failed to fetch events');
				const json = await res.json();
				const data = json.data || [];
				setEvents(data);

				const uniqueCategories = [
					'All',
					...new Set(data.map((e: any) => e.category).filter(Boolean)),
				];

				setCategories(uniqueCategories);
			} catch (err: any) {
				setError(err.message || 'Error fetching events');
			} finally {
				setLoading(false);
			}
		};
		fetchEvents();
	}, []);

	const fetchEventById = async (id: string) => {
		try {
			setModalLoading(true);
			const res = await fetch(`${baseURL}user/get-event/${id}`);
			if (!res.ok) throw new Error('Failed to fetch event');
			const json = await res.json();
			setSelectedEvent(json.data || null);
		} catch (err) {
			console.error(err);
		} finally {
			setModalLoading(false);
		}
	};

	const formatDateTime = (dateString: string) => {
		if (!dateString) return '';
		const date = new Date(dateString);
		const formattedDate = date.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
		const formattedTime = date.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
		});
		return `${formattedDate} at ${formattedTime}`;
	};

	const now = new Date();
	let filteredEvents = events;

	if (activeTab === 'upcoming') {
		filteredEvents = events.filter((e) => new Date(e.start_date) >= now);
	} else if (activeTab === 'past') {
		filteredEvents = events.filter((e) => new Date(e.start_date) < now);
	}

	if (selectedCategory !== 'All') {
		filteredEvents = filteredEvents.filter((e) => e.category === selectedCategory);
	}

	const searchLower = searchQuery.toLowerCase();
	filteredEvents = filteredEvents.filter(
		(e) =>
			e.title.toLowerCase().includes(searchLower) ||
			e.description.toLowerCase().includes(searchLower) ||
			e.category.toLowerCase().includes(searchLower) ||
			e.location.toLowerCase().includes(searchLower) ||
			e.experts?.some((exp: string) => exp.toLowerCase().includes(searchLower))
	);

	if (loading) {
		return (
			<div className="min-h-screen pt-20">
				<section className="py-24 bg-gradient-to-br from-gtu-base to-gtu-light">
					<div className="max-w-7xl mx-auto px-6 lg:px-16">
						<div className="text-center">
							<div className="h-10 w-56 bg-gray-300/50 mx-auto rounded-lg animate-pulse"></div>
							<div className="h-5 w-80 bg-gray-200/50 mx-auto rounded-lg mt-4 animate-pulse"></div>
						</div>
					</div>
				</section>

				<section className="py-6 bg-background border-b">
					<div className="max-w-7xl mx-auto px-6 lg:px-16">
						<div className="flex flex-col gap-3 md:gap-40 md:flex-row md:items-center md:justify-between">
							<div className="flex-1"></div>
							<div className="flex justify-center w-full md:w-auto order-1 md:order-none mx-auto">
								<div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse"></div>
							</div>
							<div className="h-10 w-full md:w-72 lg:w-80 bg-gray-200 rounded-lg animate-pulse"></div>
						</div>
					</div>
				</section>

				<section className="py-16 bg-background">
					<div className="max-w-7xl mx-auto px-6 lg:px-16">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							{[1, 2, 3, 4].map((i) => (
								<div
									key={i}
									className="rounded-xl border shadow-sm overflow-hidden animate-pulse"
								>
									<div className="w-full h-48 bg-gray-300"></div>
									<div className="p-6 space-y-4">
										<div className="h-5 w-24 bg-gray-300 rounded"></div>
										<div className="h-6 w-3/4 bg-gray-300 rounded"></div>
										<div className="h-4 w-full bg-gray-200 rounded"></div>
										<div className="h-4 w-5/6 bg-gray-200 rounded"></div>

										<div className="mt-4 h-10 w-full bg-gray-300 rounded"></div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center h-64">
				<p className="text-red-500">{error}</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen pt-20">
			<section className="py-24 bg-gradient-to-br from-gtu-base to-gtu-light">
				<div className="max-w-7xl mx-auto px-6 lg:px-16">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center"
					>
						<h1 className="text-hero font-extrabold text-foreground mb-6">Events</h1>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
							Join our community events, workshops, and conferences designed to
							accelerate your entrepreneurial journey and connect with like-minded
							innovators.
						</p>
					</motion.div>
				</div>
			</section>

			<section className="py-6 bg-background border-b">
				<div className="max-w-7xl mx-auto px-6 lg:px-16">
					<div className="space-y-10">
						<div className="flex justify-center w-full md:w-auto order-1 md:order-none mx-auto">
							<Tabs value={activeTab} onValueChange={setActiveTab}>
								<TabsList className="grid grid-cols-3 w-auto">
									<TabsTrigger value="all">All</TabsTrigger>
									<TabsTrigger value="upcoming">Upcoming</TabsTrigger>
									<TabsTrigger value="past">Past</TabsTrigger>
								</TabsList>
							</Tabs>
						</div>

						<div className="text-center">
							<h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
								Category
							</h3>
							<div className="flex justify-center w-full md:w-auto order-1 md:order-none mx-auto">
								<Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
									<TabsList className="flex flex-wrap gap-2 px-2">
										{categories.map((cat) => (
											<TabsTrigger key={cat} value={cat}>
												{cat}
											</TabsTrigger>
										))}
									</TabsList>
								</Tabs>
							</div>
						</div>

						<div className="max-w-md mx-auto relative">
							<Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
							<Input
								type="text"
								placeholder="Search events..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10"
								data-testid="search-input"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Events List */}
			<section className="py-16 bg-background">
				<div className="max-w-7xl mx-auto px-6 lg:px-16">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{filteredEvents.map((event, idx) => (
							<motion.div
								key={event._id}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: idx * 0.1 }}
								onClick={() => fetchEventById(event._id)}
								className="cursor-pointer"
							>
								<Card className="hover-lift overflow-hidden">
									<img
										src={`${baseURL}${event.image.replace(/\\/g, '/')}`}
										alt={event.title}
										className="w-full h-48 object-cover"
									/>

									<CardContent className="p-6">
										<div className="flex justify-between items-center mb-3">
											<Badge variant="secondary">{event.category}</Badge>
										</div>

										<h3 className="text-xl font-bold mb-2 line-clamp-2">
											{event.title}
										</h3>

										<p className="text-muted-foreground mb-4 line-clamp-2">
											{event.description}
										</p>

										<div className="space-y-2 text-sm text-muted-foreground">
											<div className="flex items-center gap-2">
												<Calendar className="h-4 w-4" />
												{formatDateTime(event.start_date)}
											</div>

											{event.end_date && (
												<div className="flex items-center gap-2">
													<Clock className="h-4 w-4" />
													Ends: {formatDateTime(event.end_date)}
												</div>
											)}

											<div className="flex items-center gap-2">
												<MapPin className="h-4 w-4 flex-shrink-0" />
												<span className="truncate">{event.location}</span>
											</div>

											<div className="flex items-center gap-2">
												<Users className="h-4 w-4" />
												{event.maxAttendees} Seats
											</div>
										</div>

										<div className="mt-4">
											<Button className="w-full">
												<ExternalLink className="mr-2 h-4 w-4" /> View
												Details
											</Button>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>

					{filteredEvents.length === 0 && (
						<p className="text-center text-muted-foreground py-10">No events found.</p>
					)}
				</div>
			</section>

			{/* Modal */}
			<Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
				<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
					{modalLoading ? (
						<div className="py-10 text-center">Loading...</div>
					) : selectedEvent ? (
						<>
							<DialogHeader>
								<DialogTitle className="text-2xl font-bold">
									{selectedEvent.title}
								</DialogTitle>
							</DialogHeader>

							<img
								src={`${baseURL}${selectedEvent.image.replace(/\\/g, '/')}`}
								alt={selectedEvent.title}
								className="w-full h-64 object-cover rounded-lg mb-4"
							/>

							<p className="text-muted-foreground mb-4 break-words">
								{selectedEvent.description}
							</p>

							<div className="space-y-2 text-sm">
								<p className="break-words">
									<strong>Date:</strong>{' '}
									{formatDateTime(selectedEvent.start_date)}
								</p>
								{selectedEvent.end_date && (
									<p className="break-words">
										<strong>Ends:</strong>{' '}
										{formatDateTime(selectedEvent.end_date)}
									</p>
								)}
								<p className="break-words">
									<strong>Location:</strong> {selectedEvent.location}
								</p>
								<p>
									<strong>Category:</strong> {selectedEvent.category}
								</p>
								<p className="break-words">
									<strong>Experts:</strong>{' '}
									{selectedEvent.experts?.join(', ') || 'N/A'}
								</p>
								<p>
									<strong>Seats:</strong> {selectedEvent.maxAttendees}
								</p>
								<p>
									<strong>Registered:</strong> {selectedEvent.currentAttendees}
								</p>
							</div>
						</>
					) : null}
				</DialogContent>
			</Dialog>
		</div>
	);
}
