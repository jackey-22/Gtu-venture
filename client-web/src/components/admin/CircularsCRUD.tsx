import React, { useState, useEffect } from 'react';
import { fetchGet, fetchPost } from '../../utils/fetch.utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
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
			setCirculars(Array.isArray(data) ? data : []);
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
				const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
				// Send tags as comma-separated string, backend will parse it
				formDataToSend.append('tags', tagsArray.join(','));
			}
			if (file) {
				formDataToSend.append('file', file);
			} else if (formData.fileUrl && editingCircular) {
				// Keep existing file URL if no new file
				formDataToSend.append('fileUrl', formData.fileUrl);
			}

			const pathName = editingCircular ? `admin/update-circular/${editingCircular._id}` : 'admin/add-circular';
			const response = await fetch(`${baseURL}${pathName}`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formDataToSend,
			});

			const data = await response.json();
			if (data?.message?.toLowerCase().includes('success')) {
				alert(editingCircular ? 'Circular updated successfully' : 'Circular added successfully');
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
			type: circular.type,
			status: circular.status,
		});
		setFile(null);
		setIsDialogOpen(true);
	};

	const handleDelete = async (id: string) => {
		setActionLoading(true);
		try {
			const data = await fetchPost({ pathName: `admin/delete-circular/${id}`, body: JSON.stringify({}) });
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

	if (loading) {
		return <div className="p-6">Loading circulars...</div>;
	}

	return (
		<div className="p-6 space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">Circulars Management</h2>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={resetForm}>
							<Plus className="w-4 h-4 mr-2" />
							Add Circular
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>{editingCircular ? 'Edit Circular' : 'Add Circular'}</DialogTitle>
						</DialogHeader>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<Label>Title *</Label>
								<Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
							</div>
							<div>
								<Label>Summary</Label>
								<Textarea value={formData.summary} onChange={(e) => setFormData({ ...formData, summary: e.target.value })} />
							</div>
							<div>
								<Label>Tags (comma separated)</Label>
								<Input value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="intake, program, policy" />
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label>Type</Label>
									<Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="circular">Circular</SelectItem>
											<SelectItem value="tender">Tender</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div>
									<Label>Date</Label>
									<Input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
								</div>
							</div>
							<div>
								<Label>File</Label>
								{file ? (
									<div className="flex items-center gap-2">
										<span className="text-sm">{file.name}</span>
										<Button type="button" variant="outline" size="sm" onClick={() => setFile(null)}>Remove</Button>
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
											<a href={`${baseURL}${formData.fileUrl.replace(/\\/g, '/')}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary">
												View current file
											</a>
										)}
									</div>
								)}
							</div>
							<div>
								<Label>URL (alternative to file)</Label>
								<Input value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} placeholder="https://..." />
							</div>
							<div>
								<Label>Status</Label>
								<Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
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

			<div className="grid gap-4">
				{circulars.map((circular) => (
					<Card key={circular._id}>
						<CardContent className="p-4">
							<div className="flex justify-between items-start">
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-2">
										<h3 className="font-bold text-lg">{circular.title}</h3>
										<Badge variant={circular.status === 'published' ? 'default' : 'secondary'}>{circular.status}</Badge>
										<Badge variant="outline">{circular.type}</Badge>
									</div>
									{circular.summary && <p className="text-sm text-muted-foreground mb-2">{circular.summary}</p>}
									<div className="flex gap-2 flex-wrap mt-2">
										{circular.tags?.map((tag, i) => (
											<Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
										))}
									</div>
									{circular.date && (
										<div className="text-xs text-muted-foreground mt-2">
											Date: {new Date(circular.date).toLocaleDateString()}
										</div>
									)}
								</div>
								<div className="flex gap-2">
									<Button variant="outline" size="sm" onClick={() => handleEdit(circular)}>
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
												<AlertDialogTitle>Delete Circular?</AlertDialogTitle>
												<AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction onClick={() => handleDelete(circular._id)}>Delete</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
				{circulars.length === 0 && <div className="text-center text-muted-foreground py-8">No circulars found</div>}
			</div>
		</div>
	);
}

