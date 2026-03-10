USE recipe_app;

INSERT INTO users (username, email, password)
VALUES ('demo_chef', 'demo@cookbook.com', '123456')
ON DUPLICATE KEY UPDATE user_id = LAST_INSERT_ID(user_id);

SET @demo_user_id = LAST_INSERT_ID();

INSERT INTO recipes (user_id, title, description, ingredients, steps, image_url)
VALUES
(
  @demo_user_id,
  'Pasta Alfredo Rapida',
  'Receta cremosa y facil para comer en menos de 30 minutos.',
  '250 g pasta\n1 taza crema\n2 cucharadas mantequilla\n1/2 taza queso parmesano\nSal y pimienta',
  'Cocina la pasta en agua con sal.\nDerrite mantequilla en una sarten.\nAgrega crema y parmesano.\nMezcla la pasta con la salsa.\nSirve caliente.',
  'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=1400&q=80'
),
(
  @demo_user_id,
  'Bowl de Pollo y Verduras',
  'Plato balanceado con arroz, pollo y vegetales salteados.',
  '1 pechuga de pollo\n1 taza arroz cocido\n1 zanahoria\n1 calabacita\nSalsa de soya',
  'Corta y cocina el pollo en cubos.\nSaltea verduras en tiras.\nSirve arroz en un bowl.\nAgrega pollo y verduras.\nFinaliza con salsa de soya.',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=80'
);
