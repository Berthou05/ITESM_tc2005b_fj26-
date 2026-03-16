# Lab 20. Consultas en SQL

## Datos generales

**Materia:** TC2005B Construcción de software y toma de decisiones  
**Laboratorio:** 20  
**Título:** Consultas en SQL  
**Modalidad:** Individual  
**Alumno:** Alexis Yaocalli Berthou Haas 
**Matrícula:** A01713458  
**Fecha:** 12/03/2025

---
## Nota sobre el DBMS utilizado

Este laboratorio está diseñado originalmente para **SQL Server**, pero fue implementado usando **MariaDB**.

Cuando una instrucción no funciona igual en MariaDB, se documenta:

- la consulta original del laboratorio
- la adaptación utilizada
- una breve explicación

El objetivo y el resultado lógico de las consultas se mantienen equivalentes.

---

# Parte 1 — Equivalencia entre Álgebra Relacional y SQL

## Esquema de tablas utilizado

Materiales(Clave, Descripción, Precio, Impuesto, PorcentajeImpuesto => Sera agregado)  
Proveedores(RFC, RazonSocial)  
Proyectos(Numero, Denominacion)  
Entregan(Clave, RFC, Numero, Fecha, Cantidad)

---

## Consultas de equivalencia

### Consulta de una tabla completa

*Álgebra relacional.*  
materiales

*SQL*  
``` sql
SELECT * FROM materiales;
```

| clave | descripcion | precio | impuesto |
| :--- | :--- | :--- | :--- |
| 1000 | Varilla 3/16 | 100 | 10 |
| 1010 | Varilla 4/32 | 115 | 11.5 |
| 1020 | Varilla 3/17 | 130 | 13 |

[45] resultados

---

### Selección

*Álgebra relacional.*  
SL{clave=1000}(materiales)

*SQL*  
``` sql
SELECT *  
FROM materiales  
WHERE clave = 1000;
```

| clave | descripcion | precio | impuesto |
| :--- | :--- | :--- | :--- |
| 1000 | Varilla 3/16 | 100 | 10 |

[1] resultado

---

### Proyección

*Álgebra relacional.*  
PR{clave,rfc,fecha}(entregan)

*SQL*  
``` sql
SELECT clave, rfc, fecha  
FROM entregan;
```

| clave | rfc | fecha |
| :--- | :--- | :--- |
| 1000 | AAAA800101 | 2001-12-13 |
| 1200 | EEEE800101 | 2003-03-15 |
| 1400 | AAAA800101 | 1999-04-07 |

[87] resultados

---

### Reunión Natural

*Álgebra relacional.*  
entregan JN materiales

*SQL*  
``` sql
SELECT *  
FROM materiales, entregan  
WHERE materiales.clave = entregan.clave;
```

| clave | descripcion | precio | impuesto | clave | rfc | numero | fecha | cantidad |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1000 | Varilla 3/16 | 100 | 10 | 1000 | AAAA800101 | 5000 | 2001-12-13 | 165 |
| 1000 | Varilla 3/16 | 100 | 10 | 1000 | AAAA800101 | 5019 | 1999-07-13 | 254 |
| 1010 | Varilla 4/32 | 115 | 11.5 | 1010 | BBBB800101 | 5001 | 1998-07-28 | 528 |

[87] resultados

**Pregunta**

Si algún material no ha sido entregado  
¿Aparecería en el resultado de esta consulta?

Respuesta: No, porque JN solo incluye tuplas que tienen coincidencia en ambas tablas.

---

### Reunión con criterio específico

*Álgebra relacional.*  
entregan JN{entregan.numero <= proyectos.numero} proyectos

*SQL*  
``` sql
SELECT *  
FROM entregan, proyectos  
WHERE entregan.numero <= proyectos.numero;
```

| clave | rfc | numero | fecha | cantidad | numero | denominacion |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1000 | AAAA800101 | 5000 | 2001-12-13 | 165 | 5000 | Vamos Mexico |
| 1200 | EEEE800101 | 5000 | 2003-03-15 | 177 | 5000 | Vamos Mexico |
| 1400 | AAAA800101 | 5000 | 1999-04-07 | 382 | 5000 | Vamos Mexico |

[836] resultados

---

### Unión

*Álgebra relacional.*  
SL{clave=1450}(entregan) UN SL{clave=1300}(entregan)

*SQL*  
``` sql
(SELECT * FROM entregan WHERE clave = 1450)
union
(SELECT * FROM entregan WHERE clave = 1300);
```

