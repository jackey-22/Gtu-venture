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
import { Plus, Edit, Trash2 } from 'lucide-react';

interface InitiativeType {
	_id: string;
	title: string;
	body?: string;
	outcomes?: string;
	caseStudy?: string;
	status: 'draft' | 'published' | 'archived';
}

export default function InitiativesCRUD() {
	const [initiatives, setInitiatives] = useState<InitiativeType[]>([]);
	const [loading, setLoading] = useState(true);
	const [actionLoading, setActionLoading] = useState(false);
	const [editingInitiative, setEditingInitiative] = useState<InitiativeType | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [formData, setFormData] = useState({
		title: '',
		body: '',
		outcomes: '',
		caseStudy: '',
		status: 'draft' as 'draft' | 'published' | 'archived',
	});

	useEffect(() => {
		fetchInitiatives();
	}, []);

	const fetchInitiatives = async () => {
		setLoading(true);
		try {
			const data = await fetchGet({ pathName: 'admin/get-initiatives' });
			setInitiatives(Array.isArray(data) ? data : []);
		} catch (error) {
			console.error('Error fetching initiatives:', error);
			alert('Failed to fetch initiatives');
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setActionLoading(true);
		try {
			const pathName = editingInitiative
				? `admin/update-initiative/${editingInitiative._id}`
				: 'admin/add-initiative';
			const data = await fetchPost({ pathName, body: JSON.stringify(formData) });
			if (data?.message?.toLowerCase().includes('success')) {
				alert(
					editingInitiative
						? 'Initiative updated successfully'
						: 'Initiative added successfully'
				);
				setIsDialogOpen(false);
				resetForm();
				await fetchInitiatives();
			} else {
				alert(data?.message || 'Something went wrong');
			}
		} catch (error) {
			console.error('Error saving initiative:', error);
			alert('Failed to save initiative');
		} finally {
			setActionLoading(false);
		}
	};

	const handleEdit = (initiative: InitiativeType) => {
		setEditingInitiative(initiative);
		setFormData({
			title: initiative.title || '',
			body: initiative.body || '',
			outcomes: initiative.outcomes || '',
			caseStudy: initiative.caseStudy || '',
			status: initiative.status,
		});
		setIsDialogOpen(true);
	};

	const handleDelete = async (id: string) => {
		setActionLoading(true);
		try {
			const data = await fetchPost({
				pathName: `admin/delete-initiative/${id}`,
				body: JSON.stringify({}),
			});
			if (data?.message?.toLowerCase().includes('deleted')) {
				alert('Initiative deleted successfully');
				await fetchInitiatives();
			} else {
				alert(data?.message || 'Failed to delete initiative');
			}
		} catch (error) {
			console.error('Error deleting initiative:', error);
			alert('Failed to delete initiative');
		} finally {
			setActionLoading(false);
		}
	};

	const resetForm = () => {
		setEditingInitiative(null);
		setFormData({
			title: '',
			body: '',
			outcomes: '',
			caseStudy: '',
			status: 'draft',
		});
	};

	if (loading || actionLoading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
					<p className="mt-3 text-primary">Loading Initiatives...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Initiatives Management</h2>
					<p className="text-muted-foreground">Manage All Initiatives</p>
				</div>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={resetForm}>
							<Plus className="w-4 h-4 mr-2" />
							Add Initiative
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>
								{editingInitiative ? 'Edit Initiative' : 'Add Initiative'}
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
								<Label>Body/Description</Label>
								<Textarea
									value={formData.body}
									onChange={(e) =>
										setFormData({ ...formData, body: e.target.value })
									}
								/>
							</div>
							<div>
								<Label>Outcomes</Label>
								<Textarea
									value={formData.outcomes}
									onChange={(e) =>
										setFormData({ ...formData, outcomes: e.target.value })
									}
									placeholder="Key outcomes and achievements"
								/>
							</div>
							<div>
								<Label>Case Study</Label>
								<Textarea
									value={formData.caseStudy}
									onChange={(e) =>
										setFormData({ ...formData, caseStudy: e.target.value })
									}
									placeholder="Case study or success story"
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
								{actionLoading ? 'Saving...' : editingInitiative ? 'Update' : 'Add'}
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{initiatives.map((initiative) => (
					<Card key={initiative._id}>
						<CardContent className="p-4">
							<div className="flex justify-between items-start gap-3">
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 mb-2 flex-wrap">
										<h3 className="font-bold text-lg line-clamp-2">
											{initiative.title}
										</h3>
										<Badge
											variant={
												initiative.status === 'published'
													? 'default'
													: 'secondary'
											}
											className="flex-shrink-0"
										>
											{initiative.status}
										</Badge>
									</div>
									<p className="text-sm text-muted-foreground line-clamp-3 mb-2">
										{initiative.body}
									</p>
									{initiative.outcomes && (
										<div className="mt-2">
											<strong className="text-sm">Outcomes:</strong>
											<p className="text-sm text-muted-foreground line-clamp-2">
												{initiative.outcomes}
											</p>
										</div>
									)}
									{initiative.caseStudy && (
										<div className="mt-2">
											<strong className="text-sm">Case Study:</strong>
											<p className="text-sm text-muted-foreground line-clamp-2">
												{initiative.caseStudy}
											</p>
										</div>
									)}
								</div>
								<div className="flex gap-2 flex-shrink-0">
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleEdit(initiative)}
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
													Delete Initiative?
												</AlertDialogTitle>
												<AlertDialogDescription>
													This action cannot be undone.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction
													onClick={() => handleDelete(initiative._id)}
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
				{initiatives.length === 0 && (
					<div className="text-center text-muted-foreground py-8 col-span-full">
						No initiatives found
					</div>
				)}
			</div>
		</div>
	);
}
