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
import { Plus, Edit, Trash2, Image as ImageIcon, Eye, Calendar } from 'lucide-react';

export default function GalleryCRUD() {
	const [gallery, setGallery] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [actionLoading, setActionLoading] = useState(false);
	const [editingGallery, setEditingGallery] = useState<any | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		status: 'draft',
		images: [] as File[],
	});

	const [existingImages, setExistingImages] = useState<string[]>([]);

	const BASE_URL = import.meta.env.VITE_URL;

	useEffect(() => {
		fetchGallery();
	}, []);

	const fetchGallery = async () => {
		setLoading(true);
		try {
			const token = localStorage.getItem('token');
			const res = await fetch(`${BASE_URL}admin/get-galleries`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await res.json();
			setGallery(data || []);
		} catch (error) {
			console.error('Error fetching gallery:', error);
		} finally {
			setLoading(false);
		}
	};

	const resetForm = () => {
		setEditingGallery(null);
		setExistingImages([]);
		setFormData({
			title: '',
			description: '',
			status: 'draft',
			images: [],
		});
	};

	const handleEdit = (item: any) => {
		setEditingGallery(item);
		setFormData({
			title: item.title,
			description: item.description || '',
			status: item.status || 'draft',
			images: [],
		});
		setExistingImages(item.images || []);
		setIsDialogOpen(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setActionLoading(true);

		const token = localStorage.getItem('token');
		const payload = new FormData();

		Object.entries(formData).forEach(([key, value]) => {
			if (value !== null && value !== undefined) {
				if (key === 'images' && Array.isArray(value)) {
					value.forEach((file) => payload.append('images', file));
				} else {
					payload.append(key, value as any);
				}
			}
		});

		if (editingGallery) {
			payload.append('existingImages', JSON.stringify(existingImages));
		}

		const url = editingGallery
			? `${BASE_URL}admin/update-gallery/${editingGallery._id}`
			: `${BASE_URL}admin/add-gallery`;

		try {
			const res = await fetch(url, {
				method: 'POST',
				body: payload,
				headers: { Authorization: `Bearer ${token}` },
			});

			const data = await res.json();
			if (res.ok) {
				fetchGallery();
				resetForm();
				alert(`Gallery ${editingGallery ? 'updated' : 'created'} successfully`);
			} else {
				alert(data.message || 'Something went wrong');
			}
		} catch (error) {
			console.error('Error submitting gallery:', error);
			alert('Failed to submit gallery item');
		} finally {
			setActionLoading(false);
			setIsDialogOpen(false);
		}
	};

	const handleDelete = async (id: string) => {
		setActionLoading(true);
		const token = localStorage.getItem('token');
		try {
			const res = await fetch(`${BASE_URL}admin/delete-gallery/${id}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${token}` },
			});
			if (res.ok) {
				fetchGallery();
				alert('Gallery item deleted successfully');
			} else {
				alert('Failed to delete gallery item');
			}
		} catch (error) {
			console.error('Error deleting gallery:', error);
			alert('Failed to delete gallery item');
		} finally {
			setActionLoading(false);
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'published':
				return 'bg-green-100 text-green-800 text-small';
			case 'draft':
				return 'bg-yellow-100 text-yellow-800 text-small';
			case 'archived':
				return 'bg-gray-100 text-gray-800 text-small';
			default:
				return 'bg-gray-100 text-gray-800 text-small';
		}
	};

	if (loading)
		return <div className="flex justify-center items-center h-64">Loading gallery...</div>;

	if (actionLoading)
		return (
			<div className="flex justify-center items-center h-64">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
					<p className="mt-3 text-primary">Loading...</p>
				</div>
			</div>
		);

	return (
		<div className="space-y-6 relative">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Gallery Management</h2>
					<p className="text-muted-foreground">Manage gallery images</p>
				</div>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={resetForm}>
							<Plus className="w-4 h-4 mr-2" /> Add Gallery Item
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>
								{editingGallery ? 'Edit Gallery' : 'Add Gallery'}
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
								<Label>Description</Label>
								<Textarea
									rows={4}
									value={formData.description}
									onChange={(e) =>
										setFormData({ ...formData, description: e.target.value })
									}
								/>
							</div>

							<div className="space-y-2">
								<Label>Images</Label>
								<Input
									type="file"
									accept="image/*"
									multiple
									onChange={(e) => {
										const files = e.target.files
											? Array.from(e.target.files)
											: [];
										setFormData({
											...formData,
											images: [...formData.images, ...files],
										});
									}}
								/>

								{existingImages.length > 0 && (
									<div className="mt-3 space-y-2 mx-5">
										<h4 className="text-sm font-medium text-gray-600">
											Existing Images:
										</h4>
										{existingImages.map((imgUrl, idx) => (
											<div
												key={idx}
												className="flex items-center justify-between border rounded-lg p-2 bg-gray-50 hover:bg-gray-100 transition"
											>
												<div className="flex items-center gap-2 overflow-hidden">
													<ImageIcon className="w-4 h-4 text-gray-600" />
													<span className="truncate max-w-[200px] text-sm text-gray-800">
														{imgUrl.split('\\').pop()}
													</span>
												</div>
												<div className="flex gap-2">
													<button
														type="button"
														className="p-1 rounded hover:bg-gray-200 transition"
														onClick={() =>
															window.open(
																`${BASE_URL}${imgUrl}`,
																'_blank'
															)
														}
													>
														<Eye className="w-4 h-4 text-primary" />
													</button>
													<button
														type="button"
														className="p-1 rounded hover:bg-red-100 transition"
														onClick={() => {
															const updated = [...existingImages];
															updated.splice(idx, 1);
															setExistingImages(updated);
														}}
													>
														<Trash2 className="w-4 h-4 text-red-600" />
													</button>
												</div>
											</div>
										))}
									</div>
								)}

								{formData.images.length > 0 && (
									<div className="mt-3 space-y-2 mx-5">
										<h4 className="text-sm font-medium text-gray-600">
											New Images:
										</h4>
										{formData.images.map((file, idx) => (
											<div
												key={idx}
												className="flex items-center justify-between border rounded-lg p-2 bg-gray-50 hover:bg-gray-100 transition"
											>
												<div className="flex items-center gap-2 overflow-hidden">
													<ImageIcon className="w-4 h-4 text-gray-600" />
													<span className="truncate max-w-[200px] text-sm text-gray-800">
														{file.name}
													</span>
												</div>
												<div className="flex gap-2">
													<button
														type="button"
														className="p-1 rounded hover:bg-gray-200 transition"
														onClick={() =>
															window.open(
																URL.createObjectURL(file),
																'_blank'
															)
														}
													>
														<Eye className="w-4 h-4 text-primary" />
													</button>
													<button
														type="button"
														className="p-1 rounded hover:bg-red-100 transition"
														onClick={() => {
															const updated = [...formData.images];
															updated.splice(idx, 1);
															setFormData({
																...formData,
																images: updated,
															});
														}}
													>
														<Trash2 className="w-4 h-4 text-red-600" />
													</button>
												</div>
											</div>
										))}
									</div>
								)}
							</div>

							<div className="grid grid-cols-2 gap-4">
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
									{editingGallery ? 'Update' : 'Create'} Gallery
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid grid-cols-3 gap-4">
				{gallery.map((item) => (
					<div key={item._id} className="border rounded-md shadow p-4 bg-white space-y-5">
						<div className="flex justify-between items-start">
							<h3 className="text-lg font-semibold">{item.title}</h3>
							<div className="flex gap-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() => handleEdit(item)}
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
											<AlertDialogTitle>Delete Gallery</AlertDialogTitle>
											<AlertDialogDescription>
												Are you sure you want to delete "{item.title}"?
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
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

						<div>
							{item.images && item.images.length > 0 && (
								<div className="grid grid-cols-3 gap-2 mb-2">
									{item.images.slice(0, 2).map((img, idx) => (
										<div
											key={idx}
											className="flex items-center justify-between border rounded-lg p-1 bg-gray-50 hover:bg-gray-100 transition"
										>
											<div className="flex items-center gap-1 overflow-hidden">
												<ImageIcon className="w-4 h-4 text-gray-600" />
												<span className="truncate max-w-[60px] text-xs">
													{img.split('\\').pop()}
												</span>
											</div>
											<div className="flex gap-1">
												<button
													type="button"
													className="p-1 rounded hover:bg-gray-200 transition"
													onClick={() =>
														window.open(`${BASE_URL}${img}`, '_blank')
													}
												>
													<Eye className="w-4 h-4 text-primary" />
												</button>
											</div>
										</div>
									))}
									{item.images.length > 2 && (
										<div className="flex items-center justify-center border rounded-lg p-2 bg-gray-50 text-sm text-gray-600">
											+{item.images.length - 2}
										</div>
									)}
								</div>
							)}
						</div>

						<p className="text-muted-foreground line-clamp-2">{item.description}</p>

						<div className="flex items-center gap-3 mt-2">
							<Badge className={getStatusColor(item.status)}>{item.status}</Badge>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
