const express = require('express');
const recipeController = require('../controllers/recipeController');

const requireAuth = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', requireAuth, recipeController.listRecipes);
router.get('/new', requireAuth, recipeController.showCreateRecipe);
router.post('/', requireAuth, recipeController.createRecipe);
router.get('/:id', requireAuth, recipeController.showRecipeDetail);

module.exports = router;