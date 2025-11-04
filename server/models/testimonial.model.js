const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
	{
		quote: { type: String, required: true },
		author: { type: String, required: true },
		position: { type: String, required: true },
		image: { type: String, required: true },
		order: { type: Number, default: 0 },
		status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const testimonialModel = mongoose.model('testimonials', testimonialSchema);
module.exports = testimonialModel;
