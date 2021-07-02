const Url = require('../models/urls');
const { nanoid } = require('nanoid');

const longUrlInDb = async (url) => {
	try {
		const data = await Url.findOne({ long_url: url }).exec();
		console.log(data);

		// modify expiry for url
		if (data) {
			await Url.updateOne({ _id: data._id }, { createdAt: Date.now() });
		}

		return data;
	} catch (e) {
		console.log(e);
	}
};

const addUrl = async (long_url, base_url) => {
	const short_url_code = nanoid(10);
	const new_url = `${base_url}/${short_url_code}`;
	console.log(`New Url: ${new_url}`);
	try {
		return await new Url({
			short_url: new_url,
			long_url: long_url,
			short_code: short_url_code,
		}).save();
	} catch (e) {
		console.log(e);
		return undefined;
	}
};

module.exports = {
	longUrlInDb,
	addUrl,
};
