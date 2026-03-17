const express = require('express');
const recipeController = require('../controllers/recipeController');

const requireAuth = require('../middlewares/authMiddleware');
const canViewRecipe = require('../middlewares/viewPermissionMiddleware');
const canCreateRecipe = require('../middlewares/createPermissionMiddleware');
const router = express.Router();

router.get('/', requireAuth, canViewRecipe, recipeController.listRecipes);
router.get('/new', requireAuth, canViewRecipe, canCreateRecipe, recipeController.showCreateRecipe);
router.post('/', requireAuth, canCreateRecipe, recipeController.createRecipe);
router.get('/:id', requireAuth, canViewRecipe, recipeController.showRecipeDetail);

module.exports = router;