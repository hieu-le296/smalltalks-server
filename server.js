// Import the 3rd party modules
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');

// Load env configurations
dotenv.config({ path: './config/config.env' });

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

app.use('/api/v1/questions', questions);

const PORT = process.env.PORT || 5700;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  // Close server and exit process
  server.close();
});
