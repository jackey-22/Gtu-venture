import React, { useState, useEffect } from 'react';
import { fetchGet, fetchPost } from '../../utils/fetch.utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface FacilityType {
	_id: string;
	title: string;
	body?: string;
	icon?: string;
	action?: string;
	status: 'draft' | 'published' | 'archived';
}

export default function FacilitiesCRUD() {
	const [facilities, setFacilities] = useState<FacilityType[]>([]);
	const [loading, setLoading] = useState(true);
	const [actionLoading, setActionLoading] = useState(false);
	const [editingFacility, setEditingFacility] = useState<FacilityType | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [formData, setFormData] = useState({
		title: '',
		body: '',
		icon: '',
		action: '',
		status: 'draft' as 'draft' | 'published' | 'archived',
	});

	useEffect(() => {
		fetchFacilities();
	}, []);

	const fetchFacilities = async () => {
		setLoading(true);
		try {
			const data = await fetchGet({ pathName: 'admin/get-facilities' });
			setFacilities(Array.isArray(data) ? data : []);
		} catch (error) {
			console.error('Error fetching facilities:', error);
			alert('Failed to fetch facilities');
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setActionLoading(true);
		try {
			const pathName = editingFacility ? `admin/update-facility/${editingFacility._id}` : 'admin/add-facility';
			const data = await fetchPost({ pathName, body: JSON.stringify(formData) });
			if (data?.message?.toLowerCase().includes('success')) {
				alert(editingFacility ? 'Facility updated successfully' : 'Facility added successfully');
				setIsDialogOpen(false);
				resetForm();
				await fetchFacilities();
			} else {
				alert(data?.message || 'Something went wrong');
			}
		} catch (error) {
			console.error('Error saving facility:', error);
			alert('Failed to save facility');
		} finally {
			setActionLoading(false);
		}
	};

	const handleEdit = (facility: FacilityType) => {
		setEditingFacility(facility);
		setFormData({
			title: facility.title || '',
			body: facility.body || '',
			icon: facility.icon || '',
			action: facility.action || '',
			status: facility.status,
		});
		setIsDialogOpen(true);
	};

	const handleDelete = async (id: string) => {
		setActionLoading(true);
		try {
			const data = await fetchPost({ pathName: `admin/delete-facility/${id}`, body: JSON.stringify({}) });
			if (data?.message?.toLowerCase().includes('deleted')) {
				alert('Facility deleted successfully');
				await fetchFacilities();
			} else {
				alert(data?.message || 'Failed to delete facility');
			}
		} catch (error) {
			console.error('Error deleting facility:', error);
			alert('Failed to delete facility');
		} finally {
			setActionLoading(false);
		}
	};

	const resetForm = () => {
		setEditingFacility(null);
		setFormData({
			title: '',
			body: '',
			icon: '',
			action: '',
			status: 'draft',
		});
	};

	if (loading) {
		return <div className="p-6">Loading facilities...</div>;
	}

	return (
		<div className="p-6 space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">Facilities Management</h2>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={resetForm}>
							<Plus className="w-4 h-4 mr-2" />
							Add Facility
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>{editingFacility ? 'Edit Facility' : 'Add Facility'}</DialogTitle>
						</DialogHeader>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<Label>Title *</Label>
								<Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
							</div>
							<div>
								<Label>Body/Description</Label>
								<Textarea value={formData.body} onChange={(e) => setFormData({ ...formData, body: e.target.value })} />
							</div>
							<div>
								<Label>Icon (icon name)</Label>
								<Input value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} placeholder="Box, Wrench, etc." />
							</div>
							<div>
								<Label>Action</Label>
								<Input value={formData.action} onChange={(e) => setFormData({ ...formData, action: e.target.value })} placeholder="Request Desk, Book Lab, etc." />
							</div>
							<div>
								<Label>Status</Label>
								<Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
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
								{actionLoading ? 'Saving...' : editingFacility ? 'Update' : 'Add'}
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid gap-4">
				{facilities.map((facility) => (
					<Card key={facility._id}>
						<CardContent className="p-4">
							<div className="flex justify-between items-start">
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-2">
										<h3 className="font-bold text-lg">{facility.title}</h3>
										<Badge variant={facility.status === 'published' ? 'default' : 'secondary'}>{facility.status}</Badge>
									</div>
									<p className="text-sm text-muted-foreground">{facility.body}</p>
									<div className="mt-2 flex gap-2 text-xs text-muted-foreground">
										{facility.icon && <span>Icon: {facility.icon}</span>}
										{facility.action && <span>Action: {facility.action}</span>}
									</div>
								</div>
								<div className="flex gap-2">
									<Button variant="outline" size="sm" onClick={() => handleEdit(facility)}>
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
												<AlertDialogTitle>Delete Facility?</AlertDialogTitle>
												<AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction onClick={() => handleDelete(facility._id)}>Delete</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
				{facilities.length === 0 && <div className="text-center text-muted-foreground py-8">No facilities found</div>}
			</div>
		</div>
	);
}

