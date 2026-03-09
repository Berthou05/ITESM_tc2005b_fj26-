\# El ingreso total recibido por cada actor, sin importar en cuantas películas haya participado.

SELECT Nombre, SUM(Sueldo) as 'Ingresos Totales'

FROM elenco

GROUP BY Nombre

ORDER BY SUM(Sueldo) DESC;



\# El monto total destinado a películas por cada Estudio Cinematográfico, durante la década de los 80's.

SELECT ES.nomestudio, SUM(P.presupuesto) AS 'Monto total'

FROM estudio ES

JOIN pelicula P ON ES.nomestudio = P.nomestudio

WHERE P.anio BETWEEN 1980 AND 1989

GROUP BY ES.nomestudio;



\# Nombre y sueldo promedio de los actores (sólo hombres) que reciben en promedio un pago superior a 5 millones de dolares por película.

SELECT A.nombre, A.sexo, AVG(E.sueldo) AS sueldo\_promedio

FROM actor A

JOIN elenco E ON A.nombre = E.nombre

WHERE A.sexo = 'M'

GROUP BY A.nombre, A.sexo

HAVING AVG(E.sueldo) > 5000000;



\#  Título y año de producción de las películas con menor presupuesto.

\#  (Por ejemplo, la película de Titanic se ha producido en varias veces entre la lista de

\#  películas estaría la producción de Titanic y el año que fue filmada con menor presupuesto).

SELECT p.titulo, p.anio, MIN(presupuesto) as presupuesto

FROM pelicula p

GROUP BY p.titulo

ORDER BY MIN(p.presupuesto);



\# Mostrar el sueldo de la actriz mejor pagada.

SELECT MAX(E.sueldo)

FROM elenco E

JOIN actor A ON E.nombre = A.nombre

WHERE A.sexo = 'F';

