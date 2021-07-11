const Url = require('../models/urls');

// checks if original long url exists in db
const longUrlInDb = async (url) => {
	try {
		const data = await Url.findOne({ long_url: url, custom: false }).exec();

		// modify expiry for url
		if (data) {
			await Url.updateOne({ _id: data._id }, { createdAt: Date.now() });
		}

		return data;
	} catch (e) {
		return;
	}
};

// adds Url document to mongo collection
const addUrl = async (long_url, base_url, short_url_code, custom_link) => {
	// building new short url
	const new_url = `${base_url}/${short_url_code}`;
	try {
		// adding new url
		return await new Url({
			short_url: new_url,
			long_url: long_url,
			short_code: short_url_code,
			custom: custom_link,
		}).save();
	} catch (e) {
		// console.log(e);
		return;
	}
};

// get original url from code
const getLongUrl = async (short_url_code) => {
	try {
		const data = await Url.findOne({ short_code: short_url_code }).exec();
		await Url.updateOne({ _id: data._id }, { $inc: { clicks: 1 } }).exec();
		return data;
	} catch (e) {
		return;
	}
};

// check if short_url_code is available
const checkCodeAvailable = async (short_code) => {
	try {
		const data = await Url.findOne({ short_code: short_code }).exec();
		return data ? false : true;
	} catch (e) {
		return;
	}
};

module.exports = {
	longUrlInDb,
	addUrl,
	getLongUrl,
	checkCodeAvailable,
};
