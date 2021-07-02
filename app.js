const express = require('express');
const morgan = require('morgan');

// express Routers
const apiRoutes = require('./routes/api.routes');

// Constant port for service
const PORT = 5000;

// express app
const app = express();

// Middleware

// body parsing
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// logger
app.use(morgan('tiny'));

// Routers
// adding api router
app.use('/api', apiRoutes);

// Server
// Starting server on specified port
app.listen(PORT, () => {
	console.log(`Server running on Port ${PORT}`);
});
