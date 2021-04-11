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

const { protect } = require('../middleware/auth');

// Include other resource routers
const commentRouter = require('./comments');

// Re-route into other resource routers
router.use('/:questionId/comments', commentRouter);

// Mount router
router
  .route('/')
  .get(advancedFilters, getQuestions)
  .post(protect, performValidation, createQuestion);

router
  .route('/:id')
  .get(getQuestion)
  .put(protect, performValidation, updateQuestion)
  .delete(protect, deleteQuestion);

module.exports = router;
