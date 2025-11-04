const mongoose = require('mongoose');

const initiativeSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		body: { type: String },
		outcomes: { type: String },
		caseStudy: { type: String },
		status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
		publishedAt: { type: Date },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const initiativeModel = mongoose.model('initiatives', initiativeSchema);
module.exports = initiativeModel;

