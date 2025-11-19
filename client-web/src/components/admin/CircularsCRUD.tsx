import React, { useState, useEffect } from 'react';
import { fetchGet, fetchPost } from '../../utils/fetch.utils';
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
	DialogDescription,
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
import { Plus, Edit, Trash2, FileText } from 'lucide-react';

const baseURL = import.meta.env.VITE_URL;

interface CircularType {
	_id: string;
	title: string;
	summary?: string;
	tags?: string[];
	url?: string;
	fileUrl?: string;
	date?: string;
	type: 'circular' | 'tender';
	status: 'draft' | 'published' | 'archived';
	parentId?: string;
	version?: number;
	previousData?: any;
	isLatest?: boolean;
}

export default function CircularsCRUD() {
	const [circulars, setCirculars] = useState<CircularType[]>([]);
	const [loading, setLoading] = useState(true);
	const [actionLoading, setActionLoading] = useState(false);
	const [editingCircular, setEditingCircular] = useState<CircularType | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [formData, setFormData] = useState({
		title: '',
		summary: '',
		tags: '',
		url: '',
		fileUrl: '',
		date: '',
		type: 'circular' as 'circular' | 'tender',
		status: 'draft' as 'draft' | 'published' | 'archived',
	});
	const [file, setFile] = useState<File | null>(null);

	useEffect(() => {
		fetchCirculars();
	}, []);

	const fetchCirculars = async () => {
		setLoading(true);
		try {
			const data = await fetchGet({ pathName: 'admin/get-circulars' });
			// Filter only circulars
			const circularsData = Array.isArray(data)
				? data.filter((item: CircularType) => item.type === 'circular')
				: [];
			setCirculars(circularsData);
		} catch (error) {
			console.error('Error fetching circulars:', error);
			alert('Failed to fetch circulars');
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setActionLoading(true);
		const token = localStorage.getItem('token');
		try {
			const formDataToSend = new FormData();
			Object.entries(formData).forEach(([key, value]) => {
				if (key !== 'fileUrl' && key !== 'tags' && value !== null && value !== undefined) {
					formDataToSend.append(key, value as string);
				}
			});
			if (formData.tags) {
				const tagsArray = formData.tags
					.split(',')
					.map((t) => t.trim())
					.filter(Boolean);
				// Send tags as comma-separated string, backend will parse it
				formDataToSend.append('tags', tagsArray.join(','));
			}
			if (file) {
				formDataToSend.append('file', file);
			} else if (formData.fileUrl && editingCircular) {
				// Keep existing file URL if no new file
				formDataToSend.append('fileUrl', formData.fileUrl);
			}

			const pathName = editingCircular
				? `admin/update-circular/${editingCircular._id}`
				: 'admin/add-circular';
			const response = await fetch(`${baseURL}${pathName}`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formDataToSend,
			});

			const data = await response.json();
			if (data?.message?.toLowerCase().includes('success')) {
				alert(
					editingCircular
						? 'Circular updated successfully'
						: 'Circular added successfully'
				);
				setIsDialogOpen(false);
				resetForm();
				await fetchCirculars();
			} else {
				alert(data?.message || 'Something went wrong');
			}
		} catch (error) {
			console.error('Error saving circular:', error);
			alert('Failed to save circular');
		} finally {
			setActionLoading(false);
		}
	};

	const handleEdit = (circular: CircularType) => {
		setEditingCircular(circular);
		setFormData({
			title: circular.title || '',
			summary: circular.summary || '',
			tags: circular.tags?.join(', ') || '',
			url: circular.url || '',
			fileUrl: circular.fileUrl || '',
			date: circular.date ? new Date(circular.date).toISOString().split('T')[0] : '',
			type: 'circular',
			status: circular.status,
		});
		setFile(null);
		setIsDialogOpen(true);
	};

	const handleDelete = async (id: string) => {
		setActionLoading(true);
		try {
			const data = await fetchPost({
				pathName: `admin/delete-circular/${id}`,
				body: JSON.stringify({}),
				method: 'DELETE',
			});
			if (data?.message?.toLowerCase().includes('deleted')) {
				alert('Circular deleted successfully');
				await fetchCirculars();
			} else {
				alert(data?.message || 'Failed to delete circular');
			}
		} catch (error) {
			console.error('Error deleting circular:', error);
			alert('Failed to delete circular');
		} finally {
			setActionLoading(false);
		}
	};

	const resetForm = () => {
		setEditingCircular(null);
		setFormData({
			title: '',
			summary: '',
			tags: '',
			url: '',
			fileUrl: '',
			date: '',
			type: 'circular',
			status: 'draft',
		});
		setFile(null);
	};

	if (loading || actionLoading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
					<p className="mt-3 text-primary">Loading Circulars...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Circulars Management</h2>
					<p className="text-muted-foreground">Manage All Circulars</p>
				</div>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={resetForm}>
							<Plus className="w-4 h-4 mr-2" />
							Add Circular
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>
								{editingCircular ? 'Edit Circular' : 'Add Circular'}
							</DialogTitle>
						</DialogHeader>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<Label>Title *</Label>
								<Input
									value={formData.title}
									onChange={(e) =>
										setFormData({ ...formData, title: e.target.value })
									}
									required
								/>
							</div>
							<div>
								<Label>Summary</Label>
								<Textarea
									value={formData.summary}
									onChange={(e) =>
										setFormData({ ...formData, summary: e.target.value })
									}
								/>
							</div>
							<div>
								<Label>Tags (comma separated)</Label>
								<Input
									value={formData.tags}
									onChange={(e) =>
										setFormData({ ...formData, tags: e.target.value })
									}
									placeholder="intake, program, policy"
								/>
							</div>
							<div>
								<Label>Date</Label>
								<Input
									type="date"
									value={formData.date}
									onChange={(e) =>
										setFormData({ ...formData, date: e.target.value })
									}
								/>
							</div>
							<div>
								<Label>File</Label>
								{file ? (
									<div className="flex items-center gap-2">
										<span className="text-sm">{file.name}</span>
										<Button
											type="button"
											variant="outline"
											size="sm"
											onClick={() => setFile(null)}
										>
											Remove
										</Button>
									</div>
								) : (
									<div className="flex items-center gap-2">
										<Input
											type="file"
											accept=".pdf,.doc,.docx"
											onChange={(e) => setFile(e.target.files?.[0] || null)}
											className="cursor-pointer"
										/>
										{formData.fileUrl && (
											<a
												href={`${baseURL}${formData.fileUrl.replace(
													/\\/g,
													'/'
												)}`}
												target="_blank"
												rel="noopener noreferrer"
												className="text-sm text-primary"
											>
												View current file
											</a>
										)}
									</div>
								)}
							</div>
							<div>
								<Label>URL (alternative to file)</Label>
								<Input
									value={formData.url}
									onChange={(e) =>
										setFormData({ ...formData, url: e.target.value })
									}
									placeholder="https://..."
								/>
							</div>
							<div>
								<Label>Status</Label>
								<Select
									value={formData.status}
									onValueChange={(value: any) =>
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
							<Button type="submit" disabled={actionLoading}>
								{actionLoading ? 'Saving...' : editingCircular ? 'Update' : 'Add'}
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			{circulars.length > 0 ? (
				<div className="space-y-4">
					<h3 className="text-xl font-bold">Circulars</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{circulars.map((circular) => (
							<Card key={circular._id}>
								<CardContent className="p-4">
									<div className="flex justify-between items-start gap-3">
										<div className="flex-1 min-w-0">
											<div className="flex items-center gap-2 mb-2 flex-wrap">
												<h3 className="font-bold text-lg line-clamp-2">
													{circular.title}
												</h3>
												<Badge
													variant={
														circular.status === 'published'
															? 'default'
															: 'secondary'
													}
													className="flex-shrink-0"
												>
													{circular.status}
												</Badge>
											</div>
											{circular.summary && (
												<p className="text-sm text-muted-foreground line-clamp-3 mb-2">
													{circular.summary}
												</p>
											)}
											<div className="flex gap-2 flex-wrap mb-2">
												{circular.tags?.map((tag, i) => (
													<Badge
														key={i}
														variant="outline"
														className="text-xs"
													>
														{tag}
													</Badge>
												))}
											</div>
											{circular.date && (
												<div className="text-xs text-muted-foreground">
													Date:{' '}
													{new Date(circular.date).toLocaleDateString()}
												</div>
											)}
											{(circular.fileUrl || circular.url) && (
												<div className="text-xs mt-2">
													{circular.fileUrl ? (
														<a
															href={`${baseURL}${circular.fileUrl.replace(
																/\\/g,
																'/'
															)}`}
															target="_blank"
															rel="noopener noreferrer"
															className="text-primary hover:underline flex items-center gap-1"
															onClick={(e) => e.stopPropagation()}
														>
															<FileText className="w-3 h-3" />
															View File
														</a>
													) : (
														<a
															href={circular.url}
															target="_blank"
															rel="noopener noreferrer"
															className="text-primary hover:underline flex items-center gap-1"
															onClick={(e) => e.stopPropagation()}
														>
															<FileText className="w-3 h-3" />
															External Link
														</a>
													)}
												</div>
											)}
										</div>
										<div className="flex gap-2 flex-shrink-0">
											<Button
												variant="outline"
												size="sm"
												onClick={() => handleEdit(circular)}
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
															Delete Circular?
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
																handleDelete(circular._id)
															}
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
					</div>
				</div>
			) : (
				<div className="text-center text-muted-foreground py-8">No circulars found</div>
			)}
		</div>
	);
}
