# Lab 19: Creación de Consultas Utilizando SQL con Funciones Agregadas y Sub-consultas
# Alexis Yaocalli Berthou Haas | A01713458

# La suma de las cantidades e importe total de todas las entregas realizadas durante el 97.

SELECT
SUM(Cantidad) AS 'Total de Unidades',
SUM(Cantidad * (Precio + Impuesto)) AS 'Importe total'
FROM Materiales AS M
INNER JOIN Entregan AS E ON M.Clave = E.Clave
WHERE Fecha BETWEEN '1997-01-01' AND '1997-12-31';

-- | Total de Unidades | Importe total |
-- | :--- | :--- |
-- | 2860 | 768388.5 |

# Para cada proveedor, obtener la razón social del proveedor, número de entregas e importe total de las entregas realizadas.
SELECT P.rfc,
       COUNT(*) AS 'Numero de entregas',
       SUM((PRECIO+Impuesto) * CANTIDAD) AS 'Importe total'
FROM entregan E
INNER JOIN proveedores P ON P.rfc = E.rfc
INNER JOIN materiales M ON M.clave = E.clave
GROUP BY rfc;

-- | rfc | Numero de entregas | Importe total |
-- | :--- | :--- | :--- |
-- | AAAA800101 | 12 | 1186955 |
-- | BBBB800101 | 12 | 612397.5 |
-- | CCCC800101 | 12 | 789431.5 |
-- | DDDD800101 | 11 | 470547 |
-- | EEEE800101 | 10 | 545134.7000417709 |
-- | FFFF800101 | 10 | 498987.5 |
-- | GGGG800101 | 10 | 1501912.5 |
-- | HHHH800101 | 10 | 1780410.5 |

# Por cada material obtener la clave y descripción del material, la cantidad total entregada, la mínima cantidad entregada, la máxima cantidad entregada, el importe total de las entregas de aquellos materiales en los que la cantidad promedio entregada sea mayor a 400.
SELECT M.clave, descripcion,
       SUM(cantidad) as 'Cantidad total entregada',
       MIN(cantidad) as 'Minima cantidad entregada',
       MAX(cantidad) as 'Maxima cantidad entregada',
       SUM(CANTIDAD*(PRECIO + IMPUESTO)) as 'Importe total'
FROM materiales M
INNER JOIN entregan E ON M.clave = E.clave
GROUP BY clave, descripcion
HAVING AVG(Cantidad) > 400;

-- | clave | descripcion | Cantidad total entregada | Minima cantidad entregada | Maxima cantidad entregada | Importe total |
-- | :--- | :--- | :--- | :--- | :--- | :--- |
-- | 1010 | Varilla 4/32 | 1051 | 523 | 528 | 132951.5 |
-- | 1040 | Varilla 3/18 | 803 | 263 | 540 | 141328 |
-- | 1050 | Varilla 4/34 | 1126 | 503 | 623 | 216755 |
-- | 1060 | Varilla 3/19 | 1016 | 324 | 692 | 212344 |
-- | 1100 | Block | 1165 | 466 | 699 | 38445 |
-- | 1120 | Sillar rosa | 907 | 215 | 692 | 99770 |
-- | 1140 | Cantera blanca | 802 | 219 | 583 | 176440 |
-- | 1150 | Cantera gris | 911 | 453 | 458 | 1212541 |
-- | 1230 | Cemento  | 842 | 312 | 530 | 277860 |
-- | 1260 | Gravilla | 1091 | 460 | 631 | 108009 |
-- | 1270 | Tezontle | 1052 | 506 | 546 | 92576 |
-- | 1320 | Tubería 4.4 | 1111 | 413 | 698 | 281083 |
-- | 1340 | Tubería 4.5 | 998 | 324 | 674 | 274450 |
-- | 1380 | Pintura C1011 | 947 | 302 | 645 | 755232.5 |
-- | 1390 | Pintura B1021 | 804 | 107 | 697 | 110550 |
-- | 1410 | Pintura B1021 | 1068 | 467 | 601 | 146850 |
-- | 1420 | Pintura C1012 | 881 | 278 | 603 | 121137.5 |

# Para cada proveedor, indicar su razón social y mostrar la cantidad promedio de cada material entregado, detallando la clave y descripción del material, excluyendo aquellos proveedores para los que la cantidad promedio sea menor a 500.
SELECT P.razonsocial,
       AVG(cantidad) AS 'Cantidad promedio',
       M.Clave, M.descripcion
FROM entregan E
INNER JOIN proveedores P ON P.rfc = E.rfc
INNER JOIN materiales M ON M.clave = E.clave
GROUP BY razonsocial,
         clave,
         descripcion
HAVING AVG(cantidad) > 500;

-- | razonsocial | Cantidad promedio | Clave | descripcion |
-- | :--- | :--- | :--- | :--- |
-- | Cecoferre | 526.0000 | 1270 | Tezontle |
-- | Comex | 563.0000 | 1050 | Varilla 4/34 |
-- | La Ferre | 582.5000 | 1100 | Block |
-- | La Ferre | 545.5000 | 1260 | Gravilla |
-- | La fragua | 555.5000 | 1320 | Tubería 4.4 |
-- | Oviedo | 525.5000 | 1010 | Varilla 4/32 |
-- | Oviedo | 534.0000 | 1410 | Pintura B1021 |
-- | Tabiquera del centro | 508.0000 | 1060 | Varilla 3/19 |


