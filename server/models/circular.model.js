const mongoose = require('mongoose');

const circularSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		summary: { type: String },
		tags: [{ type: String }],
		url: { type: String },
		fileUrl: { type: String },
		date: { type: Date },
		type: { type: String, enum: ['circular', 'tender'], default: 'circular' },
		status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
		publishedAt: { type: Date },
		// Versioning fields for tenders
		parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'circulars', default: null },
		version: { type: Number, default: 1 },
		previousData: { type: mongoose.Schema.Types.Mixed, default: null },
		isLatest: { type: Boolean, default: true },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const circularModel = mongoose.model('circulars', circularSchema);
module.exports = circularModel;

