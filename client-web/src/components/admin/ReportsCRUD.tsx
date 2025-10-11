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
import { Plus, Edit, Trash2, Calendar, Eye, FileText } from 'lucide-react';
import { log } from 'node:console';

export default function ReportsCRUD() {
	const [reports, setReports] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [actionLoading, setActionLoading] = useState(false);
	const [editingReport, setEditingReport] = useState<any | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		category: '',
		file: null as File | null,
		status: 'draft' as 'draft' | 'published' | 'archived',
	});

	const [existingFile, setExistingFile] = useState<string | null>(null);

	const BASE_URL = import.meta.env.VITE_URL;

	useEffect(() => {
		fetchReports();
	}, []);

	const fetchReports = async () => {
		setLoading(true);
		try {
			const token = localStorage.getItem('token');
			const res = await fetch(`${BASE_URL}admin/get-reports`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await res.json();
			setReports(data || []);
		} catch (error) {
			console.error('Error fetching reports:', error);
		} finally {
			setLoading(false);
		}
	};

	const resetForm = () => {
		setEditingReport(null);
		setExistingFile(null);
		setFormData({
			title: '',
			description: '',
			category: '',
			file: null,
			status: 'draft',
		});
	};

	const handleEdit = (item: any) => {
		setEditingReport(item);
		setFormData({
			title: item.title,
			description: item.description,
			category: item.category || '',
			file: null,
			status: item.status || 'draft',
		});
		setExistingFile(item.fileUrl || null);
		setIsDialogOpen(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setActionLoading(true);

		const payload = new FormData();
		payload.append('title', formData.title);
		payload.append('description', formData.description);
		payload.append('category', formData.category);
		payload.append('status', formData.status);

		if (formData.file) {
			payload.append('file', formData.file);
		} else if (editingReport && existingFile) {
			payload.append('existingFile', existingFile);
		}

		const token = localStorage.getItem('token');
		const url = editingReport
			? `${BASE_URL}admin/update-report/${editingReport._id}`
			: `${BASE_URL}admin/add-report`;

		try {
			const res = await fetch(url, {
				method: 'POST',
				body: payload,
				headers: { Authorization: `Bearer ${token}` },
			});

			const data = await res.json();
			if (res.ok) {
				fetchReports();
				resetForm();
				alert(`Report ${editingReport ? 'updated' : 'created'} successfully`);
			} else {
				alert(data.message || 'Something went wrong');
			}
		} catch (error) {
			console.error('Error submitting report:', error);
			alert('Failed to submit report');
		} finally {
			setActionLoading(false);
			setIsDialogOpen(false);
		}
	};

	const handleDelete = async (id: string) => {
		setActionLoading(true);
		const token = localStorage.getItem('token');
		try {
			const res = await fetch(`${BASE_URL}admin/delete-report/${id}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${token}` },
			});
			if (res.ok) {
				fetchReports();
				alert('Report deleted successfully');
			} else {
				alert('Failed to delete report');
			}
		} catch (error) {
			console.error('Error deleting report:', error);
			alert('Failed to delete report');
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

	return (
		<div className="space-y-6 relative">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Reports Management</h2>
					<p className="text-muted-foreground">Manage reports</p>
				</div>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={resetForm}>
							<Plus className="w-4 h-4 mr-2" /> Add Report
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>
								{editingReport ? 'Edit Report' : 'Add Report'}
							</DialogTitle>
						</DialogHeader>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
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
									<Label>Category</Label>
									<Input
										value={formData.category}
										onChange={(e) =>
											setFormData({ ...formData, category: e.target.value })
										}
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label>Description *</Label>
								<Textarea
									required
									rows={5}
									value={formData.description}
									onChange={(e) =>
										setFormData({ ...formData, description: e.target.value })
									}
								/>
							</div>

							<div className="space-y-2">
								<Label>File</Label>
								<Input
									type="file"
									accept=".pdf,.doc,.docx"
									onChange={(e) =>
										setFormData({
											...formData,
											file: e.target.files?.[0] || null,
										})
									}
								/>
								{existingFile && !formData.file && (
									<div className="flex items-center justify-between border rounded-lg p-2 bg-gray-50 mt-2">
										<div className="flex items-center gap-2">
											<FileText className="w-4 h-4 text-gray-600" />
											<span className="truncate max-w-[200px]">
												{existingFile.split('/').pop()}
											</span>
										</div>
										<div className="flex gap-2">
											<button
												type="button"
												className="p-1 rounded hover:bg-gray-200 transition"
												onClick={async () => {
													try {
														const token = localStorage.getItem('token');
														const res = await fetch(
															`${BASE_URL}${existingFile}`,
															{
																headers: {
																	Authorization: `Bearer ${token}`,
																},
															}
														);
														const blob = await res.blob();
														const url = URL.createObjectURL(blob);
														window.open(url, '_blank');
													} catch (err) {
														console.error('Error opening file:', err);
													}
												}}
											>
												<Eye className="w-4 h-4 text-blue-600" />
											</button>

											<button
												type="button"
												className="p-1 rounded hover:bg-red-100 transition"
												onClick={() => setExistingFile(null)}
											>
												<Trash2 className="w-4 h-4 text-red-600" />
											</button>
										</div>
									</div>
								)}

								{formData.file && (
									<div className="flex items-center justify-between border rounded-lg p-2 bg-gray-50 mt-2">
										<div className="flex items-center gap-2">
											<FileText className="w-4 h-4 text-gray-600" />
											<span className="truncate max-w-[200px]">
												{formData.file.name}
											</span>
										</div>
										<div className="flex gap-2">
											<button
												type="button"
												className="p-1 rounded hover:bg-gray-200 transition"
												onClick={() =>
													window.open(
														URL.createObjectURL(formData.file!),
														'_blank'
													)
												}
											>
												<Eye className="w-4 h-4 text-blue-600" />
											</button>
											<button
												type="button"
												className="p-1 rounded hover:bg-red-100 transition"
												onClick={() =>
													setFormData({ ...formData, file: null })
												}
											>
												<Trash2 className="w-4 h-4 text-red-600" />
											</button>
										</div>
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
									{editingReport ? 'Update' : 'Create'} Report
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			{loading || actionLoading ? (
				<div className="flex justify-center items-center h-64">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
						<p className="mt-3 text-primary">Loading Reports...</p>
					</div>
				</div>
			) : (
				<div className="grid grid-flow-col grid-cols-3 gap-4">
					{reports.map((r) => (
						<div
							key={r._id}
							className="border rounded-md shadow p-4 bg-white space-y-5 px-5 flex flex-col h-full"
						>
							<div className="flex justify-between items-center mb-2">
								<h3 className="text-xl font-bold">{r.title}</h3>
								<div className="flex gap-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleEdit(r)}
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
												<AlertDialogTitle>Delete Report</AlertDialogTitle>
												<AlertDialogDescription>
													Are you sure you want to delete "{r.title}"?
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction
													onClick={() => handleDelete(r._id)}
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
									{r.description}
								</p>
								<div className="mt-auto space-y-3">
									<div className="flex items-center gap-3 mt-2">
										<Badge className={getStatusColor(r.status)}>
											{r.status}
										</Badge>
										{r.category && (
											<Badge variant="outline">{r.category}</Badge>
										)}
									</div>
									{r.fileUrl && (
										<div className="flex items-center gap-2 mt-2">
											<FileText className="w-4 h-4 text-gray-600" />
											<a
												href={`${BASE_URL}${r.file_url}`}
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-600 underline"
											>
												{r.fileUrl.split('/').pop()}
											</a>
										</div>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
