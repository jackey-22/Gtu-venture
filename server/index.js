require('dotenv').config();
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('./utils/cron-job.utils');
// const path = require('path');

const { dbConnect } = require('./utils/db.utils');
const { errorHandler, asyncRouteHandler } = require('./utils/route.utils');

// include routes here
const authRoutes = require('./routes/auth.route');

const app = express();

app.use(cors({ maxAge: 3600 }));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
	})
);

//Routes
app.get('/', (req, res) => {
	res.json({ message: 'Welcome to the server!' });
});
app.use('/auth', authRoutes);

app.use(errorHandler);

dbConnect()
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log('http://localhost:5000/');
		});
	})
	.catch((err) => {
		console.log(err);
		console.log('DB ERROR');
	});
