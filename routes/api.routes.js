const express = require('express');
const router = express.Router();
const urlCheck = require('../utils/url_checker');
const dao = require('../controllers/dao');

// POST /shorten
// adds new url to db
router.post('/shorten', async (req, res) => {
	// check if long_url is valid
	if (!urlCheck(req.body.long_url)) {
		return res.status(404).send('Invalid Url');
	}

	// check if long_url exists in db
	const longUrlInDb = await dao.longUrlInDb(req.body.long_url);
	if (longUrlInDb) {
		console.log('Fetching from Db');
		return res
			.status(200)
			.send({ short_url: longUrlInDb.short_url, long_url: longUrlInDb.long_url });
	}

	// add new url to db
	const addUrlResponse = await dao.addUrl(req.body.long_url, process.env.BASE_URL);
	console.log(addUrlResponse);

	// if insertion failed
	if (!addUrlResponse) {
		res.status(500).send('Failed to add new Url');
	}

	return res
		.status(200)
		.send({ short_url: addUrlResponse.short_url, long_url: addUrlResponse.long_url });
});

module.exports = router;
