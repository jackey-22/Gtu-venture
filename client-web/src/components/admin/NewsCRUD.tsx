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
import { Plus, Edit, Trash2, Calendar, Image as ImageIcon, Eye } from 'lucide-react';

export default function NewsCRUD() {
	const [news, setNews] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [actionLoading, setActionLoading] = useState(false);
	const [editingNews, setEditingNews] = useState<any | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const [formData, setFormData] = useState({
		title: '',
		slug: '',
		content: '',
		date: '',
		category: '',
		images: [] as File[],
		status: 'draft',
		publishedAt: '',
	});

	const [existingImages, setExistingImages] = useState<string[]>([]);

	const BASE_URL = import.meta.env.VITE_URL;

	useEffect(() => {
		fetchNews();
	}, []);

	const fetchNews = async () => {
		setLoading(true);
		try {
			const token = localStorage.getItem('token');
			const res = await fetch(`${BASE_URL}admin/get-news`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await res.json();
			setNews(data || []);
		} catch (error) {
			console.error('Error fetching news:', error);
		} finally {
			setLoading(false);
		}
	};

	const resetForm = () => {
		setEditingNews(null);
		setExistingImages([]);
		setFormData({
			title: '',
			slug: '',
			content: '',
			date: '',
			category: '',
			images: [],
			status: 'draft',
			publishedAt: '',
		});
	};

	const handleEdit = (item: any) => {
		setEditingNews(item);
		setFormData({
			title: item.title,
			slug: item.slug,
			content: item.content,
			date: item.date?.slice(0, 16) || '',
			category: item.category || '',
			images: [],
			status: item.status || 'draft',
			publishedAt: item.publishedAt?.slice(0, 16) || '',
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

		if (editingNews) {
			payload.append('existingImages', JSON.stringify(existingImages));
		}

		const url = editingNews
			? `${BASE_URL}admin/update-news/${editingNews._id}`
			: `${BASE_URL}admin/add-news`;

		try {
			const res = await fetch(url, {
				method: 'POST',
				body: payload,
				headers: { Authorization: `Bearer ${token}` },
			});

			const data = await res.json();
			if (res.ok) {
				fetchNews();
				resetForm();
				alert(`News ${editingNews ? 'updated' : 'created'} successfully`);
			} else {
				alert(data.message || 'Something went wrong');
			}
		} catch (error) {
			console.error('Error submitting news:', error);
			alert('Failed to submit news');
		} finally {
			setActionLoading(false);
			setIsDialogOpen(false);
		}
	};

	const handleDelete = async (id: string) => {
		setActionLoading(true);
		const token = localStorage.getItem('token');
		try {
			const res = await fetch(`${BASE_URL}admin/delete-news/${id}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${token}` },
			});
			if (res.ok) {
				fetchNews();
				alert('News deleted successfully');
			} else {
				alert('Failed to delete news');
			}
		} catch (error) {
			console.error('Error deleting news:', error);
			alert('Failed to delete news');
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

	// if (loading)
	// 	return <div className="flex justify-center items-center h-64">Loading news...</div>;

	// if (actionLoading)
	// 	return (
	// 		<>
	// 			<div className="flex justify-center items-center h-64">
	// 				<div className="text-center">
	// 					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
	// 					<p className="mt-3 text-primary">Loading...</p>
	// 				</div>
	// 			</div>
	// 		</>
	// 	);

	if (loading || actionLoading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
					<p className="mt-3 text-primary">Loading News...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center flex-wrap gap-4">
				<div>
					<h2 className="text-2xl font-bold">News Management</h2>
					<p className="text-muted-foreground">Manage all your news articles easily</p>
				</div>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={resetForm}>
							<Plus className="w-4 h-4 mr-2" /> Add News
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>{editingNews ? 'Edit News' : 'Add News'}</DialogTitle>
						</DialogHeader>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label>Title *</Label>
									<Input
										required
										value={formData.title}
										onChange={(e) =>
											setFormData({
												...formData,
												title: e.target.value,
											})
										}
									/>
								</div>
								<div className="space-y-2">
									<Label>Slug *</Label>
									<Input
										required
										value={formData.slug}
										onChange={(e) =>
											setFormData({
												...formData,
												slug: e.target.value,
											})
										}
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label>Content *</Label>
								<Textarea
									required
									rows={5}
									value={formData.content}
									onChange={(e) =>
										setFormData({
											...formData,
											content: e.target.value,
										})
									}
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label>Date</Label>
									<Input
										type="datetime-local"
										value={formData.date}
										onChange={(e) =>
											setFormData({
												...formData,
												date: e.target.value,
											})
										}
									/>
								</div>
								<div className="space-y-2">
									<Label>Published At</Label>
									<Input
										type="datetime-local"
										value={formData.publishedAt}
										onChange={(e) =>
											setFormData({
												...formData,
												publishedAt: e.target.value,
											})
										}
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label>Category</Label>
								<Input
									value={formData.category}
									onChange={(e) =>
										setFormData({
											...formData,
											category: e.target.value,
										})
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
											Existing Attachments:
										</h4>
										{existingImages.map((imgUrl, index) => (
											<div
												key={index}
												className="flex items-center justify-between border rounded-lg p-2 bg-gray-50 hover:bg-gray-100 transition"
											>
												<div className="flex items-center gap-2 overflow-hidden">
													<ImageIcon className="w-4 h-4 text-gray-600" />
													<span className="truncate max-w-[200px] text-sm text-gray-800">
														{imgUrl.split('/').pop()}
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
														<Eye className="w-4 h-4 text-blue-600" />
													</button>
													<button
														type="button"
														className="p-1 rounded hover:bg-red-100 transition"
														onClick={() => {
															const updated = [...existingImages];
															updated.splice(index, 1);
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
											New Attachments:
										</h4>
										{formData.images.map((file: File, index: number) => (
											<div
												key={index}
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
														<Eye className="w-4 h-4 text-blue-600" />
													</button>
													<button
														type="button"
														className="p-1 rounded hover:bg-red-100 transition"
														onClick={() => {
															const updated = [...formData.images];
															updated.splice(index, 1);
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
								<Button type="submit" onClick={() => setIsDialogOpen(false)}>
									{editingNews ? 'Update' : 'Create'} News
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{news.map((n) => (
					<Card key={n._id}>
						<CardContent className="p-4">
							<div className="flex justify-between items-start gap-3">
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 mb-2 flex-wrap">
										<h3 className="font-bold text-lg line-clamp-2">
											{n.title}
										</h3>
										<Badge
											variant={
												n.status === 'published' ? 'default' : 'secondary'
											}
											className="flex-shrink-0"
										>
											{n.status}
										</Badge>
									</div>
									<p className="text-sm text-muted-foreground line-clamp-3 mb-2">
										{n.content}
									</p>
									<div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-2">
										{n.date && (
											<div className="flex items-center gap-1">
												<Calendar className="w-3 h-3" />
												<span>{new Date(n.date).toLocaleDateString()}</span>
											</div>
										)}
										{n.category && (
											<Badge variant="outline" className="text-xs">
												{n.category}
											</Badge>
										)}
									</div>
								</div>
								<div className="flex gap-2 flex-shrink-0">
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleEdit(n)}
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
												<AlertDialogTitle>Delete News?</AlertDialogTitle>
												<AlertDialogDescription>
													This action cannot be undone.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction
													onClick={() => handleDelete(n._id)}
												>
													Delete
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
				{news.length === 0 && (
					<div className="text-center text-muted-foreground py-8 col-span-full">
						No news found
					</div>
				)}
			</div>
		</div>
	);
}
