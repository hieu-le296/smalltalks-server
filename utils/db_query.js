const mysql = require('mysql');
const connectPool = require('../config/db');

class Database {
  constructor() {
    this.connectPool = connectPool;
  }

  queryDatabase(query, values) {
    return new Promise((resolve, reject) => {
      this.connectPool.getConnection((err, con) => {
        try {
          con.query(query, values, (error, results) => {
            try {
              resolve(results);
              con.release();
            } catch (error1) {
              reject(error);
            }
          });
        } catch (error2) {
          reject(err);
        }
      });
    });
  }

  createTable(query) {
    return this.queryDatabase(query);
  }
}
