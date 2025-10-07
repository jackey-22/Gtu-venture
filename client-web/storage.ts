import { 
  type User, 
  type InsertUser,
  type ContactSubmission,
  type InsertContactSubmission,
  type NewsletterSubscription,
  type InsertNewsletterSubscription,
  type Event,
  type Partner,
  type Startup
} from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  updateContactSubmissionStatus(id: string, status: string): Promise<ContactSubmission | undefined>;
  
  // Newsletter subscriptions
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  
  // Events
  getEvents(): Promise<Event[]>;
  
  // Partners
  getPartners(): Promise<Partner[]>;
  
  // Startups
  getStartups(): Promise<Startup[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactSubmissions: Map<string, ContactSubmission>;
  private newsletterSubscriptions: Map<string, NewsletterSubscription>;
  private events: Map<string, Event>;
  private partners: Map<string, Partner>;
  private startups: Map<string, Startup>;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.newsletterSubscriptions = new Map();
    this.events = new Map();
    this.partners = new Map();
    this.startups = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Contact submissions
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const contactSubmission: ContactSubmission = {
      ...submission,
      id,
      createdAt: new Date(),
      status: "new",
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }

  async updateContactSubmissionStatus(id: string, status: string): Promise<ContactSubmission | undefined> {
    const submission = this.contactSubmissions.get(id);
    if (submission) {
      const updated = { ...submission, status };
      this.contactSubmissions.set(id, updated);
      return updated;
    }
    return undefined;
  }

  // Newsletter subscriptions
  async createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const id = randomUUID();
    const newsletterSubscription: NewsletterSubscription = {
      ...subscription,
      id,
      subscribedAt: new Date(),
      isActive: true,
    };
    this.newsletterSubscriptions.set(id, newsletterSubscription);
    return newsletterSubscription;
  }

  // Events
  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  // Partners
  async getPartners(): Promise<Partner[]> {
    return Array.from(this.partners.values());
  }

  // Startups
  async getStartups(): Promise<Startup[]> {
    return Array.from(this.startups.values());
  }

  private initializeSampleData() {
    // Sample events
    const sampleEvents: Event[] = [
      {
        id: randomUUID(),
        title: "GTU Ventures Summit 2025",
        description: "Annual summit bringing together students, mentors, and investors",
        date: new Date("2025-03-15T09:00:00Z"),
        location: "GTU Innovation Hub, Ahmedabad",
        type: "Summit",
        category: "networking",
        status: "upcoming",
        imageUrl: "/api/placeholder/600/400",
        registrationUrl: "https://example.com/register",
        maxAttendees: 500,
        currentAttendees: 245,
        speakers: ["Dr. Rajesh Patel", "Priya Shah", "Amit Kumar"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Startup Pitch Competition",
        description: "Monthly pitch competition for student startups",
        date: new Date("2025-02-20T14:00:00Z"),
        location: "GTU Auditorium",
        type: "Pitch Event",
        category: "competition",
        status: "upcoming",
        imageUrl: "/api/placeholder/600/400",
        registrationUrl: "https://example.com/register",
        maxAttendees: 100,
        currentAttendees: 67,
        speakers: ["Investment Panel"],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    // Sample partners
    const samplePartners: Partner[] = [
      {
        id: randomUUID(),
        name: "Gujarat Government",
        description: "Strategic partner supporting startup ecosystem",
        logoUrl: "/api/placeholder/200/100",
        website: "https://gujaratinnovation.com",
        type: "Government",
        category: "strategic",
        focus: "Policy and Infrastructure",
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Tech Mahindra",
        description: "Corporate partner providing mentorship and funding",
        logoUrl: "/api/placeholder/200/100",
        website: "https://techmahindra.com",
        type: "Corporate",
        category: "corporate",
        focus: "Technology and Innovation",
        isActive: true,
        createdAt: new Date(),
      }
    ];

    // Sample startups
    const sampleStartups: Startup[] = [
      {
        id: randomUUID(),
        name: "EduTech Solutions",
        description: "AI-powered learning platform for students",
        industry: "Education Technology",
        stage: "Growth",
        cohort: "Batch 2024",
        logoUrl: "/api/placeholder/200/200",
        website: "https://edutech.example.com",
        founders: ["Rahul Sharma", "Neha Patel"],
        fundingRaised: "₹45 Lakhs",
        year: 2024,
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "AgroBot",
        description: "Automated farming solutions using IoT",
        industry: "Agriculture Technology",
        stage: "Early",
        cohort: "Batch 2024",
        logoUrl: "/api/placeholder/200/200",
        website: "https://agrobot.example.com",
        founders: ["Vikram Singh", "Pooja Joshi"],
        fundingRaised: "₹25 Lakhs",
        year: 2024,
        isActive: true,
        createdAt: new Date(),
      }
    ];

    // Populate the maps
    sampleEvents.forEach(event => this.events.set(event.id, event));
    samplePartners.forEach(partner => this.partners.set(partner.id, partner));
    sampleStartups.forEach(startup => this.startups.set(startup.id, startup));
  }
}

export const storage = new MemStorage();
