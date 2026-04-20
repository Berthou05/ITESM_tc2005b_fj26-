## Uso de roles (misma tabla varias veces)

``` sql
SELECT idviaje, origen.nombre, destino.nombre, fecha
FROM viajes, ciudades origen, ciudades destino
WHERE viajes.idorigen = origen.idciudad
AND viajes.iddestino = destino.idciudad;
```

## Uso de sinónimos

``` sql
CREATE SYNONYM origen FOR ciudades;
CREATE SYNONYM destino FOR ciudades;
```

``` sql
SELECT idviaje, origen.nombre, destino.nombre, fecha
FROM viajes, origen, destino
WHERE viajes.idorigen = origen.idciudad
AND viajes.iddestino = destino.idciudad;
```

## Autocombinación (self join)

``` sql
SELECT e.nombre empleado, j.nombre jefe
FROM empleados e, empleados j
WHERE e.idjefe = j.idempleado;
```

## Comparar datos de la misma tabla

``` sql
SELECT p.idproducto, p.descripcion, v1.cantidad - v2.cantidad AS diferencia
FROM productos p, ventasdiarias v1, ventasdiarias v2
WHERE p.idproducto = v1.idproducto
AND p.idproducto = v2.idproducto
AND v1.fecha = '1-SEP-00'
AND v2.fecha = '2-SEP-00';
```

## Subconsulta con NOT IN

``` sql
SELECT idproducto
FROM productos
WHERE idproducto NOT IN (
    SELECT idproducto FROM ventasdiarias
);
```

## Subconsulta con NOT EXISTS

``` sql
SELECT idproducto
FROM productos p
WHERE NOT EXISTS (
    SELECT *
    FROM ventasdiarias v
    WHERE v.idproducto = p.idproducto
);
```

## Subconsulta con agregación

``` sql
SELECT idproducto, descripcion
FROM productos p
WHERE 100000 < (
    SELECT SUM(v.cantidad * p.precio)
    FROM ventasdiarias v
    WHERE v.idproducto = p.idproducto
);
```

## Nota clave

- Alias → permiten usar una misma tabla varias veces  
- Sinónimos → nombres alternativos permanentes  
- Subconsultas → permiten usar resultados de otra consulta como condición  
- EXISTS vs IN → EXISTS evalúa existencia, IN compara conjuntos  


# Transacciones

Secuencia de operaciones que son vistas como una unidad unica de trabajo

## Propiedades ACID
- Atomicidad
- Coherencia
- Isolacion
- Durabilidad

## Pregunta

¿En qué casos una subconsulta correlacionada es menos eficiente que un JOIN y cómo lo optimizarías?
