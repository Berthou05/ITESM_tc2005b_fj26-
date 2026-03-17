const express = require('express');
const recipeController = require('../controllers/recipeController');

const requireAuth = require('../middlewares/authMiddleware');
const canViewRecipe = require('../middlewares/viewPermissionMiddleware');
const canCreateRecipe = require('../middlewares/createPermissionMiddleware');
const canDeleteRecipe = require('../middlewares/deletePermissionMiddleware');
const canModifyRecipe = require('../middlewares/modifyPermissionMiddleware');
const router = express.Router();

router.get('/', requireAuth, canViewRecipe, recipeController.listRecipes);
router.get('/new', requireAuth, canViewRecipe, canCreateRecipe, recipeController.showCreateRecipe);
router.post('/', requireAuth, canCreateRecipe, recipeController.createRecipe);
router.get('/:id/edit', requireAuth, canViewRecipe, canModifyRecipe, recipeController.showEditRecipe);
router.post('/:id/edit', requireAuth, canViewRecipe, canModifyRecipe, recipeController.updateRecipe);
router.post('/:id/delete', requireAuth, canViewRecipe, canDeleteRecipe, recipeController.deleteRecipe);
router.get('/:id', requireAuth, canViewRecipe, recipeController.showRecipeDetail);

module.exports = router;
