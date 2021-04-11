const express = require('express');
const { advancedFilters } = require('../middleware/advancedFilters');

const {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} = require('../controllers/comments');

const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/auth');

router
  .route('/')
  .get(advancedFilters, getComments)
  .post(protect, createComment);

router
  .route('/:id')
  .get(getComment)
  .put(protect, updateComment)
  .delete(protect, deleteComment);

module.exports = router;