| clave | rfc | numero | fecha | cantidad |
| :--- | :--- | :--- | :--- | :--- |
| 1300 | GGGG800101 | 5005 | 2004-02-28 | 521 |
| 1300 | GGGG800101 | 5010 | 2001-02-10 | 119 |

[2] resultados

**Pregunta**

¿Cuál sería una consulta que obtuviera el mismo resultado sin usar el operador UNION?

``` sql
SELECT *  
FROM entregan  
WHERE clave = 1450 or clave = 1300;
```

---

### Intersección

*Álgebra relacional.*  
PR{clave}(SL{numero=5001}(entregan)) IN PR{clave}(SL{numero=5018}(entregan))

*SQL*

(SELECT clave FROM entregan WHERE numero = 5001)  
intersect  
(SELECT clave FROM entregan WHERE numero = 5018);

Usando MariaDB
| clave |
| :--- |
| 1010 |

[1] resultado

---

### Diferencia

*Álgebra relacional.*  
entregan - SL{clave=1000}(entregan)

*SQL del laboratorio*

``` sql
(SELECT * FROM entregan)  
minus  
(SELECT * FROM entregan WHERE clave = 1000);
```

MariaDB no soporta el operador MINUS.

Consulta equivalente:

``` sql
SELECT * FROM entregan WHERE clave != 1000;
```

| clave | rfc | numero | fecha | cantidad |
| :--- | :--- | :--- | :--- | :--- |
| 1010 | BBBB800101 | 5001 | 1998-07-28 | 528 |
| 1010 | BBBB800101 | 5018 | 1997-02-09 | 523 |
| 1020 | CCCC800101 | 5002 | 2003-12-16 | 582 |

[85] resultados

---

### Producto cartesiano

*Álgebra relacional.*  
entregan X materiales

*SQL*  
``` sql
SELECT *  
FROM entregan, materiales;
```

| clave | rfc | numero | fecha | cantidad | clave | descripcion | precio | impuesto |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1000 | AAAA800101 | 5000 | 2001-12-13 | 165 | 1000 | Varilla 3/16 | 100 | 10 |
| 1000 | AAAA800101 | 5000 | 2001-12-13 | 165 | 1010 | Varilla 4/32 | 115 | 11.5 |
| 1000 | AAAA800101 | 5000 | 2001-12-13 | 165 | 1020 | Varilla 3/17 | 130 | 13 |

[3915] resultados

**Pregunta**

¿Cómo está definido el número de tuplas de este resultado en términos del número de tuplas de entregan y de materiales?

Respuesta: El numero de tuplas es igual al producto del número de tuplas de cada tabla. Si entregan tiene m = 87 tuplas y materiales tiene n = 45 tuplas, el resultado tendrá m*n = 3915 tuplas.

##  Construcción de consultas a partir de una especificación 
Plantea ahora una consulta para obtener las descripciones de los materiales entregados en el año 2000. 

Recuerda que la fecha puede indicarse como '01-JAN-2000' o '01/01/00'. 

``` sql
SELECT descripcion  
FROM materiales, entregan  
WHERE materiales.clave = entregan.clave
AND entregan.fecha >= '2000-01-01'  
AND entregan.fecha < '2001-01-01';
```
| descripcion |
| :--- |
| Varilla 3/17 |
| Varilla 4/34 |
| Block |

[12] resultados

**Pregunta**
¿Por qué aparecen varias veces algunas descripciones de material? 
Respuesta: Porque un mismo material puede haber sido entregado varias veces durante el año 2000, lo que genera varias tuplas con la misma descripción en el resultado.


## Uso del calificador distinct 

En el resultado anterior, observamos que una misma descripción de material aparece varias veces.

Agrega la palabra distinct inmediatamente después de la palabra SELECT a la consulta que planteaste antes.

``` sql
SELECT distinct descripcion  
FROM materiales, entregan  
WHERE materiales.clave = entregan.clave
AND entregan.fecha >= '2000-01-01'
AND entregan.fecha < '2001-01-01';
```

| descripcion |
| :--- |
| Varilla 3/17 |
| Varilla 4/34 |
| Block |

[10] resultados

**Pregunta**
¿Qué resultado obtienes en esta ocasión? 
Respuesta: Ahora cada descripción de material aparece solo una vez, eliminando los duplicados del resultado anterior reduciendo de 12 a 10 resultados.

## Ordenamientos

Si al final de una sentencia SELECT se agrega la cláusula

order by campo [desc] [,campo [desc] ...]

donde las partes encerradas entre corchetes son opcionales (los corchetes no forman parte de la sintaxis), los puntos suspensivos indican que pueden incluirse varios campos y la palabra desc se refiere a descendente. Esta cláusula permite presentar los resultados en un orden específico.

