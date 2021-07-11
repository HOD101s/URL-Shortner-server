const express = require('express');
const router = express.Router();
const urlCheck = require('../utils/url_checker');
const dao = require('../controllers/dao');

// POST /shorten
// adds new url to db
router.post('/shorten', async (req, res) => {
	// check if long_url is valid
	if (!urlCheck(req.body.long_url)) {
		return res.status(404).json('Invalid Url');
	}

	// check if long_url exists in db
	const longUrlInDb = await dao.longUrlInDb(req.body.long_url);
	if (longUrlInDb) {
		// console.log('Fetching from Db');
		return res
			.status(200)
			.json({ short_url: longUrlInDb.short_url, long_url: longUrlInDb.long_url });
	}

	// add new url to db
	const addUrlResponse = await dao.addUrl(req.body.long_url, req.headers.origin);
	// console.log(addUrlResponse);

	// if insertion failed
	if (!addUrlResponse) {
		res.status(500).json('Failed to add new Url');
	}

	return res
		.status(200)
		.json({ short_url: addUrlResponse.short_url, long_url: addUrlResponse.long_url });
});

// GET /redirection/short_url_code
// gets original url from db
router.get('/redirection/:code', async (req, res) => {
	// check in db
	const data = await dao.getLongUrl(req.params.code);

	// if not in db
	if (!data) {
		res.status(404);
		res.json('Invalid Resource');
		res.end();
		return;
	}

	// redirect to original url
	return res.redirect(data.long_url);
});

module.exports = router;
