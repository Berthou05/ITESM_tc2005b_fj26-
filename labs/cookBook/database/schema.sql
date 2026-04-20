create table privileges
(
    id         int auto_increment
        primary key,
    privilege  varchar(100)                          not null,
    created_at timestamp default current_timestamp() not null,
    constraint uq_privileges_privilege
        unique (privilege)
);

create table roles
(
    id         int auto_increment
        primary key,
    rol        varchar(100)                          not null,
    created_at timestamp default current_timestamp() not null,
    constraint uq_roles_rol
        unique (rol)
);

create table role_privileges
(
    id_rol       int                                   not null,
    id_privilege int                                   not null,
    created_at   timestamp default current_timestamp() not null,
    primary key (id_rol, id_privilege),
    constraint fk_role_privileges_privilege
        foreign key (id_privilege) references privileges (id)
            on update cascade on delete cascade,
    constraint fk_role_privileges_role
        foreign key (id_rol) references roles (id)
            on update cascade on delete cascade
);

create index idx_role_privileges_privilege
    on role_privileges (id_privilege);

create table users
(
    user_id  int auto_increment
        primary key,
    username varchar(50)  not null,
    email    varchar(100) not null,
    password varchar(100) not null,
    constraint email
        unique (email),
    constraint username
        unique (username)
);

create table recipes
(
    recipe_id   int auto_increment
        primary key,
    user_id     int                                   not null,
    title       varchar(150)                          not null,
    description text                                  null,
    ingredients text                                  not null,
    steps       text                                  not null,
    image_url   varchar(255)                          null,
    created_at  timestamp default current_timestamp() null,
    constraint `1`
        foreign key (user_id) references users (user_id)
);

create index user_id
    on recipes (user_id);

create table user_roles
(
    id_user    int                                   not null,
    id_rol     int                                   not null,
    created_at timestamp default current_timestamp() not null,
    primary key (id_user, id_rol),
    constraint fk_user_roles_role
        foreign key (id_rol) references roles (id)
            on update cascade on delete cascade,
    constraint fk_user_roles_user
        foreign key (id_user) references users (user_id)
            on update cascade on delete cascade
);

create index idx_user_roles_rol
    on user_roles (id_rol);

create
    definer = root@localhost procedure CreateRecipe(IN p_user_id int, IN p_title varchar(255), IN p_description text,
                                                    IN p_ingredients text, IN p_steps text, IN p_image_url varchar(255))
BEGIN
  INSERT INTO recipes (user_id, title, description, ingredients, steps, image_url)
  VALUES (p_user_id, p_title, p_description, p_ingredients, p_steps, p_image_url);

  SELECT LAST_INSERT_ID() AS recipe_id;
END;

create
    definer = root@localhost procedure DeleteRecipe(IN p_recipe_id int)
BEGIN
  DELETE FROM recipes
  WHERE recipe_id = p_recipe_id;

  SELECT ROW_COUNT() AS affected_rows;
END;

create
    definer = root@localhost procedure UpdateRecipe(IN p_recipe_id int, IN p_title varchar(255), IN p_description text,
                                                    IN p_ingredients text, IN p_steps text, IN p_image_url varchar(255))
BEGIN
  UPDATE recipes
  SET
    title = p_title,
    description = p_description,
    ingredients = p_ingredients,
    steps = p_steps,
    image_url = p_image_url
  WHERE recipe_id = p_recipe_id;

  SELECT ROW_COUNT() AS affected_rows;
END;

