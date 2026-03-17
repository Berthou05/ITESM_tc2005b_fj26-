USE recipe_app;

INSERT INTO users (user_id, username, email, password)
VALUES  (1, 'alexis', 'alexisberthou05@email.com', '$2a$12$zzL5OsJ30YLphoUaEneti.jElU40Pb.zfLGkIg8gUKvOFKXSs9hOa'),
        (4, 'chefalexis', 'alexis@unitas.dev', '$2b$12$GjIANgu3PVAmzRGgVAM6Ve46FXSkvUnU4crGPtSlcZGc81qfTIhzG'),

INSERT INTO roles (id, rol, created_at)
VALUES  (1, 'admin', '2026-03-10 10:01:18'),
        (2, 'editor', '2026-03-10 10:01:18'),
        (3, 'lector', '2026-03-10 10:01:18');

INSERT INTO privileges (id, privilege, created_at)
VALUES  (1, 'crear_recetas', '2026-03-10 10:03:33'),
        (2, 'ver_recetas', '2026-03-10 10:03:33'),
        (3, 'modificar_recetas', '2026-03-10 10:03:33'),
        (4, 'borrar_recetas', '2026-03-10 10:03:33');

INSERT INTO recipes (recipe_id, user_id, title, description, ingredients, steps, image_url, created_at)
VALUES  (1, 1, 'Hotcakes', 'Receta fácil para desayuno', '2 tazas de harina
2 huevos
1 taza de leche
2 cucharadas de azúcar
', 'Mezclar ingredientes
Calentar sartén
Cocinar por ambos lados', 'https://laroussecocina.mx/wp-content/uploads/2021/07/Harina-casera-para-hotcakes-Natalia-Bondoreca.png.webp', '2026-03-08 23:38:45'),
        (2, 1, 'Macarrones con queso', 'Unos ricos macarrones con queso con tocino', 'pasta
queso chédar
leche
mantequilla
tocino 
sal y pimienta', 'calentar el tocino en un sartén desde frio
poner a hervir el agua con sal
cocinar la pasta en el agua hirviendo durante 12 minutos
apagar el fuego y drenar la pasta
agregar un cuarto de tasa de leche con el queso y mantequilla
agregar el tocino con su grasa
agregar sal y pimienta al gusto', 'https://www.allrecipes.com/thmb/d7Yp1VpXxHGujhXd-PWTgvUmi4M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/217193-Cheddar-BaconMacCheese-ddmfs-gw-beauty-4x3-0155-6fc7b38b7c12412a95d5e9aeee96e438.jpg', '2026-03-09 09:19:57');

INSERT INTO role_privileges (id_rol, id_privilege, created_at)
VALUES  (1, 1, '2026-03-10 10:36:00'),
        (1, 2, '2026-03-10 10:36:00'),
        (1, 3, '2026-03-10 10:36:00'),
        (1, 4, '2026-03-10 10:36:00'),
        (2, 1, '2026-03-10 10:36:00'),
        (2, 2, '2026-03-10 10:36:00'),
        (2, 3, '2026-03-10 10:36:00'),
        (2, 4, '2026-03-10 10:36:00'),
        (3, 2, '2026-03-10 10:36:00');

INSERT INTO user_roles (id_user, id_rol, created_at)
VALUES  (1, 1, '2026-03-10 10:37:24'),
        (4, 3, '2026-03-10 10:37:24'),
      