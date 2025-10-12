const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		photo: { type: String },
		bio: { type: String },
		role: { type: String, required: true },
		label: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamTitle', required: true },
		priority: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);
module.exports = TeamMember;
