const recipeModel = require('../models/recipeModel');

exports.listRecipes = (request, response) => {
  console.log(request.session.user.privileges);
  recipeModel.getAllRecipes()
    .then((recipes) => {
      return response.render('recipes/index', {
        title: 'Recetas',
        recipes: recipes || []
      });
    })
    .catch(() => {
      return response.status(500).render('recipes/index', {
        title: 'Recetas',
        recipes: [],
        error: 'Error al cargar recetas'
      });
    });
}

exports.showCreateRecipe = (request, response) => {
  return response.render('recipes/new', {
    title: 'Nueva receta',
    error: null,
    formData: { title: '', description: '', ingredients: '', steps: '', image_url: '' }
  });
}

exports.createRecipe = (request, response) => {
  const title = (request.body.title || '').trim();
  const description = (request.body.description || '').trim();
  const ingredients = (request.body.ingredients || '').trim();
  const steps = (request.body.steps || '').trim();
  const image_url = (request.body.image_url || '').trim();

  if (!title || !ingredients || !steps) {
    return response.status(400).render('recipes/new', {
      title: 'Nueva receta',
      error: 'Titulo, ingredientes y pasos son obligatorios.',
      formData: { title, description, ingredients, steps, image_url }
    });
  }

  recipeModel
    .createRecipe({
      user_id: request.session.user.user_id,
      title,
      description,
      ingredients,
      steps,
      image_url
    })
    .then((recipeId) => {
      request.session.flash = {
        type: 'success',
        message: 'Receta creada correctamente.'
      };

      return response.redirect(`/recipes/${recipeId}`);
    })
    .catch(() => {
      return response.status(500).render('recipes/new', {
        title: 'Nueva receta',
        error: 'No se pudo guardar la receta.',
        formData: { title, description, ingredients, steps, image_url }
      });
    });
}

exports.showRecipeDetail = (request, response) => {
  const recipeId = Number(request.params.id);

  if (Number.isNaN(recipeId) || recipeId <= 0) {
    return response.status(400).render('404', { title: 'Receta invalida' });
  }

  recipeModel
    .getRecipeById(recipeId)
    .then((recipe) => {
      if (!recipe) {
        return response.status(404).render('404', { title: 'Receta no encontrada' });
      }

      return response.render('recipes/show', {
        title: recipe.title,
        recipe
      });
    })
    .catch(() => {
      return response.status(500).render('404', { title: 'Error al cargar receta' });
    });
}
