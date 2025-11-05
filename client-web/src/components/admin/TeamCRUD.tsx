import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
} from '@/components/ui/alert-dialog';
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectValue,
	SelectItem,
} from '@/components/ui/select';
import { Plus, Edit, Trash2, Loader2, Users, Tag } from 'lucide-react';
import { fetchGet, fetchPost } from '../../utils/fetch.utils';

const BASE_URL = import.meta.env.VITE_URL;

export default function TeamManagement() {
	const [activeTab, setActiveTab] = useState('labels');
	const [labels, setLabels] = useState([]);
	const [members, setMembers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingItem, setEditingItem] = useState(null);
	const [actionType, setActionType] = useState('label');
	const [removeExistingPhoto, setRemoveExistingPhoto] = useState(false);

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		name: '',
		role: '',
		bio: '',
		label: '',
		photo: null,
		priority: 1,
	});

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);
		try {
			const labelData = await fetchGet({ pathName: 'admin/get-team-labels' });
			const memberData = await fetchGet({ pathName: 'admin/get-team-members' });

			setLabels(labelData || []);
			setMembers(memberData || []);
		} catch (error) {
			console.error('Error fetching team data:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			let response;
			let data;
			if (actionType === 'label') {
				const body = JSON.stringify({
					title: formData.title,
					description: formData.description,
					priority: formData.priority,
				});
				const pathName = editingItem
					? `admin/update-team-label/${editingItem._id}`
					: 'admin/add-team-label';

				response = await fetchPost({ pathName, body });
				data = response;
			} else {
				const payload = new FormData();
				payload.append('name', formData.name);
				payload.append('role', formData.role);
				payload.append('bio', formData.bio || '');
				payload.append('label', formData.label);
				payload.append('priority', formData.priority || 1);

				if (formData.photo) {
					payload.append('photo', formData.photo);
				} else if (editingItem && removeExistingPhoto) {
					payload.append('removePhoto', 'true');
				}

				const pathName = editingItem
					? `admin/update-team-member/${editingItem._id}`
					: 'admin/add-team-member';

				const token = localStorage.getItem('token');
				response = await fetch(BASE_URL + pathName, {
					method: 'POST',
					body: payload,
					headers: { Authorization: `Bearer ${token}` },
				});
				data = await response.json();
			}

			if (data && (data.message || data.success)) {
				alert(
					editingItem
						? `${actionType === 'label' ? 'Label' : 'Member'} updated successfully`
						: `${actionType === 'label' ? 'Label' : 'Member'} added successfully`
				);
				setIsDialogOpen(false);
				resetForm();
				fetchData();
			} else {
				throw new Error('Failed to save data');
			}
		} catch (error) {
			alert(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDelete = async (id, type) => {
		setIsSubmitting(true);
		try {
			if (type === 'label') {
				const pathName = `admin/delete-team-label/${id}`;
				const res = await fetchPost({ pathName, body: JSON.stringify({}) });
				if (res?.message) {
					alert(res.message);
					fetchData();
				} else {
					throw new Error('Failed to delete label');
				}
			} else {
				const data = await fetchPost({
					pathName: `admin/delete-team-member/${id}`,
					body: JSON.stringify({}),
				});

				if (data?.message) {
					alert(data.message);
					fetchData();
				} else {
					throw new Error('Failed to delete member');
				}
			}
		} catch (error) {
			console.error(error);
			alert('Error deleting!');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleEdit = (item, type) => {
		setActionType(type);
		setEditingItem(item);
		if (type === 'label') {
			setFormData({
				title: item.title,
				description: item.description,
				name: '',
				role: '',
				bio: '',
				label: '',
				photo: null,
				priority: item.priority,
			});
		} else {
			setFormData({
				title: '',
				description: '',
				name: item.name,
				role: item.role,
				bio: item.bio || '',
				label: item.label?._id || '',
				photo: null,
				priority: item.priority,
			});
		}
		setRemoveExistingPhoto(false);
		setIsDialogOpen(true);
	};

	const resetForm = () => {
		setEditingItem(null);
		setFormData({
			title: '',
			description: '',
			name: '',
			role: '',
			bio: '',
			label: '',
			photo: null,
			priority: 1,
		});
		setRemoveExistingPhoto(false);
	};

	return (
		<div className="space-y-8">
			{/* Header Buttons */}
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Team Management</h2>
					<p className="text-muted-foreground">Manage team labels and members</p>
				</div>
				<div className="flex gap-3">
					<Button
						onClick={() => {
							resetForm();
							setActionType('label');
							setIsDialogOpen(true);
						}}
					>
						<Plus className="w-4 h-4 mr-2" /> Add Label
					</Button>
					<Button
						onClick={() => {
							resetForm();
							setActionType('member');
							setIsDialogOpen(true);
						}}
					>
						<Plus className="w-4 h-4 mr-2" /> Add Member
					</Button>
				</div>
			</div>

			{/* Tabs */}
			<Tabs value={activeTab} onValueChange={setActiveTab}>
				<TabsList>
					<TabsTrigger value="labels">
						<Tag className="w-4 h-4 mr-2" /> Labels
					</TabsTrigger>
					<TabsTrigger value="members">
						<Users className="w-4 h-4 mr-2" /> Members
					</TabsTrigger>
				</TabsList>

				{/* Labels Content */}
				<TabsContent value="labels" className="mt-6">
					{loading ? (
						<div className="flex justify-center items-center h-64">
							<div className="text-center">
								<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
								<p className="mt-3 text-primary">Loading Labels...</p>
							</div>
						</div>
					) : labels.length === 0 ? (
						<p className="text-center text-muted-foreground">No labels found</p>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{labels.map((label) => (
								<div
									key={label._id}
									className="border rounded-lg p-4 shadow-sm bg-white space-y-5"
								>
									<div className="flex justify-between items-center mb-2">
										<h4 className="font-semibold">{label.title}</h4>
										<div className="flex gap-2">
											<Button
												size="sm"
												variant="outline"
												onClick={() => handleEdit(label, 'label')}
											>
												<Edit className="w-4 h-4" />
											</Button>
											<AlertDialog>
												<AlertDialogTrigger asChild>
													<Button size="sm" variant="outline">
														<Trash2 className="w-4 h-4" />
													</Button>
												</AlertDialogTrigger>
												<AlertDialogContent>
													<AlertDialogHeader>
														<AlertDialogTitle>
															Delete Label
														</AlertDialogTitle>
														<AlertDialogDescription>
															Are you sure you want to delete "
															{label.title}"? <br /> It will also
															delete all members associated with{' '}
															{label.title}.
														</AlertDialogDescription>
													</AlertDialogHeader>
													<AlertDialogFooter>
														<AlertDialogCancel>
															Cancel
														</AlertDialogCancel>
														<AlertDialogAction asChild>
															<Button
																onClick={async (e) => {
																	e.preventDefault();
																	await handleDelete(
																		label._id,
																		'label'
																	);
																}}
																disabled={isSubmitting}
															>
																{isSubmitting ? (
																	<>
																		<Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
																		Deleting...
																	</>
																) : (
																	'Delete'
																)}
															</Button>
														</AlertDialogAction>
													</AlertDialogFooter>
												</AlertDialogContent>
											</AlertDialog>
										</div>
									</div>
									<p className="text-gray-500 text-sm">{label.description}</p>
								</div>
							))}
						</div>
					)}
				</TabsContent>

				{/* Members Content */}
				<TabsContent value="members" className="mt-6">
					{loading ? (
						<div className="flex justify-center items-center h-64">
							<div className="text-center">
								<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
								<p className="mt-3 text-primary">Loading Members...</p>
							</div>
						</div>
					) : members.length === 0 ? (
						<p className="text-center text-muted-foreground">No members found</p>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{members.map((m) => (
								<div
									key={m._id}
									className="border rounded-lg p-4 shadow-sm bg-white flex flex-col"
								>
									<div className="flex justify-between items-center mb-2">
										<h4 className="font-semibold">{m.name}</h4>
										<div className="flex gap-2">
											<Button
												size="sm"
												variant="outline"
												onClick={() => handleEdit(m, 'member')}
											>
												<Edit className="w-4 h-4" />
											</Button>
											<AlertDialog>
												<AlertDialogTrigger asChild>
													<Button size="sm" variant="outline">
														<Trash2 className="w-4 h-4" />
													</Button>
												</AlertDialogTrigger>
												<AlertDialogContent>
													<AlertDialogHeader>
														<AlertDialogTitle>
															Delete Member
														</AlertDialogTitle>
														<AlertDialogDescription>
															Are you sure you want to delete "
															{m.name}"?
														</AlertDialogDescription>
													</AlertDialogHeader>
													<AlertDialogFooter>
														<AlertDialogCancel>
															Cancel
														</AlertDialogCancel>
														<AlertDialogAction asChild>
															<Button
																onClick={async (e) => {
																	e.preventDefault();
																	await handleDelete(
																		m._id,
																		'member'
																	);
																}}
																disabled={isSubmitting}
															>
																{isSubmitting ? (
																	<>
																		<Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
																		Deleting...
																	</>
																) : (
																	'Delete'
																)}
															</Button>
														</AlertDialogAction>
													</AlertDialogFooter>
												</AlertDialogContent>
											</AlertDialog>
										</div>
									</div>
									{(m.photo || m.label) && (
										<>
											{m.photo && (
												<img
													src={`${BASE_URL}${m.photo}`}
													alt={m.name}
													className="w-full h-40 object-cover rounded mb-3"
												/>
											)}
											<p className="text-gray-600 font-medium">{m.role}</p>
											<p className="text-gray-500 text-sm line-clamp-3 flex-grow">
												{m.bio}
											</p>
											<div className="mt-3">
												<Badge variant="outline">
													{m.label?.title || 'Unassigned'}
												</Badge>
											</div>
										</>
									)}
								</div>
							))}
						</div>
					)}
				</TabsContent>
			</Tabs>

			{/* Add/Edit Dialog */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>
							{editingItem
								? `Edit ${actionType === 'label' ? 'Label' : 'Member'}`
								: `Add New ${actionType === 'label' ? 'Label' : 'Member'}`}
						</DialogTitle>
					</DialogHeader>

					<form onSubmit={handleSubmit} className="space-y-4">
						{actionType === 'label' ? (
							<>
								<div className="space-y-2">
									<Label>Title</Label>
									<Input
										value={formData.title}
										onChange={(e) =>
											setFormData({ ...formData, title: e.target.value })
										}
										required
									/>
								</div>
								<div className="space-y-2">
									<Label>Description</Label>
									<Textarea
										rows={3}
										value={formData.description}
										onChange={(e) =>
											setFormData({
												...formData,
												description: e.target.value,
											})
										}
									/>
								</div>
								<div className="space-y-2">
									<Label>Priority</Label>
									<Input
										type="number"
										min={1}
										value={formData.priority}
										onChange={(e) =>
											setFormData({
												...formData,
												priority:
													e.target.value === ''
														? ''
														: parseInt(e.target.value),
											})
										}
										required
									/>
								</div>
							</>
						) : (
							<>
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label>Name</Label>
										<Input
											value={formData.name}
											onChange={(e) =>
												setFormData({ ...formData, name: e.target.value })
											}
											required
										/>
									</div>
									<div className="space-y-2">
										<Label>Role</Label>
										<Input
											value={formData.role}
											onChange={(e) =>
												setFormData({ ...formData, role: e.target.value })
											}
											required
										/>
									</div>
								</div>
								<div className="space-y-2">
									<Label>Bio</Label>
									<Textarea
										rows={3}
										value={formData.bio || ''}
										onChange={(e) =>
											setFormData({ ...formData, bio: e.target.value })
										}
									/>
								</div>
								<div className="space-y-2">
									<Label>Label</Label>
									<Select
										value={formData.label}
										onValueChange={(v) =>
											setFormData({ ...formData, label: v })
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select label" />
										</SelectTrigger>
										<SelectContent>
											{labels.map((l) => (
												<SelectItem key={l._id} value={l._id}>
													{l.title}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label>Priority</Label>
									<Input
										type="number"
										min={1}
										value={formData.priority}
										onChange={(e) =>
											setFormData({
												...formData,
												priority:
													e.target.value === ''
														? ''
														: parseInt(e.target.value),
											})
										}
										required
									/>
								</div>
								<div className="space-y-2">
									<Label>Photo</Label>
									<Input
										type="file"
										accept="image/*"
										onChange={(e) => {
											setFormData({
												...formData,
												photo: e.target.files?.[0] || null,
											});
											setRemoveExistingPhoto(false);
										}}
									/>

									{(formData.photo ||
										(editingItem?.photo && !removeExistingPhoto)) && (
										<div className="mt-2 flex items-center gap-2">
											<img
												src={
													formData.photo
														? URL.createObjectURL(formData.photo)
														: `${BASE_URL}${editingItem?.photo}`
												}
												alt="Member"
												className="w-32 h-32 object-cover rounded border"
											/>
											<Button
												type="button"
												variant="destructive"
												size="sm"
												onClick={() => {
													if (formData.photo) {
														setFormData({ ...formData, photo: null });
													} else {
														setRemoveExistingPhoto(true);
														setFormData({ ...formData, photo: null });
													}
												}}
											>
												<Trash2 className="w-4 h-4" />
											</Button>
										</div>
									)}
								</div>
							</>
						)}

						<div className="flex justify-end gap-3">
							<Button
								type="button"
								variant="outline"
								onClick={() => setIsDialogOpen(false)}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
									</>
								) : editingItem ? (
									'Update'
								) : (
									'Create'
								)}
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
