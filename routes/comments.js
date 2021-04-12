const express = require('express');
const { commentValidation } = require('../middleware/validation');
const { advancedFilters } = require('../middleware/advancedFilters');

const {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} = require('../controllers/comments');

const router = express.Router({ mergeParams: true });

const { protect,authorize } = require('../middleware/auth');

router
  .route('/')
  .get(advancedFilters, getComments)
  .post(protect,authorize('user', 'admin'), commentValidation, createComment);

router
  .route('/:id')
  .get(getComment)
  .put(protect,authorize('user', 'admin'), commentValidation, updateComment)
  .delete(protect,authorize('user', 'admin'), deleteComment);

module.exports = router;
