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
import { Plus, Edit, Trash2, Eye, FileText } from 'lucide-react';
import { log } from 'console';

interface Startup {
	_id: string;
	name: string;
	description: string;
	founderName: string[];
	sector?: string;
	stage?: string;
	url?: string;
	location?: string;
	status: 'draft' | 'published' | 'archived';
	logo?: string;
}

export default function StartupsCRUD() {
	const [startups, setStartups] = useState<Startup[]>([]);
	const [loading, setLoading] = useState(true);
	const [actionLoading, setActionLoading] = useState(false);
	const [editingStartup, setEditingStartup] = useState<Startup | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const [existingLogo, setExistingLogo] = useState<string | null>(null);

	const [formData, setFormData] = useState({
		name: '',
		description: '',
		founderName: '',
		sector: '',
		stage: '',
		url: '',
		location: '',
		status: 'draft' as 'draft' | 'published' | 'archived',
		logo: null as File | null,
	});

	const BASE_URL = import.meta.env.VITE_URL;

	useEffect(() => {
		fetchStartups();
	}, []);

	const fetchStartups = async () => {
		setLoading(true);
		try {
			const token = localStorage.getItem('token');
			const res = await fetch(`${BASE_URL}admin/get-startups`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await res.json();
			setStartups(data || []);
		} catch (error) {
			console.error('Error fetching startups:', error);
		} finally {
			setLoading(false);
		}
	};

	const resetForm = () => {
		setEditingStartup(null);
		setExistingLogo(null);
		setFormData({
			name: '',
			description: '',
			founderName: '',
			sector: '',
			stage: '',
			url: '',
			location: '',
			status: 'draft',
			logo: null,
		});
	};

	const handleEdit = (startup: Startup) => {
		setEditingStartup(startup);
		setExistingLogo(startup.logo || null);
		setFormData({
			name: startup.name,
			description: startup.description,
			founderName: startup?.founderName?.join(', ') || '',
			sector: startup.sector || '',
			stage: startup.stage || '',
			url: startup.url || '',
			location: startup.location || '',
			status: startup.status,
			logo: null,
		});
		setIsDialogOpen(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setActionLoading(true);

		try {
			const token = localStorage.getItem('token');
			const payload = new FormData();

			payload.append('name', formData.name);
			payload.append('description', formData.description);

			const foundersArray = formData.founderName
				.split(',')
				.map((f) => f.trim())
				.filter(Boolean);
			payload.append('founderName', JSON.stringify(foundersArray));

			if (formData.sector) payload.append('sector', formData.sector);
			if (formData.stage) payload.append('stage', formData.stage);
			if (formData.url) payload.append('url', formData.url);
			if (formData.location) payload.append('location', formData.location);
			payload.append('status', formData.status);

			if (formData.logo) {
				payload.append('logo', formData.logo);
			} else if (existingLogo) {
				payload.append('logo', existingLogo);
			}

			const url = editingStartup
				? `${BASE_URL}admin/update-startup/${editingStartup._id}`
				: `${BASE_URL}admin/add-startup`;

			const res = await fetch(url, {
				method: 'POST',
				body: payload,
				headers: { Authorization: `Bearer ${token}` },
			});

			const data = await res.json();
			if (res.ok) {
				fetchStartups();
				resetForm();
				alert(`Startup ${editingStartup ? 'updated' : 'created'} successfully`);
			} else {
				alert(data.message || 'Something went wrong');
			}
		} catch (error) {
			console.error('Error submitting startup:', error);
			alert('Failed to submit startup');
		} finally {
			setActionLoading(false);
			setIsDialogOpen(false);
		}
	};

	const handleDelete = async (id: string) => {
		setActionLoading(true);
		try {
			const token = localStorage.getItem('token');
			const res = await fetch(`${BASE_URL}admin/delete-startup/${id}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${token}` },
			});
			if (res.ok) {
				fetchStartups();
				alert('Startup deleted successfully');
			} else {
				alert('Failed to delete startup');
			}
		} catch (error) {
			console.error('Error deleting startup:', error);
			alert('Failed to delete startup');
		} finally {
			setActionLoading(false);
		}
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
		<div className="space-y-6 relative">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Startups Management</h2>
					<p className="text-muted-foreground">Manage startups</p>
				</div>

				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={resetForm}>
							<Plus className="w-4 h-4 mr-2" /> Add Startup
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>
								{editingStartup ? 'Edit Startup' : 'Add Startup'}
							</DialogTitle>
						</DialogHeader>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label>Company Name</Label>
									<Input
										required
										value={formData.name}
										onChange={(e) =>
											setFormData({ ...formData, name: e.target.value })
										}
									/>
								</div>

								<div className="space-y-2">
									<Label>Founder Names (separate by comma)</Label>
									<Input
										value={formData.founderName}
										onChange={(e) =>
											setFormData({
												...formData,
												founderName: e.target.value,
											})
										}
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label>Description</Label>
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
									<Label>Sector</Label>
									<Input
										value={formData.sector}
										onChange={(e) =>
											setFormData({ ...formData, sector: e.target.value })
										}
									/>
								</div>
								<div className="space-y-2">
									<Label>Stage</Label>
									<Select
										value={formData.stage}
										onValueChange={(value) =>
											setFormData({ ...formData, stage: value })
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select stage" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="idea">Idea</SelectItem>
											<SelectItem value="mvp">MVP</SelectItem>
											<SelectItem value="early">Early Stage</SelectItem>
											<SelectItem value="growth">Growth</SelectItem>
											<SelectItem value="scale">Scale</SelectItem>
											<SelectItem value="mature">Mature</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label>Website / URL</Label>
									<Input
										value={formData.url}
										onChange={(e) =>
											setFormData({ ...formData, url: e.target.value })
										}
									/>
								</div>
								<div className="space-y-2">
									<Label>Location</Label>
									<Input
										value={formData.location}
										onChange={(e) =>
											setFormData({ ...formData, location: e.target.value })
										}
									/>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label>Status</Label>
									<Select
										value={formData.status}
										onValueChange={(value) =>
											setFormData({ ...formData, status: value as any })
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
							</div>

							<div className="space-y-2">
								<Label>Logo</Label>
								<Input
									type="file"
									accept="image/*"
									onChange={(e) => {
										const file = e.target.files ? e.target.files[0] : null;
										setFormData({ ...formData, logo: file });
										setExistingLogo(null);
									}}
								/>
								{(existingLogo || formData.logo) && (
									<div className="flex items-center justify-between border rounded-lg p-2 bg-gray-50 mt-2 mx-5">
										<div className="flex items-center gap-2 overflow-hidden">
											<FileText className="w-4 h-4 text-gray-600" />
											<span className="truncate max-w-[200px] text-sm text-gray-800">
												{formData.logo
													? formData.logo.name
													: existingLogo.split('/').pop()}
											</span>
										</div>

										<div className="flex gap-2">
											<button
												type="button"
												className="p-1 rounded hover:bg-gray-200 transition"
												onClick={async () => {
													try {
														if (formData.logo) {
															const url = URL.createObjectURL(
																formData.logo
															);
															window.open(url, '_blank');
														} else if (existingLogo) {
															const token =
																localStorage.getItem('token');
															const res = await fetch(
																`${BASE_URL}${existingLogo}`,
																{
																	headers: {
																		Authorization: `Bearer ${token}`,
																	},
																}
															);
															const blob = await res.blob();
															const url = URL.createObjectURL(blob);
															window.open(url, '_blank');
														}
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
												onClick={() => {
													setFormData({ ...formData, logo: null });
													setExistingLogo(null);
												}}
											>
												<Trash2 className="w-4 h-4 text-red-600" />
											</button>
										</div>
									</div>
								)}
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
									{editingStartup ? 'Update' : 'Create'} Startup
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
						<p className="mt-3 text-primary">Loading Startups...</p>
					</div>
				</div>
			) : (
				<div className="grid grid-flow-col grid-cols-3 gap-4">
					{startups.map((s) => (
						<div
							key={s._id}
							className="border rounded-md shadow p-4 bg-white space-y-5 px-5 flex flex-col h-full"
						>
							<div className="flex justify-between items-center mb-2">
								<h3 className="text-xl font-bold">{s.name}</h3>
								<div className="flex gap-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleEdit(s)}
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
												<AlertDialogTitle>Delete Startup</AlertDialogTitle>
												<AlertDialogDescription>
													Are you sure you want to delete "{s.name}"?
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction
													onClick={() => handleDelete(s._id)}
												>
													Delete
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</div>
							</div>

							<p className="text-muted-foreground line-clamp-2">{s.description}</p>

							<div className="mt-auto space-y-3">
								<div className="flex flex-wrap gap-2">
									{s.sector && <Badge variant="outline">{s.sector}</Badge>}
									{s.stage && <Badge variant="outline">{s.stage}</Badge>}
									<Badge className={getStatusColor(s.status)}>{s.status}</Badge>
								</div>

								<div>
									{s.url && (
										<a
											href={s.url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-primary underline"
										>
											Visit Website
										</a>
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
