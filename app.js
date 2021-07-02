const express = require('express');
const apiRoutes = require('./routes/api.routes');
const app = express();

// Constant port for service
const PORT = 5000;

// adding api router
app.use('/api', apiRoutes);

// Starting server on specified port
app.listen(PORT, () => {
	console.log(`Server running on Port ${PORT}`);
});
