const userModel = require('../models/user.model');
const eventModel = require('../models/event.model');
const galleryModel = require('../models/gallery.model');
const newsModel = require('../models/news.model');
const programModel = require('../models/program.model');
const reportModel = require('../models/report.model');
const startupModel = require('../models/startup.model');
const faqModel = require('../models/faq.model');
const teamLabelModel = require('../models/teamTitle.model');
const teamMemberModel = require('../models/teamMember.model');
const applicationModel = require('../models/application.model');
const careerModel = require('../models/career.model');
const partnerModel = require('../models/partner.model');
const facilityModel = require('../models/facility.model');
const initiativeModel = require('../models/initiative.model');
const contactMessageModel = require('../models/contactMessage.model');
const circularModel = require('../models/circular.model');
const path = require('path');
const fs = require('fs');

// Event
async function addEvent(req, res) {
	const {
		title,
		slug,
		description,
		start_date,
		end_date,
		location,
		category,
		experts,
		maxAttendees,
		status,
		publishedAt,
	} = req.body;

	const image = req.file ? req.file.path : null;

	if (!title || !slug || !description || !start_date || !category) {
		return res.status(400).json({ message: 'Missing required fields' });
	}

	try {
		const existingEvent = await eventModel.findOne({ slug });
		if (existingEvent) {
			return res.status(400).json({ message: 'Slug already exists' });
		}

		const newEvent = new eventModel({
			title,
			slug,
			description,
			start_date,
			end_date,
			location,
			category,
			experts,
			image: image ? image.slice(6) : null,
			maxAttendees,
			status,
			publishedAt,
		});

		await newEvent.save();
		return res.status(201).json({ message: 'Event created successfully', event: newEvent });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getAllEvents(req, res) {
	try {
		const events = await eventModel.find().sort({ created_at: -1 });
		return res.status(200).json(events);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getEventById(req, res) {
	try {
		const event = await eventModel.findById(req.params.id);
		if (!event) {
			return res.status(404).json({ message: 'Event not found' });
		}
		return res.status(200).json(event);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function updateEvent(req, res) {
	try {
		const { id } = req.params;
		const {
			title,
			slug,
			description,
			start_date,
			end_date,
			location,
			category,
			experts,
			maxAttendees,
			status,
			publishedAt,
		} = req.body;

		const image = req.file ? req.file.path.slice(6) : null;

		const updatedData = {
			title,
			slug,
			description,
			start_date,
			end_date,
			location,
			category,
			experts,
			maxAttendees,
			status,
			publishedAt,
		};

		if (image) updatedData.image = image;

		const updatedEvent = await eventModel.findByIdAndUpdate(id, updatedData, {
			new: true,
			runValidators: true,
		});

		if (!updatedEvent) {
			return res.status(404).json({ message: 'Event not found' });
		}

		return res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function deleteEvent(req, res) {
	try {
		const { id } = req.params;

		const deletedEvent = await eventModel.findByIdAndDelete(id);
		if (!deletedEvent) {
			return res.status(404).json({ message: 'Event not found' });
		}

		return res.status(200).json({ message: 'Event deleted successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

// News
async function addNews(req, res) {
	try {
		const { title, slug, content, date, category, status, publishedAt } = req.body;
		if (!title || !slug || !content) {
			return res.status(400).json({ message: 'Missing required fields' });
		}

		const images =
			req.files?.map((file) => {
				return '\\' + file.path.replace(/^public[\\/]/, '').replace(/\//g, '\\');
			}) || [];

		const existingNews = await newsModel.findOne({ slug });
		if (existingNews) {
			return res.status(400).json({ message: 'Slug already exists' });
		}

		const newNews = new newsModel({
			title,
			slug,
			content,
			date,
			category,
			images: images ? images : [],
			status: status || 'draft',
			publishedAt,
		});

		await newNews.save();
		return res.status(201).json({ message: 'News created successfully', news: newNews });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getAllNews(req, res) {
	try {
		const news = await newsModel.find().sort({ created_at: -1 });
		return res.status(200).json(news);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getNewsById(req, res) {
	try {
		const news = await newsModel.findById(req.params.id);
		if (!news) return res.status(404).json({ message: 'News not found' });
		return res.status(200).json(news);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function updateNews(req, res) {
	try {
		const { id } = req.params;
		const { title, slug, content, date, category, images, status, publishedAt, removeImages } =
			req.body;

		const updatedData = await newsModel.findByIdAndUpdate(id, {
			title,
			slug,
			content,
			date,
			category,
			status,
			publishedAt,
		});

		const newImages =
			req.files?.map((file) => {
				return '\\' + file.path.replace(/^public[\\/]/, '').replace(/\//g, '\\');
			}) || [];
		if (removeImages) {
			updatedData.images = newImages;
		} else {
			const existingNews = await newsModel.findById(id);
			updatedData.images = [...(existingNews.images || []), ...newImages];
		}

		const updatedNews = await newsModel.findByIdAndUpdate(id, updatedData, {
			new: true,
			runValidators: true,
		});

		if (!updatedNews) return res.status(404).json({ message: 'News not found' });

		return res.status(200).json({ message: 'News updated successfully', news: updatedNews });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function deleteNews(req, res) {
	try {
		const { id } = req.params;
		const deletedNews = await newsModel.findByIdAndDelete(id);
		if (!deletedNews) return res.status(404).json({ message: 'News not found' });
		return res.status(200).json({ message: 'News deleted successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

//Report
async function addReport(req, res) {
	const { title, description, category, status, publishedAt } = req.body;
	const fileUrl = req.file ? req.file.path.slice(6) : null;

	if (!title || !fileUrl) {
		return res.status(400).json({ message: 'Missing required fields' });
	}

	try {
		const newReport = new reportModel({
			title,
			description,
			category,
			fileUrl,
			status: status || 'draft',
			publishedAt,
		});

		await newReport.save();
		return res.status(201).json({ message: 'Report created successfully', report: newReport });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getAllReports(req, res) {
	try {
		const reports = await reportModel.find().sort({ created_at: -1 });
		return res.status(200).json(reports);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getReportById(req, res) {
	try {
		const report = await reportModel.findById(req.params.id);
		if (!report) return res.status(404).json({ message: 'Report not found' });
		return res.status(200).json(report);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function updateReport(req, res) {
	try {
		const { id } = req.params;
		const { title, description, category, status, publishedAt } = req.body;

		const updatedData = { title, description, category, status, publishedAt };

		if (req.file) {
			updatedData.fileUrl = req.file.path.slice(6);
		}

		const updatedReport = await reportModel.findByIdAndUpdate(id, updatedData, {
			new: true,
			runValidators: true,
		});

		if (!updatedReport) return res.status(404).json({ message: 'Report not found' });

		return res
			.status(200)
			.json({ message: 'Report updated successfully', report: updatedReport });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function deleteReport(req, res) {
	try {
		const { id } = req.params;

		const deletedReport = await reportModel.findByIdAndDelete(id);
		if (!deletedReport) return res.status(404).json({ message: 'Report not found' });

		if (deletedReport.fileUrl) {
			const filePath = path.join(__dirname, '..', 'public', deletedReport.fileUrl);
			if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
		}

		return res.status(200).json({ message: 'Report deleted successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

// StartUp
async function addStartup(req, res) {
	const { name, description, founderName, sector, stage, url, location, status, publishedAt } =
		req.body;

	const logo = req.file ? req.file.path.slice(6) : null;

	if (!name || !description) {
		return res.status(400).json({ message: 'Missing required fields' });
	}

	try {
		const newStartup = new startupModel({
			name,
			description,
			founderName: founderName ? JSON.parse(founderName) : [],
			sector,
			stage,
			url,
			location,
			status,
			publishedAt,
			logo,
		});

		await newStartup.save();
		return res
			.status(201)
			.json({ message: 'Startup created successfully', startup: newStartup });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getAllStartups(req, res) {
	try {
		const startups = await startupModel.find().sort({ created_at: -1 });
		return res.status(200).json(startups);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getStartupById(req, res) {
	try {
		const startup = await startupModel.findById(req.params.id);
		if (!startup) {
			return res.status(404).json({ message: 'Startup not found' });
		}
		return res.status(200).json(startup);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function updateStartup(req, res) {
	try {
		const { id } = req.params;
		const {
			name,
			description,
			founderName,
			sector,
			stage,
			url,
			location,
			status,
			publishedAt,
		} = req.body;

		const logo = req.file ? req.file.path.slice(6) : null;

		const updatedData = {
			name,
			description,
			founderName: founderName ? JSON.parse(founderName) : [],
			sector,
			stage,
			url,
			location,
			status,
			publishedAt,
		};

		if (logo) updatedData.logo = logo;

		const updatedStartup = await startupModel.findByIdAndUpdate(id, updatedData, {
			new: true,
			runValidators: true,
		});

		if (!updatedStartup) {
			return res.status(404).json({ message: 'Startup not found' });
		}

		return res
			.status(200)
			.json({ message: 'Startup updated successfully', startup: updatedStartup });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function deleteStartup(req, res) {
	try {
		const { id } = req.params;
		const deletedStartup = await startupModel.findByIdAndDelete(id);
		if (!deletedStartup) {
			return res.status(404).json({ message: 'Startup not found' });
		}
		return res.status(200).json({ message: 'Startup deleted successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

// Gallary
async function addGallery(req, res) {
	try {
		const { title, description, status, publishedAt } = req.body;

		if (!title) {
			return res.status(400).json({ message: 'Title is required' });
		}

		const images =
			req.files?.map((file) => {
				return '\\' + file.path.replace(/^public[\\/]/, '').replace(/\//g, '\\');
			}) || [];

		const newGallery = new galleryModel({
			title,
			description,
			images,
			status: status || 'draft',
			publishedAt,
		});

		await newGallery.save();
		return res
			.status(201)
			.json({ message: 'Gallery created successfully', gallery: newGallery });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getAllGalleries(req, res) {
	try {
		const galleries = await galleryModel.find().sort({ created_at: -1 });
		return res.status(200).json(galleries);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getGalleryById(req, res) {
	try {
		const gallery = await galleryModel.findById(req.params.id);
		if (!gallery) return res.status(404).json({ message: 'Gallery not found' });
		return res.status(200).json(gallery);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function updateGallery(req, res) {
	try {
		const { id } = req.params;
		const { title, description, status, publishedAt, removeImages } = req.body;

		const galleryData = await galleryModel.findById(id);
		if (!galleryData) return res.status(404).json({ message: 'Gallery not found' });

		const newImages =
			req.files?.map((file) => {
				return '\\' + file.path.replace(/^public[\\/]/, '').replace(/\//g, '\\');
			}) || [];

		if (removeImages) {
			galleryData.images = newImages;
		} else {
			galleryData.images = [...(galleryData.images || []), ...newImages];
		}

		galleryData.title = title || galleryData.title;
		galleryData.description = description || galleryData.description;
		galleryData.status = status || galleryData.status;
		galleryData.publishedAt = publishedAt || galleryData.publishedAt;

		const updatedGallery = await galleryData.save();

		return res
			.status(200)
			.json({ message: 'Gallery updated successfully', gallery: updatedGallery });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function deleteGallery(req, res) {
	try {
		const { id } = req.params;
		const deletedGallery = await galleryModel.findByIdAndDelete(id);
		if (!deletedGallery) return res.status(404).json({ message: 'Gallery not found' });
		return res.status(200).json({ message: 'Gallery deleted successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

// Programs
async function addProgram(req, res) {
	try {
		const {
			title,
			slug,
			description,
			category,
			duration,
			eligibility,
			benefits,
			deadline,
			start_date,
			end_date,
			image,
			status,
			publishedAt,
		} = req.body;

		if (!title || !slug || !description) {
			return res.status(400).json({ message: 'Missing required fields' });
		}

		const existingProgram = await programModel.findOne({ slug });
		if (existingProgram) {
			return res.status(400).json({ message: 'Slug already exists' });
		}

		const newProgram = new programModel({
			title,
			slug,
			description,
			category,
			duration,
			eligibility: Array.isArray(eligibility)
				? eligibility
				: typeof eligibility === 'string'
				? eligibility.split(',').map((e) => e.trim())
				: [],

			benefits: Array.isArray(benefits)
				? benefits
				: typeof benefits === 'string'
				? benefits.split(',').map((b) => b.trim())
				: [],
			deadline,
			start_date,
			end_date,
			image,
			status,
			publishedAt,
		});

		await newProgram.save();
		return res
			.status(201)
			.json({ message: 'Program created successfully', program: newProgram });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getAllPrograms(req, res) {
	try {
		const programs = await programModel.find().sort({ created_at: -1 });
		return res.status(200).json(programs);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getProgramById(req, res) {
	try {
		const program = await programModel.findById(req.params.id);
		if (!program) {
			return res.status(404).json({ message: 'Program not found' });
		}
		return res.status(200).json(program);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function updateProgram(req, res) {
	try {
		const { id } = req.params;
		const {
			title,
			slug,
			description,
			category,
			duration,
			eligibility,
			benefits,
			deadline,
			start_date,
			end_date,
			image,
			status,
			publishedAt,
		} = req.body;

		const updatedData = {
			title,
			slug,
			description,
			category,
			duration,
			eligibility: Array.isArray(eligibility)
				? eligibility
				: typeof eligibility === 'string'
				? eligibility.split(',').map((e) => e.trim())
				: [],

			benefits: Array.isArray(benefits)
				? benefits
				: typeof benefits === 'string'
				? benefits.split(',').map((b) => b.trim())
				: [],
			deadline,
			start_date,
			end_date,
			image,
			status,
			publishedAt,
		};

		const updatedProgram = await programModel.findByIdAndUpdate(id, updatedData, {
			new: true,
			runValidators: true,
		});

		if (!updatedProgram) {
			return res.status(404).json({ message: 'Program not found' });
		}

		return res
			.status(200)
			.json({ message: 'Program updated successfully', program: updatedProgram });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function deleteProgram(req, res) {
	try {
		const { id } = req.params;
		const deleted = await programModel.findByIdAndDelete(id);
		if (!deleted) return res.status(404).json({ message: 'Program not found' });

		return res.status(200).json({ message: 'Program deleted successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

// FAQ
async function addFAQ(req, res) {
	try {
		const { question, answer, status, publishedAt, priority } = req.body;

		if (!question || !answer) {
			return res.status(400).json({ message: 'Missing required fields' });
		}

		let newPriority = priority;
		if (!newPriority) {
			const maxPriorityFAQ = await faqModel.findOne().sort({ priority: -1 });
			newPriority = maxPriorityFAQ ? maxPriorityFAQ.priority + 1 : 1;
		}

		const newFAQ = new faqModel({
			question,
			answer,
			priority: newPriority,
			status,
			publishedAt,
		});

		await newFAQ.save();
		return res.status(201).json({ message: 'FAQ created successfully', faq: newFAQ });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getAllFAQs(req, res) {
	try {
		const faqs = await faqModel.find().sort({ priority: 1, created_at: -1 });
		return res.status(200).json(faqs);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getFAQById(req, res) {
	try {
		const faq = await faqModel.findById(req.params.id);
		if (!faq) {
			return res.status(404).json({ message: 'FAQ not found' });
		}
		return res.status(200).json(faq);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function updateFAQ(req, res) {
	try {
		const { id } = req.params;

		const { question, answer, status, publishedAt, priority } = req.body;

		const updatedData = { question, answer, status, publishedAt };
		if (priority) updatedData.priority = priority;

		const updatedFAQ = await faqModel.findByIdAndUpdate(id, updatedData, {
			new: true,
			runValidators: true,
		});

		if (!updatedFAQ) {
			return res.status(404).json({ message: 'FAQ not found' });
		}

		return res.status(200).json({ message: 'FAQ updated successfully', faq: updatedFAQ });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function deleteFAQ(req, res) {
	try {
		const { id } = req.params;
		const deleted = await faqModel.findByIdAndDelete(id);

		if (!deleted) {
			return res.status(404).json({ message: 'FAQ not found' });
		}

		return res.status(200).json({ message: 'FAQ deleted successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

// Team Title
async function addTeamLabel(req, res) {
	try {
		const { title, description, priority } = req.body;
		if (!title || !priority) {
			return res.status(400).json({ message: 'Missing required fields' });
		}

		const existingLabel = await teamLabelModel.findOne({ title });
		if (existingLabel) {
			return res.status(400).json({ message: 'Team title already exists' });
		}

		const newLabel = new teamLabelModel({ title, description, priority });
		await newLabel.save();
		return res.status(201).json({ message: 'Team label created', label: newLabel });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getAllTeamLabels(req, res) {
	try {
		const labels = await teamLabelModel.find().sort({ priority: 1, createdAt: -1 });
		return res.status(200).json(labels);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getTeamLabelById(req, res) {
	try {
		const label = await teamLabelModel.findById(req.params.id);
		if (!label) return res.status(404).json({ message: 'Team label not found' });
		return res.status(200).json(label);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function updateTeamLabel(req, res) {
	try {
		const { id } = req.params;
		const { title, description, priority } = req.body;

		const updatedData = { title, description, priority };

		const updatedLabel = await teamLabelModel.findByIdAndUpdate(id, updatedData, {
			new: true,
			runValidators: true,
		});

		if (!updatedLabel) return res.status(404).json({ message: 'Team label not found' });

		return res.status(200).json({ message: 'Team label updated', label: updatedLabel });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function deleteTeamLabel(req, res) {
	try {
		const { id } = req.params;
		const deletedLabel = await teamLabelModel.findByIdAndDelete(id);
		if (!deletedLabel) return res.status(404).json({ message: 'Team label not found' });

		await teamMemberModel.updateMany({ label: id }, { $unset: { label: '' } });

		return res.status(200).json({ message: 'Team label deleted' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

// Team Member
async function addTeamMember(req, res) {
	try {
		const { name, bio, role, label, priority } = req.body;
		const photo = req.file ? req.file.path.slice(6) : null;

		if (!name || !role || !label || !priority) {
			return res.status(400).json({ message: 'Missing required fields' });
		}

		const newMember = new teamMemberModel({
			name,
			bio,
			role,
			label,
			photo,
			priority: priority || 1,
		});

		await newMember.save();
		return res.status(201).json({ message: 'Team member added', member: newMember });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getAllTeamMembers(req, res) {
	try {
		const members = await teamMemberModel
			.find()
			.populate('label')
			.sort({ priority: 1, createdAt: -1 });
		return res.status(200).json(members);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getTeamMemberById(req, res) {
	try {
		const member = await teamMemberModel.findById(req.params.id).populate('label');
		if (!member) return res.status(404).json({ message: 'Team member not found' });
		return res.status(200).json(member);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function updateTeamMember(req, res) {
	try {
		const { id } = req.params;
		const { name, bio, role, label, priority, removePhoto } = req.body;
		const photo = req.file ? req.file.path.slice(6) : null;

		const updatedData = { name, bio, role, label, priority: priority || 1 };
		if (photo) {
			updatedData.photo = photo;
		} else if (removePhoto === 'true' || removePhoto === true) {
			updatedData.photo = null;
		}

		const updatedMember = await teamMemberModel.findByIdAndUpdate(id, updatedData, {
			new: true,
			runValidators: true,
		});

		if (!updatedMember) return res.status(404).json({ message: 'Team member not found' });

		return res.status(200).json({ message: 'Team member updated', member: updatedMember });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function deleteTeamMember(req, res) {
	try {
		const { id } = req.params;
		const deletedMember = await teamMemberModel.findByIdAndDelete(id);
		if (!deletedMember) return res.status(404).json({ message: 'Team member not found' });

		return res.status(200).json({ message: 'Team member deleted' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

// Application
async function addApplication(req, res) {
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
			status,
			notes,
		} = req.body;

		if (!startupName || !email || !mobile) {
			return res.status(400).json({ message: 'Missing required fields' });
		}

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
			status: status || 'pending',
			notes,
		});

		await newApplication.save();
		return res.status(201).json({ message: 'Application created successfully', application: newApplication });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getAllApplications(req, res) {
	try {
		const applications = await applicationModel.find().sort({ created_at: -1 });
		return res.status(200).json(applications);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getApplicationById(req, res) {
	try {
		const application = await applicationModel.findById(req.params.id);
		if (!application) {
			return res.status(404).json({ message: 'Application not found' });
		}
		return res.status(200).json(application);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function updateApplication(req, res) {
	try {
		const { id } = req.params;
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
			status,
			notes,
		} = req.body;

		const updatedData = {
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
			status,
			notes,
		};

		const updatedApplication = await applicationModel.findByIdAndUpdate(id, updatedData, {
			new: true,
			runValidators: true,
		});

		if (!updatedApplication) {
			return res.status(404).json({ message: 'Application not found' });
		}

		return res.status(200).json({ message: 'Application updated successfully', application: updatedApplication });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function deleteApplication(req, res) {
	try {
		const { id } = req.params;
		const deletedApplication = await applicationModel.findByIdAndDelete(id);
		if (!deletedApplication) {
			return res.status(404).json({ message: 'Application not found' });
		}
		return res.status(200).json({ message: 'Application deleted successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

// Career
async function addCareer(req, res) {
	try {
		const { title, body, type, category, startup, details, requirements, benefits, location, status, publishedAt } = req.body;
		if (!title) {
			return res.status(400).json({ message: 'Missing required fields' });
		}

		const newCareer = new careerModel({
			title,
			body,
			type,
			category,
			startup,
			details,
			requirements: Array.isArray(requirements) ? requirements : [],
			benefits: Array.isArray(benefits) ? benefits : [],
			location,
			status: status || 'draft',
			publishedAt,
		});

		await newCareer.save();
		return res.status(201).json({ message: 'Career created successfully', career: newCareer });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getAllCareers(req, res) {
	try {
		const careers = await careerModel.find().sort({ created_at: -1 });
		return res.status(200).json(careers);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getCareerById(req, res) {
	try {
		const career = await careerModel.findById(req.params.id);
		if (!career) {
			return res.status(404).json({ message: 'Career not found' });
		}
		return res.status(200).json(career);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function updateCareer(req, res) {
	try {
		const { id } = req.params;
		const { title, body, type, category, startup, details, requirements, benefits, location, status, publishedAt } = req.body;

		const updatedData = {
			title,
			body,
			type,
			category,
			startup,
			details,
			requirements: Array.isArray(requirements) ? requirements : [],
			benefits: Array.isArray(benefits) ? benefits : [],
			location,
			status,
			publishedAt,
		};

		const updatedCareer = await careerModel.findByIdAndUpdate(id, updatedData, {
			new: true,
			runValidators: true,
		});

		if (!updatedCareer) {
			return res.status(404).json({ message: 'Career not found' });
		}

		return res.status(200).json({ message: 'Career updated successfully', career: updatedCareer });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function deleteCareer(req, res) {
	try {
		const { id } = req.params;
		const deletedCareer = await careerModel.findByIdAndDelete(id);
		if (!deletedCareer) {
			return res.status(404).json({ message: 'Career not found' });
		}
		return res.status(200).json({ message: 'Career deleted successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

// Partner
async function addPartner(req, res) {
	try {
		const { name, logo, description, website, type, focus, category, status, publishedAt } = req.body;
		if (!name || !category) {
			return res.status(400).json({ message: 'Missing required fields' });
		}

		const image = req.file ? req.file.path.slice(6) : logo;

		const newPartner = new partnerModel({
			name,
			logo: image,
			description,
			website,
			type,
			focus,
			category,
			status: status || 'draft',
			publishedAt,
		});

		await newPartner.save();
		return res.status(201).json({ message: 'Partner created successfully', partner: newPartner });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getAllPartners(req, res) {
	try {
		const partners = await partnerModel.find().sort({ created_at: -1 });
		return res.status(200).json(partners);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getPartnerById(req, res) {
	try {
		const partner = await partnerModel.findById(req.params.id);
		if (!partner) {
			return res.status(404).json({ message: 'Partner not found' });
		}
		return res.status(200).json(partner);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function updatePartner(req, res) {
	try {
		const { id } = req.params;
		const { name, logo, description, website, type, focus, category, status, publishedAt } = req.body;

		const image = req.file ? req.file.path.slice(6) : null;

		const updatedData = {
			name,
			description,
			website,
			type,
			focus,
			category,
			status,
			publishedAt,
		};

		if (image) updatedData.logo = image;

		const updatedPartner = await partnerModel.findByIdAndUpdate(id, updatedData, {
			new: true,
			runValidators: true,
		});

		if (!updatedPartner) {
			return res.status(404).json({ message: 'Partner not found' });
		}

		return res.status(200).json({ message: 'Partner updated successfully', partner: updatedPartner });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function deletePartner(req, res) {
	try {
		const { id } = req.params;
		const deletedPartner = await partnerModel.findByIdAndDelete(id);
		if (!deletedPartner) {
			return res.status(404).json({ message: 'Partner not found' });
		}
		return res.status(200).json({ message: 'Partner deleted successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

// Facility
async function addFacility(req, res) {
	try {
		const { title, body, icon, action, status, publishedAt } = req.body;
		if (!title) {
			return res.status(400).json({ message: 'Missing required fields' });
		}

		const newFacility = new facilityModel({
			title,
			body,
			icon,
			action,
			status: status || 'draft',
			publishedAt,
		});

		await newFacility.save();
		return res.status(201).json({ message: 'Facility created successfully', facility: newFacility });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getAllFacilities(req, res) {
	try {
		const facilities = await facilityModel.find().sort({ created_at: -1 });
		return res.status(200).json(facilities);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getFacilityById(req, res) {
	try {
		const facility = await facilityModel.findById(req.params.id);
		if (!facility) {
			return res.status(404).json({ message: 'Facility not found' });
		}
		return res.status(200).json(facility);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function updateFacility(req, res) {
	try {
		const { id } = req.params;
		const { title, body, icon, action, status, publishedAt } = req.body;

		const updatedData = {
			title,
			body,
			icon,
			action,
			status,
			publishedAt,
		};

		const updatedFacility = await facilityModel.findByIdAndUpdate(id, updatedData, {
			new: true,
			runValidators: true,
		});

		if (!updatedFacility) {
			return res.status(404).json({ message: 'Facility not found' });
		}

		return res.status(200).json({ message: 'Facility updated successfully', facility: updatedFacility });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function deleteFacility(req, res) {
	try {
		const { id } = req.params;
		const deletedFacility = await facilityModel.findByIdAndDelete(id);
		if (!deletedFacility) {
			return res.status(404).json({ message: 'Facility not found' });
		}
		return res.status(200).json({ message: 'Facility deleted successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

// Initiative
async function addInitiative(req, res) {
	try {
		const { title, body, outcomes, caseStudy, status, publishedAt } = req.body;
		if (!title) {
			return res.status(400).json({ message: 'Missing required fields' });
		}

		const newInitiative = new initiativeModel({
			title,
			body,
			outcomes,
			caseStudy,
			status: status || 'draft',
			publishedAt,
		});

		await newInitiative.save();
		return res.status(201).json({ message: 'Initiative created successfully', initiative: newInitiative });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getAllInitiatives(req, res) {
	try {
		const initiatives = await initiativeModel.find().sort({ created_at: -1 });
		return res.status(200).json(initiatives);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getInitiativeById(req, res) {
	try {
		const initiative = await initiativeModel.findById(req.params.id);
		if (!initiative) {
			return res.status(404).json({ message: 'Initiative not found' });
		}
		return res.status(200).json(initiative);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function updateInitiative(req, res) {
	try {
		const { id } = req.params;
		const { title, body, outcomes, caseStudy, status, publishedAt } = req.body;

		const updatedData = {
			title,
			body,
			outcomes,
			caseStudy,
			status,
			publishedAt,
		};

		const updatedInitiative = await initiativeModel.findByIdAndUpdate(id, updatedData, {
			new: true,
			runValidators: true,
		});

		if (!updatedInitiative) {
			return res.status(404).json({ message: 'Initiative not found' });
		}

		return res.status(200).json({ message: 'Initiative updated successfully', initiative: updatedInitiative });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function deleteInitiative(req, res) {
	try {
		const { id } = req.params;
		const deletedInitiative = await initiativeModel.findByIdAndDelete(id);
		if (!deletedInitiative) {
			return res.status(404).json({ message: 'Initiative not found' });
		}
		return res.status(200).json({ message: 'Initiative deleted successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

// Contact Message
async function addContactMessage(req, res) {
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
		return res.status(201).json({ message: 'Contact message submitted successfully', contactMessage: newContactMessage });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getAllContactMessages(req, res) {
	try {
		const contactMessages = await contactMessageModel.find().sort({ created_at: -1 });
		return res.status(200).json(contactMessages);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getContactMessageById(req, res) {
	try {
		const contactMessage = await contactMessageModel.findById(req.params.id);
		if (!contactMessage) {
			return res.status(404).json({ message: 'Contact message not found' });
		}
		return res.status(200).json(contactMessage);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function updateContactMessage(req, res) {
	try {
		const { id } = req.params;
		const { name, email, phone, role, subject, message, status, notes } = req.body;

		const updatedData = {
			name,
			email,
			phone,
			role,
			subject,
			message,
			status,
			notes,
		};

		const updatedContactMessage = await contactMessageModel.findByIdAndUpdate(id, updatedData, {
			new: true,
			runValidators: true,
		});

		if (!updatedContactMessage) {
			return res.status(404).json({ message: 'Contact message not found' });
		}

		return res.status(200).json({ message: 'Contact message updated successfully', contactMessage: updatedContactMessage });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function deleteContactMessage(req, res) {
	try {
		const { id } = req.params;
		const deletedContactMessage = await contactMessageModel.findByIdAndDelete(id);
		if (!deletedContactMessage) {
			return res.status(404).json({ message: 'Contact message not found' });
		}
		return res.status(200).json({ message: 'Contact message deleted successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

// Circular
async function addCircular(req, res) {
	try {
		const { title, summary, tags, url, fileUrl, date, type, status, publishedAt } = req.body;
		if (!title) {
			return res.status(400).json({ message: 'Missing required fields' });
		}

		const file = req.file ? req.file.path.slice(6) : fileUrl;

		// Handle tags - can be array, comma-separated string, or array from FormData
		let tagsArray = [];
		if (tags) {
			if (Array.isArray(tags)) {
				tagsArray = tags;
			} else if (typeof tags === 'string') {
				tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);
			}
		}

		const newCircular = new circularModel({
			title,
			summary,
			tags: tagsArray,
			url,
			fileUrl: file,
			date,
			type: type || 'circular',
			status: status || 'draft',
			publishedAt,
		});

		await newCircular.save();
		return res.status(201).json({ message: 'Circular created successfully', circular: newCircular });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getAllCirculars(req, res) {
	try {
		const circulars = await circularModel.find().sort({ created_at: -1 });
		return res.status(200).json(circulars);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getCircularById(req, res) {
	try {
		const circular = await circularModel.findById(req.params.id);
		if (!circular) {
			return res.status(404).json({ message: 'Circular not found' });
		}
		return res.status(200).json(circular);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function updateCircular(req, res) {
	try {
		const { id } = req.params;
		const { title, summary, tags, url, fileUrl, date, type, status, publishedAt } = req.body;

		const file = req.file ? req.file.path.slice(6) : null;

		// Handle tags - can be array, comma-separated string, or array from FormData
		let tagsArray = [];
		if (tags) {
			if (Array.isArray(tags)) {
				tagsArray = tags;
			} else if (typeof tags === 'string') {
				tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);
			}
		}

		const updatedData = {
			title,
			summary,
			tags: tagsArray,
			url,
			date,
			type,
			status,
			publishedAt,
		};

		if (file) updatedData.fileUrl = file;

		const updatedCircular = await circularModel.findByIdAndUpdate(id, updatedData, {
			new: true,
			runValidators: true,
		});

		if (!updatedCircular) {
			return res.status(404).json({ message: 'Circular not found' });
		}

		return res.status(200).json({ message: 'Circular updated successfully', circular: updatedCircular });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function deleteCircular(req, res) {
	try {
		const { id } = req.params;
		const deletedCircular = await circularModel.findByIdAndDelete(id);
		if (!deletedCircular) {
			return res.status(404).json({ message: 'Circular not found' });
		}
		return res.status(200).json({ message: 'Circular deleted successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

// Dashboard cnts
async function getDashboardCounts(req, res) {
	try {
		const [
			eventsCount,
			programsCount,
			newsCount,
			reportsCount,
			startupsCount,
			galleriesCount,
			faqsCount,
			applicationsCount,
			careersCount,
			partnersCount,
			facilitiesCount,
			initiativesCount,
			contactMessagesCount,
			circularsCount,
		] = await Promise.all([
			eventModel.countDocuments(),
			programModel.countDocuments(),
			newsModel.countDocuments(),
			reportModel.countDocuments(),
			startupModel.countDocuments(),
			galleryModel.countDocuments(),
			faqModel.countDocuments(),
			applicationModel.countDocuments(),
			careerModel.countDocuments(),
			partnerModel.countDocuments(),
			facilityModel.countDocuments(),
			initiativeModel.countDocuments(),
			contactMessageModel.countDocuments(),
			circularModel.countDocuments(),
		]);
		return res.status(200).json({
			events: eventsCount,
			programs: programsCount,
			news: newsCount,
			reports: reportsCount,
			startups: startupsCount,
			galleries: galleriesCount,
			faqs: faqsCount,
			applications: applicationsCount,
			careers: careersCount,
			partners: partnersCount,
			facilities: facilitiesCount,
			initiatives: initiativesCount,
			contactMessages: contactMessagesCount,
			circulars: circularsCount,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

module.exports = {
	addEvent,
	getAllEvents,
	getEventById,
	updateEvent,
	deleteEvent,
	addNews,
	getAllNews,
	getNewsById,
	updateNews,
	deleteNews,
	addReport,
	getAllReports,
	getReportById,
	updateReport,
	deleteReport,
	addStartup,
	getAllStartups,
	getStartupById,
	updateStartup,
	deleteStartup,
	addGallery,
	getAllGalleries,
	getGalleryById,
	updateGallery,
	deleteGallery,
	addProgram,
	getAllPrograms,
	getProgramById,
	updateProgram,
	deleteProgram,
	addFAQ,
	getAllFAQs,
	getFAQById,
	updateFAQ,
	deleteFAQ,
	addTeamLabel,
	getAllTeamLabels,
	getTeamLabelById,
	updateTeamLabel,
	deleteTeamLabel,
	addTeamMember,
	getAllTeamMembers,
	getTeamMemberById,
	updateTeamMember,
	deleteTeamMember,
	addApplication,
	getAllApplications,
	getApplicationById,
	updateApplication,
	deleteApplication,
	addCareer,
	getAllCareers,
	getCareerById,
	updateCareer,
	deleteCareer,
	addPartner,
	getAllPartners,
	getPartnerById,
	updatePartner,
	deletePartner,
	addFacility,
	getAllFacilities,
	getFacilityById,
	updateFacility,
	deleteFacility,
	addInitiative,
	getAllInitiatives,
	getInitiativeById,
	updateInitiative,
	deleteInitiative,
	addContactMessage,
	getAllContactMessages,
	getContactMessageById,
	updateContactMessage,
	deleteContactMessage,
	addCircular,
	getAllCirculars,
	getCircularById,
	updateCircular,
	deleteCircular,
	getDashboardCounts,
};
