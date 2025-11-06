import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
	Calendar,
	MapPin,
	Clock,
	Users,
	ExternalLink,
	Search,
	ChevronDown,
	Check,
} from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import {
	Command,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { UserRound } from 'lucide-react';

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
	const [categoryOpen, setCategoryOpen] = useState(false);
	const [tabOpen, setTabOpen] = useState(false);
	const tabs = ['all', 'upcoming', 'past'];

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
								<div className="h-4 w-24 bg-gray-300 rounded mb-2 animate-pulse"></div>
								<div className="h-10 w-full max-w-xs bg-gray-200 rounded-full animate-pulse"></div>
							</div>
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
							Events
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
							Join our community events, workshops, and conferences designed to
							accelerate your entrepreneurial journey and connect with like-minded
							innovators.
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
									TIME FILTER
								</h5>
								<Popover open={tabOpen} onOpenChange={setTabOpen}>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											className="w-full max-w-xs justify-between rounded-full capitalize"
										>
											{activeTab === 'all' ? 'All Events' : activeTab}
											<ChevronDown className="ml-2 h-4 w-4 opacity-50" />
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-[250px] p-0">
										<Command>
											<CommandInput placeholder="Search time filter…" />
											<CommandList className="max-h-60 overflow-y-auto">
												<CommandEmpty>No filter found.</CommandEmpty>
												<CommandGroup>
													{tabs.map((tab) => (
														<CommandItem
															key={tab}
															onSelect={() => {
																setActiveTab(tab);
																setTabOpen(false);
															}}
															className="cursor-pointer capitalize"
														>
															{tab === 'all' ? 'All Events' : tab}
															{activeTab === tab && (
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
										placeholder="Search events..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="pl-10 rounded-full"
										data-testid="search-input"
									/>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			<section className="py-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-0 md:px-0 lg:px-0">
					<div
						className="
							grid grid-cols-1 
							lg:grid-cols-3 
							gap-5 
							md:gap-6 
							xl:gap-8
						"
					>
						{filteredEvents.map((event, idx) => (
							<motion.div
								key={event._id}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: idx * 0.1 }}
								onClick={() => {
									setSelectedEvent({ _id: event._id });
									fetchEventById(event._id);
								}}
								className="cursor-pointer h-full"
							>
								<Card className="hover-lift overflow-hidden h-full flex flex-col">
									<img
										src={`${baseURL}${event.image.replace(/\\/g, '/')}`}
										alt={event.title}
										className="w-full h-40 sm:h-48 object-cover"
									/>

									<CardContent className="py-4 px-6 flex flex-col flex-grow">
										<div className="flex items-center flex-wrap gap-3 mb-3 text-xs sm:text-sm">
											<Badge variant="secondary">{event.category}</Badge>

											<div className="flex items-center gap-2">
												<MapPin className="h-4 w-4 flex-shrink-0" />
												<span className="truncate max-w-[100px] sm:max-w-none">
													{event.location}
												</span>
											</div>

											<div className="flex items-center gap-2">
												<Users className="h-4 w-4" />
												{event.maxAttendees} Seats
											</div>
										</div>

										<h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2">
											{event.title}
										</h3>

										<p className="text-muted-foreground mb-4 text-sm line-clamp-2">
											{event.description}
										</p>

										<div className="space-y-2 text-sm text-muted-foreground font-medium mb-4">
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
										</div>

										<Button className="w-full mt-auto rounded-full mb-2">
											<ExternalLink className="mr-2 h-4 w-4" /> View Details
										</Button>
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

			<Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
				<DialogContent className="w-auto md:max-w-5xl max-h-[90vh] rounded-none overflow-y-auto overflow-x-hidden sidebar-scroll">
					<DialogHeader className="sr-only">
						<DialogTitle>{selectedEvent?.title || 'Event Details'}</DialogTitle>
						<DialogDescription>Event info and registration details</DialogDescription>
					</DialogHeader>

					{modalLoading ? (
						<div className="py-32 w-72 md:w-96 lg:w-96 text-center">Loading...</div>
					) : selectedEvent ? (
						<div className="space-y-2">
							<div className="relative h-64 w-full rounded-t-lg overflow-hidden">
								<img
									src={`${baseURL}${selectedEvent.image.replace(/\\/g, '/')}`}
									alt={selectedEvent.title}
									className="w-full h-full object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
								<h2 className="absolute bottom-4 left-4 text-2xl font-bold text-white drop-shadow-md">
									{selectedEvent.title}
								</h2>
								<div className="absolute bottom-4 right-4">
									<Badge className="px-3 py-1 text-xs sm:text-sm font-semibold bg-white/90 backdrop-blur-md text-primary shadow-md border border-primary/10">
										{selectedEvent.category}
									</Badge>
								</div>
							</div>

							<div className="px-6 pb-6 space-y-5">
								<p className="text-muted-foreground leading-relaxed py-1 break-words break-all whitespace-pre-line">
									{selectedEvent.description}
								</p>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted/40 py-4 rounded-xl">
									<div className="flex items-start gap-3">
										<Calendar className="h-5 w-5 text-primary shrink-0" />
										<div>
											<p className="font-medium">Start</p>
											<p className="text-sm text-muted-foreground">
												{formatDateTime(selectedEvent.start_date)}
											</p>
										</div>
									</div>

									{selectedEvent.end_date && (
										<div className="flex items-start gap-3">
											<Clock className="h-5 w-5 text-primary shrink-0" />
											<div>
												<p className="font-medium">End</p>
												<p className="text-sm text-muted-foreground">
													{formatDateTime(selectedEvent.end_date)}
												</p>
											</div>
										</div>
									)}

									<div className="flex items-start gap-3">
										<MapPin className="h-5 w-5 text-primary shrink-0" />
										<div>
											<p className="font-medium">Location</p>
											<p className="text-sm text-muted-foreground break-words">
												{selectedEvent.location}
											</p>
										</div>
									</div>

									<div className="flex items-start gap-3">
										<Users className="h-5 w-5 text-primary shrink-0" />
										<div>
											<p className="font-medium">Seats</p>
											<p className="text-sm text-muted-foreground">
												{selectedEvent.currentAttendees} /{' '}
												{selectedEvent.maxAttendees}
											</p>
										</div>
									</div>

									{selectedEvent.experts?.length > 0 && (
										<div className="flex items-start gap-3">
											<UserRound className="h-5 w-5 text-primary shrink-0" />
											<div>
												<p className="font-medium">Speakers / Mentors</p>

												<div className="text-sm text-muted-foreground space-y-1">
													{selectedEvent.experts.map(
														(exp: string, i: number) => (
															<div key={i}>{exp}</div>
														)
													)}
												</div>
											</div>
										</div>
									)}
								</div>

								<Button
									size="lg"
									className="w-full rounded-full text-base font-semibold"
								>
									<ExternalLink className="mr-2" /> Register / Learn More
								</Button>
							</div>
						</div>
					) : null}
				</DialogContent>
			</Dialog>
		</div>
	);
}
