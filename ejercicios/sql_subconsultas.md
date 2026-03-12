# 1.- Actrices de “Las brujas de Salem”.

SELECT A.nombre
FROM elenco E
JOIN actor A on E.nombre = A.nombre
AND A.sexo = 'F' AND E.titulo = 'Las brujas de Salem';

SELECT nombre
FROM elenco E
WHERE titulo = 'Las brujas de Salem'
AND Nombre IN (
SELECT nombre
FROM actor A
WHERE sexo = 'F');

# 2.- Nombres de los actores que aparecen en películas producidas por MGM en 1995.

SELECT nombre
FROM elenco E
JOIN pelicula P on E.titulo = P.titulo AND E.anio = P.anio
WHERE E.anio = 1995 AND nomestudio = 'MGM';

SELECT nombre
FROM elenco E
WHERE anio = 1995 AND titulo IN (
    SELECT titulo
    FROM pelicula
    WHERE nomestudio = 'MGM'
    );

# 3.- Películas que duran más que “Lo que el viento se llevó” (de 1939).

SELECT titulo
FROM pelicula
WHERE duracion > (
    SELECT duracion
    FROM Pelicula
    WHERE titulo = 'lo que el viento se llevo'
    AND anio = 1939
    );

# 4.- Productores que han hecho más películas que George Lucas.

SELECT nombre
FROM pelicula P
JOIN productor PR on P.idproductor = PR.idproductor
GROUP BY PR.idproductor, PR.nombre
HAVING count(*) > (
    SELECT count(*)
    FROM pelicula P2
    JOIN productor PR2 ON P2.idproductor = PR2.idproductor
    WHERE PR2.nombre = 'George Lucas'
    );

# 5.- Nombres de los productores de las películas en las que ha aparecido Sharon Stone.
SELECT PR.nombre
FROM productor PR
INNER JOIN pelicula P on PR.idproductor = P.idproductor
INNER JOIN elenco E ON P.titulo = E.titulo AND P.anio = E.anio
WHERE E.nombre = 'Sharon Stone';

SELECT nombre
FROM productor P
JOIN pelicula Pl on P.idproductor = Pl.idproductor
WHERE Pl.titulo IN (
    SELECT P.titulo
    FROM pelicula P
    JOIN elenco E on E.titulo = P.titulo AND E.anio = P.anio
    WHERE E.nombre = 'Sharon Stone'
);

# 6.- Título de las películas que han sido filmadas más de una vez
SELECT titulo, COUNT(*) as 'Cantidad de veces filmada'
FROM pelicula Pl
GROUP BY titulo
HAVING count(*) > 1;