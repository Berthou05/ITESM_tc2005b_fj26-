Procedimiento a seguir para lograr un mejor diseño de una base de datos
## Idea general
- Evita redundancia e inconsistencias
- Mejora mantenimiento y escalabilidad
- Divide datos en tablas más simples

## Objetivos
- Reducir redundancia
- Evitar anomalías (insert, update, delete)
- Facilitar consultas

## Proceso general
1. Hacer tablas bidimensionales
2. Eliminar dependencias parciales
3. Eliminar dependencias transitivas
---
## 1FN (Primera Forma Normal)
- Valores atómicos (una celda = un valor)
- Sin listas ni grupos repetidos
- Columnas con mismo tipo de dato

### Ejemplo NO 1FN

| Alumno | Materias |
|--------|---------|
| Juan | Math, Física |

### Ejemplo 1FN

| Alumno | Materia |
|--------|--------|
| Juan | Math |
| Juan | Física |

---
## 2FN (Segunda Forma Normal)
- Está en 1FN
- Todos los atributos dependen de TODA la llave primaria

### Ejemplo problema

| Clave | Materia | NombreMateria |
|------|--------|---------------|

NombreMateria depende solo de Materia y no de la clave completa, lo que genera redundancia e inconsistencias

### Solución

Tabla Materia

| Materia | NombreMateria |
|--------|--------------|

Tabla relación

| Clave | Materia |
|------|--------|

---
## 3FN (Tercera Forma Normal)
- Está en 2FN
- No hay dependencias transitivas

### Ejemplo problema

| ID | RFC | Nombre |
|----|-----|--------|

RFC → Nombre → dependencia transitiva

### Solución

| ID | RFC |
|----|-----|

| RFC | Nombre |
|-----|--------|

---
## BCNF (Boyce-Codd)
- Todo determinante es llave candidata
---
## 4FN
- Elimina dependencias multivaluadas

### Ejemplo problema

| Clave | Especialidad | Curso    |
| ----- | ------------ | -------- |
| S01   | Sistemas     | Natación |
| S01   | Sistemas     | Danza    |
| S01   | Bioquímica   | Natación |

### Solución

Tabla Especialidad

| Clave | Especialidad |
|------|-------------|

Tabla Curso

| Clave | Curso |
|------|------|

---

## 5FN
- Elimina dependencias complejas (producto)
- Tablas pueden dividirse pero no siempre reconstruirse fácilmente

## Idea clave
- Normalizar = dividir correctamente la información
- Cada tabla debe representar una sola cosa

## Imagen recomendada
Conviene copiar el diagrama de dependencias funcionales de la página 4, porque ayuda mucho a visualizar:
- dependencias
- transitividad
- cómo se separan tablas

## Pregunta

¿Cómo balanceas normalización vs rendimiento en sistemas reales?
