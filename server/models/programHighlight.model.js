const mongoose = require('mongoose');

const programHighlightSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		icon: { type: String, required: true },
		color: { type: String, default: 'bg-primary/10 text-primary' },
		link: { type: String },
		order: { type: Number, default: 0 },
		status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const programHighlightModel = mongoose.model('programHighlights', programHighlightSchema);
module.exports = programHighlightModel;
