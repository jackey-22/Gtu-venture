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
import { IconPicker } from '@/components/ui/icon-picker';

interface SuccessStory {
	_id: string;
	title: string;
	description: string;
	icon: string;
	metric: string;
	image: string;
	order: number;
	status: 'draft' | 'published' | 'archived';
}

export default function SuccessStoriesCRUD() {
	const [stories, setStories] = useState<SuccessStory[]>([]);
	const [loading, setLoading] = useState(true);
	const [actionLoading, setActionLoading] = useState(false);
	const [editingStory, setEditingStory] = useState<SuccessStory | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [existingImage, setExistingImage] = useState<string | null>(null);

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		icon: '',
		metric: '',
		image: null as File | null,
		order: 0,
		status: 'published' as 'draft' | 'published' | 'archived',
	});

	const BASE_URL = import.meta.env.VITE_URL;

	useEffect(() => {
		fetchStories();
	}, []);

	const fetchStories = async () => {
		setLoading(true);
		try {
			const data = await fetchGet({ pathName: 'admin/get-success-stories' });
			setStories(data || []);
		} catch (error) {
			console.error('Error fetching success stories:', error);
		} finally {
			setLoading(false);
		}
	};

	const resetForm = () => {
		setEditingStory(null);
		setExistingImage(null);
		setFormData({
			title: '',
			description: '',
			icon: '',
			metric: '',
			image: null,
			order: 0,
			status: 'published',
		});
	};

	const handleEdit = (story: SuccessStory) => {
		setEditingStory(story);
		setExistingImage(story.image || null);
		setFormData({
			title: story.title,
			description: story.description,
			icon: story.icon,
			metric: story.metric,
			image: null,
			order: story.order,
			status: story.status,
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
			payload.append('icon', formData.icon);
			payload.append('metric', formData.metric);
			payload.append('order', formData.order.toString());
			payload.append('status', formData.status);

			if (formData.image) {
				payload.append('image', formData.image);
			}

			if (editingStory && existingImage) {
				payload.append('existingImage', existingImage);
			}

			const url = editingStory
				? `${BASE_URL}admin/update-success-story/${editingStory._id}`
				: `${BASE_URL}admin/add-success-story`;

			const res = await fetch(url, {
				method: 'POST',
				body: payload,
				headers: { Authorization: `Bearer ${token}` },
			});

			const data = await res.json();
			if (res.ok) {
				alert(
					editingStory
						? 'Success story updated successfully'
						: 'Success story created successfully'
				);
				setIsDialogOpen(false);
				resetForm();
				await fetchStories();
			} else {
				alert(data.message || 'Something went wrong');
			}
		} catch (error) {
			console.error('Error saving success story:', error);
			alert('Failed to save success story');
		} finally {
			setActionLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		setActionLoading(true);
		try {
			const token = localStorage.getItem('token');
			const res = await fetch(`${BASE_URL}admin/delete-success-story/${id}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${token}` },
			});
			if (res.ok) {
				fetchStories();
				alert('Success story deleted successfully');
			} else {
				alert('Failed to delete success story');
			}
		} catch (error) {
			console.error('Error deleting success story:', error);
			alert('Failed to delete success story');
		} finally {
			setActionLoading(false);
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Success Stories Management</h2>
					<p className="text-muted-foreground">
						Manage success stories displayed on home page
					</p>
				</div>

				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={resetForm}>
							<Plus className="w-4 h-4 mr-2" /> Add Story
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>
								{editingStory ? 'Edit Success Story' : 'Add Success Story'}
							</DialogTitle>
						</DialogHeader>

						<form onSubmit={handleSubmit} className="space-y-4">
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
										<Label>Icon *</Label>
										<IconPicker
											required
											value={formData.icon}
											onValueChange={(value) =>
												setFormData({ ...formData, icon: value })
											}
											placeholder="Select an icon"
										/>
									</div>
								<div className="space-y-2">
									<Label>Metric *</Label>
									<Input
										required
										value={formData.metric}
										onChange={(e) =>
											setFormData({ ...formData, metric: e.target.value })
										}
										placeholder="e.g., 500+ Startups"
									/>
								</div>
							</div>

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
									required={!editingStory}
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
										: editingStory
										? 'Update'
										: 'Create'}{' '}
									Story
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
						<p className="mt-3 text-primary">Loading Success Stories...</p>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{stories.map((story) => (
						<Card key={story._id}>
							<CardContent className="p-4">
								<div className="flex flex-col gap-3">
									{story.image && (
										<img
											src={story.image}
											alt={story.title}
											className="w-full h-32 object-cover rounded"
										/>
									)}
									<div className="flex justify-between items-start gap-3">
										<div className="flex-1 min-w-0">
											<div className="flex items-center gap-2 mb-2 flex-wrap">
												<h3 className="font-bold text-lg line-clamp-2">
													{story.title}
												</h3>
												<Badge
													variant={
														story.status === 'published'
															? 'default'
															: 'secondary'
													}
												>
													{story.status}
												</Badge>
											</div>
											<p className="text-sm text-muted-foreground line-clamp-3 mb-2">
												{story.description}
											</p>
											<div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
												<span>Metric: {story.metric}</span>
												<span>•</span>
												<span>Icon: {story.icon}</span>
												<span>•</span>
												<span>Order: {story.order}</span>
											</div>
										</div>
										<div className="flex gap-2 flex-shrink-0">
											<Button
												variant="outline"
												size="sm"
												onClick={() => handleEdit(story)}
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
															Delete Story?
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
															onClick={() => handleDelete(story._id)}
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
					{stories.length === 0 && (
						<div className="text-center text-muted-foreground py-8 col-span-full">
							No success stories found
						</div>
					)}
				</div>
			)}
		</div>
	);
}
