const userModel = require('../models/user.model');
const eventModel = require('../models/event.model');
const galleryModel = require('../models/gallery.model');
const newsModel = require('../models/news.model');
const programModel = require('../models/program.model');
const reportModel = require('../models/report.model');
const startupModel = require('../models/startup.model');
const faqModel = require('../models/faq.model');
const teamMemberModel = require('../models/teamMember.model');

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
};
