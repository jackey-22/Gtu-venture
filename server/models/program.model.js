const mongoose = require('mongoose');

const programSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		slug: { type: String, required: true, unique: true },
		description: { type: String, required: true },
		category: { type: String }, // e.g. pre-incubation, incubation, acceleration
		duration: { type: String },
		eligibility: [{ type: String }],
		benefits: [{ type: String }],
		deadline: { type: Date },
		start_date: { type: Date },
		end_date: { type: Date },
		status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
		publishedAt: { type: Date },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const programModel = mongoose.model('programs', programSchema);
module.exports = programModel;
