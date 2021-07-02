const express = require('express');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const validateShortUrl = require('./utils/validateShortUrl');
require('dotenv').config();

// express Routers
const apiRoutes = require('./routes/api.routes');
const shortUrlRouter = require('./routes/shortUrlRouter.routes');
const router404 = require('./routes/router404');

// Constant port for service
const PORT = 5000;

// connect to mongo
try {
	mongoose.Promise = global.Promise;
	mongoose.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		keepAlive: true,
		useCreateIndex: true,
	});
} catch (e) {
	// console.log('Failed to connect to mongo');
}

// express app
const app = express();

// Middleware

// gzip compression
app.use(compression());
// enabling cors
app.use(cors());
app.options('*', cors());
// body parsing
// support parsing of application/json type post data
app.use(express.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: true }));

// logger
app.use(morgan('tiny'));

// Routers
// adding api router
app.use('/api', apiRoutes);
// adding re-routing Router
app.use('/:id', validateShortUrl, shortUrlRouter);

// 404
app.use('/', router404);

// Server
// Starting server on specified port
app.listen(PORT, () => {
	// console.log(`Server running on Port ${PORT}`);
});
