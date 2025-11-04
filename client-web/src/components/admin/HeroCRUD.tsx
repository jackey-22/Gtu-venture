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

interface Hero {
	_id: string;
	title: string;
	subtitle?: string;
	description: string;
	primaryButtonText?: string;
	primaryButtonLink?: string;
	secondaryButtonText?: string;
	secondaryButtonLink?: string;
	isActive: boolean;
}

export default function HeroCRUD() {
	const [heroes, setHeroes] = useState<Hero[]>([]);
	const [loading, setLoading] = useState(true);
	const [actionLoading, setActionLoading] = useState(false);
	const [editingHero, setEditingHero] = useState<Hero | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const [formData, setFormData] = useState({
		title: '',
		subtitle: '',
		description: '',
		primaryButtonText: '',
		primaryButtonLink: '',
		secondaryButtonText: '',
		secondaryButtonLink: '',
		isActive: true,
	});

	useEffect(() => {
		fetchHeroes();
	}, []);

	const fetchHeroes = async () => {
		setLoading(true);
		try {
			const data = await fetchGet({ pathName: 'admin/get-heroes' });
			setHeroes(data || []);
		} catch (error) {
			console.error('Error fetching heroes:', error);
		} finally {
			setLoading(false);
		}
	};

	const resetForm = () => {
		setEditingHero(null);
		setFormData({
			title: '',
			subtitle: '',
			description: '',
			primaryButtonText: '',
			primaryButtonLink: '',
			secondaryButtonText: '',
			secondaryButtonLink: '',
			isActive: true,
		});
	};

	const handleEdit = (hero: Hero) => {
		setEditingHero(hero);
		setFormData({
			title: hero.title,
			subtitle: hero.subtitle || '',
			description: hero.description,
			primaryButtonText: hero.primaryButtonText || '',
			primaryButtonLink: hero.primaryButtonLink || '',
			secondaryButtonText: hero.secondaryButtonText || '',
			secondaryButtonLink: hero.secondaryButtonLink || '',
			isActive: hero.isActive,
		});
		setIsDialogOpen(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setActionLoading(true);

		try {
			const payload = {
				...formData,
			};

			const pathName = editingHero
				? `admin/update-hero/${editingHero._id}`
				: 'admin/add-hero';

			const data = await fetchPost({
				pathName,
				body: JSON.stringify(payload),
			});

			if (data?.message?.toLowerCase().includes('success')) {
				alert(editingHero ? 'Hero updated successfully' : 'Hero created successfully');
				setIsDialogOpen(false);
				resetForm();
				await fetchHeroes();
			} else {
				alert(data?.message || 'Something went wrong');
			}
		} catch (error) {
			console.error('Error saving hero:', error);
			alert('Failed to save hero');
		} finally {
			setActionLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		setActionLoading(true);
		try {
			const BASE_URL = import.meta.env.VITE_URL;
			const token = localStorage.getItem('token');
			const res = await fetch(`${BASE_URL}admin/delete-hero/${id}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${token}` },
			});
			if (res.ok) {
				fetchHeroes();
				alert('Hero deleted successfully');
			} else {
				alert('Failed to delete hero');
			}
		} catch (error) {
			console.error('Error deleting hero:', error);
			alert('Failed to delete hero');
		} finally {
			setActionLoading(false);
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Hero Section Management</h2>
					<p className="text-muted-foreground">Manage hero section content</p>
				</div>

				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={resetForm}>
							<Plus className="w-4 h-4 mr-2" /> Add Hero
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>{editingHero ? 'Edit Hero' : 'Add Hero'}</DialogTitle>
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
								<Label>Subtitle</Label>
								<Input
									value={formData.subtitle}
									onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
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
									<Label>Primary Button Text</Label>
									<Input
										value={formData.primaryButtonText}
										onChange={(e) =>
											setFormData({ ...formData, primaryButtonText: e.target.value })
										}
									/>
								</div>
								<div className="space-y-2">
									<Label>Primary Button Link</Label>
									<Input
										value={formData.primaryButtonLink}
										onChange={(e) =>
											setFormData({ ...formData, primaryButtonLink: e.target.value })
										}
									/>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label>Secondary Button Text</Label>
									<Input
										value={formData.secondaryButtonText}
										onChange={(e) =>
											setFormData({ ...formData, secondaryButtonText: e.target.value })
										}
									/>
								</div>
								<div className="space-y-2">
									<Label>Secondary Button Link</Label>
									<Input
										value={formData.secondaryButtonLink}
										onChange={(e) =>
											setFormData({ ...formData, secondaryButtonLink: e.target.value })
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
								<Label htmlFor="isActive">Active (only one can be active at a time)</Label>
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
									{actionLoading ? 'Saving...' : editingHero ? 'Update' : 'Create'} Hero
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{heroes.map((hero) => (
					<Card key={hero._id}>
						<CardContent className="p-4">
							<div className="flex justify-between items-start gap-3">
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 mb-2 flex-wrap">
										<h3 className="font-bold text-lg line-clamp-2">{hero.title}</h3>
										{hero.isActive && (
											<Badge variant="default" className="flex-shrink-0">
												Active
											</Badge>
										)}
									</div>
									<p className="text-sm text-muted-foreground line-clamp-3 mb-2">
										{hero.description}
									</p>
								</div>
								<div className="flex gap-2 flex-shrink-0">
									<Button variant="outline" size="sm" onClick={() => handleEdit(hero)}>
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
												<AlertDialogTitle>Delete Hero?</AlertDialogTitle>
												<AlertDialogDescription>
													This action cannot be undone.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction onClick={() => handleDelete(hero._id)}>
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
				{heroes.length === 0 && (
					<div className="text-center text-muted-foreground py-8 col-span-full">
						No hero sections found
					</div>
				)}
			</div>
		</div>
	);
}
