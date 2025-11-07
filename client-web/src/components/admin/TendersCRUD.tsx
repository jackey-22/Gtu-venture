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
import {
	Plus,
	Edit,
	Trash2,
	FileText,
	Eye,
	Folder,
	File,
	Layers,
	Calendar,
	Bookmark,
	Tag,
	BadgeInfo,
	Download,
	History,
	ExternalLink,
} from 'lucide-react';
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

interface TenderType {
	_id: string;
	title: string;
	summary?: string;
	tags?: string[];
	url?: string;
	fileUrl?: string;
	date?: string;
	closingDate?: string;
	type: 'circular' | 'tender';
	status: 'draft' | 'published' | 'archived';
	parentId?: string;
	version?: number;
	previousData?: any;
	isLatest?: boolean;
}

export default function TendersCRUD() {
	const [tenders, setTenders] = useState<TenderType[]>([]);
	const [loading, setLoading] = useState(true);
	const [actionLoading, setActionLoading] = useState(false);
	const [editingTender, setEditingTender] = useState<TenderType | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isFailedTenderEdit, setIsFailedTenderEdit] = useState(false);
	const [viewingTender, setViewingTender] = useState<TenderType[] | null>(null);
	const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
	const [formData, setFormData] = useState({
		title: '',
		summary: '',
		tags: '',
		url: '',
		fileUrl: '',
		date: '',
		closingDate: '',
		type: 'tender' as 'circular' | 'tender',
		status: 'draft' as 'draft' | 'published' | 'archived',
	});
	const [file, setFile] = useState<File | null>(null);

	useEffect(() => {
		fetchTenders();
	}, []);

	const fetchTenders = async () => {
		setLoading(true);
		try {
			const data = await fetchGet({ pathName: 'admin/get-circulars' });
			// Filter only tenders
			const tendersData = Array.isArray(data)
				? data.filter((item: TenderType) => item.type === 'tender')
				: [];
			setTenders(tendersData);
		} catch (error) {
			console.error('Error fetching tenders:', error);
			alert('Failed to fetch tenders');
		} finally {
			setLoading(false);
		}
	};

	// Group tenders by parentId for table display
	const groupedTenders = () => {
		const tenderMap = new Map<string, TenderType[]>();

		tenders.forEach((tender) => {
			const parentId = (tender.parentId || tender._id).toString();

			// Group by parentId
			if (!tenderMap.has(parentId)) {
				tenderMap.set(parentId, []);
			}
			tenderMap.get(parentId)!.push(tender);
		});

		// Sort versions within each group (latest first)
		tenderMap.forEach((versions) => {
			versions.sort((a, b) => (b.version || 1) - (a.version || 1));
		});

		return Array.from(tenderMap.values());
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
			} else if (formData.fileUrl && editingTender) {
				// Keep existing file URL if no new file
				formDataToSend.append('fileUrl', formData.fileUrl);
			}

			// Add flag for failed tender edit
			if (editingTender && isFailedTenderEdit) {
				formDataToSend.append('isFailedTenderEdit', 'true');
			}

			const pathName = editingTender
				? `admin/update-circular/${editingTender._id}`
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
					editingTender
						? isFailedTenderEdit
							? 'Tender updated with new version (failed tender)'
							: 'Tender updated successfully'
						: 'Tender added successfully'
				);
				setIsDialogOpen(false);
				resetForm();
				await fetchTenders();
			} else {
				alert(data?.message || 'Something went wrong');
			}
		} catch (error) {
			console.error('Error saving tender:', error);
			alert('Failed to save tender');
		} finally {
			setActionLoading(false);
		}
	};

	const handleEdit = (tender: TenderType, isFailed: boolean = false) => {
		setEditingTender(tender);
		setIsFailedTenderEdit(isFailed);
		setFormData({
			title: tender.title || '',
			summary: tender.summary || '',
			tags: tender.tags?.join(', ') || '',
			url: tender.url || '',
			fileUrl: tender.fileUrl || '',
			date: tender.date ? new Date(tender.date).toISOString().split('T')[0] : '',
			closingDate: tender.closingDate
				? new Date(tender.closingDate).toISOString().split('T')[0]
				: '',
			type: 'tender',
			status: tender.status,
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
				alert('Tender deleted successfully');
				await fetchTenders();
			} else {
				alert(data?.message || 'Failed to delete tender');
			}
		} catch (error) {
			console.error('Error deleting tender:', error);
			alert('Failed to delete tender');
		} finally {
			setActionLoading(false);
		}
	};

	const resetForm = () => {
		setEditingTender(null);
		setIsFailedTenderEdit(false);
		setFormData({
			title: '',
			summary: '',
			tags: '',
			url: '',
			fileUrl: '',
			date: '',
			closingDate: '',
			type: 'tender',
			status: 'draft',
		});
		setFile(null);
	};

	if (loading || actionLoading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
					<p className="mt-3 text-primary">Loading Tenders...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold">Tenders Management</h2>
					<p className="text-muted-foreground">Manage All Tenders</p>
				</div>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={resetForm}>
							<Plus className="w-4 h-4 mr-2" />
							Add Tender
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>
								{editingTender
									? isFailedTenderEdit
										? 'Edit Failed Tender (New Version)'
										: 'Edit Tender'
									: 'Add Tender'}
							</DialogTitle>
							{editingTender && isFailedTenderEdit && (
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
									<Label>Date</Label>
									<Input
										type="date"
										value={formData.date}
										onChange={(e) =>
											setFormData({ ...formData, date: e.target.value })
										}
									/>
								</div>
								<div>
									<Label>Closing Date</Label>
									<Input
										type="date"
										value={formData.closingDate}
										onChange={(e) =>
											setFormData({
												...formData,
												closingDate: e.target.value,
											})
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
								{actionLoading ? 'Saving...' : editingTender ? 'Update' : 'Add'}
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			{/* Tenders Table View */}
			{groupedTenders().length > 0 ? (
				<div className="space-y-4">
					<div className="border border-b-0 rounded-lg overflow-hidden">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="font-bold text-base">Sr No.</TableHead>
									<TableHead className="font-bold text-base">Title</TableHead>
									<TableHead className="font-bold text-base">Summary</TableHead>
									<TableHead className="font-bold text-base">File</TableHead>
									<TableHead className="font-bold text-base">Status</TableHead>
									<TableHead className="font-bold text-base">Date</TableHead>
									<TableHead className="font-bold text-base">
										Closing Date
									</TableHead>
									<TableHead className="font-bold text-base">Actions</TableHead>
								</TableRow>
							</TableHeader>

							<TableBody>
								{groupedTenders().map((versions, index) => {
									const latest = versions[0];

									return (
										<>
											<TableRow key={latest._id} className={`bg-muted/20 `}>
												<TableCell>{index + 1}</TableCell>
												<TableCell className="font-medium text-base">
													{latest.title}{' '}
													<span className="text-primary">(Latest)</span>
												</TableCell>
												<TableCell className="text-base">
													{latest.summary}
												</TableCell>
												<TableCell>
													{latest.fileUrl || latest.url ? (
														<a
															href={
																latest.fileUrl
																	? `${baseURL}${latest.fileUrl.replace(
																			/\\/g,
																			'/'
																	  )}`
																	: latest.url
															}
															target="_blank"
															rel="noopener noreferrer"
															className="text-primary underline text-sm"
														>
															View File
														</a>
													) : (
														'No File'
													)}
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
													{latest.closingDate
														? new Date(
																latest.closingDate
														  ).toLocaleDateString()
														: '-'}
												</TableCell>
												<TableCell>
													<div className="flex gap-2">
														<Button
															variant="outline"
															size="sm"
															onClick={() =>
																handleEdit(latest, false)
															}
														>
															<Edit className="w-4 h-4" />
														</Button>
														<Button
															variant="secondary"
															size="sm"
															onClick={() => handleEdit(latest, true)}
														>
															<FileText className="w-4 h-4" />
														</Button>
														<Button
															variant="destructive"
															size="sm"
															onClick={() => handleDelete(latest._id)}
														>
															<Trash2 className="w-4 h-4" />
														</Button>
													</div>
												</TableCell>
											</TableRow>

											{/* ✅ Full-width separator */}
											<tr>
												<td colSpan={8} className="border-none"></td>
											</tr>

											{/* ✅ Old Versions as separate rows */}
											{versions.slice(1).map((old, idx) => (
												<React.Fragment key={old._id || idx}>
													<TableRow className="bg-white">
														<TableCell></TableCell>
														<TableCell className="text-sm text-muted-foreground">
															{old.title}
														</TableCell>
														<TableCell className="text-sm text-muted-foreground">
															{old.summary}
														</TableCell>
														<TableCell>
															{old.fileUrl || old.url ? (
																<a
																	href={
																		old.fileUrl
																			? `${baseURL}${old.fileUrl.replace(
																					/\\/g,
																					'/'
																			  )}`
																			: old.url
																	}
																	target="_blank"
																	rel="noopener noreferrer"
																	className="text-primary underline text-xs"
																>
																	View File
																</a>
															) : (
																'No File'
															)}
														</TableCell>
														<TableCell>
															<Badge variant="secondary">
																{old.status}
															</Badge>
														</TableCell>
														<TableCell className="text-sm">
															{old.date
																? new Date(
																		old.date
																  ).toLocaleDateString()
																: '-'}
														</TableCell>
														<TableCell className="text-sm">
															{old.closingDate
																? new Date(
																		old.closingDate
																  ).toLocaleDateString()
																: '-'}
														</TableCell>
														<TableCell></TableCell>
													</TableRow>

													{/* ✅ Divider between old entries */}
													<tr>
														<td
															colSpan={8}
															className="border-none border-muted/40"
														></td>
													</tr>
												</React.Fragment>
											))}
										</>
									);
								})}
							</TableBody>
						</Table>
					</div>
				</div>
			) : (
				<div className="text-center text-muted-foreground py-8">No tenders found</div>
			)}

			<Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
				<DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-6">
					{viewingTender && viewingTender.length > 0 && (
						<>
							<DialogHeader>
								<DialogTitle className="text-2xl font-bold flex items-center gap-3">
									<FileText className="w-6 h-6 text-primary" />
									{viewingTender[0].title}
								</DialogTitle>
								<DialogDescription className="flex items-center text-base gap-2">
									<Folder className="w-4 h-4" />
									Total {viewingTender.length} Document(s)
								</DialogDescription>
							</DialogHeader>

							<Tabs
								defaultValue={`v${viewingTender[0].version || 1}`}
								className="w-full"
							>
								<TabsList className="grid w-full grid-cols-3 gap-2">
									{viewingTender.map((version) => (
										<TabsTrigger
											key={version._id}
											value={`v${version.version || 1}`}
											className="text-xs sm:text-sm"
										>
											<File className="w-4 h-4 mr-1" />
											Doc {version.version || 1}
											{version.version !== 1 && version.isLatest && (
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
										className="mt-6"
									>
										<div className="rounded-xl border bg-card p-6 space-y-4 shadow-sm">
											<div className="flex justify-between items-start flex-wrap gap-3">
												<div className="flex items-center gap-2">
													<Layers className="h-5 w-5 text-primary" />
													<p className="font-semibold text-lg">
														Document {version.version || 1}
													</p>
												</div>

												{version.date && (
													<div className="flex items-center gap-2 text-sm text-muted-foreground">
														<Calendar className="w-4 h-4" />
														<span>
															Date:{' '}
															{new Date(
																version.date
															).toLocaleDateString()}
														</span>
													</div>
												)}
												{version.closingDate && (
													<div className="flex items-center gap-2 text-sm text-muted-foreground">
														<Calendar className="w-4 h-4" />
														<span>
															Closing Date:{' '}
															{new Date(
																version.closingDate
															).toLocaleDateString()}
														</span>
													</div>
												)}
											</div>

											<div className="grid gap-3">
												<div className="flex gap-2 items-start">
													<Bookmark className="h-4 w-4 text-primary mt-1" />
													<div>
														<strong>Title:</strong> {version.title}
													</div>
												</div>

												{version.summary && (
													<div className="flex gap-2 items-start">
														<FileText className="h-4 w-4 text-primary mt-1" />
														<div>
															<strong>Summary:</strong>{' '}
															{version.summary}
														</div>
													</div>
												)}

												{version.tags?.length > 0 && (
													<div className="flex gap-2 items-start">
														<Tag className="h-4 w-4 text-primary mt-1" />
														<div className="flex flex-wrap gap-1">
															{version.tags.map((tag, i) => (
																<Badge key={i} variant="outline">
																	{tag}
																</Badge>
															))}
														</div>
													</div>
												)}

												<div className="flex gap-2 items-center">
													<BadgeInfo className="h-4 w-4 text-primary" />
													<strong>Status:</strong>
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
													<div className="flex gap-2 items-center">
														<Download className="h-4 w-4 text-primary" />
														<a
															href={`${baseURL}${version.fileUrl.replace(
																/\\/g,
																'/'
															)}`}
															target="_blank"
															rel="noopener noreferrer"
															className="text-primary font-medium underline hover:opacity-80"
														>
															View / Download File
														</a>
													</div>
												)}

												{version.url && (
													<div className="flex gap-2 items-center">
														<ExternalLink className="h-4 w-4 text-primary" />
														<a
															href={version.url}
															target="_blank"
															rel="noopener noreferrer"
															className="text-primary font-medium underline hover:opacity-80"
														>
															{version.url}
														</a>
													</div>
												)}

												{version.previousData && (
													<div className="mt-2 py-2 px-4 rounded-lg bg-muted border-l-4 border-primary">
														<div className="flex items-center gap-2 text-sm font-bold text-primary">
															<History className="h-4 w-4" />
															Previous Doc({version.version - 1})
														</div>
														<div className="mt-2 text-sm space-y-1">
															<p>
																<strong>Title:</strong>{' '}
																{version.previousData.title}
															</p>
															{version.previousData.date && (
																<p>
																	<strong>Date:</strong>{' '}
																	{new Date(
																		version.previousData.date
																	).toLocaleDateString()}
																</p>
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
