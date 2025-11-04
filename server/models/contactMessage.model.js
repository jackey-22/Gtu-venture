const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String, required: true },
		role: { type: String },
		subject: { type: String, required: true },
		message: { type: String, required: true },
		status: { type: String, enum: ['new', 'read', 'replied', 'archived'], default: 'new' },
		notes: { type: String },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const contactMessageModel = mongoose.model('contactMessages', contactMessageSchema);
module.exports = contactMessageModel;