Obtén los números y denominaciones de los proyectos con las fechas y cantidades de sus entregas, ordenadas por número de proyecto, presentando las fechas de la más reciente a la más antigua. 

``` sql
SELECT proyectos.numero, denominacion, fecha, cantidad
FROM entregan, proyectos  
WHERE entregan.numero = proyectos.numero
order by numero, fecha desc;
```

| numero | denominacion | fecha | cantidad |
| :--- | :--- | :--- | :--- |
| 5000 | Vamos Mexico | 2003-03-15 | 177 |
| 5000 | Vamos Mexico | 2001-12-13 | 165 |
| 5000 | Vamos Mexico | 1999-04-07 | 382 |

[87] resultados

## Uso de expresiones
En álgebra relacional los argumentos de una proyección deben ser columnas. Sin embargo en una sentencia SELECT es posible incluir expresiones aritméticas o funciones que usen como argumentos de las columnas de las tablas involucradas o bien constantes. Los operadores son:

+ Suma
- Resta
* Producto
/ División

Las columnas con expresiones pueden renombrarse escribiendo después de la expresión un alias que puede ser un nombre arbitrario; si el alias contiene caracteres que no sean números o letras (espacios, puntos etc.) debe encerrarse entre comillas dobles (" nuevo nombre" ). Para SQL Server también pueden utilizarse comillas simples.

**Ejemplo**

``` sql
SELECT numero, cantidad, cantidad*precio as total
FROM entregan, materiales  
WHERE entregan.clave = materiales.clave;
```

| numero | cantidad | total |
| :--- | :--- | :--- |
| 5000 | 165 | 16500 |
| 5019 | 254 | 25400 |
| 5001 | 528 | 60720 |

[87] resultados

## Operadores de cadena
### *LIKE y comodines*

El operador LIKE se aplica a datos de tipo cadena y se usa para buscar registros, es capaz de hallar coincidencias dentro de una cadena bajo un patrón dado.

También contamos con el operador comodín (%), que coincide con cualquier cadena que tenga cero o más caracteres. Este puede usarse tanto de prefijo como sufijo.

``` sql
SELECT * FROM materiales WHERE Descripcion LIKE 'Si%'
```

| clave | descripcion | precio | impuesto |
| :--- | :--- | :--- | :--- |
| 1120 | Sillar rosa | 100 | 10 |
| 1130 | Sillar gris | 110 | 11 |

[2] resultados

**Preguntas**
*¿Qué resultado obtienes?*
Cuando se utiliza el operador LIKE con el patrón 'Si%', se obtienen todas las filas de la tabla materiales donde la columna descripcion comienza con "Si". En este caso, se obtienen dos resultados: "Sillar rosa" y "Sillar gris".

*Explica que hace el símbolo '%'.*
El simbolo '%' es un comodín que representa cualquier secuencia de caracteres, incluyendo una secuencia vacía. En el patrón 'Si%', el '%' permite que cualquier texto siga a "Si", lo que significa que se seleccionarán todas las descripciones que comiencen con "Si", independientemente de lo que venga después.

*¿Qué sucede si la consulta fuera : LIKE 'Si' ?*
La consulta con el patrón 'Si' sin el comodín '%' buscaría exactamente la cadena "Si" en la columna descripcion. Esto significa que solo se seleccionaría una fila si hay una descripción que sea exactamente "Si", sin ningún otro texto antes o después.

*¿Qué resultado obtienes?*
La consulta retornaría cero resultados, ya que el patrón 'Si' sin el comodín '%' solo coincidiría con descripciones que sean exactamente "Si", y no hay ninguna descripción en la tabla materiales que sea exactamente "Si".

*Explica a qué se debe este comportamiento*
Esto se debe a que el operador LIKE sin el comodín '%' busca una coincidencia exacta con la cadena proporcionada. En este caso, como no hay ninguna descripción que sea exactamente "Si", la consulta no devuelve ningún resultado.

### *concatenación*

Otro operador de cadenas es el de concatenación, (+, +=) este operador concatena dos o más cadenas de caracteres.
Su sintaxis es : Expresión + Expresión.
Un ejemplo de su uso, puede ser: Un ejemplo de su uso, puede ser:
``` sql
SELECT (Apellido + ', ' + Nombre) as Nombre FROM Personas; 

DECLARE @foo varchar(40);
DECLARE @bar varchar(40);
SET @foo = '¿Que resultado';
SET @bar = ' ¿¿¿??? '
SET @foo += ' obtienes?';
PRINT @foo + @bar; 
```

