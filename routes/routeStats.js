const express = require('express');


const { getRouteStats} = require('../controllers/routeStats');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get( protect,
    authorize('admin'),getRouteStats)


  module.exports = router;

