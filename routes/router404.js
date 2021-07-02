const express = require('express');
const router = express.Router();

const _404 = (req, res) => {
	res.status(404);
	res.json('Invalid Resource');
	res.end();
	return;
};

router.get('/', _404);
router.post('/', _404);

module.exports = router;
