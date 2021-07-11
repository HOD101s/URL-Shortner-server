const express = require('express');
const router = express.Router();
const { customAlphabet } = require('nanoid');
const urlCheck = require('../utils/url_checker');
const dao = require('../controllers/dao');

const nanoid = customAlphabet(
	'12345678890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
	10,
);

// POST /shorten
// adds new url to db
router.post('/shorten', async (req, res) => {
	// flag for link being custom
	var customLink = false;

	// check if long_url is valid
	if (!urlCheck(req.body.long_url)) {
		return res.status(404).json('Invalid Url');
	}

	// setting shortCode from POST body
	var shortCode;
	if (req.body.short_code) {
		shortCode = req.body.short_code;
		customLink = true;
	} else {
		shortCode = nanoid(10);
	}

	// this if block will reuse existing short urls pointing to same long_url
	// dao.longUrlInDb also refreshes the expiration by another 48 hours
	// setting condition to false to circumvent reassignment of same url as some users may intend the 48 hour timeout
	// NOTE: this will result in multiple individual short links to the same long_url
	if (false && !req.body.short_code) {
		// check if long_url exists in db
		const longUrlInDb = await dao.longUrlInDb(req.body.long_url);
		if (longUrlInDb) {
			// fetching from db
			return res
				.status(200)
				.json({ short_url: longUrlInDb.short_url, long_url: longUrlInDb.long_url });
		}
	}

	// add new url to db
	const addUrlResponse = await dao.addUrl(
		req.body.long_url,
		req.headers.origin,
		shortCode,
		customLink,
	);

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

// GET /code_available
// check if code is available
router.get('/code_available', async (req, res) => {
	console.log(`Checking Code: ${req.query.code}`);
	if (await dao.checkCodeAvailable(req.query.code)) {
		return res.status(200).json('Code is Available');
	}
	return res.status(403).json('Code is Unavailble');
});

module.exports = router;
