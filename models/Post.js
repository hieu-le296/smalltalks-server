const Database = require('../utils/db_query');

// This class is used to perform the CRUD operations
class Post {
  constructor(post) {
    //Object destructing to access fields of 'post'
    const {
      postId,
      userId,
      username,
      name,
      profilePic,
      title,
      content,
      slug,
      createdAt,
      updatedAt,
    } = post;

    this.data = {
      postId,
      postedBy: {
        userId,
        username,
        name,
        profilePic,
      },
      title,
      content,
      slug,
      createdAt,
      updatedAt,
    };
  }

  /**
   * Find all posts
   * @returns postsData - All posts
   */
  static async findAll(req) {
    const db = new Database();

    let query = `
    SELECT p.postId, p.title, p.slug, p.content, u.userId, u.username, u.name, u.profilePic, p.createdAt, p.updatedAt
    FROM posts p INNER JOIN users u 
    ON p.userId = u.userId
    ORDER BY p.postId DESC`;

    if (req.searchKey) {
      query += ` WHERE p.title LIKE CONCAT('%','${req.searchKey}','%') OR p.content LIKE CONCAT('%','${req.searchKey}','%')`;
    }

    if (req.limit && req.offset) {
      query += ` LIMIT ${req.limit} OFFSET ${req.offset}`;
    }

    const posts = await db.queryDatabase(query, []);

    const postsData = [];

    //Format data for each post
    posts.forEach((post) => postsData.push(new Post(post).data));

    return postsData;
  }

  /**
   * Find single post by Id
   * @param {id} id of the post
   * @returns single post
   */
  static async findOne(field, value) {
    const db = new Database();
    let query = `
            SELECT p.postId, p.title, p.slug, p.content, p.userId, u.username, u.name, u.profilePic, p.createdAt, p.updatedAt
            FROM posts p INNER JOIN users u
            ON p.userId = u.userId
            WHERE p.${field} = ?;`;

    const posts = await db.queryDatabase(query, [value]);
    return new Post(posts[0]).data;
  }

  /**
   * Create a post
   * @param {post} post is the object
   * @returns insertId - a promise
   */
  static async create(post) {
    const db = new Database();
    let insertQuery = `INSERT INTO posts(userId, title, slug, content) VALUES(?, ?, ?, ?);`;
    return db.queryDatabase(insertQuery, [
      post.userId,
      post.title,
      post.slug,
      post.content,
    ]);
  }

  /**
   * Update a post by Id
   * @param {id} id of the post
   * @param {post} post is the object - a promise
   */
  static async findByIdAndUpdate(id, post) {
    const db = new Database();
    let query = `UPDATE posts SET title = ?, slug = ?, content = ? WHERE postId = ?`;
    return db.queryDatabase(query, [post.title, post.slug, post.content, id]);
  }

  /**
   * Delete a post by Id
   * @param {id} id of the post
   * @returns {} - a promise
   */
  static async findByIdAndDelete(id) {
    const db = new Database();
    let query = `DELETE FROM posts WHERE postId = ?`;
    return db.queryDatabase(query, [id]);
  }
}

module.exports = Post;
