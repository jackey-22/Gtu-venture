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
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { fetchGet, fetchPost } from '../../utils/fetch.utils';

interface CarouselItem {
	_id: string;
	image: string;
	title: string;
	description: string;
	order: number;
	status: 'draft' | 'published' | 'archived';
}

export default function CarouselItemsCRUD() {
	const [items, setItems] = useState<CarouselItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [actionLoading, setActionLoading] = useState(false);
	const [editingItem, setEditingItem] = useState<CarouselItem | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [existingImage, setExistingImage] = useState<string | null>(null);

	const [formData, setFormData] = useState({
		image: null as File | null,
		title: '',
		description: '',
		order: 0,
		status: 'published' as 'draft' | 'published' | 'archived',
	});

	const BASE_URL = import.meta.env.VITE_URL;

	useEffect(() => {
		fetchItems();
	}, []);

	const fetchItems = async () => {
		setLoading(true);
		try {
			const data = await fetchGet({ pathName: 'admin/get-carousel-items' });
			setItems(data || []);
		} catch (error) {
			console.error('Error fetching carousel items:', error);
		} finally {
			setLoading(false);
		}
	};

	const resetForm = () => {
		setEditingItem(null);
		setExistingImage(null);
		setFormData({
			image: null,
			title: '',
			description: '',
			order: 0,
			status: 'published',
		});
	};

	const handleEdit = (item: CarouselItem) => {
		setEditingItem(item);
		setExistingImage(item.image || null);
		setFormData({
			image: null,
			title: item.title,
			description: item.description,
			order: item.order,
			status: item.status,
		});
		setIsDialogOpen(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setActionLoading(true);

		try {
			const token = localStorage.getItem('token');
			const payload = new FormData();
			payload.append('title', formData.title);
			payload.append('description', formData.description);
			payload.append('order', formData.order.toString());
			payload.append('status', formData.status);

			if (formData.image) {
				payload.append('image', formData.image);
			}

			if (editingItem && existingImage) {
				payload.append('existingImage', existingImage);
			}

			const url = editingItem
				? `${BASE_URL}admin/update-carousel-item/${editingItem._id}`
				: `${BASE_URL}admin/add-carousel-item`;

			const res = await fetch(url, {
				method: 'POST',
				body: payload,
				headers: { Authorization: `Bearer ${token}` },
			});

			const data = await res.json();
			if (res.ok) {
				alert(
					editingItem
						? 'Carousel item updated successfully'
						: 'Carousel item created successfully'
				);
				setIsDialogOpen(false);
				resetForm();
				await fetchItems();
			} else {
				alert(data.message || 'Something went wrong');
			}
		} catch (error) {
			console.error('Error saving carousel item:', error);
			alert('Failed to save carousel item');
		} finally {
			setActionLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		setActionLoading(true);
		try {
			const token = localStorage.getItem('token');
			const res = await fetch(`${BASE_URL}admin/delete-carousel-item/${id}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${token}` },
			});
			if (res.ok) {
				fetchItems();
				alert('Carousel item deleted successfully');
			} else {
				alert('Failed to delete carousel item');
			}
		} catch (error) {
			console.error('Error deleting carousel item:', error);
			alert('Failed to delete carousel item');
		} finally {
			setActionLoading(false);
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Carousel Items Management</h2>
					<p className="text-muted-foreground">Manage 3D carousel items</p>
				</div>

				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={resetForm}>
							<Plus className="w-4 h-4 mr-2" /> Add Item
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>
								{editingItem ? 'Edit Carousel Item' : 'Add Carousel Item'}
							</DialogTitle>
						</DialogHeader>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-2">
								<Label>Image *</Label>
								{existingImage && (
									<div className="mb-2">
										<img
											src={existingImage}
											alt="Current"
											className="w-32 h-32 object-cover rounded"
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
									required={!editingItem}
								/>
							</div>

							<div className="space-y-2">
								<Label>Title *</Label>
								<Input
									required
									value={formData.title}
									onChange={(e) =>
										setFormData({ ...formData, title: e.target.value })
									}
								/>
							</div>

							<div className="space-y-2">
								<Label>Description *</Label>
								<Textarea
									required
									rows={4}
									value={formData.description}
									onChange={(e) =>
										setFormData({ ...formData, description: e.target.value })
									}
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
										: editingItem
										? 'Update'
										: 'Create'}{' '}
									Item
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
						<p className="mt-3 text-primary">Loading Carousel Items...</p>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{items.map((item) => (
						<Card key={item._id}>
							<CardContent className="p-4">
								<div className="flex flex-col gap-3">
									{item.image && (
										<img
											src={item.image}
											alt={item.title}
											className="w-full h-32 object-cover rounded"
										/>
									)}
									<div className="flex justify-between items-start gap-3">
										<div className="flex-1 min-w-0">
											<div className="flex items-center gap-2 mb-2 flex-wrap">
												<h3 className="font-bold text-lg line-clamp-2">
													{item.title}
												</h3>
												<Badge
													variant={
														item.status === 'published'
															? 'default'
															: 'secondary'
													}
												>
													{item.status}
												</Badge>
											</div>
											<p className="text-sm text-muted-foreground line-clamp-3 mb-2">
												{item.description}
											</p>
											<p className="text-xs text-muted-foreground">
												Order: {item.order}
											</p>
										</div>
										<div className="flex gap-2 flex-shrink-0">
											<Button
												variant="outline"
												size="sm"
												onClick={() => handleEdit(item)}
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
															Delete Item?
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
															onClick={() => handleDelete(item._id)}
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

					{items.length === 0 && !loading && (
						<div className="text-center text-muted-foreground py-8 col-span-full">
							No carousel items found
						</div>
					)}
				</div>
			)}
		</div>
	);
}
