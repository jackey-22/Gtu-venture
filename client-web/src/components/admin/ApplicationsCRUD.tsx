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
import { Edit, Trash2, FileText } from 'lucide-react';

interface ApplicationType {
	_id: string;
	startupName: string;
	idea?: string;
	email: string;
	cofounderEmail?: string;
	state?: string;
	city?: string;
	fundingRaised?: string;
	fundingAgency?: string;
	website?: string;
	mobile: string;
	registered?: string;
	stage?: string;
	incubatedElsewhere?: string;
	supportNeeded?: string[];
	teamSize?: string;
	pitchDeck?: string;
	status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
	notes?: string;
	created_at?: string;
}

export default function ApplicationsCRUD() {
	const [applications, setApplications] = useState<ApplicationType[]>([]);
	const [loading, setLoading] = useState(true);
	const [actionLoading, setActionLoading] = useState(false);
	const [editingApplication, setEditingApplication] = useState<ApplicationType | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [formData, setFormData] = useState({
		startupName: '',
		idea: '',
		email: '',
		cofounderEmail: '',
		state: '',
		city: '',
		fundingRaised: '',
		fundingAgency: '',
		website: '',
		mobile: '',
		registered: '',
		stage: '',
		incubatedElsewhere: '',
		supportNeeded: '',
		teamSize: '',
		pitchDeck: '',
		status: 'pending' as 'pending' | 'reviewed' | 'accepted' | 'rejected',
		notes: '',
	});

	useEffect(() => {
		fetchApplications();
	}, []);

	const fetchApplications = async () => {
		setLoading(true);
		try {
			const data = await fetchGet({ pathName: 'admin/get-applications' });
			setApplications(Array.isArray(data) ? data : []);
		} catch (error) {
			console.error('Error fetching applications:', error);
			alert('Failed to fetch applications');
		} finally {
			setLoading(false);
		}
	};

	const handleUpdate = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!editingApplication) return;
		setActionLoading(true);
		try {
			const payload = {
				...formData,
				supportNeeded: formData.supportNeeded
					? formData.supportNeeded
							.split(',')
							.map((s) => s.trim())
							.filter(Boolean)
					: [],
			};
			const data = await fetchPost({
				pathName: `admin/update-application/${editingApplication._id}`,
				body: JSON.stringify(payload),
			});
			if (data?.message?.toLowerCase().includes('success')) {
				alert('Application updated successfully');
				setIsDialogOpen(false);
				resetForm();
				await fetchApplications();
			} else {
				alert(data?.message || 'Something went wrong');
			}
		} catch (error) {
			console.error('Error updating application:', error);
			alert('Failed to update application');
		} finally {
			setActionLoading(false);
		}
	};

	const handleEdit = (application: ApplicationType) => {
		setEditingApplication(application);
		setFormData({
			startupName: application.startupName || '',
			idea: application.idea || '',
			email: application.email || '',
			cofounderEmail: application.cofounderEmail || '',
			state: application.state || '',
			city: application.city || '',
			fundingRaised: application.fundingRaised || '',
			fundingAgency: application.fundingAgency || '',
			website: application.website || '',
			mobile: application.mobile || '',
			registered: application.registered || '',
			stage: application.stage || '',
			incubatedElsewhere: application.incubatedElsewhere || '',
			supportNeeded: application.supportNeeded?.join(', ') || '',
			teamSize: application.teamSize || '',
			pitchDeck: application.pitchDeck || '',
			status: application.status,
			notes: application.notes || '',
		});
		setIsDialogOpen(true);
	};

	const handleDelete = async (id: string) => {
		setActionLoading(true);
		try {
			const data = await fetchPost({
				pathName: `admin/delete-application/${id}`,
				body: JSON.stringify({}),
			});
			if (data?.message?.toLowerCase().includes('deleted')) {
				alert('Application deleted successfully');
				await fetchApplications();
			} else {
				alert(data?.message || 'Failed to delete application');
			}
		} catch (error) {
			console.error('Error deleting application:', error);
			alert('Failed to delete application');
		} finally {
			setActionLoading(false);
		}
	};

	const resetForm = () => {
		setEditingApplication(null);
		setFormData({
			startupName: '',
			idea: '',
			email: '',
			cofounderEmail: '',
			state: '',
			city: '',
			fundingRaised: '',
			fundingAgency: '',
			website: '',
			mobile: '',
			registered: '',
			stage: '',
			incubatedElsewhere: '',
			supportNeeded: '',
			teamSize: '',
			pitchDeck: '',
			status: 'pending',
			notes: '',
		});
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'accepted':
				return 'default';
			case 'rejected':
				return 'destructive';
			case 'reviewed':
				return 'secondary';
			default:
				return 'outline';
		}
	};

	if (loading) {
		return <div className="p-6">Loading applications...</div>;
	}

	return (
		<div className="p-6 space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">Applications Management</h2>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{applications.map((application) => (
					<Card key={application._id}>
						<CardContent className="p-4">
							<div className="flex justify-between items-start">
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-2">
										<h3 className="font-bold text-lg">
											{application.startupName}
										</h3>
										<Badge variant={getStatusColor(application.status)}>
											{application.status}
										</Badge>
									</div>
									<div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-2">
										<div>
											<strong>Email:</strong> {application.email}
										</div>
										<div>
											<strong>Mobile:</strong> {application.mobile}
										</div>
										{application.city && (
											<div>
												<strong>City:</strong> {application.city}
											</div>
										)}
										{application.stage && (
											<div>
												<strong>Stage:</strong> {application.stage}
											</div>
										)}
									</div>
									{application.idea && (
										<p className="text-sm text-muted-foreground mb-2">
											{application.idea.substring(0, 100)}...
										</p>
									)}
									{application.created_at && (
										<div className="text-xs text-muted-foreground">
											Submitted:{' '}
											{new Date(application.created_at).toLocaleDateString()}
										</div>
									)}
								</div>
								<div className="flex gap-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleEdit(application)}
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
													Delete Application?
												</AlertDialogTitle>
												<AlertDialogDescription>
													This action cannot be undone.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction
													onClick={() => handleDelete(application._id)}
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
				{applications.length === 0 && (
					<div className="text-center text-muted-foreground py-8">
						No applications found
					</div>
				)}
			</div>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Edit Application</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleUpdate} className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label>Startup Name *</Label>
								<Input
									value={formData.startupName}
									onChange={(e) =>
										setFormData({ ...formData, startupName: e.target.value })
									}
									required
								/>
							</div>
							<div>
								<Label>Email *</Label>
								<Input
									type="email"
									value={formData.email}
									onChange={(e) =>
										setFormData({ ...formData, email: e.target.value })
									}
									required
								/>
							</div>
						</div>
						<div>
							<Label>Idea</Label>
							<Textarea
								value={formData.idea}
								onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label>Mobile *</Label>
								<Input
									value={formData.mobile}
									onChange={(e) =>
										setFormData({ ...formData, mobile: e.target.value })
									}
									required
								/>
							</div>
							<div>
								<Label>Cofounder Email</Label>
								<Input
									type="email"
									value={formData.cofounderEmail}
									onChange={(e) =>
										setFormData({ ...formData, cofounderEmail: e.target.value })
									}
								/>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label>State</Label>
								<Input
									value={formData.state}
									onChange={(e) =>
										setFormData({ ...formData, state: e.target.value })
									}
								/>
							</div>
							<div>
								<Label>City</Label>
								<Input
									value={formData.city}
									onChange={(e) =>
										setFormData({ ...formData, city: e.target.value })
									}
								/>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label>Funding Raised</Label>
								<Input
									value={formData.fundingRaised}
									onChange={(e) =>
										setFormData({ ...formData, fundingRaised: e.target.value })
									}
								/>
							</div>
							<div>
								<Label>Funding Agency</Label>
								<Input
									value={formData.fundingAgency}
									onChange={(e) =>
										setFormData({ ...formData, fundingAgency: e.target.value })
									}
								/>
							</div>
						</div>
						<div>
							<Label>Website</Label>
							<Input
								value={formData.website}
								onChange={(e) =>
									setFormData({ ...formData, website: e.target.value })
								}
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label>Registered</Label>
								<Input
									value={formData.registered}
									onChange={(e) =>
										setFormData({ ...formData, registered: e.target.value })
									}
								/>
							</div>
							<div>
								<Label>Stage</Label>
								<Input
									value={formData.stage}
									onChange={(e) =>
										setFormData({ ...formData, stage: e.target.value })
									}
								/>
							</div>
						</div>
						<div>
							<Label>Incubated Elsewhere</Label>
							<Input
								value={formData.incubatedElsewhere}
								onChange={(e) =>
									setFormData({ ...formData, incubatedElsewhere: e.target.value })
								}
							/>
						</div>
						<div>
							<Label>Support Needed (comma separated)</Label>
							<Input
								value={formData.supportNeeded}
								onChange={(e) =>
									setFormData({ ...formData, supportNeeded: e.target.value })
								}
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label>Team Size</Label>
								<Input
									value={formData.teamSize}
									onChange={(e) =>
										setFormData({ ...formData, teamSize: e.target.value })
									}
								/>
							</div>
							<div>
								<Label>Pitch Deck Link</Label>
								<Input
									value={formData.pitchDeck}
									onChange={(e) =>
										setFormData({ ...formData, pitchDeck: e.target.value })
									}
								/>
							</div>
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
									<SelectItem value="pending">Pending</SelectItem>
									<SelectItem value="reviewed">Reviewed</SelectItem>
									<SelectItem value="accepted">Accepted</SelectItem>
									<SelectItem value="rejected">Rejected</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div>
							<Label>Notes</Label>
							<Textarea
								value={formData.notes}
								onChange={(e) =>
									setFormData({ ...formData, notes: e.target.value })
								}
							/>
						</div>
						<Button type="submit" disabled={actionLoading}>
							{actionLoading ? 'Updating...' : 'Update'}
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
