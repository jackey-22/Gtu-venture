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
import { Card, CardContent } from '@/components/ui/card';
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
import { Plus, Edit, Trash2 } from 'lucide-react';
import { fetchGet, fetchPost } from '../../utils/fetch.utils';

interface Testimonial {
	_id: string;
	quote: string;
	author: string;
	position: string;
	image: string;
	order: number;
	status: 'draft' | 'published' | 'archived';
}

export default function TestimonialsCRUD() {
	const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
	const [loading, setLoading] = useState(true);
	const [actionLoading, setActionLoading] = useState(false);
	const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [existingImage, setExistingImage] = useState<string | null>(null);

	const [formData, setFormData] = useState({
		quote: '',
		author: '',
		position: '',
		image: null as File | null,
		order: 0,
		status: 'published' as 'draft' | 'published' | 'archived',
	});

	const BASE_URL = import.meta.env.VITE_URL;

	useEffect(() => {
		fetchTestimonials();
	}, []);

	const fetchTestimonials = async () => {
		setLoading(true);
		try {
			const data = await fetchGet({ pathName: 'admin/get-testimonials' });
			setTestimonials(data || []);
		} catch (error) {
			console.error('Error fetching testimonials:', error);
		} finally {
			setLoading(false);
		}
	};

	const resetForm = () => {
		setEditingTestimonial(null);
		setExistingImage(null);
		setFormData({
			quote: '',
			author: '',
			position: '',
			image: null,
			order: 0,
			status: 'published',
		});
	};

	const handleEdit = (testimonial: Testimonial) => {
		setEditingTestimonial(testimonial);
		setExistingImage(testimonial.image || null);
		setFormData({
			quote: testimonial.quote,
			author: testimonial.author,
			position: testimonial.position,
			image: null,
			order: testimonial.order,
			status: testimonial.status,
		});
		setIsDialogOpen(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setActionLoading(true);

		try {
			const token = localStorage.getItem('token');
			const payload = new FormData();
			payload.append('quote', formData.quote);
			payload.append('author', formData.author);
			payload.append('position', formData.position);
			payload.append('order', formData.order.toString());
			payload.append('status', formData.status);

			if (formData.image) {
				payload.append('image', formData.image);
			}

			if (editingTestimonial && existingImage) {
				payload.append('existingImage', existingImage);
			}

			const url = editingTestimonial
				? `${BASE_URL}admin/update-testimonial/${editingTestimonial._id}`
				: `${BASE_URL}admin/add-testimonial`;

			const res = await fetch(url, {
				method: 'POST',
				body: payload,
				headers: { Authorization: `Bearer ${token}` },
			});

			const data = await res.json();
			if (res.ok) {
				alert(
					editingTestimonial
						? 'Testimonial updated successfully'
						: 'Testimonial created successfully'
				);
				setIsDialogOpen(false);
				resetForm();
				await fetchTestimonials();
			} else {
				alert(data.message || 'Something went wrong');
			}
		} catch (error) {
			console.error('Error saving testimonial:', error);
			alert('Failed to save testimonial');
		} finally {
			setActionLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		setActionLoading(true);
		try {
			const token = localStorage.getItem('token');
			const res = await fetch(`${BASE_URL}admin/delete-testimonial/${id}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${token}` },
			});
			if (res.ok) {
				fetchTestimonials();
				alert('Testimonial deleted successfully');
			} else {
				alert('Failed to delete testimonial');
			}
		} catch (error) {
			console.error('Error deleting testimonial:', error);
			alert('Failed to delete testimonial');
		} finally {
			setActionLoading(false);
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Testimonials Management</h2>
					<p className="text-muted-foreground">
						Manage testimonials displayed on home page
					</p>
				</div>

				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={resetForm}>
							<Plus className="w-4 h-4 mr-2" /> Add Testimonial
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>
								{editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
							</DialogTitle>
						</DialogHeader>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-2">
								<Label>Quote *</Label>
								<Textarea
									required
									rows={4}
									value={formData.quote}
									onChange={(e) =>
										setFormData({ ...formData, quote: e.target.value })
									}
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label>Author *</Label>
									<Input
										required
										value={formData.author}
										onChange={(e) =>
											setFormData({ ...formData, author: e.target.value })
										}
									/>
								</div>
								<div className="space-y-2">
									<Label>Position *</Label>
									<Input
										required
										value={formData.position}
										onChange={(e) =>
											setFormData({ ...formData, position: e.target.value })
										}
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label>Author Image *</Label>
								{existingImage && (
									<div className="mb-2">
										<img
											src={existingImage}
											alt="Current"
											className="w-24 h-24 object-cover rounded-full"
										/>
									</div>
								)}
								<Input
									type="file"
									accept="image/*"
									onChange={(e) =>
										setFormData({
											...formData,
											image: e.target.files?.[0] || null,
										})
									}
									required={!editingTestimonial}
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label>Order</Label>
									<Input
										type="number"
										value={formData.order}
										onChange={(e) =>
											setFormData({
												...formData,
												order: parseInt(e.target.value) || 0,
											})
										}
									/>
								</div>
								<div className="space-y-2">
									<Label>Status</Label>
									<Select
										value={formData.status}
										onValueChange={(
											value: 'draft' | 'published' | 'archived'
										) => setFormData({ ...formData, status: value })}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="published">Published</SelectItem>
											<SelectItem value="draft">Draft</SelectItem>
											<SelectItem value="archived">Archived</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="flex justify-end space-x-2">
								<Button
									type="button"
									variant="outline"
									onClick={() => setIsDialogOpen(false)}
								>
									Cancel
								</Button>
								<Button type="submit" disabled={actionLoading}>
									{actionLoading
										? 'Saving...'
										: editingTestimonial
										? 'Update'
										: 'Create'}{' '}
									Testimonial
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			{loading ? (
				<div className="flex justify-center items-center h-64">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
						<p className="mt-3 text-primary">Loading Testimonials...</p>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{testimonials.map((testimonial) => (
						<Card key={testimonial._id}>
							<CardContent className="p-4">
								<div className="flex flex-col gap-3">
									<div className="flex items-start gap-3">
										{testimonial.image && (
											<img
												src={testimonial.image}
												alt={testimonial.author}
												className="w-16 h-16 object-cover rounded-full flex-shrink-0"
											/>
										)}
										<div className="flex-1 min-w-0">
											<p className="text-sm text-muted-foreground line-clamp-3 mb-2">
												"{testimonial.quote}"
											</p>
											<p className="font-semibold text-sm">
												{testimonial.author}
											</p>
											<p className="text-xs text-muted-foreground">
												{testimonial.position}
											</p>
										</div>
									</div>
									<div className="flex justify-between items-center pt-2 border-t">
										<Badge
											variant={
												testimonial.status === 'published'
													? 'default'
													: 'secondary'
											}
										>
											{testimonial.status}
										</Badge>
										<p className="text-xs text-muted-foreground">
											Order: {testimonial.order}
										</p>
										<div className="flex gap-2">
											<Button
												variant="outline"
												size="sm"
												onClick={() => handleEdit(testimonial)}
											>
												<Edit className="w-4 h-4" />
											</Button>
											<AlertDialog>
												<AlertDialogTrigger asChild>
													<Button variant="destructive" size="sm">
														<Trash2 className="w-4 h-4" />
													</Button>
												</AlertDialogTrigger>
												<AlertDialogContent>
													<AlertDialogHeader>
														<AlertDialogTitle>
															Delete Testimonial?
														</AlertDialogTitle>
														<AlertDialogDescription>
															This action cannot be undone.
														</AlertDialogDescription>
													</AlertDialogHeader>
													<AlertDialogFooter>
														<AlertDialogCancel>
															Cancel
														</AlertDialogCancel>
														<AlertDialogAction
															onClick={() =>
																handleDelete(testimonial._id)
															}
														>
															Delete
														</AlertDialogAction>
													</AlertDialogFooter>
												</AlertDialogContent>
											</AlertDialog>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
					{testimonials.length === 0 && (
						<div className="text-center text-muted-foreground py-8 col-span-full">
							No testimonials found
						</div>
					)}
				</div>
			)}
		</div>
	);
}
