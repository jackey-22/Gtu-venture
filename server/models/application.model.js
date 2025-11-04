const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
	{
		startupName: { type: String, required: true },
		idea: { type: String },
		email: { type: String, required: true },
		cofounderEmail: { type: String },
		state: { type: String },
		city: { type: String },
		fundingRaised: { type: String },
		fundingAgency: { type: String },
		website: { type: String },
		mobile: { type: String, required: true },
		registered: { type: String },
		stage: { type: String },
		incubatedElsewhere: { type: String },
		supportNeeded: [{ type: String }],
		teamSize: { type: String },
		pitchDeck: { type: String },
		status: { type: String, enum: ['pending', 'reviewed', 'accepted', 'rejected'], default: 'pending' },
		notes: { type: String },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const applicationModel = mongoose.model('applications', applicationSchema);
module.exports = applicationModel;

