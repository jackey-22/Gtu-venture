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
import { Edit, Trash2, Mail } from 'lucide-react';

interface ContactMessageType {
	_id: string;
	name: string;
	email: string;
	phone: string;
	role?: string;
	subject: string;
	message: string;
	status: 'new' | 'read' | 'replied' | 'archived';
	notes?: string;
	created_at?: string;
}

export default function ContactMessagesCRUD() {
	const [messages, setMessages] = useState<ContactMessageType[]>([]);
	const [loading, setLoading] = useState(true);
	const [actionLoading, setActionLoading] = useState(false);
	const [editingMessage, setEditingMessage] = useState<ContactMessageType | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		role: '',
		subject: '',
		message: '',
		status: 'new' as 'new' | 'read' | 'replied' | 'archived',
		notes: '',
	});

	useEffect(() => {
		fetchMessages();
	}, []);

	const fetchMessages = async () => {
		setLoading(true);
		try {
			const data = await fetchGet({ pathName: 'admin/get-contact-messages' });
			setMessages(Array.isArray(data) ? data : []);
		} catch (error) {
			console.error('Error fetching contact messages:', error);
			alert('Failed to fetch contact messages');
		} finally {
			setLoading(false);
		}
	};

	const handleUpdate = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!editingMessage) return;
		setActionLoading(true);
		try {
			const data = await fetchPost({
				pathName: `admin/update-contact-message/${editingMessage._id}`,
				body: JSON.stringify(formData),
			});
			if (data?.message?.toLowerCase().includes('success')) {
				alert('Contact message updated successfully');
				setIsDialogOpen(false);
				resetForm();
				await fetchMessages();
			} else {
				alert(data?.message || 'Something went wrong');
			}
		} catch (error) {
			console.error('Error updating contact message:', error);
			alert('Failed to update contact message');
		} finally {
			setActionLoading(false);
		}
	};

	const handleEdit = (message: ContactMessageType) => {
		setEditingMessage(message);
		setFormData({
			name: message.name || '',
			email: message.email || '',
			phone: message.phone || '',
			role: message.role || '',
			subject: message.subject || '',
			message: message.message || '',
			status: message.status,
			notes: message.notes || '',
		});
		setIsDialogOpen(true);
	};

	const handleDelete = async (id: string) => {
		setActionLoading(true);
		try {
			const data = await fetchPost({
				pathName: `admin/delete-contact-message/${id}`,
				body: JSON.stringify({}),
			});
			if (data?.message?.toLowerCase().includes('deleted')) {
				alert('Contact message deleted successfully');
				await fetchMessages();
			} else {
				alert(data?.message || 'Failed to delete contact message');
			}
		} catch (error) {
			console.error('Error deleting contact message:', error);
			alert('Failed to delete contact message');
		} finally {
			setActionLoading(false);
		}
	};

	const resetForm = () => {
		setEditingMessage(null);
		setFormData({
			name: '',
			email: '',
			phone: '',
			role: '',
			subject: '',
			message: '',
			status: 'new',
			notes: '',
		});
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'new':
				return 'default';
			case 'read':
				return 'secondary';
			case 'replied':
				return 'default';
			case 'archived':
				return 'outline';
			default:
				return 'outline';
		}
	};

	if (loading) {
		return <div className="p-6">Loading contact messages...</div>;
	}

	return (
		<div className="p-6 space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">Contact Messages Management</h2>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{messages.map((message) => (
					<Card key={message._id}>
						<CardContent className="p-4">
							<div className="flex justify-between items-start gap-3">
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 mb-2 flex-wrap">
										<h3 className="font-bold text-lg line-clamp-2">
											{message.subject}
										</h3>
										<Badge
											variant={getStatusColor(message.status)}
											className="flex-shrink-0"
										>
											{message.status}
										</Badge>
									</div>
									<div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-2">
										<div className="min-w-0">
											<strong>From:</strong>{' '}
											<span className="truncate">{message.name}</span>
										</div>
										<div className="min-w-0">
											<strong>Email:</strong>{' '}
											<span className="break-all">{message.email}</span>
										</div>
										<div className="min-w-0">
											<strong>Phone:</strong>{' '}
											<span className="break-all">{message.phone}</span>
										</div>
										{message.role && (
											<div className="min-w-0">
												<strong>Role:</strong>{' '}
												<span className="truncate">{message.role}</span>
											</div>
										)}
									</div>
									<p className="text-sm text-muted-foreground line-clamp-3 mb-2">
										{message.message}
									</p>
									{message.created_at && (
										<div className="text-xs text-muted-foreground">
											Received:{' '}
											{new Date(message.created_at).toLocaleDateString()}
										</div>
									)}
								</div>
								<div className="flex gap-2 flex-shrink-0">
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleEdit(message)}
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
													Delete Contact Message?
												</AlertDialogTitle>
												<AlertDialogDescription>
													This action cannot be undone.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction
													onClick={() => handleDelete(message._id)}
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
				{messages.length === 0 && (
					<div className="text-center text-muted-foreground py-8 col-span-full">
						No contact messages found
					</div>
				)}
			</div>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Edit Contact Message</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleUpdate} className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
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
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label>Phone *</Label>
								<Input
									value={formData.phone}
									onChange={(e) =>
										setFormData({ ...formData, phone: e.target.value })
									}
									required
								/>
							</div>
							<div>
								<Label>Role</Label>
								<Input
									value={formData.role}
									onChange={(e) =>
										setFormData({ ...formData, role: e.target.value })
									}
								/>
							</div>
						</div>
						<div>
							<Label>Subject *</Label>
							<Input
								value={formData.subject}
								onChange={(e) =>
									setFormData({ ...formData, subject: e.target.value })
								}
								required
							/>
						</div>
						<div>
							<Label>Message *</Label>
							<Textarea
								value={formData.message}
								onChange={(e) =>
									setFormData({ ...formData, message: e.target.value })
								}
								required
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
									<SelectItem value="new">New</SelectItem>
									<SelectItem value="read">Read</SelectItem>
									<SelectItem value="replied">Replied</SelectItem>
									<SelectItem value="archived">Archived</SelectItem>
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
								placeholder="Internal notes about this message"
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
