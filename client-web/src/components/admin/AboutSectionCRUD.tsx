import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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

interface AboutSection {
	_id: string;
	title: string;
	description: string;
	description2?: string;
	image?: string;
	statCardValue?: string;
	statCardLabel?: string;
	buttonText?: string;
	buttonLink?: string;
	isActive: boolean;
}

export default function AboutSectionCRUD() {
	const [sections, setSections] = useState<AboutSection[]>([]);
	const [loading, setLoading] = useState(true);
	const [actionLoading, setActionLoading] = useState(false);
	const [editingSection, setEditingSection] = useState<AboutSection | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [existingImage, setExistingImage] = useState<string | null>(null);

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		description2: '',
		image: null as File | null,
		statCardValue: '',
		statCardLabel: '',
		buttonText: '',
		buttonLink: '',
		isActive: true,
	});

	const BASE_URL = import.meta.env.VITE_URL;

	useEffect(() => {
		fetchSections();
	}, []);

	const fetchSections = async () => {
		setLoading(true);
		try {
			const data = await fetchGet({ pathName: 'admin/get-about-sections' });
			setSections(data || []);
		} catch (error) {
			console.error('Error fetching about sections:', error);
		} finally {
			setLoading(false);
		}
	};

	const resetForm = () => {
		setEditingSection(null);
		setExistingImage(null);
		setFormData({
			title: '',
			description: '',
			description2: '',
			image: null,
			statCardValue: '',
			statCardLabel: '',
			buttonText: '',
			buttonLink: '',
			isActive: true,
		});
	};

	const handleEdit = (section: AboutSection) => {
		setEditingSection(section);
		setExistingImage(section.image || null);
		setFormData({
			title: section.title,
			description: section.description,
			description2: section.description2 || '',
			image: null,
			statCardValue: section.statCardValue || '',
			statCardLabel: section.statCardLabel || '',
			buttonText: section.buttonText || '',
			buttonLink: section.buttonLink || '',
			isActive: section.isActive,
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
			if (formData.description2) payload.append('description2', formData.description2);
			payload.append('statCardValue', formData.statCardValue);
			payload.append('statCardLabel', formData.statCardLabel);
			payload.append('buttonText', formData.buttonText);
			payload.append('buttonLink', formData.buttonLink);
			payload.append('isActive', formData.isActive.toString());

			if (formData.image) {
				payload.append('image', formData.image);
			}

			if (editingSection && existingImage) {
				payload.append('existingImage', existingImage);
			}

			const url = editingSection
				? `${BASE_URL}admin/update-about-section/${editingSection._id}`
				: `${BASE_URL}admin/add-about-section`;

			const res = await fetch(url, {
				method: 'POST',
				body: payload,
				headers: { Authorization: `Bearer ${token}` },
			});

			const data = await res.json();
			if (res.ok) {
				alert(
					editingSection
						? 'About section updated successfully'
						: 'About section created successfully'
				);
				setIsDialogOpen(false);
				resetForm();
				await fetchSections();
			} else {
				alert(data.message || 'Something went wrong');
			}
		} catch (error) {
			console.error('Error saving about section:', error);
			alert('Failed to save about section');
		} finally {
			setActionLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		setActionLoading(true);
		try {
			const token = localStorage.getItem('token');
			const res = await fetch(`${BASE_URL}admin/delete-about-section/${id}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${token}` },
			});
			if (res.ok) {
				fetchSections();
				alert('About section deleted successfully');
			} else {
				alert('Failed to delete about section');
			}
		} catch (error) {
			console.error('Error deleting about section:', error);
			alert('Failed to delete about section');
		} finally {
			setActionLoading(false);
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">About Section Management</h2>
					<p className="text-muted-foreground">Manage about section content</p>
				</div>

				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={resetForm}>
							<Plus className="w-4 h-4 mr-2" /> Add About Section
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>
								{editingSection ? 'Edit About Section' : 'Add About Section'}
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

							<div className="space-y-2">
								<Label>Description 2</Label>
								<Textarea
									rows={4}
									value={formData.description2}
									onChange={(e) =>
										setFormData({ ...formData, description2: e.target.value })
									}
								/>
							</div>

							<div className="space-y-2">
								<Label>Image</Label>
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
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label>Stat Card Value</Label>
									<Input
										value={formData.statCardValue}
										onChange={(e) =>
											setFormData({
												...formData,
												statCardValue: e.target.value,
											})
										}
									/>
								</div>
								<div className="space-y-2">
									<Label>Stat Card Label</Label>
									<Input
										value={formData.statCardLabel}
										onChange={(e) =>
											setFormData({
												...formData,
												statCardLabel: e.target.value,
											})
										}
									/>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label>Button Text</Label>
									<Input
										value={formData.buttonText}
										onChange={(e) =>
											setFormData({ ...formData, buttonText: e.target.value })
										}
									/>
								</div>
								<div className="space-y-2">
									<Label>Button Link</Label>
									<Input
										value={formData.buttonLink}
										onChange={(e) =>
											setFormData({ ...formData, buttonLink: e.target.value })
										}
									/>
								</div>
							</div>

							<div className="flex items-center space-x-2">
								<input
									type="checkbox"
									id="isActive"
									checked={formData.isActive}
									onChange={(e) =>
										setFormData({ ...formData, isActive: e.target.checked })
									}
									className="rounded"
								/>
								<Label htmlFor="isActive">
									Active (only one can be active at a time)
								</Label>
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
										: editingSection
										? 'Update'
										: 'Create'}{' '}
									Section
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
						<p className="mt-3 text-primary">Loading About Sections...</p>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{sections.map((section) => (
						<Card key={section._id}>
							<CardContent className="p-4">
								<div className="flex flex-col gap-3">
									{section.image && (
										<img
											src={section.image}
											alt={section.title}
											className="w-full h-32 object-cover rounded"
										/>
									)}
									<div className="flex justify-between items-start gap-3">
										<div className="flex-1 min-w-0">
											<div className="flex items-center gap-2 mb-2 flex-wrap">
												<h3 className="font-bold text-lg line-clamp-2">
													{section.title}
												</h3>
												{section.isActive && (
													<Badge
														variant="default"
														className="flex-shrink-0"
													>
														Active
													</Badge>
												)}
											</div>
											<p className="text-sm text-muted-foreground line-clamp-3 mb-2">
												{section.description}
											</p>
											{section.statCardValue && (
												<p className="text-xs text-muted-foreground">
													{section.statCardValue} {section.statCardLabel}
												</p>
											)}
										</div>
										<div className="flex gap-2 flex-shrink-0">
											<Button
												variant="outline"
												size="sm"
												onClick={() => handleEdit(section)}
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
															Delete Section?
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
																handleDelete(section._id)
															}
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

					{sections.length === 0 && (
						<div className="text-center text-muted-foreground py-8 col-span-full">
							No about sections found
						</div>
					)}
				</div>
			)}
		</div>
	);
}
