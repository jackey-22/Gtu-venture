const mongoose = require('mongoose');

const metricSchema = new mongoose.Schema(
	{
		label: { type: String, required: true },
		value: { type: Number, required: true },
		prefix: { type: String },
		suffix: { type: String },
		order: { type: Number, default: 0 },
		status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const metricModel = mongoose.model('metrics', metricSchema);
module.exports = metricModel;
