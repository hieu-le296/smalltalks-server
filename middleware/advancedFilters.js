/**
 * Function for handling request parameters for filtering/sorting questions stored in the database
 */

const advancedFilters = (req, res, next) => {
  req.searchKey = req.query.key;

  req.offset = req.query.offset;

  req.limit = req.query.limit;

  //Make sure the value is not null before splitting it into array
  if (req.query.sortby) req.sortingOrder = req.query.sortby.split(':')[1];

  next();
};

module.exports = { advancedFilters };
