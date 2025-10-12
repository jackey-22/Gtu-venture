const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema(
	{
		question: { type: String, required: true },
		answer: { type: String, required: true },
		priority: { type: Number, default: 0 },
		status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
		publishedAt: { type: Date },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const faqModel = mongoose.model('faq', faqSchema);
module.exports = faqModel;
