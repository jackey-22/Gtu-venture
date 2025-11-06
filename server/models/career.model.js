const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		body: { type: String },
		type: { type: String }, // Full-time, Internship, Part-time, Fellowship
		category: { type: String }, // Operations, Marketing, Tech, etc.
		startup: { type: String },
		details: { type: String },
		requirements: [{ type: String }],
		benefits: [{ type: String }],
		location: { type: String },
		status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
		publishedAt: { type: Date },
		deadline: { type: Date },
		publishedOn: { type: Date },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const careerModel = mongoose.model('careers', careerSchema);
module.exports = careerModel;

