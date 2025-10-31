const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true, trim: true },
		// name: { type: String },
		// email: { type: String, required: true, unique: true, lowercase: true, trim: true },
		password: { type: String, required: true },
		// role: { type: String, enum: ['Admin', 'User'], default: 'Admin' },
		// isActive: { type: Boolean, default: true },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;
