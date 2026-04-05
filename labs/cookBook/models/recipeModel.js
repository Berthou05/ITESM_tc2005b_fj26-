const db = require('../config/db');

module.exports = class Recipe {

  static getAllRecipes() {
    const sql = `
      SELECT
        r.recipe_id,
      r.title,
      r.description,
      r.ingredients,
      r.steps,
      r.image_url AS filename,
      r.created_at,
      u.username AS author_username
    FROM recipes r
    INNER JOIN users u ON r.user_id = u.user_id
    ORDER BY r.created_at DESC
    `;

    return db.execute(sql).then(([rows]) => {
      return rows;
    });
  }

  static getRecipeById(recipeId) {
    const sql = `
      SELECT
        r.recipe_id,
        r.user_id,
        r.title,
        r.description,
        r.ingredients,
        r.steps,
        r.image_url AS filename,
        r.created_at,
        u.username AS author_username
      FROM recipes r
      INNER JOIN users u ON r.user_id = u.user_id
      WHERE r.recipe_id = ?
      LIMIT 1
    `;

    return db.execute(sql, [recipeId]).then(([rows]) => {
      return rows[0] || null;
    });
  }

  static createRecipe({ user_id, title, description, ingredients, steps, image_url }) {
    return db.execute('CALL CreateRecipe(?, ?, ?, ?, ?, ?)',[user_id, title, description, ingredients, steps, image_url || null])
    .then(([resultSets]) => {
      return resultSets[0][0].recipe_id;
    });
  }

  static updateRecipe(recipeId, { title, description, ingredients, steps, image_url }) {
    return db.execute('CALL UpdateRecipe(?, ?, ?, ?, ?, ?)', [recipeId, title, description, ingredients, steps, image_url || null])
      .then(([resultSets]) => {
        return resultSets[0][0].affected_rows > 0;
      });
  }

  static deleteRecipe(recipeId) {
    return db.execute('CALL DeleteRecipe(?)', [recipeId])
    .then(([resultSets]) => {
      return resultSets[0][0].affected_rows > 0;
    });
  }
};