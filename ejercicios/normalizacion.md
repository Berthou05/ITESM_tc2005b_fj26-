# Ejercicios de Normalización

## Ejercicio 1.
La siguiente relación es utilizada por el departamento de cobros de una empresa que ofrece el servicio de telecable, En ella se tiene una representación de los pagos de servicios mensuales de sus contratantes:

Servicios(cliente, domicilio y estado , año, rentabasica 1, servicios adicionales 1, rentabasica 2, servicios adicionales 2, rentabasica 3, servicios adicionales 3, .... rentabasica 12, servicios adicionales 12)

### Primera forma normal (1FN): Para que una relación esté en 1FN, cada atributo debe contener solo valores atómicos. En este caso, los atributos "rentabasica" y "servicios adicionales" contienen múltiples valores para cada mes, lo que viola la 1FN.

Servicios(cliente, domicilio y estado , año, mes, rentabasica, servicios adicionales)

### Segunda forma normal (2FN): Para que una relación esté en 2FN, debe estar en 1FN y no debe haber dependencias parciales. En este caso, el atributo "domicilio y estado" depende solo del cliente, lo que viola la 2FN.

Servicios(noContrante, nombreCliente, domicilio, estado, año, mes, rentabasica, servicios adicionales)
PK -> (noContrante, año, mes)

### Tercera forma normal (3FN): Para que una relación esté en 3FN, debe estar en 2FN y no debe haber dependencias transitivas. En este caso, no hay dependencias transitivas, por lo que la relación ya está en 3FN.

Clientes(NoCliente, NombreCliente, domicilio, estado)
PK-> NoCliente

Servicios(NoCliente, año, mes, rentabasica, servicios adicionales)
PK-> NoCliente, año, mes

---

## Ejercicio 2.

Una empresa de manufactura controla su producción mediante la siguiente tabla:

Producción (Código de parte, Descripción de parte, Fecha,
No. de operador, nombre del operador y cantidad producida en Línea 1 Turno 1,
No. de operador, nombre del operador y cantidad producida en Línea 1 Turno 2,
No. de operador, nombre del operador y cantidad producida en Línea 1 Turno 3,
No. de operador, nombre del operador y cantidad producida en Línea 2 Turno 1,
No. de operador, nombre del operador y cantidad producida en Línea 2 Turno 2,
No. de operador, nombre del operador y cantidad producida en Línea 2 Turno 3,
No. de operador, nombre del operador y cantidad producida en Línea 3 Turno 1,
No. de operador, nombre del operador y cantidad producida en Línea 3 Turno 2,
No. de operador, nombre del operador y cantidad producida en Línea 3 Turno 3)

### Primera forma normal (1FN): Para que una relación esté en 1FN, cada atributo debe contener solo valores atómicos. En este caso, los atributos relacionados con los operadores y la cantidad producida contienen múltiples valores para cada turno, lo que viola la 1FN.

Producción(Código de parte, Descripción de parte, Fecha, Línea, Turno, No. de operador, nombre del operador, cantidad producida)

### Segunda forma normal (2FN): Para que una relación esté en 2FN, debe estar en 1FN y no debe haber dependencias parciales. En este caso, el atributo "Descripción de parte" depende solo del "Código de parte", lo que viola la 2FN.

Producción(Código de parte, Fecha, Línea, Turno, No. de operador, nombre del operador, cantidad producida)
PK -> (Código de parte, Fecha, Línea, Turno)

Partes(Código de parte, Descripción de parte)
PK -> Código de parte

### Tercera forma normal (3FN): Para que una relación esté en 3FN, debe estar en 2FN y no debe haber dependencias transitivas. En este caso, no hay dependencias transitivas, por lo que la relación ya está en 3FN.



## Ejercicio 3.

Una empresa de telefonía maneja la facturación de sus servicios con la siguiente tabla:

Facturación (Nombre del cliente y  Dirección , Fecha y  Hora, Duración,
Número de teléfono de origen, Entidad federativa de origen, Ciudad de origen,
Número de teléfono de destino, Entidad federativa de destino, Ciudad de destino,
Tarifa por minuto entre ciudad de origen y ciudad de destino,
Fecha de inicio del período de facturación,
Fecha final del período de facturación)

### Primera forma normal (1FN): Para que una relación esté en 1FN, cada atributo debe contener solo valores atómicos. En este caso, el atributo "Nombre del cliente y Dirección" contiene múltiples valores, lo que viola la 1FN.

Facturación(NombreCliente, Dirección, FechaHora, Duración, NúmeroTelOrigen, EntidadFederativaOrigen, CiudadOrigen, NúmeroTelDestino, EntidadFederativaDestino, CiudadDestino, TarifaPorMinuto, FechaInicioPeriodoFacturación, FechaFinalPeriodoFacturación)

### Segunda forma normal (2FN): Para que una relación esté en 2FN, debe estar en 1FN y no debe haber dependencias parciales. En este caso, el atributo "Dirección" depende solo del "NombreCliente", lo que viola la 2FN.

Clientes(NombreCliente, Dirección)
PK -> NombreCliente 

Facturación(NombreCliente, FechaHora, Duración, NúmeroTelOrigen, EntidadFederativaOrigen, CiudadOrigen, NúmeroTelDestino, EntidadFederativaDestino, CiudadDestino, TarifaPorMinuto, FechaInicioPeriodoFacturación, FechaFinalPeriodoFacturación)
PK -> NombreCliente, FechaHora

### Tercera forma normal (3FN): Para que una relación esté en 3FN, debe estar en 2FN y no debe haber dependencias transitivas. 

Clientes(id_cliente, NombreCliente, Dirección)
PK -> id_cliente

EntidadesFederativas(id_entidad, NombreEntidad)
PK -> id_entidad

Ciudad(id_ciudad, NombreCiudad, id_entidad)
PK -> id_ciudad
FK -> id_entidad

PuntosDeOrigen(id_punto, NúmeroTelOrigen, id_ciudad)
PK -> id_punto

PuntosDeDestino(id_punto, NúmeroTelDestino, id_ciudad)
PK -> id_punto
FK -> id_ciudad

Tarifas(id_tarifa, TarifaPorMinuto, id_ciudad_origen, id_ciudad_destino)
PK -> id_tarifa
FK -> id_ciudad_origen
FK -> id_ciudad_destino

Servicios(id_servicio, NombreServicio)
PK -> id_servicio

Facturación(id_factura, id_cliente, FechaHora, Duración, id_punto_origen, id_punto_destino, id_tarifa, FechaInicioPeriodoFacturación, FechaFinalPeriodoFacturación)
PK -> id_factura
FK -> id_cliente
FK -> id_punto_origen
FK -> id_punto_destino
FK -> id_tarifa
