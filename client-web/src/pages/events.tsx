import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const res = await fetch(`${baseURL}user/get-events`);
				if (!res.ok) throw new Error('Failed to fetch events');
				const json = await res.json();
				setEvents(json.data || []);
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
			<div className="flex justify-center items-center h-64">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
					<p className="mt-3 text-primary">Loading Events...</p>
				</div>
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
					<div className="flex flex-col gap-3 md:gap-40 md:flex-row md:items-center md:justify-between">
						<div className="flex-1"></div>
						<div className="flex justify-center w-full md:w-auto order-1 md:order-none mx-auto">
							<Tabs value={activeTab} onValueChange={setActiveTab}>
								<TabsList className="grid grid-cols-3 w-auto">
									<TabsTrigger value="all">All</TabsTrigger>
									<TabsTrigger value="upcoming">Upcoming</TabsTrigger>
									<TabsTrigger value="past">Past</TabsTrigger>
								</TabsList>
							</Tabs>
						</div>

						<div className="relative w-full md:w-72 lg:w-80 md:ml-auto order-2">
							<Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
							<input
								type="text"
								placeholder="Search events..."
								className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary/20"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
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

										<h3 className="text-xl font-bold mb-2">{event.title}</h3>

										<p className="text-muted-foreground mb-4 line-clamp-3">
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
												<MapPin className="h-4 w-4" />
												{event.location}
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
				<DialogContent className="max-w-2xl">
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

							<p className="text-muted-foreground mb-4">
								{selectedEvent.description}
							</p>

							<div className="space-y-2 text-sm">
								<p>
									<strong>Date:</strong>{' '}
									{formatDateTime(selectedEvent.start_date)}
								</p>
								{selectedEvent.end_date && (
									<p>
										<strong>Ends:</strong>{' '}
										{formatDateTime(selectedEvent.end_date)}
									</p>
								)}
								<p>
									<strong>Location:</strong> {selectedEvent.location}
								</p>
								<p>
									<strong>Category:</strong> {selectedEvent.category}
								</p>
								<p>
									<strong>Experts:</strong> {selectedEvent.experts?.join(', ')}
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
