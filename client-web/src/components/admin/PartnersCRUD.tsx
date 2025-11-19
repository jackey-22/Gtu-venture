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
import { Plus, Edit, Trash2, Upload } from 'lucide-react';

const baseURL = import.meta.env.VITE_URL;

interface PartnerType {
	_id: string;
	name: string;
	logo?: string;
	description?: string;
	website?: string;
	type?: string;
	focus?: string;
	category: 'funding' | 'strategic' | 'corporate' | 'academic' | 'csr';
	status: 'draft' | 'published' | 'archived';
}

export default function PartnersCRUD() {
	const [partners, setPartners] = useState<PartnerType[]>([]);
	const [loading, setLoading] = useState(true);
	const [actionLoading, setActionLoading] = useState(false);
	const [editingPartner, setEditingPartner] = useState<PartnerType | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		logo: '',
		description: '',
		website: '',
		type: '',
		focus: '',
		category: 'funding' as 'funding' | 'strategic' | 'corporate' | 'academic' | 'csr',
		status: 'draft' as 'draft' | 'published' | 'archived',
	});
	const [logoFile, setLogoFile] = useState<File | null>(null);

	useEffect(() => {
		fetchPartners();
	}, []);

	const fetchPartners = async () => {
		setLoading(true);
		try {
			const data = await fetchGet({ pathName: 'admin/get-partners' });
			setPartners(Array.isArray(data) ? data : []);
		} catch (error) {
			console.error('Error fetching partners:', error);
			alert('Failed to fetch partners');
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
				if (key !== 'logo' && value !== null && value !== undefined) {
					formDataToSend.append(key, value as string);
				}
			});
			if (logoFile) {
				formDataToSend.append('logo', logoFile);
			} else if (formData.logo && editingPartner) {
				// Keep existing logo path if no new file
				formDataToSend.append('logo', formData.logo);
			}

			const pathName = editingPartner
				? `admin/update-partner/${editingPartner._id}`
				: 'admin/add-partner';
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
					editingPartner ? 'Partner updated successfully' : 'Partner added successfully'
				);
				setIsDialogOpen(false);
				resetForm();
				await fetchPartners();
			} else {
				alert(data?.message || 'Something went wrong');
			}
		} catch (error) {
			console.error('Error saving partner:', error);
			alert('Failed to save partner');
		} finally {
			setActionLoading(false);
		}
	};

	const handleEdit = (partner: PartnerType) => {
		setEditingPartner(partner);
		setFormData({
			name: partner.name || '',
			logo: partner.logo || '',
			description: partner.description || '',
			website: partner.website || '',
			type: partner.type || '',
			focus: partner.focus || '',
			category: partner.category,
			status: partner.status,
		});
		setLogoFile(null);
		setIsDialogOpen(true);
	};

	const handleDelete = async (id: string) => {
		setActionLoading(true);
		try {
			const data = await fetchPost({
				pathName: `admin/delete-partner/${id}`,
				body: JSON.stringify({}),
				method: 'DELETE',
			});
			if (data?.message?.toLowerCase().includes('deleted')) {
				alert('Partner deleted successfully');
				await fetchPartners();
			} else {
				alert(data?.message || 'Failed to delete partner');
			}
		} catch (error) {
			console.error('Error deleting partner:', error);
			alert('Failed to delete partner');
		} finally {
			setActionLoading(false);
		}
	};

	const resetForm = () => {
		setEditingPartner(null);
		setFormData({
			name: '',
			logo: '',
			description: '',
			website: '',
			type: '',
			focus: '',
			category: 'funding',
			status: 'draft',
		});
		setLogoFile(null);
	};

	if (loading || actionLoading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
					<p className="mt-3 text-primary">Loading Partners...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Partners Management</h2>
					<p className="text-muted-foreground">Manage All Partners</p>
				</div>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={resetForm}>
							<Plus className="w-4 h-4 mr-2" />
							Add Partner
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>
								{editingPartner ? 'Edit Partner' : 'Add Partner'}
							</DialogTitle>
						</DialogHeader>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<Label>Name *</Label>
								<Input
									value={formData.name}
									onChange={(e) =>
										setFormData({ ...formData, name: e.target.value })
									}
									required
								/>
							</div>
							<div>
								<Label>Category *</Label>
								<Select
									value={formData.category}
									onValueChange={(value: any) =>
										setFormData({ ...formData, category: value })
									}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="funding">Funding</SelectItem>
										<SelectItem value="strategic">Strategic</SelectItem>
										<SelectItem value="corporate">Corporate</SelectItem>
										<SelectItem value="academic">Academic</SelectItem>
										<SelectItem value="csr">CSR</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div>
								<Label>Logo</Label>
								{logoFile ? (
									<div className="flex items-center gap-2">
										<span className="text-sm">{logoFile.name}</span>
										<Button
											type="button"
											variant="outline"
											size="sm"
											onClick={() => setLogoFile(null)}
										>
											Remove
										</Button>
									</div>
								) : (
									<div className="flex items-center gap-2">
										<Input
											type="file"
											accept="image/*"
											onChange={(e) =>
												setLogoFile(e.target.files?.[0] || null)
											}
											className="cursor-pointer"
										/>
										{formData.logo && (
											<img
												src={`${baseURL}${formData.logo.replace(
													/\\/g,
													'/'
												)}`}
												alt="Current logo"
												className="w-16 h-16 object-contain"
											/>
										)}
									</div>
								)}
							</div>
							<div>
								<Label>Description</Label>
								<Textarea
									value={formData.description}
									onChange={(e) =>
										setFormData({ ...formData, description: e.target.value })
									}
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label>Website</Label>
									<Input
										value={formData.website}
										onChange={(e) =>
											setFormData({ ...formData, website: e.target.value })
										}
									/>
								</div>
								<div>
									<Label>Type</Label>
									<Input
										value={formData.type}
										onChange={(e) =>
											setFormData({ ...formData, type: e.target.value })
										}
										placeholder="Government, Corporate, etc."
									/>
								</div>
							</div>
							<div>
								<Label>Focus</Label>
								<Input
									value={formData.focus}
									onChange={(e) =>
										setFormData({ ...formData, focus: e.target.value })
									}
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
								{actionLoading ? 'Saving...' : editingPartner ? 'Update' : 'Add'}
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{partners.map((partner) => (
					<Card key={partner._id} className="hover:shadow-md transition rounded-xl">
						<CardContent className="p-4">
							<div className="flex justify-between items-start gap-3">
								<div className="flex gap-3 flex-1 min-w-0">
									{partner.logo && (
										<img
											src={`${baseURL}${partner.logo.replace(/\\/g, '/')}`}
											alt={partner.name}
											className="w-14 h-14 object-cover rounded-lg border flex-shrink-0"
										/>
									)}

									<div className="flex flex-col flex-1 min-w-0">
										<div className="flex items-center gap-2 mb-2 flex-wrap">
											<h3 className="font-bold text-lg line-clamp-2">
												{partner.name}
											</h3>
											<Badge
												variant={
													partner.status === 'published'
														? 'default'
														: 'secondary'
												}
												className="flex-shrink-0"
											>
												{partner.status}
											</Badge>
										</div>

										<p className="text-sm text-muted-foreground line-clamp-3 mb-2">
											{partner.description || 'No description available'}
										</p>

										<div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
											{partner.type && (
												<span className="whitespace-nowrap">
													Type: {partner.type}
												</span>
											)}
											{partner.focus && (
												<span className="whitespace-nowrap">
													Focus: {partner.focus}
												</span>
											)}
											<Badge
												variant="outline"
												className="text-xs flex-shrink-0"
											>
												{partner.category}
											</Badge>
										</div>
									</div>
								</div>

								<div className="flex gap-2 flex-shrink-0">
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleEdit(partner)}
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
												<AlertDialogTitle>Delete Partner?</AlertDialogTitle>
												<AlertDialogDescription>
													This action cannot be undone.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction
													onClick={() => handleDelete(partner._id)}
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

				{partners.length === 0 && (
					<div className="text-center text-muted-foreground py-8 col-span-full">
						No partners found
					</div>
				)}
			</div>
		</div>
	);
}
