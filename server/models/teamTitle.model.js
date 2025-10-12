const mongoose = require('mongoose');

const teamTitleSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, unique: true },
		description: { type: String },
		priority: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

const TeamTitle = mongoose.model('TeamTitle', teamTitleSchema);
module.exports = TeamTitle;