En MariaDB, el operador de concatenación es diferente. Se utiliza la función CONCAT() para concatenar cadenas. La consulta equivalente sería:

``` sql
SELECT CONCAT(Apellido, ', ', Nombre) as Nombre FROM Personas;
```

``` sql
SET @foo = '¿Que resultado';
SET @bar = ' ¿¿¿??? ';
SET @foo = CONCAT(@foo, ' obtienes?');
SELECT CONCAT(@foo, @bar) AS Resultado;
```

| Resultado |
| :--- |
| ¿Que resultado obtienes? ¿¿¿???  |


**Preguntas**
*¿Qué resultado obtienes de ejecutar el siguiente código?*
¿Que resultado obtienes? ¿¿¿???  

*¿Para qué sirve DECLARE?*
Para declarar variables en SQL. En este caso, se declaran dos variables de tipo varchar con una longitud máxima de 40 caracteres, llamadas @foo y @bar. Solo que no se pueden usar en MariaDB, por lo que se adaptó el código para usar variables de sesión.

*¿Cuál es la función de @foo?*
La variable @foo se utiliza para almacenar la cadena de texto "¿Que resultado" inicialmente, y luego se le concatena la cadena " obtienes?" para formar una pregunta completa. Finalmente, se concatena con @bar para mostrar el resultado final.

*¿Que realiza el operador SET?*
El operador SET se utiliza para asignar un valor a una variable. En el código proporcionado, se utiliza para asignar las cadenas de texto a las variables @foo y @bar, y luego para actualizar el valor de @foo concatenando la nueva cadena.
En MariaDB, se utiliza la función CONCAT() para concatenar cadenas, por lo que el operador SET se adapta para usar CONCAT() en lugar de +=.


## Operadores de comparación de cadenas
Sin embargo, tenemos otros operadores como [ ] , [^] y _. 

[ ] - Busca coincidencia dentro de un intervalo o conjunto dado. Estos caracteres se pueden utilizar para buscar coincidencias de patrones como sucede con LIKE.

[^] - En contra parte, este operador coincide con cualquier caracter que no se encuentre dentro del intervalo o del conjunto especificado.

_ - El operador _ o guion bajo, se utiliza para coincidir con un caracter de una comparación de cadenas.

Ahora explica el comportamiento, función y resultado de cada una de las siguientes consultas de SQL Server:

``` sql
SELECT RFC FROM Entregan WHERE RFC LIKE '[A-D]%';
SELECT RFC FROM Entregan WHERE RFC LIKE '[^A]%';
SELECT Numero FROM Entregan WHERE Numero LIKE '___6';
```

En MariaDB, el operador LIKE no soporta los caracteres de clase de caracteres como [A-D] o [^A]. En su lugar, se utiliza el operador REGEXP para lograr resultados similares.
Asi se verian en MariaDB:

Esta consulta busca los RFCs de la tabla entregan que comienzan con las letras A, B, C o D. El operador [A-D] indica que se buscan coincidencias con cualquier letra entre A y D al inicio del RFC.

``` sql
SELECT RFC FROM Entregan WHERE RFC REGEXP '^[A-D]';
```
| RFC |
| :--- |
| AAAA800101 |
| AAAA800101 |
| BBBB800101 |

[47] resultados

Esta consulta busca los RFCs de la tabla entregan que no comienzan con la letra A. El operador [^A] indica que se buscan coincidencias con cualquier caracter que no sea A al inicio del RFC.

``` sql
SELECT RFC FROM Entregan WHERE RFC REGEXP '^[^A]';
```

| RFC |
| :--- |
| EEEE800101 |
| BBBB800101 |
| FFFF800101 |

[75] resultados

Esta consulta busca los números de la tabla entregan que tienen exactamente 4 caracteres y terminan
con el dígito 6. El patrón '___6' indica que se buscan coincidencias con cualquier cadena de 4 caracteres donde los primeros tres pueden ser cualquier caracter y el último debe ser el dígito 6.

``` sql
SELECT Numero FROM Entregan WHERE Numero REGEXP '^.{3}6$';
```

| Numero |
| :--- |
| 5006 |
| 5006 |
| 5006 |

[9] resultados

## Operadores compuestos

Los operadores compuestos ejecutan una operación y establecen un valor.
+ = (Suma igual)
- = (Restar igual)
* = (Multiplicar igual)
/ = (Dividir igual)
% = (Módulo igual) 

En MariaDB estos operadores no son compatibles, por lo que se deben adaptar usando la función CONCAT() para concatenar cadenas o utilizando la sintaxis estándar para realizar operaciones aritméticas.

