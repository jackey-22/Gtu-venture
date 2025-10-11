const userModel = require('../models/user.model');
const eventModel = require('../models/event.model');
const galleryModel = require('../models/gallery.model');
const newsModel = require('../models/news.model');
const programModel = require('../models/program.model');
const reportModel = require('../models/report.model');
const startupModel = require('../models/startup.model');
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

// ✅ Add Program
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

// ✅ Get all programs
async function getAllPrograms(req, res) {
	try {
		const programs = await programModel.find().sort({ created_at: -1 });
		return res.status(200).json(programs);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

// ✅ Get single program
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

// ✅ Update program
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

// ✅ Delete program
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
};
