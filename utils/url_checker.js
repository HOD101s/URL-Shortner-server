module.exports = urlCheck = (url) => {
	try {
		new URL(url);
		return true;
	} catch (e) {
		return false;
	}
};
