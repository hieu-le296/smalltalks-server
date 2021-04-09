/**
 * Function for handling request parameters for filtering/sorting questions stored in the database
 */

const search = (req,res,next) => {

  req.searchKey = req.query.key;

  //Make sure the value is not null before splitting it into array
  if(req.query.sortby)
    req.sortingOrder = req.query.sortby.split(':')[1];


  next();

}

module.exports = {search};