const mongoose = require('mongoose');

const newsletterSubscriptionSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true, lowercase: true, trim: true },
		status: { type: String, enum: ['active', 'unsubscribed'], default: 'active' },
		subscribedAt: { type: Date, default: Date.now },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const newsletterSubscriptionModel = mongoose.model('newsletterSubscriptions', newsletterSubscriptionSchema);
module.exports = newsletterSubscriptionModel;
