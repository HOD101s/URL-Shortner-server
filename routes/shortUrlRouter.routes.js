const express = require('express');
const router = express.Router();
const dao = require('../controllers/dao');

router.get('/', async (req, res) => {
	const data = await dao.getLongUrl(req.originalUrl.slice(1));
	if (!data) {
		res.status(404);
		res.json('Invalid Resource');
		res.end();
		return;
	}
	return res.redirect(data.long_url);
});

module.exports = router;