## Operadores Lógicos.

Los operadores lógicos comprueban la verdad de una condición, al igual que los operadores de comparación, devuelven un tipo de dato booleano (True, false o unknown).

ALL Es un operador que compara un valor numérico con un conjunto de valores representados por un subquery. La condición es verdadera cuando todo el conjunto cumple la condición.

ANY o SOME Es un operador que compara un valor numérico con un conjunto de valores. La condición es verdadera cuando al menos un dato del conjunto cumple la condición.

La sintaxis para ambos es: valor_numerico {operador de comparación} subquery

BETWEEN Es un operador para especificar intervalos. Una aplicación muy común de dicho operador son intervalos de fechas.

``` sql
SELECT Clave,RFC,Numero,Fecha,Cantidad
FROM Entregan
WHERE Numero Between 5000 AND 5010;
```

| Clave | RFC | Numero | Fecha | Cantidad |
| :--- | :--- | :--- | :--- | :--- |
| 1000 | AAAA800101 | 5000 | 2001-12-13 | 165 |
| 1010 | BBBB800101 | 5001 | 1998-07-28 | 528 |
| 1020 | CCCC800101 | 5002 | 2003-12-16 | 582 |

[43] resultados

**Pregunta**
*¿Cómo filtrarías rangos de fechas?*

``` sql
SELECT *
FROM Entregan
WHERE Fecha BETWEEN '2000-01-01' AND '2000-12-31';
```

| clave | rfc | numero | fecha | cantidad |
| :--- | :--- | :--- | :--- | :--- |
| 1020 | CCCC800101 | 5017 | 2000-03-29 | 8 |
| 1050 | FFFF800101 | 5014 | 2000-04-18 | 623 |
| 1100 | CCCC800101 | 5009 | 2000-12-07 | 466 |

[12] resultados

## EXISTS
Se utiliza para especificar dentro de una subconsulta la existencia de ciertas filas.

``` sql
SELECT RFC,Cantidad, Fecha,Numero
FROM Entregan
WHERE Numero Between 5000 AND 5010 AND
Exists ( SELECT RFC
    FROM Proveedores
    WHERE RazonSocial LIKE 'La%' AND Entregan.RFC = Proveedores.RFC);
```

| RFC | Cantidad | Fecha | Numero |
| :--- | :--- | :--- | :--- |
| AAAA800101 | 165 | 2001-12-13 | 5000 |
| CCCC800101 | 582 | 2003-12-16 | 5002 |
| AAAA800101 | 86 | 2005-04-03 | 5008 |

[12] resultados

**Preguntas**
*¿Qué hace la consulta?*
Devuelve las entregas cuyo número de proyecto está entre 5000 y 5010 y cuyo proveedor existe en la tabla Proveedores con una razón social que empieza con "La".

*¿Qué función tiene el paréntesis ( ) después de EXISTS?*
Los paréntesis contienen la subconsulta que se evalúa para cada fila de la consulta principal. EXISTS devuelve verdadero si la subconsulta encuentra al menos una fila.

## IN
IN Especifica si un valor dado tiene coincidencias con algún valor de una subconsulta. NOTA: Se utiliza dentro del WHERE pero debe contener un parametro. Ejemplo: WHERE proyecto.id IN Lista_de_Proyectos_Subquery

``` sql
SELECT RFC,Cantidad,Fecha,Numero
FROM Entregan
WHERE Numero BETWEEN 5000 AND 5010
AND RFC IN (
    SELECT RFC
    FROM Proveedores
    WHERE RazonSocial LIKE 'La%'
);
```

| RFC | Cantidad | Fecha | Numero |
| :--- | :--- | :--- | :--- |
| AAAA800101 | 165 | 2001-12-13 | 5000 |
| CCCC800101 | 582 | 2003-12-16 | 5002 |
| AAAA800101 | 86 | 2005-04-03 | 5008 |

[12] resultados

## NOT IN
NOT Simplemente niega la entrada de un valor booleano. 

``` sql
SELECT RFC,Cantidad,Fecha,Numero
FROM Entregan
WHERE Numero BETWEEN 5000 AND 5010
AND RFC NOT IN (
    SELECT RFC
    FROM Proveedores
    WHERE RazonSocial LIKE 'La%'
);
```

| RFC | Cantidad | Fecha | Numero |
| :--- | :--- | :--- | :--- |
| BBBB800101 | 528 | 1998-07-28 | 5001 |
| DDDD800101 | 202 | 1998-01-12 | 5003 |
| EEEE800101 | 263 | 1999-12-18 | 5004 |

