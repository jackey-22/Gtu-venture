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
import { Plus, Edit, Trash2, FileText, Eye } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_URL;

interface CareerType {
	_id: string;
	title: string;
	body?: string;
	type?: string;
	category?: string;
	startup?: string;
	details?: string;
	requirements?: string[];
	benefits?: string[];
	location?: string;
	status: 'draft' | 'published' | 'archived';
	deadline?: string;
	publishedOn?: string;
	link?: string;
	document?: string;
}

export default function CareersCRUD() {
	const [careers, setCareers] = useState<CareerType[]>([]);
	const [loading, setLoading] = useState(true);
	const [actionLoading, setActionLoading] = useState(false);
	const [editingCareer, setEditingCareer] = useState<CareerType | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [existingDocument, setExistingDocument] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		title: '',
		body: '',
		type: '',
		category: '',
		startup: '',
		details: '',
		requirements: '',
		benefits: '',
		location: '',
		status: 'draft' as 'draft' | 'published' | 'archived',
		deadline: '',
		publishedOn: '',
		link: '',
		document: null as File | null,
	});
	const [validationError, setValidationError] = useState<string>('');

	useEffect(() => {
		fetchCareers();
	}, []);

	const fetchCareers = async () => {
		setLoading(true);
		try {
			const data = await fetchGet({ pathName: 'admin/get-careers' });
			setCareers(Array.isArray(data) ? data : []);
		} catch (error) {
			console.error('Error fetching careers:', error);
			alert('Failed to fetch careers');
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		// Client-side validation
		// Deadline should be on or after published date
		if (formData.deadline && formData.publishedOn) {
			const deadlineDate = new Date(formData.deadline);
			const publishedOnDate = new Date(formData.publishedOn);
			// Set time to midnight for accurate date comparison
			deadlineDate.setHours(0, 0, 0, 0);
			publishedOnDate.setHours(0, 0, 0, 0);
			if (deadlineDate < publishedOnDate) {
				setValidationError('Deadline cannot be before published date');
				return;
			}
		}
		
		setValidationError('');
		setActionLoading(true);
		
		const token = localStorage.getItem('token');
		const payload = new FormData();
		
		// Append all form fields
		payload.append('title', formData.title);
		if (formData.body) payload.append('body', formData.body);
		if (formData.type) payload.append('type', formData.type);
		if (formData.category) payload.append('category', formData.category);
		if (formData.startup) payload.append('startup', formData.startup);
		if (formData.details) payload.append('details', formData.details);
		if (formData.location) payload.append('location', formData.location);
		if (formData.link) payload.append('link', formData.link);
		payload.append('status', formData.status);
		
		// Handle requirements and benefits as arrays
		const requirements = formData.requirements
			? formData.requirements.split('\n').filter(Boolean)
			: [];
		const benefits = formData.benefits
			? formData.benefits.split('\n').filter(Boolean)
			: [];
		payload.append('requirements', JSON.stringify(requirements));
		payload.append('benefits', JSON.stringify(benefits));
		
		// Handle dates
		if (formData.deadline) payload.append('deadline', formData.deadline);
		if (formData.publishedOn) payload.append('publishedOn', formData.publishedOn);
		
		// Handle document file
		if (formData.document) {
			payload.append('document', formData.document);
		} else if (editingCareer) {
			// Always send existingDocument when editing - null means remove, value means keep
			if (existingDocument) {
				payload.append('existingDocument', existingDocument);
			} else {
				// Explicitly send empty string to indicate removal
				payload.append('existingDocument', '');
			}
		}
		
		try {
			const url = editingCareer
				? `${BASE_URL}admin/update-career/${editingCareer._id}`
				: `${BASE_URL}admin/add-career`;
			
			const res = await fetch(url, {
				method: 'POST',
				body: payload,
				headers: { Authorization: `Bearer ${token}` },
			});
			
			const data = await res.json();
			if (res.ok && data?.message?.toLowerCase().includes('success')) {
				alert(editingCareer ? 'Career updated successfully' : 'Career added successfully');
				setIsDialogOpen(false);
				resetForm();
				await fetchCareers();
			} else {
				alert(data?.message || 'Something went wrong');
			}
		} catch (error) {
			console.error('Error saving career:', error);
			alert('Failed to save career');
		} finally {
			setActionLoading(false);
		}
	};

	const handleEdit = (career: CareerType) => {
		setEditingCareer(career);
		// Format dates for date input (YYYY-MM-DD)
		const formatDateForInput = (date: string | Date | undefined) => {
			if (!date) return '';
			const d = new Date(date);
			if (isNaN(d.getTime())) return '';
			return d.toISOString().split('T')[0];
		};
		setFormData({
			title: career.title || '',
			body: career.body || '',
			type: career.type || '',
			category: career.category || '',
			startup: career.startup || '',
			details: career.details || '',
			requirements: career.requirements?.join('\n') || '',
			benefits: career.benefits?.join('\n') || '',
			location: career.location || '',
			status: career.status,
			deadline: formatDateForInput(career.deadline),
			publishedOn: formatDateForInput(career.publishedOn),
			link: career.link || '',
			document: null,
		});
		setExistingDocument(career.document || null);
		setValidationError('');
		setIsDialogOpen(true);
	};

	const handleDelete = async (id: string) => {
		setActionLoading(true);
		try {
			const data = await fetchPost({
				pathName: `admin/delete-career/${id}`,
				body: JSON.stringify({}),
				method: 'DELETE',
			});
			if (data?.message?.toLowerCase().includes('deleted')) {
				alert('Career deleted successfully');
				await fetchCareers();
			} else {
				alert(data?.message || 'Failed to delete career');
			}
		} catch (error) {
			console.error('Error deleting career:', error);
			alert('Failed to delete career');
		} finally {
			setActionLoading(false);
		}
	};

	const resetForm = () => {
		setEditingCareer(null);
		setExistingDocument(null);
		setFormData({
			title: '',
			body: '',
			type: '',
			category: '',
			startup: '',
			details: '',
			requirements: '',
			benefits: '',
			location: '',
			status: 'draft',
			deadline: '',
			publishedOn: '',
			link: '',
			document: null,
		});
		setValidationError('');
	};

	if (loading || actionLoading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
					<p className="mt-3 text-primary">Loading Careers...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Careers Management</h2>
					<p className="text-muted-foreground">Manage All Careers</p>
				</div>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={resetForm}>
							<Plus className="w-4 h-4 mr-2" />
							Add Career
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>
								{editingCareer ? 'Edit Career' : 'Add Career'}
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
								<Label>Body</Label>
								<Textarea
									value={formData.body}
									onChange={(e) =>
										setFormData({ ...formData, body: e.target.value })
									}
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label>Type</Label>
									<Input
										value={formData.type}
										onChange={(e) =>
											setFormData({ ...formData, type: e.target.value })
										}
										placeholder="Full-time, Internship, etc."
									/>
								</div>
								<div>
									<Label>Category</Label>
									<Input
										value={formData.category}
										onChange={(e) =>
											setFormData({ ...formData, category: e.target.value })
										}
									/>
								</div>
							</div>
							<div>
								<Label>Startup/Company</Label>
								<Input
									value={formData.startup}
									onChange={(e) =>
										setFormData({ ...formData, startup: e.target.value })
									}
								/>
							</div>
							<div>
								<Label>Details</Label>
								<Textarea
									value={formData.details}
									onChange={(e) =>
										setFormData({ ...formData, details: e.target.value })
									}
								/>
							</div>
							<div>
								<Label>Requirements (one per line)</Label>
								<Textarea
									value={formData.requirements}
									onChange={(e) =>
										setFormData({ ...formData, requirements: e.target.value })
									}
								/>
							</div>
							<div>
								<Label>Benefits (one per line)</Label>
								<Textarea
									value={formData.benefits}
									onChange={(e) =>
										setFormData({ ...formData, benefits: e.target.value })
									}
								/>
							</div>
							<div>
								<Label>Location</Label>
								<Input
									value={formData.location}
									onChange={(e) =>
										setFormData({ ...formData, location: e.target.value })
									}
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label>Deadline</Label>
									<Input
										type="date"
										value={formData.deadline}
										onChange={(e) => {
											setFormData({ ...formData, deadline: e.target.value });
											setValidationError('');
										}}
									/>
								</div>
								<div>
									<Label>Published On</Label>
									<Input
										type="date"
										value={formData.publishedOn}
										onChange={(e) => {
											setFormData({ ...formData, publishedOn: e.target.value });
											setValidationError('');
										}}
									/>
								</div>
							</div>
							{validationError && (
								<div className="text-sm text-red-500 bg-red-50 p-2 rounded">
									{validationError}
								</div>
							)}
							<div>
								<Label>Application Link</Label>
								<Input
									type="url"
									value={formData.link}
									onChange={(e) =>
										setFormData({ ...formData, link: e.target.value })
									}
									placeholder="https://example.com/apply"
								/>
								<p className="text-xs text-muted-foreground mt-1">
									Optional: Link to external application form
								</p>
							</div>
							<div>
								<Label>Document</Label>
								<Input
									type="file"
									accept=""
									onChange={(e) =>
										setFormData({
											...formData,
											document: e.target.files?.[0] || null,
										})
									}
								/>
								{existingDocument && !formData.document && (
									<div className="flex items-center justify-between border rounded-lg p-2 bg-gray-50 mt-2">
										<div className="flex items-center gap-2">
											<FileText className="w-4 h-4 text-gray-600" />
											<span className="truncate max-w-[200px]">
												{existingDocument.split('/').pop()}
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
															`${BASE_URL}${existingDocument}`,
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
												onClick={() => setExistingDocument(null)}
											>
												<Trash2 className="w-4 h-4 text-red-600" />
											</button>
										</div>
									</div>
								)}
								{formData.document && (
									<div className="flex items-center justify-between border rounded-lg p-2 bg-gray-50 mt-2">
										<div className="flex items-center gap-2">
											<FileText className="w-4 h-4 text-gray-600" />
											<span className="truncate max-w-[200px]">
												{formData.document.name}
											</span>
										</div>
										<button
											type="button"
											className="p-1 rounded hover:bg-red-100 transition"
											onClick={() =>
												setFormData({ ...formData, document: null })
											}
										>
											<Trash2 className="w-4 h-4 text-red-600" />
										</button>
									</div>
								)}
								<p className="text-xs text-muted-foreground mt-1">
									Optional: Upload job description or application form (PDF, DOC, DOCX)
								</p>
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
								{actionLoading ? 'Saving...' : editingCareer ? 'Update' : 'Add'}
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{careers.map((career) => (
					<Card key={career._id}>
						<CardContent className="p-4">
							<div className="flex justify-between items-start gap-3">
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 mb-2 flex-wrap">
										<h3 className="font-bold text-lg line-clamp-2">
											{career.title}
										</h3>
										<Badge
											variant={
												career.status === 'published'
													? 'default'
													: 'secondary'
											}
											className="flex-shrink-0"
										>
											{career.status}
										</Badge>
									</div>
									<p className="text-sm text-muted-foreground line-clamp-3 mb-2">
										{career.details || career.body}
									</p>
									<div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
										{career.type && (
											<span className="whitespace-nowrap">
												Type: {career.type}
											</span>
										)}
										{career.category && (
											<span className="whitespace-nowrap">
												Category: {career.category}
											</span>
										)}
										{career.location && (
											<span className="whitespace-nowrap">
												Location: {career.location}
											</span>
										)}
									</div>
								</div>
								<div className="flex gap-2 flex-shrink-0">
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleEdit(career)}
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
												<AlertDialogTitle>Delete Career?</AlertDialogTitle>
												<AlertDialogDescription>
													This action cannot be undone.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction
													onClick={() => handleDelete(career._id)}
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
				{careers.length === 0 && (
					<div className="text-center text-muted-foreground py-8 col-span-full">
						No careers found
					</div>
				)}
			</div>
		</div>
	);
}
