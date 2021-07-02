const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
	short_url: String,
	short_code: { type: String, index: true },
	long_url: { type: String, index: { unique: true } },
	createdAt: { type: Date, expires: 172800, default: Date.now },
	clicks: { type: Number, default: 0 },
});

module.exports = mongoose.model('Url', urlSchema);
