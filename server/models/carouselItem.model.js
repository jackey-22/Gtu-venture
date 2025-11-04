const mongoose = require('mongoose');

const carouselItemSchema = new mongoose.Schema(
	{
		image: { type: String, required: true },
		title: { type: String, required: true },
		description: { type: String, required: true },
		order: { type: Number, default: 0 },
		status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const carouselItemModel = mongoose.model('carouselItems', carouselItemSchema);
module.exports = carouselItemModel;
