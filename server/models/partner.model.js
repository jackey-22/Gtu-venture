const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		logo: { type: String },
		description: { type: String },
		website: { type: String },
		type: { type: String }, // Government, Corporate, Academic, etc.
		focus: { type: String },
		category: { type: String, enum: ['funding', 'strategic', 'corporate', 'academic', 'csr'], required: true },
		status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
		publishedAt: { type: Date },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const partnerModel = mongoose.model('partners', partnerSchema);
module.exports = partnerModel;

