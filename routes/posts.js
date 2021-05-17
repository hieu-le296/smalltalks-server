const express = require('express');
const { postValidation } = require('../middleware/validation');
const { advancedFilters } = require('../middleware/advancedFilters');

const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/posts');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Include other resource routers
const commentRouter = require('./comments');

// Re-route into other resource routers
router.use('/:postId/comments', commentRouter);

// Mount router
router
  .route('/')
  .get(advancedFilters, getPosts)
  .post(protect, authorize('user', 'admin'), postValidation, createPost);

router.route('/:slug').get(getPost);

router
  .route('/:id')
  .put(protect, authorize('user', 'admin'), postValidation, updatePost)
  .delete(protect, authorize('user', 'admin'), deletePost);

module.exports = router;
