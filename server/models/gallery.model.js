const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String },
		images: [{ type: String, required: true }],
		// thumbnail_url: { type: String },
		// tags: [{ type: String }],
		// uploaded_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
		publishedAt: { type: Date },
		// featured: { type: Boolean, default: false },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const galleryModel = mongoose.model('gallery', gallerySchema);
module.exports = galleryModel;
