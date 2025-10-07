const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		// slug: { type: String, required: true, unique: true },
		description: { type: String, required: true },
		founderName: [{ type: String }],
		// foundedYear: { type: Number },
		sector: { type: String },
		stage: { type: String }, // idea, mvp, growth, scale
		url: { type: String },
		// linkedin_url: { type: String },
		// twitter_handle: { type: String },
		logo: { type: String },
		// images: [{ type: String }],
		// funding_amount: { type: mongoose.Types.Decimal128 },
		// funding_stage: { type: String },
		// team_size: { type: Number },
		location: { type: String },
		status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
		publishedAt: { type: Date },
		// featured: { type: Boolean, default: false },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const startupModel = mongoose.model('startups', startupSchema);
module.exports = startupModel;
