// Import the 3rd party modules
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

// Load env configurations
dotenv.config({ path: './config/config.env' });

const app = express();

// Using body parser
app.use(express.urlencoded({ extended: false }));
app.use(epress.json());

// Use cors
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5700;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
