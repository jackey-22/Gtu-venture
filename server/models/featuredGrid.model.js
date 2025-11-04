const mongoose = require('mongoose');

const featuredGridSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		image: { type: String },
		link: { type: String },
		linkText: { type: String },
		type: { type: String, enum: ['text', 'image', 'gradient'], default: 'text' },
		stats: [
			{
				label: { type: String },
				value: { type: String },
				icon: { type: String },
			},
		],
		order: { type: Number, default: 0 },
		status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const featuredGridModel = mongoose.model('featuredGrids', featuredGridSchema);
module.exports = featuredGridModel;
