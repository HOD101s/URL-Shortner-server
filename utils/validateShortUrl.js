module.exports = validateShortUrl = (req, res, next) => {
	if (req.originalUrl.length != 11) {
		res.status(404);
		res.json('Invalid Url');
		res.end();
		return;
	}
	next();
};