[31] resultados

## ALL/ANY/SOME

**Ejemplo**
``` sql
SELECT Clave, Cantidad
FROM Entregan
WHERE Cantidad > ANY (
    SELECT Cantidad
    FROM Entregan
    WHERE Numero = 5000
);
```

| Clave | Cantidad |
| :--- | :--- |
| 1000 | 254 |
| 1010 | 528 |
| 1010 | 523 |

[64] resultados

La consulta devuelve claves y cantidades de entregas donde la cantidad es mayor que al menos una de las cantidades de las entregas del proyecto número 5000. 

## TOP
El Operador TOP, es un operador que recorre la entrada, un query, y sólo devuelve el primer número o porcentaje especifico de filas basado en un criterio de ordenación si es posible. 

**Preguntas**
*¿Qué hace la siguiente sentencia? Explica por qué.*

``` sql
SELECT TOP 2 * FROM Proyectos;
```
En MariaDB no se soporta el operador TOP, por lo que se utiliza la cláusula LIMIT para obtener un resultado similar:

``` sql
SELECT * FROM Proyectos LIMIT 2;
```
| numero | denominacion |
| :--- | :--- |
| 5000 | Vamos Mexico |
| 5001 | Aztecon |

[2] resultados



*¿Qué sucede con la siguiente consulta? Explica por qué.*

``` sql
SELECT TOP Numero FROM Proyectos
```
Esta consulta en SQL server genera error porque TOP espera un número constante, no el valor de una columna. 

## Modificar la tabla

Para agregar una columna nueva a una tabla se relaliza la siguiente consulta:

``` sql
ALTER TABLE materiales ADD PorcentajeImpuesto NUMERIC(6,2);
```

A fin de que los materiales tengan un impuesto, les asignaremos impuestos ficticios basados en sus claves con la instrucción: 

``` sql
UPDATE materiales SET PorcentajeImpuesto = 2*clave/1000; 
```

| clave | descripcion | precio | impuesto | PorcentajeImpuesto |
| :--- | :--- | :--- | :--- | :--- |
| 1000 | Varilla 3/16 | 100 | 10 | 2.00 |
| 1010 | Varilla 4/32 | 115 | 11.5 | 2.02 |
| 1020 | Varilla 3/17 | 130 | 13 | 2.04 |

Ejemplo de actualizacion de tabla

## Consulta del importe total de entregas

¿Qué consulta usarías para obtener el importe de las entregas es decir, el total en dinero de lo entregado, basado en la cantidad de la entrega y el precio del material y el impuesto asignado?


``` sql
SELECT m.clave, m.descripcion, e.cantidad, m.precio, m.PorcentajeImpuesto, 
(e.cantidad * m.precio * (1 + m.PorcentajeImpuesto/100)) AS total_entrega
FROM entregan e
JOIN materiales m
ON e.clave = m.clave;
```

| clave | descripcion | cantidad | precio | PorcentajeImpuesto | total\_entrega |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1000 | Varilla 3/16 | 165 | 100 | 2.00 | 16830 |
| 1000 | Varilla 3/16 | 254 | 100 | 2.00 | 25908 |
| 1010 | Varilla 4/32 | 528 | 115 | 2.02 | 61946.544 |

[87] resultados

## Creación de vistas


Create view nombrevista (nombrecolumna1 , nombrecolumna2 ,..., nombrecolumna3 )
as SELECT...

Permite definir una vista. Una vista puede pensarse como una consulta etiquetada con un nombre, ya que en realidad al referirnos a una vista el DBMS realmente ejecuta la consulta asociada a ella, pero por la cerradura del álgebra relacional, una consulta puede ser vista como una nueva relación o tabla, por lo que es perfectamente válido emitir la sentencia:

``` sql 
SELECT * FROM nombrevista 
```
Comprueba lo anterior, creando vistas para cinco de las consultas que planteaste anteriormente en la práctica . Posteriormente revisa cada vista creada para comprobar que devuelve el mismo resultado. 

**Ejemplos de vistas**'

### Vista 1: Materiales entregados en el año 2000
``` sql
CREATE VIEW VistaEntregas2000 AS
SELECT descripcion
FROM materiales, entregan
WHERE materiales.clave = entregan.clave
AND entregan.fecha >= '2000-01-01'
AND entregan.fecha < '2001-01-01';
```

| descripcion |
| :--- |
| Varilla 3/17 |
| Varilla 4/34 |
| Block |

[12] resultados

