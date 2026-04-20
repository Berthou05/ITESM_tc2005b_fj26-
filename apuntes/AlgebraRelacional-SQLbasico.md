### Álgebra relacional → SQL

**Selección (filtrar filas)**
``` sql
SELECT * 
FROM materiales 
WHERE clave = 1000;
```

**Proyección (seleccionar columnas)**
```sql
SELECT clave, rfc, fecha 
FROM entregan;
```

**Join (reunión)**
``` sql
SELECT * 
FROM entregan, proveedores 
WHERE entregan.rfc = proveedores.rfc;
```
**Join con condición**
``` sql
SELECT * 
FROM entregan, proyectos 
WHERE entregan.numero <= proyectos.numero;
```

**Unión**
``` sql
(SELECT * FROM entregan WHERE clave = 1000)
UNION
(SELECT * FROM entregan WHERE clave = 2000);
```


**Intersección** (no en todos los motores)
``` sql
(SELECT clave FROM entregan WHERE numero = 5001)
INTERSECT
(SELECT clave FROM entregan WHERE numero = 5018);
```

**Diferencia (no en todos los motores)**
``` sql
(SELECT * FROM entregan)
MINUS
(SELECT * FROM entregan WHERE clave = 1000);
```

**Producto cartesiano**
``` sql
SELECT * 
FROM entregan, materiales;
```

## SQL básico

**Estructura básica**

``` sql
SELECT columnas
FROM tablas
WHERE condiciones;
```

## Joins

**INNER JOIN (solo coincidencias)**
``` sql
SELECT *
FROM A
INNER JOIN B ON A.id = B.id;
```

**LEFT JOIN (todo A aunque no haya en B)**
``` sql
SELECT *
FROM A
LEFT JOIN B ON A.id = B.id;
```

**RIGHT JOIN (todo B aunque no haya en A)**
``` sql
SELECT *
FROM A
RIGHT JOIN B ON A.id = B.id;
```

## Funciones agregadas

**Suma por grupo**
``` sql
SELECT codproducto, SUM(cantidad)
FROM ventas
GROUP BY codproducto;
```

**Agrupar por varias columnas**
``` sql
SELECT codproducto, fecha, SUM(cantidad)
FROM ventas
GROUP BY codproducto, fecha;
```

**Filtrar agregados**
``` sql
SELECT nocliente, fecha, SUM(cantidad)
FROM ventas
GROUP BY nocliente, fecha
HAVING SUM(cantidad) > 100;
```

## Funciones principales

``` sql
SUM(columna)
AVG(columna)
MIN(columna)
MAX(columna)
COUNT(*)
```

## Pregunta
¿Por qué SQL separa WHERE y HAVING, y qué problemas ocurrirían si se evaluaran en el mismo momento?
