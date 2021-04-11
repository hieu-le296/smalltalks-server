const fs = require('fs');
const mysql = require('mysql');
const colors = require('colors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load env configurations
dotenv.config({ path: './config/config.env' });

const connectPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

function queryDatabase(query, values) {
  return new Promise((resolve, reject) => {
    connectPool.getConnection((err, con) => {
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

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Read JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

const questions = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/questions.json`, 'utf-8')
);

const comments = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/comments.json`, 'utf-8')
);

async function createUsers(usersObj) {
  const query = `INSERT INTO users(userId, name, username, email, passwd, role) VALUES ?`;

  const userArr = [];

  for (let i = 0; i < usersObj.length; i++) {
    const password = await encryptPassword(usersObj[i].password);
    let user = [
      usersObj[i].userId,
      usersObj[i].name,
      usersObj[i].username,
      usersObj[i].email,
      password,
      usersObj[i].role,
    ];
    userArr.push(user);
  }
  await queryDatabase(query, [userArr]);
}

async function createQuestions(questionsObj) {
  const query = `INSERT INTO questions(questionId, userId, title, content) VALUES ?`;
  const questionArr = [];
  for (let i = 0; i < questionsObj.length; i++) {
    let question = [
      questionsObj[i].questionId,
      questionsObj[i].userId,
      questionsObj[i].title,
      questionsObj[i].content,
    ];
    questionArr.push(question);
  }
  await queryDatabase(query, [questionArr]);
}

async function createComments(commentsObj) {
  const query = `INSERT INTO comments(commentId, questionId, commentUserId, content) VALUES ?;`;
  const commentArr = [];
  for (let i = 0; i < commentsObj.length; i++) {
    let comment = [
      commentsObj[i].commentId,
      commentsObj[i].questionId,
      commentsObj[i].commentUserId,
      commentsObj[i].content,
    ];
    commentArr.push(comment);
  }
  await queryDatabase(query, [commentArr]);
}

// Import into DB
const importData = async () => {
  try {
    console.log('Please Wait! Importing Data...'.green.inverse);
    await createUsers(users);
    await createQuestions(questions);
    await createComments(comments);
  } catch (error) {
    console.log(error);
  }
};

// Delete all columns and tables from DB
const deleteData = async () => {
  try {
    console.log('Please Wait! Deleting Data...'.red.inverse);
    await queryDatabase(`DELETE FROM users`, []);
    await queryDatabase(`DELETE FROM routeStats`, []);
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
