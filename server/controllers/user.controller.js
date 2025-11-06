const userModel = require('../models/user.model');
const eventModel = require('../models/event.model');
const galleryModel = require('../models/gallery.model');
const newsModel = require('../models/news.model');
const programModel = require('../models/program.model');
const reportModel = require('../models/report.model');
const startupModel = require('../models/startup.model');
const faqModel = require('../models/faq.model');
const teamMemberModel = require('../models/teamMember.model');
const careerModel = require('../models/career.model');
const partnerModel = require('../models/partner.model');
const facilityModel = require('../models/facility.model');
const initiativeModel = require('../models/initiative.model');
const circularModel = require('../models/circular.model');
const contactMessageModel = require('../models/contactMessage.model');
const heroModel = require('../models/hero.model');
const carouselItemModel = require('../models/carouselItem.model');
const featuredGridModel = require('../models/featuredGrid.model');
const programHighlightModel = require('../models/programHighlight.model');
const metricModel = require('../models/metric.model');
const aboutSectionModel = require('../models/aboutSection.model');
const successStoryModel = require('../models/successStory.model');
const testimonialModel = require('../models/testimonial.model');
const newsletterSubscriptionModel = require('../models/newsletterSubscription.model');

// EVENTS
async function fetchEvents(req, res) {
	try {
		const events = await eventModel.find({ status: 'published' }).sort({ created_at: -1 });

		res.status(200).json({
			success: true,
			count: events.length,
			data: events,
		});
	} catch (error) {
		console.error('Fetch Events Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

async function fetchEventById(req, res) {
	try {
		const event = await eventModel.findOne({
			_id: req.params.id,
			status: 'published',
		});

		if (!event) return res.status(404).json({ message: 'Event not found or not published' });

		res.status(200).json({ success: true, data: event });
	} catch (error) {
		console.error('Fetch Event By ID Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

// PROGRAMS
async function fetchPrograms(req, res) {
	try {
		const programs = await programModel.find({ status: 'published' }).sort({ created_at: -1 });

		res.status(200).json({ success: true, count: programs.length, data: programs });
	} catch (error) {
		console.error('Fetch Programs Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

async function fetchProgramById(req, res) {
	try {
		const program = await programModel.findOne({
			_id: req.params.id,
			status: 'published',
		});

		if (!program)
			return res.status(404).json({ message: 'Program not found or not published' });

		res.status(200).json({ success: true, data: program });
	} catch (error) {
		console.error('Fetch Program By ID Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

// NEWS
async function fetchNews(req, res) {
	try {
		const news = await newsModel.find({ status: 'published' }).sort({ created_at: -1 });

		res.status(200).json({ success: true, count: news.length, data: news });
	} catch (error) {
		console.error('Fetch News Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

async function fetchNewsById(req, res) {
	try {
		const news = await newsModel.findOne({
			_id: req.params.id,
			status: 'published',
		});

		if (!news) return res.status(404).json({ message: 'News not found or not published' });

		res.status(200).json({ success: true, data: news });
	} catch (error) {
		console.error('Fetch News By ID Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

// GALLERY
async function fetchGallery(req, res) {
	try {
		const gallery = await galleryModel.find({ status: 'published' }).sort({ created_at: -1 });

		res.status(200).json({ success: true, count: gallery.length, data: gallery });
	} catch (error) {
		console.error('Fetch Gallery Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

async function fetchGalleryById(req, res) {
	try {
		const gallery = await galleryModel.findOne({
			_id: req.params.id,
			status: 'published',
		});

		if (!gallery)
			return res.status(404).json({ message: 'Gallery item not found or not published' });

		res.status(200).json({ success: true, data: gallery });
	} catch (error) {
		console.error('Fetch Gallery By ID Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

// REPORTS
async function fetchReports(req, res) {
	try {
		const reports = await reportModel.find({ status: 'published' }).sort({ created_at: -1 });

		res.status(200).json({ success: true, count: reports.length, data: reports });
	} catch (error) {
		console.error('Fetch Reports Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

async function fetchReportById(req, res) {
	try {
		const report = await reportModel.findOne({
			_id: req.params.id,
			status: 'published',
		});

		if (!report) return res.status(404).json({ message: 'Report not found or not published' });

		res.status(200).json({ success: true, data: report });
	} catch (error) {
		console.error('Fetch Report By ID Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

// STARTUPS
async function fetchStartups(req, res) {
	try {
		const startups = await startupModel.find({ status: 'published' }).sort({ created_at: -1 });

		res.status(200).json({ success: true, count: startups.length, data: startups });
	} catch (error) {
		console.error('Fetch Startups Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

async function fetchStartupById(req, res) {
	try {
		const startup = await startupModel.findOne({
			_id: req.params.id,
			status: 'published',
		});

		if (!startup)
			return res.status(404).json({ message: 'Startup not found or not published' });

		res.status(200).json({ success: true, data: startup });
	} catch (error) {
		console.error('Fetch Startup By ID Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

// FAQS
async function fetchFAQs(req, res) {
	try {
		const faqs = await faqModel.find({ status: 'published' }).sort({ priority: 1, created_at: -1 });

		res.status(200).json({ success: true, count: faqs.length, data: faqs });
	} catch (error) {
		console.error('Fetch FAQs Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

async function fetchFAQById(req, res) {
	try {
		const faq = await faqModel.findOne({
			_id: req.params.id,
			status: 'published',
		});

		if (!faq) return res.status(404).json({ message: 'FAQ not found or not published' });

		res.status(200).json({ success: true, data: faq });
	} catch (error) {
		console.error('Fetch FAQ By ID Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

// TEAM
async function fetchTeamMembers(req, res) {
	try {
		const members = await teamMemberModel
			.find()
			.populate('label')
			.sort({ priority: 1, createdAt: -1 });

		res.status(200).json({ success: true, count: members.length, data: members });
	} catch (error) {
		console.error('Fetch Team Members Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

async function fetchTeamMemberById(req, res) {
	try {
		const member = await teamMemberModel.findById(req.params.id).populate('label');

		if (!member) return res.status(404).json({ message: 'Team member not found' });

		res.status(200).json({ success: true, data: member });
	} catch (error) {
		console.error('Fetch Team Member By ID Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

// CAREERS
async function fetchCareers(req, res) {
	try {
		const now = new Date();
		// Only show careers where publishedOn <= today (or null/undefined publishedOn for backward compatibility)
		const careers = await careerModel
			.find({
				status: 'published',
				$or: [
					{ publishedOn: { $lte: now } },
					{ publishedOn: null },
					{ publishedOn: { $exists: false } },
				],
			})
			.sort({ created_at: -1 });

		res.status(200).json({ success: true, count: careers.length, data: careers });
	} catch (error) {
		console.error('Fetch Careers Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

async function fetchCareerById(req, res) {
	try {
		const career = await careerModel.findOne({
			_id: req.params.id,
			status: 'published',
		});

		if (!career) return res.status(404).json({ message: 'Career not found or not published' });

		res.status(200).json({ success: true, data: career });
	} catch (error) {
		console.error('Fetch Career By ID Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

// PARTNERS
async function fetchPartners(req, res) {
	try {
		const partners = await partnerModel.find({ status: 'published' }).sort({ created_at: -1 });

		res.status(200).json({ success: true, count: partners.length, data: partners });
	} catch (error) {
		console.error('Fetch Partners Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

async function fetchPartnerById(req, res) {
	try {
		const partner = await partnerModel.findOne({
			_id: req.params.id,
			status: 'published',
		});

		if (!partner) return res.status(404).json({ message: 'Partner not found or not published' });

		res.status(200).json({ success: true, data: partner });
	} catch (error) {
		console.error('Fetch Partner By ID Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

// FACILITIES
async function fetchFacilities(req, res) {
	try {
		const facilities = await facilityModel.find({ status: 'published' }).sort({ created_at: -1 });

		res.status(200).json({ success: true, count: facilities.length, data: facilities });
	} catch (error) {
		console.error('Fetch Facilities Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

async function fetchFacilityById(req, res) {
	try {
		const facility = await facilityModel.findOne({
			_id: req.params.id,
			status: 'published',
		});

		if (!facility) return res.status(404).json({ message: 'Facility not found or not published' });

		res.status(200).json({ success: true, data: facility });
	} catch (error) {
		console.error('Fetch Facility By ID Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

// INITIATIVES
async function fetchInitiatives(req, res) {
	try {
		const initiatives = await initiativeModel.find({ status: 'published' }).sort({ created_at: -1 });

		res.status(200).json({ success: true, count: initiatives.length, data: initiatives });
	} catch (error) {
		console.error('Fetch Initiatives Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

async function fetchInitiativeById(req, res) {
	try {
		const initiative = await initiativeModel.findOne({
			_id: req.params.id,
			status: 'published',
		});

		if (!initiative) return res.status(404).json({ message: 'Initiative not found or not published' });

		res.status(200).json({ success: true, data: initiative });
	} catch (error) {
		console.error('Fetch Initiative By ID Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

// CIRCULARS
async function fetchCirculars(req, res) {
	try {
		const circulars = await circularModel.find({ status: 'published' }).sort({ created_at: -1 });

		res.status(200).json({ success: true, count: circulars.length, data: circulars });
	} catch (error) {
		console.error('Fetch Circulars Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

async function fetchCircularById(req, res) {
	try {
		const circular = await circularModel.findOne({
			_id: req.params.id,
			status: 'published',
		});

		if (!circular) return res.status(404).json({ message: 'Circular not found or not published' });

		res.status(200).json({ success: true, data: circular });
	} catch (error) {
		console.error('Fetch Circular By ID Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

// CONTACT MESSAGE (submit only, no fetch for users)
async function submitContactMessage(req, res) {
	try {
		const { name, email, phone, role, subject, message } = req.body;
		if (!name || !email || !phone || !subject || !message) {
			return res.status(400).json({ message: 'Missing required fields' });
		}

		const newContactMessage = new contactMessageModel({
			name,
			email,
			phone,
			role,
			subject,
			message,
			status: 'new',
		});

		await newContactMessage.save();
		return res.status(201).json({ success: true, message: 'Contact message submitted successfully' });
	} catch (error) {
		console.error('Submit Contact Message Error:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

// APPLICATION (submit only, no fetch for users)
async function submitApplication(req, res) {
	try {
		const {
			startupName,
			idea,
			email,
			cofounderEmail,
			state,
			city,
			fundingRaised,
			fundingAgency,
			website,
			mobile,
			registered,
			stage,
			incubatedElsewhere,
			supportNeeded,
			teamSize,
			pitchDeck,
		} = req.body;

		if (!startupName || !email || !mobile) {
			return res.status(400).json({ message: 'Missing required fields' });
		}

		const applicationModel = require('../models/application.model');
		const newApplication = new applicationModel({
			startupName,
			idea,
			email,
			cofounderEmail,
			state,
			city,
			fundingRaised,
			fundingAgency,
			website,
			mobile,
			registered,
			stage,
			incubatedElsewhere,
			supportNeeded: Array.isArray(supportNeeded) ? supportNeeded : [],
			teamSize,
			pitchDeck,
			status: 'pending',
		});

				await newApplication.save();
		return res.status(201).json({ success: true, message: 'Application submitted successfully' });                                                  
	} catch (error) {
		console.error('Submit Application Error:', error);
		return res.status(500).json({ message: 'Internal server error' });                                                                              
	}
}

// Hero Section
async function fetchHero(req, res) {
	try {
		const hero = await heroModel.findOne({ isActive: true }).sort({ created_at: -1 });
		res.status(200).json({ success: true, data: hero });
	} catch (error) {
		console.error('Fetch Hero Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

// Carousel Items
async function fetchCarouselItems(req, res) {
	try {
		const items = await carouselItemModel.find({ status: 'published' }).sort({ order: 1, created_at: -1 });
		res.status(200).json({ success: true, count: items.length, data: items });
	} catch (error) {
		console.error('Fetch Carousel Items Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

// Featured Grid
async function fetchFeaturedGrids(req, res) {
	try {
		const items = await featuredGridModel.find({ status: 'published' }).sort({ order: 1, created_at: -1 });
		res.status(200).json({ success: true, count: items.length, data: items });
	} catch (error) {
		console.error('Fetch Featured Grids Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

// Program Highlights
async function fetchProgramHighlights(req, res) {
	try {
		const items = await programHighlightModel.find({ status: 'published' }).sort({ order: 1, created_at: -1 });
		res.status(200).json({ success: true, count: items.length, data: items });
	} catch (error) {
		console.error('Fetch Program Highlights Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

// Metrics
async function fetchMetrics(req, res) {
	try {
		const metrics = await metricModel.find({ status: 'published' }).sort({ order: 1, created_at: -1 });
		res.status(200).json({ success: true, count: metrics.length, data: metrics });
	} catch (error) {
		console.error('Fetch Metrics Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

// About Section
async function fetchAboutSection(req, res) {
	try {
		const section = await aboutSectionModel.findOne({ isActive: true }).sort({ created_at: -1 });
		res.status(200).json({ success: true, data: section });
	} catch (error) {
		console.error('Fetch About Section Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

// Success Stories
async function fetchSuccessStories(req, res) {
	try {
		const stories = await successStoryModel.find({ status: 'published' }).sort({ order: 1, created_at: -1 });
		res.status(200).json({ success: true, count: stories.length, data: stories });
	} catch (error) {
		console.error('Fetch Success Stories Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

// Testimonials
async function fetchTestimonials(req, res) {
	try {
		const testimonials = await testimonialModel.find({ status: 'published' }).sort({ order: 1, created_at: -1 });
		res.status(200).json({ success: true, count: testimonials.length, data: testimonials });
	} catch (error) {
		console.error('Fetch Testimonials Error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

// Newsletter Subscription
async function subscribeNewsletter(req, res) {
	try {
		const { email } = req.body;

		if (!email) {
			return res.status(400).json({ success: false, message: 'Email is required' });
		}

		// Check if already subscribed
		const existing = await newsletterSubscriptionModel.findOne({ email: email.toLowerCase() });
		if (existing) {
			if (existing.status === 'active') {
				return res.status(200).json({ success: true, message: 'Email already subscribed' });
			} else {
				// Reactivate subscription
				existing.status = 'active';
				await existing.save();
				return res.status(200).json({ success: true, message: 'Subscription reactivated successfully' });
			}
		}

		const newSubscription = new newsletterSubscriptionModel({
			email: email.toLowerCase(),
			status: 'active',
		});

		await newSubscription.save();
		return res.status(201).json({ success: true, message: 'Subscribed successfully' });
	} catch (error) {
		console.error('Subscribe Newsletter Error:', error);
		if (error.code === 11000) {
			return res.status(200).json({ success: true, message: 'Email already subscribed' });
		}
		return res.status(500).json({ success: false, message: 'Internal server error' });
	}
}

module.exports = {
	fetchEvents,
	fetchEventById,
	fetchPrograms,
	fetchProgramById,
	fetchNews,
	fetchNewsById,
	fetchGallery,
	fetchGalleryById,
	fetchReports,
	fetchReportById,
	fetchStartups,
	fetchStartupById,
	fetchFAQs,
	fetchFAQById,
	fetchTeamMembers,
	fetchTeamMemberById,
	fetchCareers,
	fetchCareerById,
	fetchPartners,
	fetchPartnerById,
	fetchFacilities,
	fetchFacilityById,
	fetchInitiatives,
	fetchInitiativeById,
	        fetchCirculars,
        fetchCircularById,
        submitContactMessage,
        submitApplication,
        fetchHero,
        fetchCarouselItems,
        fetchFeaturedGrids,
        fetchProgramHighlights,
        fetchMetrics,
        fetchAboutSection,
        fetchSuccessStories,
        fetchTestimonials,
        subscribeNewsletter,
};
