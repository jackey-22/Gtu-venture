const mongoose = require('mongoose');

const programSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		slug: { type: String, required: true, unique: true },
		description: { type: String, required: true },
		// short_description: { type: String },
		category: { type: String }, // e.g. pre-incubation, incubation, acceleration
		duration: { type: String },
		eligibility: [{ type: String }],
		benefits: [{ type: String }],
		deadline: { type: Date },
		start_date: { type: Date },
		end_date: { type: Date },
		image: { type: String },
		status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
		publishedAt: { type: Date },
		// featured: { type: Boolean, default: false },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const programModel = mongoose.model('programs', programSchema);
module.exports = programModel;
