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
import { Plus, Edit, Trash2, Clock, Calendar, Users } from 'lucide-react';

// Change baseURL according to your backend port
const baseURL = 'http://localhost:5000/admin';

export default function ProgramsCRUD() {
	const [programs, setPrograms] = useState([]);
	const [loading, setLoading] = useState(true);
	const [editingProgram, setEditingProgram] = useState(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const [formData, setFormData] = useState({
		title: '',
		slug: '',
		description: '',
		category: '',
		duration: '',
		eligibility: '',
		benefits: '',
		deadline: '',
		start_date: '',
		end_date: '',
		status: 'draft',
	});

	// Load all programs
	useEffect(() => {
		loadPrograms();
	}, []);

	const loadPrograms = async () => {
		try {
			const res = await fetch(`${baseURL}/get-programs`);
			const data = await res.json();
			setPrograms(data);
		} catch (error) {
			console.error('Error loading programs:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const method = editingProgram ? 'PUT' : 'POST';
		const url = editingProgram
			? `${baseURL}/update-program/${editingProgram._id}`
			: `${baseURL}/add-program`;

		// Prepare data for backend - convert comma-separated strings to arrays
		const dataToSend = {
			...formData,
			eligibility: formData.eligibility
				? formData.eligibility
						.split(',')
						.map((item) => item.trim())
						.filter((item) => item)
				: [],
			benefits: formData.benefits
				? formData.benefits
						.split(',')
						.map((item) => item.trim())
						.filter((item) => item)
				: [],
		};

		try {
			const res = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(dataToSend),
			});

			if (!res.ok) throw new Error('Failed to save program');

			setIsDialogOpen(false);
			setEditingProgram(null);
			resetForm();
			loadPrograms();
			alert(editingProgram ? 'Program updated successfully!' : 'Program added successfully!');
		} catch (error) {
			console.error(error);
			alert('Something went wrong!');
		}
	};

	const handleEdit = (program) => {
		setEditingProgram(program);

		// Format dates to YYYY-MM-DD for input fields
		const formatDate = (dateString) => {
			if (!dateString) return '';
			const date = new Date(dateString);
			return date.toISOString().split('T')[0];
		};

		setFormData({
			title: program.title || '',
			slug: program.slug || '',
			description: program.description || '',
			category: program.category || '',
			duration: program.duration || '',
			eligibility: Array.isArray(program.eligibility)
				? program.eligibility.join(', ')
				: program.eligibility || '',
			benefits: Array.isArray(program.benefits)
				? program.benefits.join(', ')
				: program.benefits || '',
			deadline: formatDate(program.deadline),
			start_date: formatDate(program.start_date),
			end_date: formatDate(program.end_date),
			status: program.status || 'draft',
		});
		setIsDialogOpen(true);
	};

	const handleDelete = async (id) => {
		try {
			const res = await fetch(`${baseURL}/delete-program/${id}`, { method: 'DELETE' });
			if (!res.ok) throw new Error('Delete failed');
			alert('Program deleted successfully');
			loadPrograms();
		} catch (error) {
			console.error(error);
			alert('Failed to delete program');
		}
	};

	const resetForm = () => {
		setFormData({
			title: '',
			slug: '',
			description: '',
			category: '',
			duration: '',
			eligibility: '',
			benefits: '',
			deadline: '',
			start_date: '',
			end_date: '',
			status: 'draft',
		});
	};

	const getStatusColor = (status) => {
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

	if (loading) {
		return <div className="flex justify-center items-center h-64">Loading programs...</div>;
	}

	return (
		<div className="space-y-6 p-6">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Programs Management</h2>
					<p className="text-muted-foreground">
						Manage all your incubation programs easily
					</p>
				</div>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={resetForm}>
							<Plus className="w-4 h-4 mr-2" />
							Add Program
						</Button>
					</DialogTrigger>

					<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>
								{editingProgram ? 'Edit Program' : 'Add New Program'}
							</DialogTitle>
						</DialogHeader>

						<form onSubmit={handleSubmit} className="space-y-4">
							{/* Title & Slug */}
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label>Title *</Label>
									<Input
										value={formData.title}
										onChange={(e) =>
											setFormData({ ...formData, title: e.target.value })
										}
										required
									/>
								</div>
								<div>
									<Label>Slug</Label>
									<Input
										value={formData.slug}
										onChange={(e) =>
											setFormData({ ...formData, slug: e.target.value })
										}
										placeholder="auto-generated from title"
									/>
								</div>
							</div>

							{/* Description */}
							<div>
								<Label>Description *</Label>
								<Textarea
									rows={4}
									value={formData.description}
									onChange={(e) =>
										setFormData({ ...formData, description: e.target.value })
									}
									required
								/>
							</div>

							{/* Category & Duration */}
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label>Category</Label>
									<Select
										value={formData.category}
										onValueChange={(value) =>
											setFormData({ ...formData, category: value })
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select category" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="pre-incubation">
												Pre-Incubation
											</SelectItem>
											<SelectItem value="incubation">Incubation</SelectItem>
											<SelectItem value="acceleration">
												Acceleration
											</SelectItem>
											<SelectItem value="mentorship">Mentorship</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div>
									<Label>Duration</Label>
									<Input
										placeholder="e.g., 6 months"
										value={formData.duration}
										onChange={(e) =>
											setFormData({ ...formData, duration: e.target.value })
										}
									/>
								</div>
							</div>

							{/* Eligibility */}
							<div>
								<Label>Eligibility</Label>
								<Textarea
									rows={2}
									value={formData.eligibility}
									onChange={(e) =>
										setFormData({ ...formData, eligibility: e.target.value })
									}
								/>
							</div>

							{/* Benefits */}
							<div>
								<Label>Benefits (comma-separated)</Label>
								<Textarea
									rows={2}
									placeholder="Mentorship, Funding, Office Space"
									value={formData.benefits}
									onChange={(e) =>
										setFormData({ ...formData, benefits: e.target.value })
									}
								/>
							</div>

							{/* Dates */}
							<div className="grid grid-cols-3 gap-4">
								<div>
									<Label>Deadline</Label>
									<Input
										type="date"
										value={formData.deadline}
										onChange={(e) =>
											setFormData({
												...formData,
												deadline: e.target.value,
											})
										}
									/>
								</div>
								<div>
									<Label>Start</Label>
									<Input
										type="date"
										value={formData.start_date}
										onChange={(e) =>
											setFormData({ ...formData, start_date: e.target.value })
										}
									/>
								</div>
								<div>
									<Label>End</Label>
									<Input
										type="date"
										value={formData.end_date}
										onChange={(e) =>
											setFormData({ ...formData, end_date: e.target.value })
										}
									/>
								</div>
							</div>

							{/* Buttons */}
							<div className="flex justify-end space-x-2">
								<Button
									type="button"
									variant="outline"
									onClick={() => setIsDialogOpen(false)}
								>
									Cancel
								</Button>
								<Button type="submit">
									{editingProgram ? 'Update' : 'Create'} Program
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			{/* Program Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{programs.length > 0 ? (
					programs.map((program) => (
						<Card key={program._id}>
							<CardHeader className="flex flex-row justify-between items-start">
								<div>
									<CardTitle className="flex items-center gap-2">
										{program.title}
										{program.featured && (
											<Badge variant="secondary">Featured</Badge>
										)}
									</CardTitle>
									<div className="flex gap-2 mt-2">
										<Badge className={getStatusColor(program.status)}>
											{program.status}
										</Badge>
										{program.category && (
											<Badge variant="outline">{program.category}</Badge>
										)}
									</div>
								</div>
								<div className="flex gap-2">
									<Button
										size="sm"
										variant="outline"
										onClick={() => handleEdit(program)}
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
												<AlertDialogTitle>Delete Program</AlertDialogTitle>
												<AlertDialogDescription>
													Are you sure you want to delete “{program.title}
													”? This cannot be undone.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction
													onClick={() => handleDelete(program._id)}
												>
													Delete
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</div>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground mb-3">
									{program.description?.slice(0, 100)}...
								</p>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
									{program.deadline && (
										<div className="flex items-center gap-1">
											<Calendar className="w-3 h-3" /> Deadline:{' '}
											{new Date(program.deadline).toLocaleDateString()}
										</div>
									)}
									{program.start_date && (
										<div className="flex items-center gap-1">
											<Clock className="w-3 h-3" /> Start:{' '}
											{new Date(program.start_date).toLocaleDateString()}
										</div>
									)}
									{program.benefits && (
										<div className="flex items-center gap-1">
											<Users className="w-3 h-3" /> Benefits:{' '}
											{Array.isArray(program.benefits)
												? program.benefits.length
												: 0}
										</div>
									)}
								</div>
							</CardContent>
						</Card>
					))
				) : (
					<div className="text-center text-muted-foreground py-10">
						No programs found.
					</div>
				)}
			</div>
		</div>
	);
}
