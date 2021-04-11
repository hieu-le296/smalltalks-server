const express = require('express');
const { performValidation } = require('../middleware/validation');
const { advancedFilters } = require('../middleware/advancedFilters');

const {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require('../controllers/questions');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Include other resource routers
const commentRouter = require('./comments');

// Re-route into other resource routers
router.use('/:questionId/comments', commentRouter);

// Mount router
router
  .route('/')
  .get(advancedFilters, getQuestions)
  .post(protect, authorize('user', 'admin'), performValidation, createQuestion);

router
  .route('/:id')
  .get(getQuestion)
  .put(protect, authorize('user', 'admin'), performValidation, updateQuestion)
  .delete(protect, authorize('user', 'admin'), deleteQuestion);

module.exports = router;
