const userModel = require('../models/user.model');
const eventModel = require('../models/event.model');
const galleryModel = require('../models/gallery.model');
const newsModel = require('../models/news.model');
const programModel = require('../models/program.model');
const reportModel = require('../models/report.model');
const startupModel = require('../models/startup.model');
const path = require('path');
const fs = require('fs');

async function fetchPrograms(req, res, next) {
	const programs = await programModel.find().sort({ created_at: -1 });

	res.status(200).json({
		success: true,
		count: programs.length,
		data: programs,
	});
}

module.exports = {
	fetchPrograms,
};
