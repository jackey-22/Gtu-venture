const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		subtitle: { type: String },
		description: { type: String, required: true },
		primaryButtonText: { type: String },
		primaryButtonLink: { type: String },
		secondaryButtonText: { type: String },
		secondaryButtonLink: { type: String },
		isActive: { type: Boolean, default: true },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const heroModel = mongoose.model('hero', heroSchema);
module.exports = heroModel;
