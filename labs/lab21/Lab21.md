# Práctica SQL — Respuestas

## Funciones agregadas

### 1. Suma de cantidades y total de sueldos en 1997
```sql
SELECT 
    SUM(e.sueldo) AS total_sueldos,
    COUNT(*) AS total_registros
FROM elenco e
WHERE e.anio = 1997;
```

### 2. Por actor: número de participaciones y total ganado
```sql
SELECT 
    a.nombre,
    COUNT(*) AS total_participaciones,
    SUM(e.sueldo) AS total_ganado
FROM actor a
JOIN elenco e ON a.nombre = e.nombre
GROUP BY a.nombre;
```

### 3. Por película: total, min, max y total sueldos con promedio > 10M
```sql
SELECT 
    e.titulo,
    e.anio,
    COUNT(*) AS total_actores,
    MIN(e.sueldo) AS sueldo_min,
    MAX(e.sueldo) AS sueldo_max,
    SUM(e.sueldo) AS total_sueldos
FROM elenco e
GROUP BY e.titulo, e.anio
HAVING AVG(e.sueldo) > 10000000;
```

### 4. Promedio por actor (mayor a 10M)
```sql
SELECT 
    a.nombre,
    p.titulo,
    p.anio,
    AVG(e.sueldo) AS promedio_sueldo
FROM actor a
JOIN elenco e ON a.nombre = e.nombre
JOIN pelicula p ON e.titulo = p.titulo AND e.anio = p.anio
GROUP BY a.nombre, p.titulo, p.anio
HAVING AVG(e.sueldo) >= 10000000;
```

### 5. Dos grupos de actores por promedio
```sql
SELECT 
    a.nombre,
    AVG(e.sueldo) AS promedio,
    CASE 
        WHEN AVG(e.sueldo) < 7000000 THEN 'BAJO'
        WHEN AVG(e.sueldo) > 15000000 THEN 'ALTO'
    END AS grupo
FROM actor a
JOIN elenco e ON a.nombre = e.nombre
GROUP BY a.nombre
HAVING AVG(e.sueldo) < 7000000 OR AVG(e.sueldo) > 15000000;
```

## Inserts

```sql
INSERT INTO estudio VALUES ('Pixar', 'California');
INSERT INTO estudio VALUES ('DreamWorks', 'California');
INSERT INTO estudio VALUES ('A24', 'New York');
INSERT INTO estudio VALUES ('Studio Ghibli', 'Tokyo');
INSERT INTO estudio VALUES ('Lionsgate', 'Santa Monica');
```

## Subconsultas

### 1. Actores que no han participado en ninguna película
```sql
SELECT nombre
FROM actor
WHERE nombre NOT IN (SELECT nombre FROM elenco);
```

### 2. Actores en dos películas específicas
```sql
SELECT nombre
FROM elenco
WHERE titulo IN ('Titanic', 'Iron Man')
GROUP BY nombre
HAVING COUNT(DISTINCT titulo) = 2;
```

### 3. Películas donde no participó un actor específico
```sql
SELECT titulo
FROM pelicula
WHERE titulo NOT IN (
    SELECT titulo FROM elenco WHERE nombre = 'Tom Hanks'
);
```

### 4. Actores con promedio mayor a un actor dado
```sql
SELECT nombre, AVG(sueldo) AS promedio
FROM elenco
GROUP BY nombre
HAVING AVG(sueldo) > (
    SELECT AVG(sueldo)
    FROM elenco
    WHERE nombre = 'Brad Pitt'
);
```

### 5. Actores con mayor ingreso en un año vs otro
```sql
SELECT nombre
FROM elenco
WHERE anio = 2000
GROUP BY nombre
HAVING SUM(sueldo) > (
    SELECT SUM(sueldo)
    FROM elenco e2
    WHERE e2.nombre = elenco.nombre AND e2.anio = 2001
);
```
