const mysql = require('mysql');
const connectPool = require('../config/db');

class Database {
  constructor() {
    this.connectPool = connectPool;
    this.createTable(userTable);
    this.createTable(postTable);
    this.createTable(commentTable);
    this.createTable(routeStatsTable);
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

let userTable = `
  CREATE TABLE IF NOT EXISTS users(
    userId INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE, 
    passwd VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') NOT NULL,
    profilePic VARCHAR(100) DEFAULT 'default.jpeg',
    backgroundPic VARCHAR(100) DEFAULT 'default.jpeg',
    resetPasswordToken VARCHAR(255) DEFAULT NULL,
    resetPasswordExpire DATETIME DEFAULT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) 
`;

let postTable = `
  CREATE TABLE IF NOT EXISTS posts(
    postId INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INT(11) NOT NULL, 
    title VARCHAR(500) NOT NULL UNIQUE,
    slug VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users (userId) ON DELETE CASCADE ON UPDATE CASCADE
)
`;

let commentTable = `
  CREATE TABLE IF NOT EXISTS comments(
    commentId INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    postId INT(11) NOT NULL,
    commentUserId INT(11) NOT NULL, 
    content TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (commentUserId) REFERENCES users (userId) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (postId) REFERENCES posts (postId) ON DELETE CASCADE ON UPDATE CASCADE
)
`;

let routeStatsTable = `
CREATE TABLE IF NOT EXISTS routeStats(
  method VARCHAR(100) NOT NULL,
  endpoint VARCHAR(250) not NULL,
  requestCount INT(11) NOT NULL,
  PRIMARY KEY (method, endpoint)
  );
  `;

module.exports = Database;
