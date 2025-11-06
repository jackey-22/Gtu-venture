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
	DialogDescription,
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
import { Plus, Edit, Trash2, FileText, Eye } from 'lucide-react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const baseURL = import.meta.env.VITE_URL;

interface CircularType {
	_id: string;
	title: string;
	summary?: string;
	tags?: string[];
	url?: string;
	fileUrl?: string;
	date?: string;
	type: 'circular' | 'tender';
	status: 'draft' | 'published' | 'archived';
	parentId?: string;
	version?: number;
	previousData?: any;
	isLatest?: boolean;
}

export default function CircularsCRUD() {
	const [circulars, setCirculars] = useState<CircularType[]>([]);
	const [loading, setLoading] = useState(true);
	const [actionLoading, setActionLoading] = useState(false);
	const [editingCircular, setEditingCircular] = useState<CircularType | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isFailedTenderEdit, setIsFailedTenderEdit] = useState(false);
	const [viewingTender, setViewingTender] = useState<CircularType[] | null>(null);
	const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
	const [formData, setFormData] = useState({
		title: '',
		summary: '',
		tags: '',
		url: '',
		fileUrl: '',
		date: '',
		type: 'circular' as 'circular' | 'tender',
		status: 'draft' as 'draft' | 'published' | 'archived',
	});
	const [file, setFile] = useState<File | null>(null);

	useEffect(() => {
		fetchCirculars();
	}, []);

	const fetchCirculars = async () => {
		setLoading(true);
		try {
			const data = await fetchGet({ pathName: 'admin/get-circulars' });
			setCirculars(Array.isArray(data) ? data : []);
		} catch (error) {
			console.error('Error fetching circulars:', error);
			alert('Failed to fetch circulars');
		} finally {
			setLoading(false);
		}
	};

	// Group tenders by parentId for table display
	const groupedTenders = () => {
		const tenderMap = new Map<string, CircularType[]>();
		const circularsList: CircularType[] = [];
		const processedParentIds = new Set<string>();

		circulars.forEach((circular) => {
			if (circular.type === 'tender') {
				const parentId = (circular.parentId || circular._id).toString();
				
				// Group by parentId
				if (!tenderMap.has(parentId)) {
					tenderMap.set(parentId, []);
				}
				tenderMap.get(parentId)!.push(circular);
			} else {
				circularsList.push(circular);
			}
		});

		// Sort versions within each group (latest first)
		tenderMap.forEach((versions) => {
			versions.sort((a, b) => (b.version || 1) - (a.version || 1));
		});

		return { tenders: Array.from(tenderMap.values()), circulars: circularsList };
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setActionLoading(true);
		const token = localStorage.getItem('token');
		try {
			const formDataToSend = new FormData();
			Object.entries(formData).forEach(([key, value]) => {
				if (key !== 'fileUrl' && key !== 'tags' && value !== null && value !== undefined) {
					formDataToSend.append(key, value as string);
				}
			});
			if (formData.tags) {
				const tagsArray = formData.tags
					.split(',')
					.map((t) => t.trim())
					.filter(Boolean);
				// Send tags as comma-separated string, backend will parse it
				formDataToSend.append('tags', tagsArray.join(','));
			}
			if (file) {
				formDataToSend.append('file', file);
			} else if (formData.fileUrl && editingCircular) {
				// Keep existing file URL if no new file
				formDataToSend.append('fileUrl', formData.fileUrl);
			}

			// Add flag for failed tender edit
			if (editingCircular && isFailedTenderEdit) {
				formDataToSend.append('isFailedTenderEdit', 'true');
			}

			const pathName = editingCircular
				? `admin/update-circular/${editingCircular._id}`
				: 'admin/add-circular';
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
					editingCircular
						? isFailedTenderEdit
							? 'Tender updated with new version (failed tender)'
							: 'Circular updated successfully'
						: 'Circular added successfully'
				);
				setIsDialogOpen(false);
				resetForm();
				await fetchCirculars();
			} else {
				alert(data?.message || 'Something went wrong');
			}
		} catch (error) {
			console.error('Error saving circular:', error);
			alert('Failed to save circular');
		} finally {
			setActionLoading(false);
		}
	};

	const handleEdit = (circular: CircularType, isFailed: boolean = false) => {
		setEditingCircular(circular);
		setIsFailedTenderEdit(isFailed);
		setFormData({
			title: circular.title || '',
			summary: circular.summary || '',
			tags: circular.tags?.join(', ') || '',
			url: circular.url || '',
			fileUrl: circular.fileUrl || '',
			date: circular.date ? new Date(circular.date).toISOString().split('T')[0] : '',
			type: circular.type,
			status: circular.status,
		});
		setFile(null);
		setIsDialogOpen(true);
	};

	const handleDelete = async (id: string) => {
		setActionLoading(true);
		try {
			const data = await fetchPost({
				pathName: `admin/delete-circular/${id}`,
				body: JSON.stringify({}),
			});
			if (data?.message?.toLowerCase().includes('deleted')) {
				alert('Circular deleted successfully');
				await fetchCirculars();
			} else {
				alert(data?.message || 'Failed to delete circular');
			}
		} catch (error) {
			console.error('Error deleting circular:', error);
			alert('Failed to delete circular');
		} finally {
			setActionLoading(false);
		}
	};

	const resetForm = () => {
		setEditingCircular(null);
		setIsFailedTenderEdit(false);
		setFormData({
			title: '',
			summary: '',
			tags: '',
			url: '',
			fileUrl: '',
			date: '',
			type: 'circular',
			status: 'draft',
		});
		setFile(null);
	};

	if (loading || actionLoading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
					<p className="mt-3 text-primary">Loading Circulars...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Circulars Management</h2>
					<p className="text-muted-foreground">Manage All Circulars and Tenders</p>
				</div>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={resetForm}>
							<Plus className="w-4 h-4 mr-2" />
							Add Circular
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>
								{editingCircular
									? isFailedTenderEdit
										? 'Edit Failed Tender (New Version)'
										: 'Edit Circular'
									: 'Add Circular'}
							</DialogTitle>
							{editingCircular && isFailedTenderEdit && (
								<p className="text-sm text-muted-foreground">
									This will create a new version while preserving the old data.
								</p>
							)}
						</DialogHeader>
						<form onSubmit={handleSubmit} className="space-y-4">
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
								<Label>Summary</Label>
								<Textarea
									value={formData.summary}
									onChange={(e) =>
										setFormData({ ...formData, summary: e.target.value })
									}
								/>
							</div>
							<div>
								<Label>Tags (comma separated)</Label>
								<Input
									value={formData.tags}
									onChange={(e) =>
										setFormData({ ...formData, tags: e.target.value })
									}
									placeholder="intake, program, policy"
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label>Type</Label>
									<Select
										value={formData.type}
										onValueChange={(value: any) =>
											setFormData({ ...formData, type: value })
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="circular">Circular</SelectItem>
											<SelectItem value="tender">Tender</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div>
									<Label>Date</Label>
									<Input
										type="date"
										value={formData.date}
										onChange={(e) =>
											setFormData({ ...formData, date: e.target.value })
										}
									/>
								</div>
							</div>
							<div>
								<Label>File</Label>
								{file ? (
									<div className="flex items-center gap-2">
										<span className="text-sm">{file.name}</span>
										<Button
											type="button"
											variant="outline"
											size="sm"
											onClick={() => setFile(null)}
										>
											Remove
										</Button>
									</div>
								) : (
									<div className="flex items-center gap-2">
										<Input
											type="file"
											accept=".pdf,.doc,.docx"
											onChange={(e) => setFile(e.target.files?.[0] || null)}
											className="cursor-pointer"
										/>
										{formData.fileUrl && (
											<a
												href={`${baseURL}${formData.fileUrl.replace(
													/\\/g,
													'/'
												)}`}
												target="_blank"
												rel="noopener noreferrer"
												className="text-sm text-primary"
											>
												View current file
											</a>
										)}
									</div>
								)}
							</div>
							<div>
								<Label>URL (alternative to file)</Label>
								<Input
									value={formData.url}
									onChange={(e) =>
										setFormData({ ...formData, url: e.target.value })
									}
									placeholder="https://..."
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
								{actionLoading ? 'Saving...' : editingCircular ? 'Update' : 'Add'}
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			{/* Tenders Table View */}
			{groupedTenders().tenders.length > 0 && (
				<div className="space-y-4">
					<h3 className="text-xl font-bold">Tenders</h3>
					<div className="border rounded-lg overflow-hidden">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Title</TableHead>
									<TableHead>Data (Old / New)</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Date</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{groupedTenders().tenders.map((versions) => {
									const latest = versions[0];
									const secondLatest = versions[1] || null;
									// Show latest 2 versions in table
									return (
										<TableRow key={latest._id}>
											<TableCell className="font-medium">
												<div className="flex items-center gap-2">
													{latest.title}
													{latest.version && latest.version > 1 && (
														<Badge variant="outline" className="text-xs">
															v{latest.version}
														</Badge>
													)}
												</div>
											</TableCell>
											<TableCell>
												<div className="space-y-2">
													{/* Latest Version */}
													<div className="text-xs space-y-1 p-2 bg-primary/5 rounded border-l-2 border-primary">
														<div className="font-semibold text-primary mb-1">
															v{latest.version || 1} (Latest):
														</div>
														<div>
															<strong>Title:</strong> {latest.title}
														</div>
														{latest.summary && (
															<div>
																<strong>Summary:</strong>{' '}
																{latest.summary.substring(0, 80)}
																{latest.summary.length > 80 && '...'}
															</div>
														)}
														{latest.date && (
															<div>
																<strong>Date:</strong>{' '}
																{new Date(latest.date).toLocaleDateString()}
															</div>
														)}
													</div>
													{/* Second Latest Version (if exists) */}
													{secondLatest && (
														<div className="text-xs space-y-1 p-2 bg-muted rounded border-l-2 border-muted-foreground">
															<div className="font-semibold text-muted-foreground mb-1">
																v{secondLatest.version || 1}:
															</div>
															<div>
																<strong>Title:</strong> {secondLatest.title}
															</div>
															{secondLatest.summary && (
																<div>
																	<strong>Summary:</strong>{' '}
																	{secondLatest.summary.substring(0, 80)}
																	{secondLatest.summary.length > 80 && '...'}
																</div>
															)}
															{secondLatest.date && (
																<div>
																	<strong>Date:</strong>{' '}
																	{new Date(secondLatest.date).toLocaleDateString()}
																</div>
															)}
														</div>
													)}
													{versions.length > 2 && (
														<div className="text-xs text-muted-foreground italic">
															+ {versions.length - 2} more version(s) - Click View to see all
														</div>
													)}
												</div>
											</TableCell>
											<TableCell>
												<Badge
													variant={
														latest.status === 'published'
															? 'default'
															: 'secondary'
													}
												>
													{latest.status}
												</Badge>
											</TableCell>
											<TableCell>
												{latest.date
													? new Date(latest.date).toLocaleDateString()
													: '-'}
											</TableCell>
											<TableCell>
												<div className="flex gap-2">
													<Button
														variant="ghost"
														size="sm"
														onClick={() => {
															setViewingTender(versions);
															setIsViewDialogOpen(true);
														}}
														title="View All Versions"
													>
														<Eye className="w-4 h-4" />
													</Button>
													<Button
														variant="outline"
														size="sm"
														onClick={() => handleEdit(latest, false)}
														title="Regular Edit"
													>
														<Edit className="w-4 h-4" />
													</Button>
													<Button
														variant="secondary"
														size="sm"
														onClick={() => handleEdit(latest, true)}
														title="Edit Failed Tender (Creates New Version)"
													>
														<FileText className="w-4 h-4" />
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
																	Delete Tender?
																</AlertDialogTitle>
																<AlertDialogDescription>
																	This action cannot be undone.
																</AlertDialogDescription>
															</AlertDialogHeader>
															<AlertDialogFooter>
																<AlertDialogCancel>Cancel</AlertDialogCancel>
																<AlertDialogAction
																	onClick={() => handleDelete(latest._id)}
																>
																	Delete
																</AlertDialogAction>
															</AlertDialogFooter>
														</AlertDialogContent>
													</AlertDialog>
												</div>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</div>
				</div>
			)}

			{/* Circulars Card View */}
			{groupedTenders().circulars.length > 0 && (
				<div className="space-y-4">
					<h3 className="text-xl font-bold">Circulars</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{groupedTenders().circulars.map((circular) => (
							<Card key={circular._id}>
								<CardContent className="p-4">
									<div className="flex justify-between items-start gap-3">
										<div className="flex-1 min-w-0">
											<div className="flex items-center gap-2 mb-2 flex-wrap">
												<h3 className="font-bold text-lg line-clamp-2">
													{circular.title}
												</h3>
												<Badge
													variant={
														circular.status === 'published'
															? 'default'
															: 'secondary'
													}
													className="flex-shrink-0"
												>
													{circular.status}
												</Badge>
												<Badge variant="outline" className="flex-shrink-0">
													{circular.type}
												</Badge>
											</div>
											{circular.summary && (
												<p className="text-sm text-muted-foreground line-clamp-3 mb-2">
													{circular.summary}
												</p>
											)}
											<div className="flex gap-2 flex-wrap mb-2">
												{circular.tags?.map((tag, i) => (
													<Badge key={i} variant="outline" className="text-xs">
														{tag}
													</Badge>
												))}
											</div>
											{circular.date && (
												<div className="text-xs text-muted-foreground">
													Date: {new Date(circular.date).toLocaleDateString()}
												</div>
											)}
										</div>
										<div className="flex gap-2 flex-shrink-0">
											<Button
												variant="outline"
												size="sm"
												onClick={() => handleEdit(circular)}
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
															Delete Circular?
														</AlertDialogTitle>
														<AlertDialogDescription>
															This action cannot be undone.
														</AlertDialogDescription>
													</AlertDialogHeader>
													<AlertDialogFooter>
														<AlertDialogCancel>Cancel</AlertDialogCancel>
														<AlertDialogAction
															onClick={() => handleDelete(circular._id)}
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
					</div>
				</div>
			)}

			{circulars.length === 0 && (
				<div className="text-center text-muted-foreground py-8">
					No circulars or tenders found
				</div>
			)}

			{/* View All Versions Modal */}
			<Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
				<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
					{viewingTender && viewingTender.length > 0 && (
						<>
							<DialogHeader>
								<DialogTitle className="text-2xl font-bold">
									{viewingTender[0].title} - All Versions
								</DialogTitle>
								<DialogDescription>
									Total {viewingTender.length} version(s) available
								</DialogDescription>
							</DialogHeader>
							<Tabs defaultValue={`v${viewingTender[0].version || 1}`} className="w-full">
								<TabsList className="grid w-full grid-cols-auto gap-2 overflow-x-auto">
									{viewingTender.map((version) => (
										<TabsTrigger
											key={version._id}
											value={`v${version.version || 1}`}
											className="text-xs"
										>
											v{version.version || 1}
											{version.isLatest && (
												<Badge variant="default" className="ml-1 text-xs">
													Latest
												</Badge>
											)}
										</TabsTrigger>
									))}
								</TabsList>
								{viewingTender.map((version) => (
									<TabsContent
										key={version._id}
										value={`v${version.version || 1}`}
										className="space-y-4 mt-4"
									>
										<div className="p-4 border rounded-lg">
											<div className="flex items-center justify-between mb-4">
												<h3 className="text-lg font-semibold">
													Version {version.version || 1}
													{version.isLatest && (
														<Badge variant="default" className="ml-2">
															Latest
														</Badge>
													)}
												</h3>
												{version.date && (
													<span className="text-sm text-muted-foreground">
														Date: {new Date(version.date).toLocaleDateString()}
													</span>
												)}
											</div>
											<div className="space-y-3">
												<div>
													<strong>Title:</strong> {version.title}
												</div>
												{version.summary && (
													<div>
														<strong>Summary:</strong> {version.summary}
													</div>
												)}
												{version.tags && version.tags.length > 0 && (
													<div>
														<strong>Tags:</strong>{' '}
														{version.tags.map((tag, i) => (
															<Badge key={i} variant="outline" className="mr-1">
																{tag}
															</Badge>
														))}
													</div>
												)}
												<div>
													<strong>Status:</strong>{' '}
													<Badge
														variant={
															version.status === 'published'
																? 'default'
																: 'secondary'
														}
													>
														{version.status}
													</Badge>
												</div>
												{version.fileUrl && (
													<div>
														<strong>File:</strong>{' '}
														<a
															href={`${baseURL}${version.fileUrl.replace(/\\/g, '/')}`}
															target="_blank"
															rel="noopener noreferrer"
															className="text-primary hover:underline"
														>
															View File
														</a>
													</div>
												)}
												{version.url && (
													<div>
														<strong>URL:</strong>{' '}
														<a
															href={version.url}
															target="_blank"
															rel="noopener noreferrer"
															className="text-primary hover:underline"
														>
															{version.url}
														</a>
													</div>
												)}
												{version.previousData && (
													<div className="mt-4 p-3 bg-muted rounded border-l-4 border-muted-foreground">
														<strong className="text-muted-foreground">
															Previous Version Data (v{(version.version || 1) - 1}):
														</strong>
														<div className="mt-2 space-y-1 text-sm">
															<div>
																<strong>Title:</strong> {version.previousData.title}
															</div>
															{version.previousData.summary && (
																<div>
																	<strong>Summary:</strong>{' '}
																	{version.previousData.summary}
																</div>
															)}
															{version.previousData.date && (
																<div>
																	<strong>Date:</strong>{' '}
																	{new Date(version.previousData.date).toLocaleDateString()}
																</div>
															)}
														</div>
													</div>
												)}
											</div>
										</div>
									</TabsContent>
								))}
							</Tabs>
						</>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
