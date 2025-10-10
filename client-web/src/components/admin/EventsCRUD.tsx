import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Plus, Edit, Trash2, Calendar, MapPin, Users, Link, Tag, Image } from 'lucide-react';

export default function EventsCRUD() {
	const [events, setEvents] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [editingEvent, setEditingEvent] = useState<any | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [removeExistingImage, setRemoveExistingImage] = useState(false);
	const [formData, setFormData] = useState({
		title: '',
		slug: '',
		description: '',
		start_date: '',
		end_date: '',
		location: '',
		category: '',
		experts: '',
		image: null as File | null,
		maxAttendees: '',
		status: 'draft',
	});
	const BASE_URL = import.meta.env.VITE_URL;

	useEffect(() => {
		fetchEvents();
	}, []);

	const fetchEvents = async () => {
		setLoading(true);
		try {
			const token = localStorage.getItem('token');
			const response = await fetch(`${BASE_URL}admin/get-events`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			setEvents(data || []);
		} catch (error) {
			console.error('Error fetching events:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const token = localStorage.getItem('token');
		const payload = new FormData();

		Object.entries(formData).forEach(([key, value]) => {
			if (value !== null && value !== undefined) {
				payload.append(key, value as any);
			}
		});

		if (editingEvent && removeExistingImage) {
			payload.append('removeImage', 'true');
		}

		const url = editingEvent
			? `${BASE_URL}admin/update-event/${editingEvent._id}`
			: `${BASE_URL}admin/add-event`;

		try {
			const response = await fetch(url, {
				method: 'POST',
				body: payload,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await response.json();
			if (response.ok) {
				alert(`Event ${editingEvent ? 'updated' : 'created'} successfully`);
				fetchEvents();
				resetForm();
				setIsDialogOpen(false);
			} else {
				alert(data.message || 'Something went wrong');
			}
		} catch (error) {
			console.error('Error submitting event:', error);
			alert('Failed to submit event');
		}
	};

	const handleEdit = (event: any) => {
		setEditingEvent(event);
		setFormData({
			title: event.title,
			slug: event.slug,
			description: event.description,
			start_date: event.start_date?.slice(0, 16) || '',
			end_date: event.end_date?.slice(0, 16) || '',
			location: event.location || '',
			category: event.category || '',
			experts: event.experts?.join(', ') || '',
			image: null,
			maxAttendees: event.maxAttendees?.toString() || '',
			status: event.status || 'draft',
		});
		setIsDialogOpen(true);
	};

	const handleDelete = async (id: string) => {
		const token = localStorage.getItem('token');
		try {
			const response = await fetch(`${BASE_URL}admin/delete-event/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.ok) {
				alert('Event deleted successfully');
				fetchEvents();
			} else {
				alert('Failed to delete event');
			}
		} catch (error) {
			console.error('Error deleting event:', error);
			alert('Failed to delete event');
		}
	};

	const resetForm = () => {
		setEditingEvent(null);
		setRemoveExistingImage(false);
		setFormData({
			title: '',
			slug: '',
			description: '',
			start_date: '',
			end_date: '',
			location: '',
			category: '',
			experts: '',
			image: null,
			maxAttendees: '',
			status: 'draft',
		});
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'published':
				return 'bg-green-100 text-green-800';
			case 'draft':
				return 'bg-yellow-100 text-yellow-800';
			case 'archived':
				return 'bg-gray-100 text-gray-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	if (loading)
		return <div className="flex justify-center items-center h-64">Loading events...</div>;

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Events Management</h2>
					<p className="text-muted-foreground">Manage all events and programs</p>
				</div>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={resetForm}>
							<Plus className="w-4 h-4 mr-2" /> Add Event
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>
								{editingEvent ? 'Edit Event' : 'Add New Event'}
							</DialogTitle>
						</DialogHeader>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="title">Title *</Label>
									<Input
										id="title"
										value={formData.title}
										onChange={(e) =>
											setFormData({ ...formData, title: e.target.value })
										}
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="slug">Slug *</Label>
									<Input
										id="slug"
										value={formData.slug}
										onChange={(e) =>
											setFormData({ ...formData, slug: e.target.value })
										}
										required
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="description">Description *</Label>
								<Textarea
									id="description"
									value={formData.description}
									onChange={(e) =>
										setFormData({ ...formData, description: e.target.value })
									}
									rows={4}
									required
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label>Start Date & Time *</Label>
									<Input
										type="datetime-local"
										value={formData.start_date}
										onChange={(e) =>
											setFormData({ ...formData, start_date: e.target.value })
										}
										required
									/>
								</div>
								<div className="space-y-2">
									<Label>End Date & Time</Label>
									<Input
										type="datetime-local"
										value={formData.end_date}
										onChange={(e) =>
											setFormData({ ...formData, end_date: e.target.value })
										}
									/>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label>Location</Label>
									<Input
										value={formData.location}
										onChange={(e) =>
											setFormData({ ...formData, location: e.target.value })
										}
									/>
								</div>
								<div className="space-y-2">
									<Label>Category</Label>
									<Select
										value={formData.category}
										onValueChange={(value) =>
											setFormData({ ...formData, category: value })
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select category" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="workshop">Workshop</SelectItem>
											<SelectItem value="seminar">Seminar</SelectItem>
											<SelectItem value="competition">Competition</SelectItem>
											<SelectItem value="conference">Conference</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="image">Event Image</Label>
								<Input
									id="image"
									type="file"
									accept="image/*"
									onChange={(e) => {
										setFormData({
											...formData,
											image: e.target.files?.[0] || null,
										});
										setRemoveExistingImage(false);
									}}
								/>

								{(formData.image ||
									(editingEvent?.image && !removeExistingImage)) && (
									<div className="mt-2 flex items-center gap-2">
										<img
											src={
												formData.image
													? URL.createObjectURL(formData.image)
													: `${BASE_URL}${editingEvent?.image}`
											}
											alt="Event"
											className="w-32 h-32 object-cover rounded border"
										/>
										<Button
											type="button"
											variant="destructive"
											size="sm"
											onClick={() => {
												if (formData.image) {
													setFormData({ ...formData, image: null });
												} else {
													setRemoveExistingImage(true);
												}
											}}
										>
											<Trash2 className="w-4 h-4" />
										</Button>
									</div>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="experts">Experts (comma separated)</Label>
								<Input
									id="experts"
									value={formData.experts}
									onChange={(e) =>
										setFormData({ ...formData, experts: e.target.value })
									}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="maxAttendees">Max Attendees</Label>
								<Input
									id="maxAttendees"
									type="number"
									value={formData.maxAttendees}
									onChange={(e) =>
										setFormData({ ...formData, maxAttendees: e.target.value })
									}
								/>
							</div>

							<div className="space-y-2">
								<Label>Status</Label>
								<Select
									value={formData.status}
									onValueChange={(value) =>
										setFormData({ ...formData, status: value })
									}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="draft">Draft</SelectItem>
										<SelectItem value="published">Published</SelectItem>
										<SelectItem value="archived">Archived</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="flex justify-end space-x-2">
								<Button
									type="button"
									variant="outline"
									onClick={() => setIsDialogOpen(false)}
								>
									Cancel
								</Button>
								<Button type="submit">
									{editingEvent ? 'Update' : 'Create'} Event
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid grid-flow-col grid-cols-3 gap-4">
				{events.map((event) => (
					<div
						key={event._id}
						className="border rounded-md shadow p-4 bg-white space-y-5 px-5"
					>
						<div className="flex justify-between items-center">
							<h3 className="text-xl font-bold">{event.title}</h3>
							<div className="flex gap-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() => handleEdit(event)}
								>
									<Edit className="w-4 h-4" />
								</Button>
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button variant="outline" size="sm">
											<Trash2 className="w-4 h-4" />
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>Delete Event</AlertDialogTitle>
											<AlertDialogDescription>
												Are you sure you want to delete "{event.title}"?
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
											<AlertDialogAction
												onClick={() => handleDelete(event._id)}
											>
												Delete
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</div>
						</div>

						<div className="space-y-5">
							<p className="text-muted-foreground line-clamp-2">
								{event.description}
							</p>

							<div className="text-sm text-gray-500">
								<p>
									<Calendar className="inline w-4 h-4 mr-1" />
									{event.start_date
										? new Date(event.start_date).toLocaleString()
										: 'N/A'}{' '}
									-{' '}
									{event.end_date
										? new Date(event.end_date).toLocaleString()
										: 'N/A'}
								</p>
							</div>

							<div className="flex items-center gap-3 mt-2">
								<Badge className={getStatusColor(event.status)}>
									{event.status}
								</Badge>
								{event.category && (
									<Badge variant="outline">{event.category}</Badge>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
