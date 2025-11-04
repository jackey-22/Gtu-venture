import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

interface Metric {
	_id: string;
	label: string;
	value: number;
	prefix?: string;
	suffix?: string;
	order: number;
	status: 'draft' | 'published' | 'archived';
}

export default function MetricsCRUD() {
	const [metrics, setMetrics] = useState<Metric[]>([]);
	const [loading, setLoading] = useState(true);
	const [actionLoading, setActionLoading] = useState(false);
	const [editingMetric, setEditingMetric] = useState<Metric | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const [formData, setFormData] = useState({
		label: '',
		value: 0,
		prefix: '',
		suffix: '',
		order: 0,
		status: 'published' as 'draft' | 'published' | 'archived',
	});

	useEffect(() => {
		fetchMetrics();
	}, []);

	const fetchMetrics = async () => {
		setLoading(true);
		try {
			const data = await fetchGet({ pathName: 'admin/get-metrics' });
			setMetrics(data || []);
		} catch (error) {
			console.error('Error fetching metrics:', error);
		} finally {
			setLoading(false);
		}
	};

	const resetForm = () => {
		setEditingMetric(null);
		setFormData({
			label: '',
			value: 0,
			prefix: '',
			suffix: '',
			order: 0,
			status: 'published',
		});
	};

	const handleEdit = (metric: Metric) => {
		setEditingMetric(metric);
		setFormData({
			label: metric.label,
			value: metric.value,
			prefix: metric.prefix || '',
			suffix: metric.suffix || '',
			order: metric.order,
			status: metric.status,
		});
		setIsDialogOpen(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setActionLoading(true);

		try {
			const payload = {
				...formData,
				value: Number(formData.value),
				order: Number(formData.order),
			};

			const pathName = editingMetric
				? `admin/update-metric/${editingMetric._id}`
				: 'admin/add-metric';

			const data = await fetchPost({
				pathName,
				body: JSON.stringify(payload),
			});

			if (data?.message?.toLowerCase().includes('success')) {
				alert(editingMetric ? 'Metric updated successfully' : 'Metric created successfully');
				setIsDialogOpen(false);
				resetForm();
				await fetchMetrics();
			} else {
				alert(data?.message || 'Something went wrong');
			}
		} catch (error) {
			console.error('Error saving metric:', error);
			alert('Failed to save metric');
		} finally {
			setActionLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		setActionLoading(true);
		try {
			const BASE_URL = import.meta.env.VITE_URL;
			const token = localStorage.getItem('token');
			const res = await fetch(`${BASE_URL}admin/delete-metric/${id}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${token}` },
			});
			if (res.ok) {
				fetchMetrics();
				alert('Metric deleted successfully');
			} else {
				alert('Failed to delete metric');
			}
		} catch (error) {
			console.error('Error deleting metric:', error);
			alert('Failed to delete metric');
		} finally {
			setActionLoading(false);
		}
	};

	const displayValue = (metric: Metric) => {
		return `${metric.prefix || ''}${metric.value}${metric.suffix || ''}`;
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Metrics Management</h2>
					<p className="text-muted-foreground">Manage metrics displayed on home page</p>
				</div>

				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={resetForm}>
							<Plus className="w-4 h-4 mr-2" /> Add Metric
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-2xl">
						<DialogHeader>
							<DialogTitle>{editingMetric ? 'Edit Metric' : 'Add Metric'}</DialogTitle>
						</DialogHeader>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-2">
								<Label>Label *</Label>
								<Input
									required
									value={formData.label}
									onChange={(e) => setFormData({ ...formData, label: e.target.value })}
								/>
							</div>

							<div className="grid grid-cols-3 gap-4">
								<div className="space-y-2">
									<Label>Prefix</Label>
									<Input
										value={formData.prefix}
										onChange={(e) => setFormData({ ...formData, prefix: e.target.value })}
										placeholder="e.g., $"
									/>
								</div>
								<div className="space-y-2">
									<Label>Value *</Label>
									<Input
										type="number"
										required
										value={formData.value}
										onChange={(e) =>
											setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })
										}
									/>
								</div>
								<div className="space-y-2">
									<Label>Suffix</Label>
									<Input
										value={formData.suffix}
										onChange={(e) => setFormData({ ...formData, suffix: e.target.value })}
										placeholder="e.g., +, %, K"
									/>
								</div>
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
									{actionLoading ? 'Saving...' : editingMetric ? 'Update' : 'Create'} Metric
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{metrics.map((metric) => (
					<Card key={metric._id}>
						<CardContent className="p-4">
							<div className="flex justify-between items-start gap-3">
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 mb-2 flex-wrap">
										<h3 className="font-bold text-2xl">{displayValue(metric)}</h3>
										<Badge variant={metric.status === 'published' ? 'default' : 'secondary'}>
											{metric.status}
										</Badge>
									</div>
									<p className="text-sm text-muted-foreground">{metric.label}</p>
									<p className="text-xs text-muted-foreground mt-2">Order: {metric.order}</p>
								</div>
								<div className="flex gap-2 flex-shrink-0">
									<Button variant="outline" size="sm" onClick={() => handleEdit(metric)}>
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
												<AlertDialogTitle>Delete Metric?</AlertDialogTitle>
												<AlertDialogDescription>
													This action cannot be undone.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction onClick={() => handleDelete(metric._id)}>
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
				{metrics.length === 0 && (
					<div className="text-center text-muted-foreground py-8 col-span-full">
						No metrics found
					</div>
				)}
			</div>
		</div>
	);
}