### Vista 2: Proyectos con sus entregas ordenados por número de proyecto y fecha
``` sql
CREATE VIEW VistaProyectosEntregas AS
SELECT proyectos.numero, denominacion, fecha, cantidad
FROM entregan, proyectos
WHERE entregan.numero = proyectos.numero;
```

| numero | denominacion | fecha | cantidad |
| :--- | :--- | :--- | :--- |
| 5000 | Vamos Mexico | 2003-03-15 | 177 |
| 5000 | Vamos Mexico | 2001-12-13 | 165 |
| 5000 | Vamos Mexico | 1999-04-07 | 382 |

[87] resultados

### Vista 3: Entregas de proveedores con razón social que empieza con "La" y número de proyecto entre 5000 y 5010
``` sql
CREATE VIEW VistaEntregasProveedores AS
SELECT RFC, Cantidad, Fecha, Numero
FROM Entregan
WHERE Numero BETWEEN 5000 AND 5010
AND RFC IN (
    SELECT RFC
    FROM Proveedores
    WHERE RazonSocial LIKE 'La%'
);
```

| RFC | Cantidad | Fecha | Numero |
| :--- | :--- | :--- | :--- |
| AAAA800101 | 165 | 2001-12-13 | 5000 |
| CCCC800101 | 582 | 2003-12-16 | 5002 |
| AAAA800101 | 86 | 2005-04-03 | 5008 |

[12] resultados

### Vista 4: Materiales entregados con su total de entrega calculado
``` sql
CREATE VIEW VistaMaterialesEntregados AS
SELECT m.clave, m.descripcion, e.cantidad, m.precio, m.PorcentajeImpuesto,
(e.cantidad * m.precio * (1 + m.PorcentajeImpuesto/100)) AS total_entrega
FROM entregan e
JOIN materiales m
ON e.clave = m.clave;
```

| clave | descripcion | cantidad | precio | PorcentajeImpuesto | total\_entrega |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1000 | Varilla 3/16 | 165 | 100 | 2.00 | 16830 |
| 1000 | Varilla 3/16 | 254 | 100 | 2.00 | 25908 |
| 1010 | Varilla 4/32 | 528 | 115 | 2.02 | 61946.544 |

[87] resultados

### Vista 5: Entregas de proveedores que no tienen razón social que empieza con "La" y número de proyecto entre 5000 y 5010

``` sql
CREATE VIEW VistaEntregasProveedoresNoLa AS
SELECT RFC,Cantidad,Fecha,Numero
FROM Entregan
WHERE Numero BETWEEN 5000 AND 5010
AND RFC NOT IN (
    SELECT RFC
    FROM Proveedores
    WHERE RazonSocial LIKE 'La%'
);
```

| RFC | Cantidad | Fecha | Numero |
| :--- | :--- | :--- | :--- |
| BBBB800101 | 528 | 1998-07-28 | 5001 |
| DDDD800101 | 202 | 1998-01-12 | 5003 |
| EEEE800101 | 263 | 1999-12-18 | 5004 |

[31] resultados

## Enunciados de consulta

Los materiales (clave y descripción) entregados al proyecto "México sin ti no estamos completos".

```sql
SELECT distinct m.clave, m.descripcion
FROM materiales m, entregan e, proyectos p
WHERE m.clave = e.clave
AND e.numero = p.numero
AND p.denominacion = 'México sin ti no estamos completos';
```

| clave | descripcion |
| :--- | :--- |
| 1030 | Varilla 4/33 |
| 1230 | Cemento  |
| 1430 | Pintura B1022 |

[3] resultados

Los materiales (clave y descripción) que han sido proporcionados por el proveedor "Acme tools".

``` sql
SELECT m.clave, m.descripcion
FROM materiales m, entregan e, proveedores pr
WHERE m.clave = e.clave AND e.rfc = pr.rfc
AND pr.razonsocial = 'Acme tools';
```

| clave | descripcion |
| :--- | :--- |

[0] resultados

El RFC de los proveedores que durante el 2000 entregaron en promedio cuando menos 300 materiales.

``` sql
SELECT e.rfc
FROM entregan e
WHERE e.fecha >= '2000-01-01' AND e.fecha <= '2000-12-31'
GROUP BY e.rfc
HAVING avg(e.cantidad) >= 300;
```

| rfc |
| :--- |
| BBBB800101 |
| FFFF800101 |
| GGGG800101 |

[3] resultados

El Total entregado por cada material en el año 2000.

``` sql
SELECT e.clave, m.descripcion, sum(e.cantidad) as total_entregado
FROM materiales m, entregan e
WHERE m.clave = e.clave
AND e.fecha >= '2000-01-01' AND e.fecha <= '2000-12-31'
GROUP BY e.clave, m.descripcion;
```

