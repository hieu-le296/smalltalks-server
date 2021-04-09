const routeURLDetector = (req,res,next)=>{
  

  console.log('HTTP VERB ',req.method);

  /**
  * In database generalized route counts will be store, so replace numbers with 'id'
  * Example : /api/v1/users/1/questions  =====>  /api/v1/users/id/questions
  */
  let generializedPathName = req.path.replace(/\d+/g,'id');
    
  //Store generalized request url in the request object
  req.routeURL = req.baseUrl + generializedPathName;

  console.log('URL is ',req.routeURL);

  next();
}

module.exports = routeURLDetector;