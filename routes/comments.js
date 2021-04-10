const express = require('express');
const {advancedFilters} = require('../middleware/advancedFilters');

const {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} = require('../controllers/comments');

const router = express.Router({ mergeParams: true });

router.route('/').get(advancedFilters, getComments).post(createComment);

router.route('/:id').get(getComment).put(updateComment).delete(deleteComment);

module.exports = router;
