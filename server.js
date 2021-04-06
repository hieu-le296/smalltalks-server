// Import the 3rd party modules
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');

// Load middleware
const errorHandler = require('./middleware/error');

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

// Use cors
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Import route modules
const questions = require('./routes/questions');
const users = require('./routes/users');
const comments = require('./routes/comments');

app.use('/api/v1/questions', questions);
app.use('/api/v1/users', users);
app.use('/api/v1/comments', comments);

app.use(errorHandler);

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
