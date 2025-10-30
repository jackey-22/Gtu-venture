import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Clock, Users, ExternalLink } from 'lucide-react';

const baseURL = import.meta.env.VITE_URL;
const eventTypes = [
	'All',
	'Summit',
	'Workshop',
	'Conference',
	'Pitch Event',
	'Hackathon',
	'Demo Day',
	'Networking',
];

export default function Events() {
	const [events, setEvents] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [activeTab, setActiveTab] = useState('upcoming');
	const [selectedType, setSelectedType] = useState('All');

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const res = await fetch(`${baseURL}admin/get-events`);
				if (!res.ok) throw new Error('Failed to fetch events');
				const data = await res.json();
				setEvents(data);
			} catch (err: any) {
				setError(err.message || 'Error fetching events');
			} finally {
				setLoading(false);
			}
		};
		fetchEvents();
	}, []);

	// Show all events without filtering
	const filteredEvents = events;

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	const getStatusColor = (status: string) => {
		return status === 'upcoming' ? 'bg-success' : 'bg-muted-foreground';
	};

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
				<div className="text-center">
					<p className="text-red-500">{error}</p>
				</div>
			</div>
		);
	}

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
						<h1 className="text-hero font-extrabold text-foreground mb-6">Events</h1>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
							Join our community events, workshops, and conferences designed to
							accelerate your entrepreneurial journey and connect with like-minded
							innovators.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Tabs and Filters */}
			<section className="py-12 bg-background border-b">
				<div className="max-w-7xl mx-auto px-6 lg:px-16">
					<div className="space-y-8">
						{/* Event Status Tabs */}
						<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
							<TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
								<TabsTrigger value="upcoming" data-testid="tab-upcoming">
									Upcoming Events
								</TabsTrigger>
								<TabsTrigger value="past" data-testid="tab-past">
									Past Events
								</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>
				</div>
			</section>

			{/* Events Grid */}
			<section className="py-24 bg-background">
				<div className="max-w-7xl mx-auto px-6 lg:px-16">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{filteredEvents.map((event, index) => (
							<motion.div
								key={event._id || event.id}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								data-testid={`event-card-${event._id || event.id}`}
							>
								<Card className="h-full hover-lift overflow-hidden">
									<div className="relative">
										<img
											src={event.image}
											alt={event.title}
											className="w-full h-48 object-cover"
										/>
										<div className="absolute top-4 left-4">
											<Badge
												className={`${getStatusColor(
													event.status
												)} text-white`}
											>
												{event.status === 'upcoming'
													? 'Upcoming'
													: 'Completed'}
											</Badge>
										</div>
										<div className="absolute top-4 right-4">
											<Badge variant="secondary">{event.type}</Badge>
										</div>
									</div>

									<CardContent className="p-6">
										<h3 className="text-xl font-bold text-foreground mb-3">
											{event.title}
										</h3>

										<p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
											{event.description}
										</p>

										<div className="space-y-2 mb-4 text-sm">
											<div className="flex items-center gap-2 text-muted-foreground">
												<Calendar className="w-4 h-4" />
												<span>
													{formatDate(event.start_date || event.date)}
												</span>
											</div>
											<div className="flex items-center gap-2 text-muted-foreground">
												<Clock className="w-4 h-4" />
												<span>{event.time}</span>
											</div>
											<div className="flex items-center gap-2 text-muted-foreground">
												<MapPin className="w-4 h-4" />
												<span>{event.location}</span>
											</div>
											<div className="flex items-center gap-2 text-muted-foreground">
												<Users className="w-4 h-4" />
												<span>
													{event.currentAttendees}/{event.maxAttendees}{' '}
													attendees
												</span>
											</div>
										</div>

										{event.status === 'past' && event.outcomes && (
											<div className="mb-4">
												<p className="text-sm font-medium text-foreground mb-2">
													Event Outcomes:
												</p>
												<p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
													{event.outcomes}
												</p>
											</div>
										)}

										<div className="mb-4">
											<p className="text-sm font-medium text-foreground mb-1">
												Speakers:
											</p>
											<p className="text-sm text-muted-foreground">
												{Array.isArray(event.speakers)
													? event.speakers.join(', ')
													: event.speakers}
											</p>
										</div>

										{event.status === 'past' && event.mediaCoverage && (
											<div className="mb-4">
												<p className="text-sm font-medium text-foreground mb-2">
													Media Coverage:
												</p>
												<div className="space-y-1">
													{event.mediaCoverage.map(
														(media: any, idx: number) => (
															<a
																key={idx}
																href={media.url}
																target="_blank"
																rel="noopener noreferrer"
																className="flex items-center gap-2 text-sm text-primary hover:underline"
															>
																<ExternalLink className="w-3 h-3" />
																{media.title} -{' '}
																{media.source || media.platform}
															</a>
														)
													)}
												</div>
											</div>
										)}

										{event.status === 'past' && event.photos && (
											<div className="mb-4">
												<p className="text-sm font-medium text-foreground mb-2">
													Event Photos:
												</p>
												<div className="grid grid-cols-3 gap-2">
													{event.photos
														.slice(0, 3)
														.map((photo: string, idx: number) => (
															<img
																key={idx}
																src={photo}
																alt={`Event photo ${idx + 1}`}
																className="w-full h-16 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
																onClick={() => {
																	/* Could open lightbox here */
																}}
															/>
														))}
												</div>
											</div>
										)}

										{event.status === 'upcoming' && (
											<Button
												asChild
												className="w-full bg-primary text-primary-foreground"
												data-testid={`register-event-${
													event._id || event.id
												}`}
											>
												<a
													href={event.registrationUrl}
													target="_blank"
													rel="noopener noreferrer"
												>
													<ExternalLink className="w-4 h-4 mr-2" />
													Register Now
												</a>
											</Button>
										)}

										{event.status === 'past' && (
											<Button
												variant="outline"
												className="w-full"
												disabled
												data-testid={`event-completed-${
													event._id || event.id
												}`}
											>
												Event Completed
											</Button>
										)}
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>

					{filteredEvents.length === 0 && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="text-center py-12"
							data-testid="no-events"
						>
							<p className="text-muted-foreground text-lg">
								No events found matching your criteria.
							</p>
							<Button
								variant="outline"
								onClick={() => setSelectedType('All')}
								className="mt-4"
								data-testid="clear-event-filters"
							>
								Clear Filters
							</Button>
						</motion.div>
					)}
				</div>
			</section>

			{/* Calendar Integration CTA removed per design request */}
		</div>
	);
}
