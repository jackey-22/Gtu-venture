const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		body: { type: String },
		icon: { type: String },
		action: { type: String },
		status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
		publishedAt: { type: Date },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const facilityModel = mongoose.model('facilities', facilitySchema);
module.exports = facilityModel;

