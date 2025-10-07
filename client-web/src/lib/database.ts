import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Types for our database
export interface Database {
  public: {
    Tables: {
      news: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          category: string | null
          tags: string[] | null
          image_url: string | null
          author_id: string | null
          author_name: string | null
          status: 'draft' | 'published' | 'archived'
          published_at: string | null
          featured: boolean
          views: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          category?: string | null
          tags?: string[] | null
          image_url?: string | null
          author_id?: string | null
          author_name?: string | null
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          featured?: boolean
          views?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          category?: string | null
          tags?: string[] | null
          image_url?: string | null
          author_id?: string | null
          author_name?: string | null
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          featured?: boolean
          views?: number
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          start_date: string
          end_date: string | null
          location: string | null
          virtual_link: string | null
          category: string | null
          tags: string[] | null
          image_url: string | null
          registration_url: string | null
          max_attendees: number | null
          current_attendees: number
          status: 'draft' | 'published' | 'archived'
          published_at: string | null
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          start_date: string
          end_date?: string | null
          location?: string | null
          virtual_link?: string | null
          category?: string | null
          tags?: string[] | null
          image_url?: string | null
          registration_url?: string | null
          max_attendees?: number | null
          current_attendees?: number
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          start_date?: string
          end_date?: string | null
          location?: string | null
          virtual_link?: string | null
          category?: string | null
          tags?: string[] | null
          image_url?: string | null
          registration_url?: string | null
          max_attendees?: number | null
          current_attendees?: number
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      programs: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          short_description: string | null
          category: string | null
          duration: string | null
          eligibility: string | null
          benefits: string[] | null
          application_deadline: string | null
          start_date: string | null
          end_date: string | null
          image_url: string | null
          status: 'draft' | 'published' | 'archived'
          published_at: string | null
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          short_description?: string | null
          category?: string | null
          duration?: string | null
          eligibility?: string | null
          benefits?: string[] | null
          application_deadline?: string | null
          start_date?: string | null
          end_date?: string | null
          image_url?: string | null
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          short_description?: string | null
          category?: string | null
          duration?: string | null
          eligibility?: string | null
          benefits?: string[] | null
          application_deadline?: string | null
          start_date?: string | null
          end_date?: string | null
          image_url?: string | null
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      startups: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          founder_name: string | null
          founded_year: number | null
          industry: string | null
          stage: string | null
          website: string | null
          linkedin_url: string | null
          twitter_handle: string | null
          logo_url: string | null
          images: string[] | null
          funding_amount: number | null
          funding_stage: string | null
          team_size: number | null
          location: string | null
          status: 'draft' | 'published' | 'archived'
          published_at: string | null
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          founder_name?: string | null
          founded_year?: number | null
          industry?: string | null
          stage?: string | null
          website?: string | null
          linkedin_url?: string | null
          twitter_handle?: string | null
          logo_url?: string | null
          images?: string[] | null
          funding_amount?: number | null
          funding_stage?: string | null
          team_size?: number | null
          location?: string | null
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          founder_name?: string | null
          founded_year?: number | null
          industry?: string | null
          stage?: string | null
          website?: string | null
          linkedin_url?: string | null
          twitter_handle?: string | null
          logo_url?: string | null
          images?: string[] | null
          funding_amount?: number | null
          funding_stage?: string | null
          team_size?: number | null
          location?: string | null
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      gallery: {
        Row: {
          id: string
          title: string
          description: string | null
          image_url: string
          thumbnail_url: string | null
          album: string | null
          tags: string[] | null
          uploaded_by: string | null
          status: 'draft' | 'published' | 'archived'
          published_at: string | null
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          image_url: string
          thumbnail_url?: string | null
          album?: string | null
          tags?: string[] | null
          uploaded_by?: string | null
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          image_url?: string
          thumbnail_url?: string | null
          album?: string | null
          tags?: string[] | null
          uploaded_by?: string | null
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      reports: {
        Row: {
          id: string
          title: string
          description: string | null
          file_url: string
          file_name: string | null
          file_size: number | null
          file_type: string | null
          category: string | null
          tags: string[] | null
          download_count: number
          status: 'draft' | 'published' | 'archived'
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          file_url: string
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          category?: string | null
          tags?: string[] | null
          download_count?: number
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          file_url?: string
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          category?: string | null
          tags?: string[] | null
          download_count?: number
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      faqs: {
        Row: {
          id: string
          question: string
          answer: string
          category: string | null
          tags: string[] | null
          status: 'draft' | 'published' | 'archived'
          published_at: string | null
          featured: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          question: string
          answer: string
          category?: string | null
          tags?: string[] | null
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          category?: string | null
          tags?: string[] | null
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      team: {
        Row: {
          id: string
          name: string
          position: string
          bio: string | null
          image_url: string | null
          email: string | null
          phone: string | null
          linkedin_url: string | null
          twitter_handle: string | null
          status: 'draft' | 'published' | 'archived'
          published_at: string | null
          featured: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          position: string
          bio?: string | null
          image_url?: string | null
          email?: string | null
          phone?: string | null
          linkedin_url?: string | null
          twitter_handle?: string | null
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          position?: string
          bio?: string | null
          image_url?: string | null
          email?: string | null
          phone?: string | null
          linkedin_url?: string | null
          twitter_handle?: string | null
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          role: string | null
          company: string | null
          subject: string | null
          message: string
          status: 'new' | 'read' | 'replied' | 'closed'
          assigned_to: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          role?: string | null
          company?: string | null
          subject?: string | null
          message: string
          status?: 'new' | 'read' | 'replied' | 'closed'
          assigned_to?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          role?: string | null
          company?: string | null
          subject?: string | null
          message?: string
          status?: 'new' | 'read' | 'replied' | 'closed'
          assigned_to?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      applications: {
        Row: {
          id: string
          startup_name: string
          founder_name: string
          email: string
          phone: string | null
          website: string | null
          idea_description: string
          stage: string | null
          team_size: number | null
          funding_needed: number | null
          funding_secured: number | null
          industry: string | null
          location: string | null
          pitch_deck_url: string | null
          additional_documents: string[] | null
          status: 'pending' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted'
          assigned_to: string | null
          notes: string | null
          reviewed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          startup_name: string
          founder_name: string
          email: string
          phone?: string | null
          website?: string | null
          idea_description: string
          stage?: string | null
          team_size?: number | null
          funding_needed?: number | null
          funding_secured?: number | null
          industry?: string | null
          location?: string | null
          pitch_deck_url: string | null
          additional_documents?: string[] | null
          status?: 'pending' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted'
          assigned_to?: string | null
          notes?: string | null
          reviewed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          startup_name?: string
          founder_name?: string
          email?: string
          phone?: string | null
          website?: string | null
          idea_description?: string
          stage?: string | null
          team_size?: number | null
          funding_needed?: number | null
          funding_secured?: number | null
          industry?: string | null
          location?: string | null
          pitch_deck_url?: string | null
          additional_documents?: string[] | null
          status?: 'pending' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted'
          assigned_to?: string | null
          notes?: string | null
          reviewed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      partners: {
        Row: {
          id: string
          name: string
          description: string | null
          logo_url: string | null
          website: string | null
          partnership_type: string | null
          status: 'draft' | 'published' | 'archived'
          published_at: string | null
          featured: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          logo_url?: string | null
          website?: string | null
          partnership_type?: string | null
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          logo_url?: string | null
          website?: string | null
          partnership_type?: string | null
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          position: string | null
          company: string | null
          content: string
          image_url: string | null
          rating: number | null
          status: 'draft' | 'published' | 'archived'
          published_at: string | null
          featured: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          position?: string | null
          company?: string | null
          content: string
          image_url?: string | null
          rating?: number | null
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          position?: string | null
          company?: string | null
          content?: string
          image_url?: string | null
          rating?: number | null
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Supabase client setup
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

export const supabase: SupabaseClient<Database> = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  }
);

// Database service class
export class DatabaseService {
  // News operations
  static async getAllNews(options: {
    published?: boolean;
    category?: string;
    limit?: number;
    offset?: number;
  } = {}) {
    const { published = true, category, limit = 50, offset = 0 } = options;

    let query = supabase
      .from('news')
      .select('*')
      .order('published_at', { ascending: false, nullsFirst: false })
      .range(offset, offset + limit - 1);

    if (published) {
      query = query.eq('status', 'published');
    }

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  static async getNewsById(id: string) {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async getNewsBySlug(slug: string) {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) throw error;
    return data;
  }

  static async createNews(news: Database['public']['Tables']['news']['Insert']) {
    const { data, error } = await supabase
      .from('news')
      .insert(news)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateNews(id: string, updates: Database['public']['Tables']['news']['Update']) {
    const { data, error } = await supabase
      .from('news')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteNews(id: string) {
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Events operations
  static async getAllEvents(options: {
    published?: boolean;
    upcoming?: boolean;
    category?: string;
    limit?: number;
    offset?: number;
  } = {}) {
    const { published = true, upcoming = false, category, limit = 50, offset = 0 } = options;

    let query = supabase
      .from('events')
      .select('*')
      .order('start_date', { ascending: true })
      .range(offset, offset + limit - 1);

    if (published) {
      query = query.eq('status', 'published');
    }

    if (upcoming) {
      query = query.gte('start_date', new Date().toISOString());
    }

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  static async getEventById(id: string) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async getEventBySlug(slug: string) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) throw error;
    return data;
  }

  static async createEvent(event: Database['public']['Tables']['events']['Insert']) {
    const { data, error } = await supabase
      .from('events')
      .insert(event)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateEvent(id: string, updates: Database['public']['Tables']['events']['Update']) {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteEvent(id: string) {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Programs operations
  static async getAllPrograms(options: {
    published?: boolean;
    category?: string;
    limit?: number;
    offset?: number;
  } = {}) {
    const { published = true, category, limit = 50, offset = 0 } = options;

    let query = supabase
      .from('programs')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (published) {
      query = query.eq('status', 'published');
    }

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  static async getProgramById(id: string) {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async getProgramBySlug(slug: string) {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) throw error;
    return data;
  }

  static async createProgram(program: Database['public']['Tables']['programs']['Insert']) {
    const { data, error } = await supabase
      .from('programs')
      .insert(program)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateProgram(id: string, updates: Database['public']['Tables']['programs']['Update']) {
    const { data, error } = await supabase
      .from('programs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteProgram(id: string) {
    const { error } = await supabase
      .from('programs')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Startups operations
  static async getAllStartups(options: {
    published?: boolean;
    industry?: string;
    stage?: string;
    limit?: number;
    offset?: number;
  } = {}) {
    const { published = true, industry, stage, limit = 50, offset = 0 } = options;

    let query = supabase
      .from('startups')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (published) {
      query = query.eq('status', 'published');
    }

    if (industry) {
      query = query.eq('industry', industry);
    }

    if (stage) {
      query = query.eq('stage', stage);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  static async getStartupById(id: string) {
    const { data, error } = await supabase
      .from('startups')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async getStartupBySlug(slug: string) {
    const { data, error } = await supabase
      .from('startups')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) throw error;
    return data;
  }

  static async createStartup(startup: Database['public']['Tables']['startups']['Insert']) {
    const { data, error } = await supabase
      .from('startups')
      .insert(startup)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateStartup(id: string, updates: Database['public']['Tables']['startups']['Update']) {
    const { data, error } = await supabase
      .from('startups')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteStartup(id: string) {
    const { error } = await supabase
      .from('startups')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Gallery operations
  static async getAllGallery(options: {
    published?: boolean;
    album?: string;
    limit?: number;
    offset?: number;
  } = {}) {
    const { published = true, album, limit = 50, offset = 0 } = options;

    let query = supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (published) {
      query = query.eq('status', 'published');
    }

    if (album) {
      query = query.eq('album', album);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  static async getGalleryById(id: string) {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async createGalleryItem(item: Database['public']['Tables']['gallery']['Insert']) {
    const { data, error } = await supabase
      .from('gallery')
      .insert(item)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateGalleryItem(id: string, updates: Database['public']['Tables']['gallery']['Update']) {
    const { data, error } = await supabase
      .from('gallery')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteGalleryItem(id: string) {
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Reports operations
  static async getAllReports(options: {
    published?: boolean;
    category?: string;
    limit?: number;
    offset?: number;
  } = {}) {
    const { published = true, category, limit = 50, offset = 0 } = options;

    let query = supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (published) {
      query = query.eq('status', 'published');
    }

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  static async getReportById(id: string) {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async createReport(report: Database['public']['Tables']['reports']['Insert']) {
    const { data, error } = await supabase
      .from('reports')
      .insert(report)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateReport(id: string, updates: Database['public']['Tables']['reports']['Update']) {
    const { data, error } = await supabase
      .from('reports')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteReport(id: string) {
    const { error } = await supabase
      .from('reports')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // FAQs operations
  static async getAllFAQs(options: {
    published?: boolean;
    category?: string;
    limit?: number;
    offset?: number;
  } = {}) {
    const { published = true, category, limit = 50, offset = 0 } = options;

    let query = supabase
      .from('faqs')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (published) {
      query = query.eq('status', 'published');
    }

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  static async getFAQById(id: string) {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async createFAQ(faq: Database['public']['Tables']['faqs']['Insert']) {
    const { data, error } = await supabase
      .from('faqs')
      .insert(faq)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateFAQ(id: string, updates: Database['public']['Tables']['faqs']['Update']) {
    const { data, error } = await supabase
      .from('faqs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteFAQ(id: string) {
    const { error } = await supabase
      .from('faqs')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Team operations
  static async getAllTeam(options: {
    published?: boolean;
    limit?: number;
    offset?: number;
  } = {}) {
    const { published = true, limit = 50, offset = 0 } = options;

    let query = supabase
      .from('team')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (published) {
      query = query.eq('status', 'published');
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  static async getTeamById(id: string) {
    const { data, error } = await supabase
      .from('team')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async createTeamMember(member: Database['public']['Tables']['team']['Insert']) {
    const { data, error } = await supabase
      .from('team')
      .insert(member)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateTeamMember(id: string, updates: Database['public']['Tables']['team']['Update']) {
    const { data, error } = await supabase
      .from('team')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteTeamMember(id: string) {
    const { error } = await supabase
      .from('team')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Contact submissions operations
  static async getAllContacts(options: {
    status?: string;
    limit?: number;
    offset?: number;
  } = {}) {
    const { status, limit = 50, offset = 0 } = options;

    let query = supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  static async createContactSubmission(submission: Database['public']['Tables']['contact_submissions']['Insert']) {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert(submission)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateContactSubmission(id: string, updates: Database['public']['Tables']['contact_submissions']['Update']) {
    const { data, error } = await supabase
      .from('contact_submissions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Applications operations
  static async getAllApplications(options: {
    status?: string;
    limit?: number;
    offset?: number;
  } = {}) {
    const { status, limit = 50, offset = 0 } = options;

    let query = supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  static async createApplication(application: Database['public']['Tables']['applications']['Insert']) {
    const { data, error } = await supabase
      .from('applications')
      .insert(application)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateApplication(id: string, updates: Database['public']['Tables']['applications']['Update']) {
    const { data, error } = await supabase
      .from('applications')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Partners operations
  static async getAllPartners(options: {
    published?: boolean;
    partnership_type?: string;
    limit?: number;
    offset?: number;
  } = {}) {
    const { published = true, partnership_type, limit = 50, offset = 0 } = options;

    let query = supabase
      .from('partners')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (published) {
      query = query.eq('status', 'published');
    }

    if (partnership_type) {
      query = query.eq('partnership_type', partnership_type);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  static async getPartnerById(id: string) {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async createPartner(partner: Database['public']['Tables']['partners']['Insert']) {
    const { data, error } = await supabase
      .from('partners')
      .insert(partner)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updatePartner(id: string, updates: Database['public']['Tables']['partners']['Update']) {
    const { data, error } = await supabase
      .from('partners')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deletePartner(id: string) {
    const { error } = await supabase
      .from('partners')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Testimonials operations
  static async getAllTestimonials(options: {
    published?: boolean;
    limit?: number;
    offset?: number;
  } = {}) {
    const { published = true, limit = 50, offset = 0 } = options;

    let query = supabase
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (published) {
      query = query.eq('status', 'published');
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  static async getTestimonialById(id: string) {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async createTestimonial(testimonial: Database['public']['Tables']['testimonials']['Insert']) {
    const { data, error } = await supabase
      .from('testimonials')
      .insert(testimonial)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateTestimonial(id: string, updates: Database['public']['Tables']['testimonials']['Update']) {
    const { data, error } = await supabase
      .from('testimonials')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteTestimonial(id: string) {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Search functionality
  static async searchContent(query: string, contentType?: string, limit = 20) {
    const searchQuery = `%${query}%`;

    let tableQuery;
    if (contentType) {
      switch (contentType) {
        case 'news':
          tableQuery = supabase
            .from('news')
            .select('*')
            .or(`title.ilike.${searchQuery},content.ilike.${searchQuery},excerpt.ilike.${searchQuery}`)
            .eq('status', 'published')
            .order('published_at', { ascending: false })
            .limit(limit);
          break;
        case 'events':
          tableQuery = supabase
            .from('events')
            .select('*')
            .or(`title.ilike.${searchQuery},description.ilike.${searchQuery}`)
            .eq('status', 'published')
            .order('start_date', { ascending: true })
            .limit(limit);
          break;
        case 'startups':
          tableQuery = supabase
            .from('startups')
            .select('*')
            .or(`name.ilike.${searchQuery},description.ilike.${searchQuery}`)
            .eq('status', 'published')
            .order('created_at', { ascending: false })
            .limit(limit);
          break;
        default:
          return [];
      }
    } else {
      // Search across all content types
      const [news, events, startups] = await Promise.all([
        supabase
          .from('news')
          .select('*')
          .or(`title.ilike.${searchQuery},content.ilike.${searchQuery}`)
          .eq('status', 'published')
          .limit(5),
        supabase
          .from('events')
          .select('*')
          .or(`title.ilike.${searchQuery},description.ilike.${searchQuery}`)
          .eq('status', 'published')
          .limit(5),
        supabase
          .from('startups')
          .select('*')
          .or(`name.ilike.${searchQuery},description.ilike.${searchQuery}`)
          .eq('status', 'published')
          .limit(5),
      ]);

      return [
        ...(news.data || []).map(item => ({ ...item, type: 'news' })),
        ...(events.data || []).map(item => ({ ...item, type: 'events' })),
        ...(startups.data || []).map(item => ({ ...item, type: 'startups' })),
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    const { data, error } = await tableQuery;
    if (error) throw error;
    return data;
  }
}

export default DatabaseService;