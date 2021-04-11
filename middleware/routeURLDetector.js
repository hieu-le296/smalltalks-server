const routeURLDetector = async (req, res, next) => {
  //leave it here, otherwise app keeps crashing
  const RouteStats = require('../models/RouteStat');

  /**
   * In database generalized route counts will be store, so replace numbers with 'id'
   * Example : /api/v1/users/1/questions  =====>  /api/v1/users/id/questions
   */
  let generializedPathName = req.path.replace(/\d+/g, 'id');

  //Store generalized request url in the request object
  req.routeURL = req.baseUrl + generializedPathName;

  //Perform query to update/store in hit count for endpoint in the database table
  await RouteStats.storeRouteCount(req);

  //go to next middleware
  next();
};

module.exports = routeURLDetector;
