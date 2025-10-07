import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertNewsletterSubscriptionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      res.status(201).json({ 
        success: true, 
        message: "Contact form submitted successfully",
        id: submission.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Contact form submission error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      const subscription = await storage.createNewsletterSubscription(validatedData);
      
      res.status(201).json({ 
        success: true, 
        message: "Successfully subscribed to newsletter",
        id: subscription.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Newsletter subscription error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get all events
  app.get("/api/events", async (req, res) => {
    try {
      const { status, type } = req.query;
      const events = await storage.getEvents({
        status: status as string,
        type: type as string,
      });
      
      res.json({ success: true, data: events });
    } catch (error) {
      console.error("Get events error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch events" 
      });
    }
  });

  // Get all partners
  app.get("/api/partners", async (req, res) => {
    try {
      const { category } = req.query;
      const partners = await storage.getPartners({
        category: category as string,
      });
      
      res.json({ success: true, data: partners });
    } catch (error) {
      console.error("Get partners error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch partners" 
      });
    }
  });

  // Get all startups
  app.get("/api/startups", async (req, res) => {
    try {
      const { industry, stage, year } = req.query;
      const startups = await storage.getStartups({
        industry: industry as string,
        stage: stage as string,
        year: year ? parseInt(year as string) : undefined,
      });
      
      res.json({ success: true, data: startups });
    } catch (error) {
      console.error("Get startups error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch startups" 
      });
    }
  });

  // Get contact submissions (admin only)
  app.get("/api/admin/contacts", async (req, res) => {
    try {
      const { status } = req.query;
      const submissions = await storage.getContactSubmissions({
        status: status as string,
      });
      
      res.json({ success: true, data: submissions });
    } catch (error) {
      console.error("Get contact submissions error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch contact submissions" 
      });
    }
  });

  // Update contact submission status (admin only)
  app.patch("/api/admin/contacts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!["new", "in_progress", "resolved"].includes(status)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid status" 
        });
      }
      
      const updated = await storage.updateContactSubmissionStatus(id, status);
      
      if (!updated) {
        return res.status(404).json({ 
          success: false, 
          message: "Contact submission not found" 
        });
      }
      
      res.json({ success: true, data: updated });
    } catch (error) {
      console.error("Update contact submission error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to update contact submission" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
