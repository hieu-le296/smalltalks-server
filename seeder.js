const fs = require('fs');
const mysql = require('mysql');
const colors = require('colors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const slugify = require('slugify');

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
  return bcrypt.hash(password, salt);
}

// Read JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

const posts = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/posts.json`, 'utf-8')
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

async function createPosts(postsObj) {
  const query = `INSERT INTO posts(postId, userId, title, slug, content) VALUES ?`;
  const postArr = [];
  for (let i = 0; i < postsObj.length; i++) {
    let post = [
      postsObj[i].postId,
      postsObj[i].userId,
      postsObj[i].title,
      slug(posts[i].title),
      postsObj[i].content,
    ];
    postArr.push(post);
  }
  await queryDatabase(query, [postArr]);
}

async function createComments(commentsObj) {
  const query = `INSERT INTO comments(commentId, postId, commentUserId, content) VALUES ?;`;
  const commentArr = [];
  for (let i = 0; i < commentsObj.length; i++) {
    let comment = [
      commentsObj[i].commentId,
      commentsObj[i].postId,
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
    await createPosts(posts);
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
    removeUserPicture();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}

function slug(string) {
  return slugify(string, {
    replacement: '-',
    remove: /[*+~.()'"!:@?]/g,
    lower: false,
    strict: false,
  });
}

async function removeUserPicture() {
  // Find the user picture
  const profilePic = fs
    .readdirSync(`${process.env.FILE_UPLOAD_PATH}/avatars/`)
    .filter((file) => file.startsWith(`photo`));

  // Remove user's profile image
  if (profilePic.length !== 0)
    await fs.promises.unlink(
      `${process.env.FILE_UPLOAD_PATH}/avatars/${profilePic}`
    );

  // Find the user background image
  const backgroundPic = fs
    .readdirSync(`${process.env.FILE_UPLOAD_PATH}/backgrounds/`)
    .filter((file) => file.startsWith(`background`));

  // Remove user's background image
  if (backgroundPic.length !== 0)
    await fs.promises.unlink(
      `${process.env.FILE_UPLOAD_PATH}/backgrounds/${backgroundPic}`
    );
}
