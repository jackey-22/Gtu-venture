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

interface ProgramHighlight {
	_id: string;
	title: string;
	description: string;
	icon: string;
	color?: string;
	link?: string;
	order: number;
	status: 'draft' | 'published' | 'archived';
}

export default function ProgramHighlightsCRUD() {
	const [highlights, setHighlights] = useState<ProgramHighlight[]>([]);
	const [loading, setLoading] = useState(true);
	const [actionLoading, setActionLoading] = useState(false);
	const [editingHighlight, setEditingHighlight] = useState<ProgramHighlight | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		icon: '',
		color: 'bg-primary/10 text-primary',
		link: '',
		order: 0,
		status: 'published' as 'draft' | 'published' | 'archived',
	});

	useEffect(() => {
		fetchHighlights();
	}, []);

	const fetchHighlights = async () => {
		setLoading(true);
		try {
			const data = await fetchGet({ pathName: 'admin/get-program-highlights' });
			setHighlights(data || []);
		} catch (error) {
			console.error('Error fetching program highlights:', error);
		} finally {
			setLoading(false);
		}
	};

	const resetForm = () => {
		setEditingHighlight(null);
		setFormData({
			title: '',
			description: '',
			icon: '',
			color: 'bg-primary/10 text-primary',
			link: '',
			order: 0,
			status: 'published',
		});
	};

	const handleEdit = (highlight: ProgramHighlight) => {
		setEditingHighlight(highlight);
		setFormData({
			title: highlight.title,
			description: highlight.description,
			icon: highlight.icon,
			color: highlight.color || 'bg-primary/10 text-primary',
			link: highlight.link || '',
			order: highlight.order,
			status: highlight.status,
		});
		setIsDialogOpen(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setActionLoading(true);

		try {
			const payload = {
				...formData,
				order: Number(formData.order),
			};

			const pathName = editingHighlight
				? `admin/update-program-highlight/${editingHighlight._id}`
				: 'admin/add-program-highlight';

			const data = await fetchPost({
				pathName,
				body: JSON.stringify(payload),
			});

			if (data?.message?.toLowerCase().includes('success')) {
				alert(
					editingHighlight
						? 'Program highlight updated successfully'
						: 'Program highlight created successfully'
				);
				setIsDialogOpen(false);
				resetForm();
				await fetchHighlights();
			} else {
				alert(data?.message || 'Something went wrong');
			}
		} catch (error) {
			console.error('Error saving program highlight:', error);
			alert('Failed to save program highlight');
		} finally {
			setActionLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		setActionLoading(true);
		try {
			const BASE_URL = import.meta.env.VITE_URL;
			const token = localStorage.getItem('token');
			const res = await fetch(`${BASE_URL}admin/delete-program-highlight/${id}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${token}` },
			});
			if (res.ok) {
				fetchHighlights();
				alert('Program highlight deleted successfully');
			} else {
				alert('Failed to delete program highlight');
			}
		} catch (error) {
			console.error('Error deleting program highlight:', error);
			alert('Failed to delete program highlight');
		} finally {
			setActionLoading(false);
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Program Highlights Management</h2>
					<p className="text-muted-foreground">Manage program highlights displayed on home page</p>
				</div>

				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={resetForm}>
							<Plus className="w-4 h-4 mr-2" /> Add Highlight
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>
								{editingHighlight ? 'Edit Program Highlight' : 'Add Program Highlight'}
							</DialogTitle>
						</DialogHeader>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-2">
								<Label>Title *</Label>
								<Input
									required
									value={formData.title}
									onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
									<Label>Icon Name (Lucide) *</Label>
									<Input
										required
										value={formData.icon}
										onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
										placeholder="e.g., TrendingUp, Award, Rocket"
									/>
									<p className="text-xs text-muted-foreground">
										Use Lucide icon names (e.g., TrendingUp, Award, Rocket)
									</p>
								</div>
								<div className="space-y-2">
									<Label>Color Classes</Label>
									<Input
										value={formData.color}
										onChange={(e) => setFormData({ ...formData, color: e.target.value })}
										placeholder="bg-primary/10 text-primary"
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label>Link (optional)</Label>
								<Input
									value={formData.link}
									onChange={(e) => setFormData({ ...formData, link: e.target.value })}
									placeholder="/programs"
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label>Order</Label>
									<Input
										type="number"
										value={formData.order}
										onChange={(e) =>
											setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
										}
									/>
								</div>
								<div className="space-y-2">
									<Label>Status</Label>
									<Select
										value={formData.status}
										onValueChange={(value: 'draft' | 'published' | 'archived') =>
											setFormData({ ...formData, status: value })
										}
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
									{actionLoading ? 'Saving...' : editingHighlight ? 'Update' : 'Create'}{' '}
									Highlight
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{highlights.map((highlight) => (
					<Card key={highlight._id}>
						<CardContent className="p-4">
							<div className="flex justify-between items-start gap-3">
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 mb-2 flex-wrap">
										<h3 className="font-bold text-lg line-clamp-2">{highlight.title}</h3>
										<Badge
											variant={highlight.status === 'published' ? 'default' : 'secondary'}
										>
											{highlight.status}
										</Badge>
									</div>
									<p className="text-sm text-muted-foreground line-clamp-3 mb-2">
										{highlight.description}
									</p>
									<div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
										<span>Icon: {highlight.icon}</span>
										<span>•</span>
										<span>Order: {highlight.order}</span>
									</div>
								</div>
								<div className="flex gap-2 flex-shrink-0">
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleEdit(highlight)}
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
												<AlertDialogTitle>Delete Highlight?</AlertDialogTitle>
												<AlertDialogDescription>
													This action cannot be undone.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction onClick={() => handleDelete(highlight._id)}>
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
				{highlights.length === 0 && (
					<div className="text-center text-muted-foreground py-8 col-span-full">
						No program highlights found
					</div>
				)}
			</div>
		</div>
	);
}
