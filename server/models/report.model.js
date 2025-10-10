const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String },
		fileUrl: { type: String, required: true },
		// file_name: { type: String },
		// file_size: { type: Number },
		// file_type: { type: String }, // pdf, docx, etc.
		category: { type: String },
		// tags: [{ type: String }],
		// download_count: { type: Number, default: 0 },
		status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
		publishedAt: { type: Date },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const reportModel = mongoose.model('reports', reportSchema);
module.exports = reportModel;
