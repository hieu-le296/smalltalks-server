const RouteStats = require('../models/RouteStat');
const ThrowError = require('../utils/throwError');
const asyncHandler = require('../middleware/async');

exports.getRouteStats = asyncHandler(async (req, res, next) => {
  const routesData = await RouteStats.getAll();

  if (routesData.length > 0) {
    res.status(200).json({
      success: true,
      data: routesData,
      msg: 'Show route statistics',
    });
  } else {
    return next(new ThrowError('No route information found', 404));
  }
});
