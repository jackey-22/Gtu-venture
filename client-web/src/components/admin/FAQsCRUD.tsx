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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Plus, Edit, Trash2, HelpCircle } from 'lucide-react';

interface FAQType {
	_id: string;
	question: string;
	answer: string;
	status: 'draft' | 'published' | 'archived';
	priority: number;
}

export default function FAQsCRUD() {
	const [faqs, setFaqs] = useState<FAQType[]>([]);
	const [loading, setLoading] = useState(true);
	const [actionLoading, setActionLoading] = useState(false);
	const [editingFaq, setEditingFaq] = useState<FAQType | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [formData, setFormData] = useState({
		question: '',
		answer: '',
		status: 'draft',
		priority: 1,
	});

	useEffect(() => {
		fetchFAQs();
	}, []);

	const fetchFAQs = async () => {
		setLoading(true);
		try {
			const data = await fetchGet({ pathName: 'admin/get-faqs' });
			setFaqs(Array.isArray(data) ? data : []);
		} catch (error) {
			console.error('Error fetching FAQs:', error);
			alert('Failed to fetch FAQs');
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setActionLoading(true);

		try {
			const payload = {
				question: formData.question,
				answer: formData.answer,
				status: formData.status,
				priority: Number(formData.priority),
			};

			const pathName = editingFaq ? `admin/update-faq/${editingFaq._id}` : 'admin/add-faq';

			const data = await fetchPost({
				pathName,
				body: JSON.stringify(payload),
			});

			if (data?.message?.toLowerCase().includes('success')) {
				alert(editingFaq ? 'FAQ updated successfully' : 'FAQ added successfully');
				setIsDialogOpen(false);
				resetForm();
				await fetchFAQs();
			} else {
				alert(data?.message || 'Something went wrong');
			}
		} catch (error) {
			console.error('Error saving FAQ:', error);
			alert('Failed to save FAQ');
		} finally {
			setActionLoading(false);
		}
	};

	const handleEdit = (faq: FAQType) => {
		setEditingFaq(faq);
		setFormData({
			question: faq.question,
			answer: faq.answer,
			status: faq.status,
			priority: faq.priority,
		});
		setIsDialogOpen(true);
	};

	const handleDelete = async (id: string) => {
		setActionLoading(true);
		try {
			const data = await fetchPost({
				pathName: `admin/delete-faq/${id}`,
				body: JSON.stringify({}),
			});

			if (data?.message?.toLowerCase().includes('deleted')) {
				alert('FAQ deleted successfully');
				await fetchFAQs();
			} else {
				alert(data?.message || 'Failed to delete FAQ');
			}
		} catch (error) {
			console.error('Error deleting FAQ:', error);
			alert('Failed to delete FAQ');
		} finally {
			setActionLoading(false);
		}
	};

	const resetForm = () => {
		setEditingFaq(null);
		setFormData({
			question: '',
			answer: '',
			status: 'draft',
			priority: 1,
		});
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'published':
				return 'bg-green-100 text-green-800';
			case 'draft':
				return 'bg-yellow-100 text-yellow-800';
			case 'archived':
				return 'bg-gray-100 text-gray-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">FAQs Management</h2>
					<p className="text-muted-foreground">Manage frequently asked questions</p>
				</div>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={resetForm}>
							<Plus className="w-4 h-4 mr-2" /> Add FAQ
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>{editingFaq ? 'Edit FAQ' : 'Add New FAQ'}</DialogTitle>
						</DialogHeader>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="question">Question *</Label>
								<Input
									id="question"
									value={formData.question}
									onChange={(e) =>
										setFormData({ ...formData, question: e.target.value })
									}
									required
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="answer">Answer *</Label>
								<Textarea
									id="answer"
									rows={6}
									value={formData.answer}
									onChange={(e) =>
										setFormData({ ...formData, answer: e.target.value })
									}
									required
								/>
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

							<div className="space-y-2">
								<Label htmlFor="priority">Priority *</Label>
								<Input
									id="priority"
									type="number"
									min={1}
									value={formData.priority}
									onChange={(e) =>
										setFormData({
											...formData,
											priority:
												e.target.value === '' ? '' : Number(e.target.value),
										})
									}
									required
								/>
								<p className="text-xs text-gray-400">1 = highest priority</p>
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
										: editingFaq
										? 'Update FAQ'
										: 'Create FAQ'}
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
						<p className="mt-3 text-primary">Loading FAQs...</p>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{faqs.length > 0 ? (
						faqs.map((faq) => (
							<div
								key={faq._id}
								className="border rounded-md shadow p-4 bg-white space-y-3 px-5 flex flex-col h-full"
							>
								<div className="flex justify-between items-start mb-2">
									<div className="flex items-center gap-2 text-lg font-semibold">
										<span className="text-gray-500">#{faq.priority}</span>
									</div>
									<div className="flex items-center gap-2">
										<Button
											variant="outline"
											size="sm"
											onClick={() => handleEdit(faq)}
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
													<AlertDialogTitle>Delete FAQ</AlertDialogTitle>
													<AlertDialogDescription>
														Are you sure you want to delete this FAQ?
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>Cancel</AlertDialogCancel>
													<AlertDialogAction
														onClick={() => handleDelete(faq._id)}
													>
														Delete
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>
									</div>
								</div>

								<div className="space-y-3 flex-1">
									<p className="text-gray-900 font-semibold line-clamp-2">
										{faq.question}
									</p>
									<p className="text-gray-500 line-clamp-2">{faq.answer}</p>
								</div>

								<div className="mt-3">
									<Badge className={getStatusColor(faq.status)}>
										{faq.status}
									</Badge>
								</div>
							</div>
						))
					) : (
						<div className="text-center py-12 col-span-full">
							<HelpCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
							<p className="text-muted-foreground">
								No FAQs found. Create your first FAQ!
							</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
