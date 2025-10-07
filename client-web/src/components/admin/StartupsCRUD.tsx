import React, { useState, useEffect } from 'react';
import { DatabaseService } from '@/lib/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Edit, Trash2, ExternalLink, MapPin, Users, DollarSign } from 'lucide-react';
// import { toast } from 'sonner';

interface Startup {
  id: string;
  title: string;
  slug: string;
  description: string;
  founder_name: string | null;
  founded_year: number | null;
  industry: string | null;
  stage: string | null;
  website: string | null;
  linkedin_url: string | null;
  twitter_handle: string | null;
  logo_url: string | null;
  images: string[] | null;
  funding_amount: number | null;
  funding_stage: string | null;
  team_size: number | null;
  location: string | null;
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export default function StartupsCRUD() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingStartup, setEditingStartup] = useState<Startup | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    founder_name: '',
    founded_year: '',
    industry: '',
    stage: '',
    website: '',
    linkedin_url: '',
    twitter_handle: '',
    logo_url: '',
    images: '',
    funding_amount: '',
    funding_stage: '',
    team_size: '',
    location: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
    featured: false,
  });

  useEffect(() => {
    loadStartups();
  }, []);

  const loadStartups = async () => {
    try {
      const data = await DatabaseService.getAllStartups({ published: false });
      setStartups(data);
    } catch (error) {
      console.error('Error loading startups:', error);
      alert('Failed to load startups');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const startupData = {
        ...formData,
        founded_year: formData.founded_year ? parseInt(formData.founded_year) : null,
        funding_amount: formData.funding_amount ? parseInt(formData.funding_amount) : null,
        team_size: formData.team_size ? parseInt(formData.team_size) : null,
        images: formData.images ? formData.images.split(',').map(img => img.trim()) : null,
        slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      };

      if (editingStartup) {
        await DatabaseService.updateStartup(editingStartup.id, startupData);
        alert('Startup updated successfully');
      } else {
        await DatabaseService.createStartup(startupData);
        alert('Startup created successfully');
      }

      setIsDialogOpen(false);
      resetForm();
      loadStartups();
    } catch (error) {
      console.error('Error saving startup:', error);
      alert('Failed to save startup');
    }
  };

  const handleEdit = (startup: Startup) => {
    setEditingStartup(startup);
    setFormData({
      title: startup.title,
      slug: startup.slug,
      description: startup.description,
      founder_name: startup.founder_name || '',
      founded_year: startup.founded_year?.toString() || '',
      industry: startup.industry || '',
      stage: startup.stage || '',
      website: startup.website || '',
      linkedin_url: startup.linkedin_url || '',
      twitter_handle: startup.twitter_handle || '',
      logo_url: startup.logo_url || '',
      images: startup.images ? startup.images.join(', ') : '',
      funding_amount: startup.funding_amount?.toString() || '',
      funding_stage: startup.funding_stage || '',
      team_size: startup.team_size?.toString() || '',
      location: startup.location || '',
      status: startup.status,
      featured: startup.featured,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await DatabaseService.deleteStartup(id);
      alert('Startup deleted successfully');
      loadStartups();
    } catch (error) {
      console.error('Error deleting startup:', error);
      alert('Failed to delete startup');
    }
  };

  const resetForm = () => {
    setEditingStartup(null);
    setFormData({
      title: '',
      slug: '',
      description: '',
      founder_name: '',
      founded_year: '',
      industry: '',
      stage: '',
      website: '',
      linkedin_url: '',
      twitter_handle: '',
      logo_url: '',
      images: '',
      funding_amount: '',
      funding_stage: '',
      team_size: '',
      location: '',
      status: 'draft',
      featured: false,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number | null) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading startups...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Startups Management</h2>
          <p className="text-muted-foreground">Manage portfolio startups and their information</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Startup
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingStartup ? 'Edit Startup' : 'Add New Startup'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Company Name *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="auto-generated from name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="founder_name">Founder Name</Label>
                  <Input
                    id="founder_name"
                    value={formData.founder_name}
                    onChange={(e) => setFormData({ ...formData, founder_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="founded_year">Founded Year</Label>
                  <Input
                    id="founded_year"
                    type="number"
                    value={formData.founded_year}
                    onChange={(e) => setFormData({ ...formData, founded_year: e.target.value })}
                    placeholder="2023"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Agriculture">Agriculture</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="E-commerce">E-commerce</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stage">Stage</Label>
                  <Select value={formData.stage} onValueChange={(value) => setFormData({ ...formData, stage: value })}>
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
                  <Label htmlFor="funding_amount">Funding Amount (₹)</Label>
                  <Input
                    id="funding_amount"
                    type="number"
                    value={formData.funding_amount}
                    onChange={(e) => setFormData({ ...formData, funding_amount: e.target.value })}
                    placeholder="5000000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="funding_stage">Funding Stage</Label>
                  <Select value={formData.funding_stage} onValueChange={(value) => setFormData({ ...formData, funding_stage: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select funding stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pre-seed">Pre-seed</SelectItem>
                      <SelectItem value="seed">Seed</SelectItem>
                      <SelectItem value="series-a">Series A</SelectItem>
                      <SelectItem value="series-b">Series B</SelectItem>
                      <SelectItem value="series-c">Series C</SelectItem>
                      <SelectItem value="ipo">IPO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="team_size">Team Size</Label>
                  <Input
                    id="team_size"
                    type="number"
                    value={formData.team_size}
                    onChange={(e) => setFormData({ ...formData, team_size: e.target.value })}
                    placeholder="5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Ahmedabad, Gujarat"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://startup.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                  <Input
                    id="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                    placeholder="https://linkedin.com/company/startup"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter_handle">Twitter Handle</Label>
                  <Input
                    id="twitter_handle"
                    value={formData.twitter_handle}
                    onChange={(e) => setFormData({ ...formData, twitter_handle: e.target.value })}
                    placeholder="@startup"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="logo_url">Logo URL</Label>
                  <Input
                    id="logo_url"
                    value={formData.logo_url}
                    onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="images">Additional Images (comma-separated)</Label>
                  <Input
                    id="images"
                    value={formData.images}
                    onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                    placeholder="https://..., https://..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: 'draft' | 'published' | 'archived') => setFormData({ ...formData, status: value })}>
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
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  <Label htmlFor="featured">Featured</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingStartup ? 'Update' : 'Create'} Startup
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {startups.map((startup) => (
          <Card key={startup.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    {startup.title}
                    {startup.featured && <Badge variant="secondary">Featured</Badge>}
                  </CardTitle>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge className={getStatusColor(startup.status)}>
                      {startup.status}
                    </Badge>
                    {startup.industry && (
                      <Badge variant="outline">{startup.industry}</Badge>
                    )}
                    {startup.stage && (
                      <Badge variant="outline">{startup.stage}</Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(startup)}>
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
                          Are you sure you want to delete "{startup.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(startup.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{startup.description.slice(0, 200)}...</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {startup.founder_name && (
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>Founder: {startup.founder_name}</span>
                  </div>
                )}
                {startup.founded_year && (
                  <div className="flex items-center gap-1">
                    <span>Founded: {startup.founded_year}</span>
                  </div>
                )}
                {startup.funding_amount && (
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    <span>{formatCurrency(startup.funding_amount)}</span>
                  </div>
                )}
                {startup.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{startup.location}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 mt-4">
                {startup.website && (
                  <a
                    href={startup.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Website
                  </a>
                )}
                {startup.linkedin_url && (
                  <a
                    href={startup.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    LinkedIn
                  </a>
                )}
                {startup.twitter_handle && (
                  <a
                    href={`https://twitter.com/${startup.twitter_handle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Twitter
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {startups.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No startups found. Create your first startup!</p>
          </div>
        )}
      </div>
    </div>
  );
}