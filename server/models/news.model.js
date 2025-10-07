const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		slug: { type: String, required: true, unique: true },
		content: { type: String, required: true },
		date: { type: Date },
		category: { type: String },
		// tags: [{ type: String }],
		images: [{ type: String }],
		// authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
		publishedAt: { type: Date },
		// featured: { type: Boolean, default: false },
		// views: { type: Number, default: 0 },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const newsModel = mongoose.model('news', newsSchema);
module.exports = newsModel;
