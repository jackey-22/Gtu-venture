const mongoose = require('mongoose');

const aboutSectionSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		description2: { type: String },
		image: { type: String },
		statCardValue: { type: String },
		statCardLabel: { type: String },
		buttonText: { type: String },
		buttonLink: { type: String },
		isActive: { type: Boolean, default: true },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const aboutSectionModel = mongoose.model('aboutSection', aboutSectionSchema);
module.exports = aboutSectionModel;
