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
      r.image_url,
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
        r.image_url,
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
    const sql = `
      INSERT INTO recipes (user_id, title, description, ingredients, steps, image_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    return db
      .execute(sql, [user_id, title, description, ingredients, steps, image_url || null])
      .then(([result]) => {
        return result.insertId;
      });
  }

  static updateRecipe(recipeId, { title, description, ingredients, steps, image_url }) {
    const sql = `
      UPDATE recipes
      SET title = ?, description = ?, ingredients = ?, steps = ?, image_url = ?
      WHERE recipe_id = ?
    `;

    return db
      .execute(sql, [title, description, ingredients, steps, image_url || null, recipeId])
      .then(([result]) => {
        return result.affectedRows > 0;
      });
  }

  static deleteRecipe(recipeId) {
    const sql = `
      DELETE FROM recipes
      WHERE recipe_id = ?
    `;

    return db.execute(sql, [recipeId]).then(([result]) => {
      return result.affectedRows > 0;
    });
  }
};