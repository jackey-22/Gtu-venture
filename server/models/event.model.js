const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		slug: { type: String, required: true, unique: true },
		description: { type: String, required: true },
		start_date: { type: Date, required: true },
		end_date: { type: Date },
		location: { type: String },
		// virtual_link: { type: String },
		category: { type: String },
		experts: [{ type: String }],
		// tags: [{ type: String }],
		image: { type: String },
		// registration_url: { type: String },
		maxAttendees: { type: Number },
		currentAttendees: { type: Number, default: 0 },
		status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
		publishedAt: { type: Date },
		// featured: { type: Boolean, default: false },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const eventModel = mongoose.model('events', eventSchema);
module.exports = eventModel;
