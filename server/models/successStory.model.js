const mongoose = require('mongoose');
const ICON_ENUM = require('../constants/icon.enum');

const successStorySchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		icon: { type: String, required: true, enum: ICON_ENUM },
		metric: { type: String, required: true },
		image: { type: String, required: true },
		order: { type: Number, default: 0 },
		status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },														
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }	
);

const successStoryModel = mongoose.model('successStories', successStorySchema);
module.exports = successStoryModel;
