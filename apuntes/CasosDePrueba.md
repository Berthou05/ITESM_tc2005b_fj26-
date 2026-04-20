## Idea general
- Testing debe empezar lo antes posible
- Casos de uso = base para generar casos de prueba
- Un caso de prueba verifica que se cumplan los requisitos

## Use Cases
- Describen qué hace el sistema (no cómo)
- Incluyen:
  - Nombre
  - Descripción
  - Flujo de eventos
  - Precondiciones
  - Postcondiciones

## Flujos
- Flujo básico → camino normal
- Flujos alternos → errores o variaciones
- Se estructuran en pasos

## Escenarios
- Un escenario = un camino completo dentro del caso de uso
- Combinan flujo básico + flujos alternos

### Ejemplo de escenarios

| Escenario | Flujo |
|----------|------|
| 1 | Básico |
| 2 | Básico + error login |
| 3 | Básico + sistema no disponible |
| 4 | Básico + conflicto |

## Casos de prueba
- Conjunto de:
  - Inputs
  - Condiciones
  - Resultado esperado

## Proceso para generar test cases

### 1. Generar escenarios
- Identificar combinaciones de flujos

### 2. Definir casos de prueba
- Al menos uno por escenario
- Incluir errores y casos límite

### 3. Definir datos
- Asignar valores reales

## Matriz de test cases

| ID | Escenario | Usuario | Password | Resultado esperado |
|----|----------|--------|----------|-------------------|
| TC1 | Registro correcto | V | V | Registro exitoso |
| TC2 | Usuario inválido | I | N/A | Error login |
| TC3 | Usuario sale | V | V | Regresa pantalla |
| TC4 | Sistema caído | V | V | Error sistema |

## Matriz con condiciones

| ID | Escenario | Prerequisitos | Curso abierto | Resultado |
|----|----------|--------------|--------------|----------|
| TC1 | Correcto | V | V | OK |
| TC2 | Curso lleno | V | I | Error |
| TC3 | Sin prerequisitos | I | V | Error |

## Convenciones

- V → válido
- I → inválido
- N/A → no aplica

## Idea clave
- Cada escenario → mínimo un test case
- Incluir éxito + errores
- Mejora cobertura de pruebas

## Pregunta

¿Como podemos probar cosas que simulen un hackeo, es decir algo que no sea de uso común?
