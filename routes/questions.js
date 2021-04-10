const express = require('express');
const { performValidation } = require('../middleware/validation')
const {advancedFilters} = require('../middleware/advancedFilters');

const {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require('../controllers/questions');

const router = express.Router();

// Include other resource routers
const commentRouter = require('./comments');

// Re-route into other resource routers
router.use('/:questionId/comments', commentRouter);

// Mount router
router.route('/').get(advancedFilters, getQuestions).post(performValidation, createQuestion);

router
  .route('/:id')
  .get(getQuestion)
  .put(updateQuestion)
  .delete(deleteQuestion);

module.exports = router;
