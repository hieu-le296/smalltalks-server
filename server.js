// Import the 3rd party modules
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const compression = require('compression');

// Load middleware
const errorHandler = require('./middleware/error');
const routeURLDetector = require('./middleware/routeURLDetector');

// Load env configurations
dotenv.config({ path: './config/config.env' });

const connectDb = require('./config/db');

connectDb.getConnection((err, connection) => {
  if (err) throw err;
  console.log(
    `Connected to database ${process.env.DB_NAME}`.cyan.underline.bold
  );
  connection.release();
});

const app = express();

// Using body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Use cors
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount middlewares

app.use(fileUpload());
app.use(routeURLDetector);

// Set secruity header
app.use(helmet());

//Compress all routes
app.use(compression());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Import route modules
const questions = require('./routes/questions');
const users = require('./routes/users');
const comments = require('./routes/comments');
const auth = require('./routes/auth');
const routeStats = require('./routes/routeStats');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api/v1/questions', routeURLDetector, questions);
app.use('/api/v1/users', routeURLDetector, users);
app.use('/api/v1/comments', routeURLDetector, comments);
app.use('/api/v1/auth', routeURLDetector, auth);
app.use('/api/v1/routeStats', routeURLDetector, routeStats);

app.use(errorHandler);

// Handle 404 error
app.use((req, res, next) => {
  res.status(404);
  res.sendFile(path.join(__dirname, 'public', '404.html'));
});

const PORT = process.env.PORT || 5700;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  // Close server & exit process
  server.close(() => process.exit(1));
});
