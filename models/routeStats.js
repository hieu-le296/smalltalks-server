const Database = require('../utils/db_query');


class RouteStats {

  constructor(){

  }

  /**
   * Method to update/insert route count each time an API route/endpoint is hit
   */
  static async storeRouteCount(req){

    const db = new Database();

    let query = `SELECT * FROM routeStats WHERE method = ? AND endpoint = ?`;

    const routeInfo = await db.queryDatabase(query, [
      req.method,
      req.routeURL
    ]);

    if(routeInfo.length == 0){
      //insert new row
      await RouteStats.insertEndpoint(req);
    }else{
      //increment existing count
      const newCount = routeInfo[0].requestCount+1;
      await RouteStats.updateEndpointCount(req,newCount);
    }

  }

  //insert new row in table, if end point does not exists
  static async insertEndpoint(req){

    const db = new Database();

    let query = `INSERT INTO routeStats (method,endpoint,requestCount) values(?,?,?)`;

    await db.queryDatabase(query, [
      req.method,
      req.routeURL,
      1
    ]);

  }

  //Update endpoint count in case if endpoint exists in the table already
  static async updateEndpointCount(req,count){

    const db = new Database();

    let query = `UPDATE routeStats SET requestCount = ? WHERE method = ? AND endpoint = ? `;

    await db.queryDatabase(query, [
      count,
      req.method,
      req.routeURL
    ]);

  }
}

module.exports = RouteStats;