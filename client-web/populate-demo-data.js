import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env.local
function loadEnv() {
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const env = {};

    envContent.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        env[key.trim()] = value.trim().replace(/['"]/g, '');
      }
    });

    return env;
  } catch (error) {
    console.error('❌ Could not load .env.local file:', error.message);
    return {};
  }
}

// Demo data for GTU Ventures
export const demoData = {
  news: [
    {
      title: "GTU Ventures Launches New Incubation Program",
      slug: "gtu-ventures-launches-new-incubation-program",
      content: "GTU Ventures is excited to announce the launch of our enhanced incubation program designed to support early-stage startups with comprehensive mentorship, funding opportunities, and access to our extensive network of industry experts and investors.",
      excerpt: "GTU Ventures launches enhanced incubation program with mentorship and funding opportunities.",
      category: "announcement",
      tags: ["incubation", "startups", "funding"],
      image_url: "/public/startups/1.jpg",
      author_name: "GTU Ventures Team",
      status: "published",
      published_at: new Date().toISOString(),
      featured: true,
    },
    {
      title: "Successful Demo Day Showcases 15 Innovative Startups",
      slug: "successful-demo-day-showcases-15-innovative-startups",
      content: "Our quarterly Demo Day brought together investors, mentors, and entrepreneurs as 15 promising startups presented their innovative solutions. The event featured startups in AI, fintech, healthcare, and sustainable technology sectors.",
      excerpt: "15 innovative startups showcased their solutions at GTU Ventures Demo Day.",
      category: "event",
      tags: ["demo-day", "startups", "investors"],
      image_url: "/public/startups/2.jpg",
      author_name: "GTU Ventures Team",
      status: "published",
      published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      featured: false,
    },
    {
      title: "GTU Ventures Partners with Leading Tech Companies",
      slug: "gtu-ventures-partners-with-leading-tech-companies",
      content: "GTU Ventures has formed strategic partnerships with major technology companies to provide our startups with cutting-edge tools, cloud infrastructure, and market access opportunities.",
      excerpt: "Strategic partnerships established with leading technology companies.",
      category: "partnership",
      tags: ["partnerships", "technology", "collaboration"],
      image_url: "/public/startups/3.jpg",
      author_name: "GTU Ventures Team",
      status: "published",
      published_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      featured: false,
    }
  ],

  events: [
    {
      title: "Startup Pitch Competition 2025",
      slug: "startup-pitch-competition-2025",
      description: "Join us for our annual Startup Pitch Competition where entrepreneurs present their innovative ideas to a panel of experienced investors and industry experts. Winners receive funding and mentorship opportunities.",
      start_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(),
      location: "GTU Campus, Ahmedabad",
      virtual_link: "https://meet.google.com/abc-defg-hij",
      category: "competition",
      tags: ["pitch", "competition", "funding"],
      image_url: "/public/events/pitch-competition.jpg",
      registration_url: "https://gtu-ventures.com/register/pitch-competition",
      max_attendees: 200,
      status: "published",
      published_at: new Date().toISOString(),
      featured: true,
    },
    {
      title: "Entrepreneurship Workshop Series",
      slug: "entrepreneurship-workshop-series",
      description: "A comprehensive 5-day workshop series covering essential topics for aspiring entrepreneurs including business planning, financial management, marketing strategies, and legal considerations.",
      start_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      end_date: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000).toISOString(),
      location: "GTU Innovation Hub",
      category: "workshop",
      tags: ["workshop", "entrepreneurship", "education"],
      image_url: "/public/events/workshop.jpg",
      registration_url: "https://gtu-ventures.com/register/workshop",
      max_attendees: 50,
      status: "published",
      published_at: new Date().toISOString(),
      featured: false,
    },
    {
      title: "Investor Meetup & Networking",
      slug: "investor-meetup-networking",
      description: "Connect with angel investors, venture capitalists, and industry leaders at our monthly networking event. Perfect opportunity for startups to find funding and strategic partners.",
      start_date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
      location: "The Leela Hotel, Ahmedabad",
      category: "networking",
      tags: ["networking", "investors", "funding"],
      image_url: "/public/events/networking.jpg",
      registration_url: "https://gtu-ventures.com/register/networking",
      max_attendees: 100,
      status: "published",
      published_at: new Date().toISOString(),
      featured: false,
    }
  ],

  programs: [
    {
      title: "Pre-Incubation Program",
      slug: "pre-incubation-program",
      description: "Our Pre-Incubation Program is designed for early-stage ideas and aspiring entrepreneurs. Get access to mentorship, workshops, and resources to validate your business idea and build a strong foundation.",
      short_description: "Foundation program for early-stage ideas",
      category: "pre-incubation",
      duration: "3 months",
      eligibility: "Students, faculty, and individuals with innovative ideas",
      benefits: ["Mentorship", "Workshops", "Idea validation", "Network access"],
      application_deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      start_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      image_url: "/public/programs/pre-incubation.jpg",
      status: "published",
      published_at: new Date().toISOString(),
      featured: true,
    },
    {
      title: "Incubation Program",
      slug: "incubation-program",
      description: "Comprehensive incubation support for startups with minimum viable products. Access to funding, infrastructure, legal support, and market connections.",
      short_description: "Full incubation support for MVP-stage startups",
      category: "incubation",
      duration: "6-12 months",
      eligibility: "Startups with MVP and initial traction",
      benefits: ["Funding up to ₹5L", "Office space", "Legal support", "Market access"],
      application_deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      start_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      image_url: "/public/programs/incubation.jpg",
      status: "published",
      published_at: new Date().toISOString(),
      featured: true,
    },
    {
      title: "Acceleration Program",
      slug: "acceleration-program",
      description: "Advanced acceleration program for high-growth startups looking to scale rapidly. Focus on expansion, fundraising, and market domination strategies.",
      short_description: "Scale-up program for high-growth startups",
      category: "acceleration",
      duration: "6 months",
      eligibility: "Startups with product-market fit and revenue",
      benefits: ["Series A funding support", "International expansion", "Strategic partnerships", "Advanced mentorship"],
      application_deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      start_date: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(),
      image_url: "/public/programs/acceleration.jpg",
      status: "published",
      published_at: new Date().toISOString(),
      featured: false,
    }
  ],

  startups: [
    {
      name: "AgriTech Solutions",
      slug: "agritech-solutions",
      description: "Revolutionary farming technology using AI and IoT to optimize crop yields and reduce water usage by 40%.",
      founder_name: "Rajesh Kumar",
      founded_year: 2022,
      industry: "Agriculture",
      stage: "growth",
      website: "https://agritech-solutions.com",
      linkedin_url: "https://linkedin.com/company/agritech-solutions",
      twitter_handle: "@agritechsol",
      logo_url: "/public/startups/1.jpg",
      images: ["/public/startups/1.jpg", "/public/startups/2.jpg"],
      funding_amount: 2500000,
      funding_stage: "seed",
      team_size: 12,
      location: "Ahmedabad, Gujarat",
      status: "published",
      published_at: new Date().toISOString(),
      featured: true,
    },
    {
      name: "HealthConnect",
      slug: "healthconnect",
      description: "Digital healthcare platform connecting patients with doctors through telemedicine and AI-powered diagnostics.",
      founder_name: "Dr. Priya Sharma",
      founded_year: 2021,
      industry: "Healthcare",
      stage: "scale",
      website: "https://healthconnect.in",
      linkedin_url: "https://linkedin.com/company/healthconnect",
      twitter_handle: "@healthconnectin",
      logo_url: "/public/startups/2.jpg",
      images: ["/public/startups/2.jpg", "/public/startups/3.jpg"],
      funding_amount: 15000000,
      funding_stage: "series-a",
      team_size: 35,
      location: "Mumbai, Maharashtra",
      status: "published",
      published_at: new Date().toISOString(),
      featured: true,
    },
    {
      name: "EduLearn AI",
      slug: "edulearn-ai",
      description: "AI-powered personalized learning platform adapting to individual student needs and learning styles.",
      founder_name: "Ankit Patel",
      founded_year: 2023,
      industry: "Education",
      stage: "mvp",
      website: "https://edulearn.ai",
      linkedin_url: "https://linkedin.com/company/edulearn-ai",
      twitter_handle: "@edulearnai",
      logo_url: "/public/startups/3.jpg",
      images: ["/public/startups/3.jpg"],
      funding_amount: 500000,
      funding_stage: "pre-seed",
      team_size: 8,
      location: "Delhi, India",
      status: "published",
      published_at: new Date().toISOString(),
      featured: false,
    }
  ],

  gallery: [
    {
      title: "Demo Day 2024 Highlights",
      description: "Memorable moments from our annual Demo Day showcasing innovative startups",
      image_url: "/public/gallery/demo-day-1.jpg",
      thumbnail_url: "/public/gallery/demo-day-1-thumb.jpg",
      album: "Demo Day 2024",
      tags: ["demo-day", "startups", "event"],
      status: "published",
      published_at: new Date().toISOString(),
      featured: true,
    },
    {
      title: "Workshop Session",
      description: "Entrepreneurs engaged in intensive workshop sessions",
      image_url: "/public/gallery/workshop-1.jpg",
      thumbnail_url: "/public/gallery/workshop-1-thumb.jpg",
      album: "Workshops",
      tags: ["workshop", "learning", "entrepreneurs"],
      status: "published",
      published_at: new Date().toISOString(),
      featured: false,
    },
    {
      title: "Team Building Activity",
      description: "GTU Ventures team building and collaboration activities",
      image_url: "/public/gallery/team-building.jpg",
      thumbnail_url: "/public/gallery/team-building-thumb.jpg",
      album: "Team Activities",
      tags: ["team", "collaboration", "culture"],
      status: "published",
      published_at: new Date().toISOString(),
      featured: false,
    }
  ],

  reports: [
    {
      title: "GTU Ventures Annual Report 2024",
      description: "Comprehensive annual report covering startup ecosystem development, funding trends, and impact metrics",
      file_url: "/public/reports/annual-report-2024.pdf",
      file_name: "GTU-Ventures-Annual-Report-2024.pdf",
      file_size: 2500000,
      file_type: "pdf",
      category: "annual-report",
      tags: ["annual-report", "impact", "metrics"],
      status: "published",
      published_at: new Date().toISOString(),
    },
    {
      title: "Startup Ecosystem Analysis Q4 2024",
      description: "Quarterly analysis of Gujarat's startup ecosystem including funding, sectors, and growth metrics",
      file_url: "/public/reports/ecosystem-analysis-q4-2024.pdf",
      file_name: "Startup-Ecosystem-Analysis-Q4-2024.pdf",
      file_size: 1800000,
      file_type: "pdf",
      category: "market-analysis",
      tags: ["ecosystem", "analysis", "quarterly"],
      status: "published",
      published_at: new Date().toISOString(),
    }
  ],

  faqs: [
    {
      question: "What is GTU Ventures?",
      answer: "GTU Ventures is Gujarat Technological University's premier startup incubation and acceleration center, providing comprehensive support to entrepreneurs and startups in Gujarat and beyond.",
      category: "general",
      tags: ["introduction", "overview"],
      status: "published",
      published_at: new Date().toISOString(),
      featured: true,
      sort_order: 1,
    },
    {
      question: "How can I apply for incubation?",
      answer: "You can apply for our incubation programs through our online application portal. We have different programs for different stages - Pre-Incubation, Incubation, and Acceleration. Visit our Programs page for detailed requirements and application deadlines.",
      category: "application",
      tags: ["application", "incubation", "process"],
      status: "published",
      published_at: new Date().toISOString(),
      featured: true,
      sort_order: 2,
    },
    {
      question: "What support does GTU Ventures provide?",
      answer: "We provide comprehensive support including mentorship, funding assistance, office space, legal guidance, technical support, market access, networking opportunities, and access to our extensive network of investors and industry experts.",
      category: "support",
      tags: ["support", "mentorship", "funding"],
      status: "published",
      published_at: new Date().toISOString(),
      featured: false,
      sort_order: 3,
    },
    {
      question: "Who can join GTU Ventures programs?",
      answer: "Our programs are open to students, faculty, alumni of GTU, and external entrepreneurs. We welcome innovative ideas from all backgrounds and sectors, with a focus on technology-driven solutions.",
      category: "eligibility",
      tags: ["eligibility", "requirements", "participation"],
      status: "published",
      published_at: new Date().toISOString(),
      featured: false,
      sort_order: 4,
    }
  ],

  team: [
    {
      name: "Dr. Rajesh Patel",
      position: "Director, GTU Ventures",
      bio: "Dr. Patel has over 20 years of experience in entrepreneurship education and startup ecosystem development. He leads GTU Ventures with a vision to create India's leading university-based incubation center.",
      image_url: "/public/team/rajesh-patel.jpg",
      email: "director@gtu-ventures.com",
      phone: "+91-9876543210",
      linkedin_url: "https://linkedin.com/in/rajesh-patel-gtu",
      twitter_handle: "@rajeshpatelgtu",
      status: "published",
      published_at: new Date().toISOString(),
      featured: true,
      sort_order: 1,
    },
    {
      name: "Priya Shah",
      position: "Head of Programs",
      bio: "Priya brings 15 years of experience in program management and startup acceleration. She oversees all incubation and acceleration programs at GTU Ventures.",
      image_url: "/public/team/priya-shah.jpg",
      email: "programs@gtu-ventures.com",
      phone: "+91-9876543211",
      linkedin_url: "https://linkedin.com/in/priya-shah-gtu",
      twitter_handle: "@priyashahgtu",
      status: "published",
      published_at: new Date().toISOString(),
      featured: true,
      sort_order: 2,
    },
    {
      name: "Amit Kumar",
      position: "Investment Manager",
      bio: "Amit specializes in startup funding and investor relations. He has successfully raised over ₹50 crores for portfolio companies and maintains relationships with 200+ investors.",
      image_url: "/public/team/amit-kumar.jpg",
      email: "investments@gtu-ventures.com",
      phone: "+91-9876543212",
      linkedin_url: "https://linkedin.com/in/amit-kumar-gtu",
      twitter_handle: "@amitkumar_gtu",
      status: "published",
      published_at: new Date().toISOString(),
      featured: false,
      sort_order: 3,
    },
    {
      name: "Sneha Desai",
      position: "Community Manager",
      bio: "Sneha manages our startup community and organizes networking events. She has built a vibrant ecosystem of 500+ entrepreneurs and 100+ mentors.",
      image_url: "/public/team/sneha-desai.jpg",
      email: "community@gtu-ventures.com",
      phone: "+91-9876543213",
      linkedin_url: "https://linkedin.com/in/sneha-desai-gtu",
      twitter_handle: "@sneha_gtu",
      status: "published",
      published_at: new Date().toISOString(),
      featured: false,
      sort_order: 4,
    }
  ]
};