| clave | descripcion | total\_entregado |
| :--- | :--- | :--- |
| 1020 | Varilla 3/17 | 8 |
| 1050 | Varilla 4/34 | 623 |
| 1100 | Block | 466 |

[11] resultados

La Clave del material más vendido durante el 2001. (se recomienda usar una vista intermedia para su solución)

``` sql
CREATE VIEW ventas_2001 AS
SELECT e.clave, SUM(e.cantidad) AS total_entregado
FROM entregan e
WHERE e.fecha >= '2001-01-01' AND e.fecha < '2002-01-01'
GROUP BY e.clave;

SELECT clave
FROM ventas_2001
WHERE total_entregado = (SELECT max(total_entregado) FROM ventas_2001);
```

| clave |
| :--- |
| 1260 |


Productos que contienen el patrón 'ub' en su nombre.
``` sql
SELECT descripcion
FROM materiales
WHERE descripcion LIKE '%ub%';
```

| descripcion |
| :--- |
| Recubrimiento P1001 |
| Recubrimiento P1010 |
| Recubrimiento P1019 |

[12] resultados

Denominación y suma del total a pagar para todos los proyectos.

``` sql
SELECT p.denominacion, sum(e.cantidad * m.precio * (1 + m.PorcentajeImpuesto/100)) AS total_a_pagar
FROM proyectos p
JOIN entregan e ON p.numero = e.numero
JOIN materiales m ON e.clave = m.clave
GROUP BY p.denominacion;
```

| denominacion | total\_a\_pagar |
| :--- | :--- |
| Ampliación de la carretera a la huasteca | 578970.509 |
| Aztecon | 150200.21899999998 |
| CIT Campeche | 161603.082 |

[20] resultados


Denominación, RFC y RazonSocial de los proveedores que se suministran materiales al proyecto Televisa en acción que no se encuentran apoyando al proyecto Educando en Coahuila (Solo usando vistas).

``` sql
CREATE VIEW VistaTelevisa AS
SELECT DISTINCT p.denominacion, pr.rfc, pr.razonsocial
FROM proyectos p, entregan e, proveedores pr
WHERE p.numero = e.numero
AND e.rfc = pr.rfc
AND p.denominacion = 'Televisa en acción';

CREATE VIEW VistaEducando AS
SELECT DISTINCT e.rfc
FROM proyectos p
JOIN entregan e ON p.numero = e.numero
WHERE p.denominacion = 'Educando en Coahuila';

SELECT vt.denominacion, vt.rfc, vt.razonsocial
FROM VistaTelevisa vt
WHERE vt.rfc NOT IN (
    SELECT ve.rfc
    FROM VistaEducando ve
);
```

| denominacion | rfc | razonsocial |
| :--- | :--- | :--- |
| Televisa en acción | CCCC800101 | La Ferre |
| Televisa en acción | DDDD800101 | Cecoferre |


Denominación, RFC y RazonSocial de los proveedores que se suministran materiales al proyecto Televisa en acción que no se encuentran apoyando al proyecto Educando en Coahuila (Sin usar vistas, utiliza not in, in o exists).

``` sql
SELECT DISTINCT p.denominacion, pr.rfc, pr.razonsocial
FROM proyectos p, entregan e, proveedores pr
WHERE p.numero = e.numero AND e.rfc = pr.rfc
AND p.denominacion = 'Televisa en acción'
AND pr.rfc NOT IN (
    SELECT e2.rfc
    FROM proyectos p2
    JOIN entregan e2 ON p2.numero = e2.numero
    WHERE p2.denominacion = 'Educando en Coahuila'
)
```

| denominacion | rfc | razonsocial |
| :--- | :--- | :--- |
| Televisa en acción | CCCC800101 | La Ferre |
| Televisa en acción | DDDD800101 | Cecoferre |


Costo de los materiales y los Materiales que son entregados al proyecto Televisa en acción cuyos proveedores también suministran materiales al proyecto Educando en Coahuila. 

``` sql
SELECT m.precio, m.descripcion
FROM materiales m
JOIN entregan e ON m.clave = e.clave
JOIN proyectos p ON e.numero = p.numero
WHERE p.denominacion = 'Televisa en acción'
AND e.rfc IN (
    SELECT e2.rfc
    FROM entregan e2
    JOIN proyectos p2 ON e2.numero = p2.numero
    WHERE p2.denominacion = 'Educando en Coahuila'
);
```

| precio | descripcion |
| :--- | :--- |
| 50 | Ladrillos rojos |
| 34 | Tepetate |