# Mostrar en una solo consulta los mismos datos que en la consulta anterior pero para dos grupos de proveedores: aquellos para los que la cantidad promedio entregada es menor a 370 y aquellos para los que la cantidad promedio entregada sea mayor a 450.
SELECT P.razonsocial,
       AVG(cantidad) AS 'Cantidad promedio',
       M.Clave, M.descripcion
FROM entregan E
INNER JOIN proveedores P ON P.rfc = E.rfc
INNER JOIN materiales M ON M.clave = E.clave
GROUP BY razonsocial,
         clave,
         descripcion
HAVING AVG(cantidad) < 370 or AVG(cantidad) > 450;

-- | razonsocial | Cantidad promedio | Clave | descripcion |
-- | :--- | :--- | :--- | :--- |
-- | Alvin | 453.5000 | 1120 | Sillar rosa |
-- | Alvin | 219.0000 | 1280 | Tepetate |
-- | Alvin | 314.5000 | 1360 | Pintura C1010 |
-- | Cecoferre | 248.5000 | 1030 | Varilla 4/33 |
-- | Cecoferre | 352.5000 | 1110 | Megablock |
-- |...|...|....|....|
-- | Tubasa | 135.5000 | 1310 | Tubería 3.6 |


# Generar 5 nuevos materiales
INSERT INTO tabla VALUES (2010, 'Jabón líquido', 140, 14.0, 4.02);
INSERT INTO tabla VALUES (2020, 'Detergente', 160, 16.0, 4.04);
INSERT INTO tabla VALUES (2030, 'Desinfectante', 180, 18.0, 4.06);
INSERT INTO tabla VALUES (2040, 'Cloro industrial', 200, 20.0, 4.08);
INSERT INTO tabla VALUES (2050, 'Limpiador multiusos', 220, 22.0, 4.10);

# Clave y descripción de los materiales que nunca han sido entregados.
SELECT clave, descripcion
FROM materiales
WHERE Clave NOT IN (
    SELECT Clave
    FROM entregan
    );

-- | clave | descripcion |
-- | :--- | :--- |
-- | 2000 | Jabón |

# Razón social de los proveedores que han realizado entregas tanto al proyecto 'Vamos México' como al proyecto 'Querétaro Limpio'.
SELECT razonsocial
FROM proveedores
WHERE rfc IN (
    SELECT E.rfc
    FROM entregan E
    INNER JOIN proyectos P ON P.numero = E.numero
    WHERE P.denominacion = 'Vamos México'
)
AND rfc IN (
    SELECT E.rfc
    FROM entregan E
    INNER JOIN proyectos P ON P.numero = E.numero
    WHERE P.denominacion = 'Querétaro Limpio'
);

-- | razonsocial |
-- | :--- |
-- | La fragua |


# Descripción de los materiales que nunca han sido entregados al proyecto 'CIT Yucatán'.
SELECT M.descripcion
FROM materiales M
WHERE descripcion NOT IN (
    SELECT descripcion
    FROM entregan E
    INNER JOIN proyectos P
        ON P.numero = E.numero
    WHERE E.clave = M.clave
      AND P.denominacion = 'CIT Yucatán'
);

-- | descripcion |
-- | :--- |
-- | Varilla 3/16 |
-- | Varilla 4/32 |
-- | Varilla 3/17 |
-- | Varilla 4/33 |
-- | Varilla 4/34 |
-- | Varilla 3/19 |
-- | Varilla 4/35 |
-- | Ladrillos rojos |
-- | ... |
-- | Jabón |



# Razón social y promedio de cantidad entregada de los proveedores cuyo promedio de cantidad entregada es mayor al promedio de la cantidad entregada por el proveedor con el RFC 'VAGO780901'.
# Cambie RFC 'VAGO780901' por 'AAAA800101' para obtener consultas que si existan
SELECT P.razonsocial, AVG(E.cantidad) AS "Promedio cantidad"
FROM proveedores P
INNER JOIN entregan E ON P.rfc = E.rfc
GROUP BY P.rfc, P.razonsocial
HAVING AVG(E.cantidad) > (
    SELECT AVG(E2.cantidad)
    FROM entregan E2
    WHERE E2.rfc = 'AAAA800101'
);

-- | razonsocial | Promedio cantidad |
-- | :--- | :--- |
-- | Oviedo | 354.5833 |
-- | La Ferre | 455.5000 |
-- | Cecoferre | 324.0909 |
-- | Alvin | 353.9000 |
-- | Tabiquera del centro | 408.7000 |
-- | Tubasa | 333.3000 |


# RFC, razón social de los proveedores que participaron en el proyecto 'Infonavit Durango' y cuyas cantidades totales entregadas en el 2000 fueron mayores a las cantidades totales entregadas en el 2001.

SELECT P.rfc, P.razonsocial
FROM proveedores P
WHERE P.rfc IN (
        SELECT E.rfc
        FROM entregan E
        INNER JOIN proyectos PR ON PR.numero = E.numero
        WHERE PR.denominacion = 'Infonavit Durango'
        ) AND (
        SELECT SUM(E1.cantidad)
        FROM entregan E1
        WHERE E1.rfc = P.rfc
        AND YEAR(E1.fecha) = 2000)
        > (
        SELECT SUM(E2.cantidad)
        FROM entregan E2
        WHERE E2.rfc = P.rfc
        AND YEAR(E2.fecha) = 2001
        );

-- | rfc | razonsocial |
-- | :--- | :--- |
-- | BBBB800101 | Oviedo |
-- | GGGG800101 | Tabiquera del centro |