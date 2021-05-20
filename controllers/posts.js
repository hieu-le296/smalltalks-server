const ThrowError = require('../utils/throwError');
const asyncHandler = require('../middleware/async');
const Post = require('../models/Post');
const slugify = require('slugify');

/**
 * @description     Get All public posts
 * @route           GET /api/v1/posts
 * @access          Public
 */
exports.getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.findAll(req);
  if (posts.length > 0) {
    res.status(200).json({
      success: true,
      pagination: {
        limit: req.limit,
        offset: req.offset,
      },
      data: posts,
      msg: 'Show all posts',
    });
  } else {
    return next(new ThrowError('No posts found', 404));
  }
});

/**
 * @description     Get single post
 * @route           GET /api/v1/posts/:id
 * @access          Public
 */
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findOne('slug', req.params.slug);

  res.status(200).json({
    success: true,
    data: post,
    msg: `Show post with the id of ${req.params.id}`,
  });
});

/**
 * @description     Create new post
 * @route           GET /api/v1/posts
 * @access          Private
 */
exports.createPost = asyncHandler(async (req, res, next) => {
  req.body.userId = req.user.userId;

  req.body.slug = slugify(req.body.title, {
    replacement: '-',
    remove: /[*+~.()'"!:@?]/g,
    lower: false,
    strict: false,
  });

  const result = await Post.create(req.body);

  if (!result) return next(new ThrowError('Post is duplicate', 406));

  const foundPost = await Post.findOne('postId', result.insertId);

  if (!foundPost) return next(new ThrowError('Could not create a post', 400));

  res.status(201).json({
    success: true,
    data: foundPost,
    msg: 'Post successfully created!',
  });
});

/**
 * @description     Update the post
 * @route           PUT /api/v1/posts/:id
 * @access          Private - Only owner or admin
 */
exports.updatePost = asyncHandler(async (req, res, next) => {
  req.body.userId = req.user.userId;
  const post = await Post.findOne('postId', req.params.id);

  // Check if the post author
  if (post.postedBy.userId !== req.user.userId && req.user.role !== 'admin')
    return next(
      new ThrowError('This user is not authorized to update the post', 401)
    );

  if (!post) return next(new ThrowError('Could not update the post', 400));

  req.body.slug = slugify(req.body.title, {
    replacement: '-',
    remove: /[*+~.()'"!:@?]/g,
    lower: false,
    strict: false,
  });

  const result = await Post.findByIdAndUpdate(req.params.id, req.body);

  if (!result) return next(new ThrowError('Title is duplicated!', 400));

  const updatedPost = await Post.findOne('postId', req.params.id);

  res.status(200).json({
    success: true,
    data: updatedPost,
    msg: 'Post with successfully updated!',
  });
});

/**
 * @description     Delete the post
 * @route           DELETE /api/v1/posts/:id
 * @access          Private - Only owner or admin
 */
exports.deletePost = asyncHandler(async (req, res, next) => {
  req.body.userId = req.user.userId;
  const post = await Post.findOne('postId', req.params.id);

  if (!post) return next(new ThrowError('Could not delete the post', 400));

  // Check if the post author
  if (post.postedBy.userId !== req.user.userId && req.user.role !== 'admin')
    return next(
      new ThrowError('This user is not authorized to update the post', 401)
    );

  await Post.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
    msg: 'Post successfully deleted!',
  });
});