// Function to populate demo data
export async function populateDemoData() {
  console.log('🚀 Starting demo data population...');

  // Load environment variables
  const env = loadEnv();
  const supabaseUrl = env.VITE_SUPABASE_URL;
  const supabaseKey = env.VITE_SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('❌ Missing Supabase credentials in .env.local');
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    console.log('🔓 Note: If RLS is enabled, you may need to temporarily disable it in Supabase dashboard');
    console.log('   Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/sql');
    console.log('   Run: ALTER TABLE news DISABLE ROW LEVEL SECURITY; (for each table)');

    // Populate news
    console.log('� Populating news...');
    for (const item of demoData.news) {
      const { error } = await supabase.from('news').insert(item);
      if (error) {
        console.error(`❌ Error inserting news item "${item.title}":`, error.message);
        if (error.code === '42501') {
          console.log('💡 This is likely due to RLS. Please disable RLS for the news table first.');
          throw new Error('RLS policy violation - please disable RLS for all tables');
        }
        throw error;
      }
    }
    console.log('✅ News populated');

    // Populate events
    console.log('📅 Populating events...');
    for (const item of demoData.events) {
      const { error } = await supabase.from('events').insert(item);
      if (error) throw error;
    }
    console.log('✅ Events populated');

    // Populate programs
    console.log('🎯 Populating programs...');
    for (const item of demoData.programs) {
      const { error } = await supabase.from('programs').insert(item);
      if (error) throw error;
    }
    console.log('✅ Programs populated');

    // Populate startups
    console.log('🚀 Populating startups...');
    for (const item of demoData.startups) {
      const { error } = await supabase.from('startups').insert(item);
      if (error) throw error;
    }
    console.log('✅ Startups populated');

    // Populate gallery
    console.log('🖼️ Populating gallery...');
    for (const item of demoData.gallery) {
      const { error } = await supabase.from('gallery').insert(item);
      if (error) throw error;
    }
    console.log('✅ Gallery populated');

    // Populate reports
    console.log('📊 Populating reports...');
    for (const item of demoData.reports) {
      const { error } = await supabase.from('reports').insert(item);
      if (error) throw error;
    }
    console.log('✅ Reports populated');

    // Populate FAQs
    console.log('❓ Populating FAQs...');
    for (const item of demoData.faqs) {
      const { error } = await supabase.from('faqs').insert(item);
      if (error) throw error;
    }
    console.log('✅ FAQs populated');

    // Populate team
    console.log('👥 Populating team...');
    for (const item of demoData.team) {
      const { error } = await supabase.from('team').insert(item);
      if (error) throw error;
    }
    console.log('✅ Team populated');

    console.log('🎉 All demo data populated successfully!');

  } catch (error) {
    console.error('❌ Error populating demo data:', error);
    throw error;
  }
}

// Execute the function directly
populateDemoData()
  .then(() => {
    console.log('✅ Demo data population completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Demo data population failed:', error);
    process.exit(1);
  });