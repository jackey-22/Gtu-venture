const userModel = require('../models/user.model');
const eventModel = require('../models/event.model');
const galleryModel = require('../models/gallery.model');
const newsModel = require('../models/news.model');
const programModel = require('../models/program.model');
const reportModel = require('../models/report.model');
const startupModel = require('../models/startup.model');

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

module.exports = {
	addEvent,
	getAllEvents,
	getEventById,
	updateEvent,
	deleteEvent,
};
