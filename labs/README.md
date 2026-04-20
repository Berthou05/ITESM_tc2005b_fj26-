# TC2005B Construcción de software y toma de decisiones
## Class Labs

------------------------------------------------------------------------
## Explicacion general

Cada laboratorio se encuentra en su propia carpeta, con el nombre del laboratorio. Aunque hay carpetas que contienen mas de un laboratorio, como es el caso de los laboratorios 11 - 13.

A partir del laboratorio 17 donde se integra una base de datos comence a desarrollar un proyecto llamado cookBook. 

Dentro de cada carpeta se encuentran los archivos necesarios para el desarrollo del laboratorio.

Nota: Hubieron algunos commits que faltan por lo que podrian haber algunos problemas de versionado, pero cada desarrollo de los laboratorios esta en su carpeta.

------------------------------------------------------------------------

## Preguntas de los laboratorios

### Laboratorio 1: Introducción a las aplicaciones web, HTML5 y ciclo de vida de los sistemas de información

**Pregunta:** ¿Cuál es la diferencia entre Internet y la World Wide Web?
El Internet es una red global de computadoras interconectadas que permite la comunicación y el intercambio de datos a nivel mundial. La World Wide Web (WWW) es un servicio que se ejecuta sobre Internet y permite acceder a documentos y recursos a través de navegadores web utilizando URLs. En resumen, Internet es la infraestructura, mientras que la WWW es una aplicación que utiliza esa infraestructura para proporcionar acceso a información y servicios en línea.

*Fuente: https://www.geeksforgeeks.org/computer-networks/difference-between-internet-and-www*

**Pregunta:** ¿Cuáles son las partes de un URL?
Un URL (Uniform Resource Locator) consta de varias partes: 
- **Esquema:** Indica el protocolo utilizado para acceder al recurso (por ejemplo, http, https, ftp).
- **Nombre de host:** Es la dirección del servidor donde se encuentra el recurso (por ejemplo, www.ejemplo.com).
- **Puerto:** Es un número opcional que especifica el puerto de comunicación en el servidor (por ejemplo, :80 para HTTP).
- **Ruta:** Es la ubicación específica del recurso en el servidor (por ejemplo, /pagina).
- **Parámetros/cadena de consulta:** Son opcionales y se utilizan para enviar datos adicionales al servidor (por ejemplo, ?id=123).

*Fuente: https://www.ibm.com/docs/es/cics-ts/6.x?topic=concepts-components-url*

**Pregunta:** ¿Cuál es el propósito de los métodos HTTP: GET, HEAD, POST, PUT, PATCH, DELETE?
Cada método tiene un distinto propósito:
- **GET:** Solicita un recurso específico del servidor. Es utilizado para obtener datos sin modificar el estado del servidor.
- **HEAD:** Similar a GET, pero solo solicita los encabezados de la respuesta, sin el cuerpo. Es útil para verificar la existencia de un recurso o para obtener metadatos.
- **POST:** Envía datos al servidor para crear un nuevo recurso o realizar una acción específica. Es comúnmente utilizado en formularios web.
- **PUT:** Actualiza completamente un recurso existente o crea uno nuevo si no existe. Reemplaza el recurso completo con los datos proporcionados.
- **PATCH:** Actualiza parcialmente un recurso existente. Solo modifica los campos especificados en la solicitud, en lugar de reemplazar todo el recurso.
- **DELETE:** Elimina un recurso específico del servidor. Se utiliza para eliminar datos o recursos que ya no son necesarios.

*Fuente: https://developer.mozilla.org/es/docs/Web/HTTP/Reference/Methods*

**Pregunta:** ¿Qué método HTTP se debe utilizar al enviar un formulario HTML, por ejemplo cuando ingresas tu usuario y contraseña en algún sitio? ¿Por qué?
El método HTTP recomendado para enviar un formulario HTML que contiene información sensible, como un usuario y contraseña, es el método POST. Esto se debe a que el método POST envía los datos en el cuerpo de la solicitud HTTP, lo que proporciona una capa adicional de seguridad en comparación con el método GET, que envía los datos en la URL. Además, el método POST no tiene limitaciones de longitud de datos como el método GET, lo que permite enviar información más extensa sin problemas.

*Fuente: https://developer.mozilla.org/es/docs/Web/HTTP/Methods/POST*

**Pregunta:** ¿Qué método HTTP se utiliza cuando a través de un navegador web se accede a una página a través de un URL?
El método HTTP que se utiliza cuando se accede a una página web a través de un URL es el método GET. Este método solicita al servidor que envíe el recurso especificado en el URL, como una página HTML, una imagen o un archivo. El método GET es el más comúnmente utilizado para acceder a páginas web y recuperar información sin modificar el estado del servidor.

*Fuente: https://developer.mozilla.org/es/docs/Web/HTTP/Methods/GET*

**Pregunta:** Un servidor web devuelve una respuesta HTTP con código 200. ¿Qué significa esto? ¿Ocurrió algún error?
El código de estado HTTP 200 significa "OK". Esto indica que la solicitud del cliente fue exitosa y que el servidor ha procesado la solicitud correctamente. No ocurrió ningún error, y el recurso solicitado se ha entregado al cliente sin problemas.

*Fuente: https://developer.mozilla.org/es/docs/Web/HTTP/Status*

**Pregunta:** ¿Es responsabilidad del desarrollador corregir un sitio web si un usuario reporta que intentó acceder al sitio y se encontró con un error 404? ¿Por qué?
Sí, es responsabilidad del desarrollador corregir un sitio web si un usuario reporta un error 404. El error 404 indica que la página o recurso solicitado no se encontró en el servidor. Esto puede deberse a varias razones, como enlaces rotos, archivos eliminados o cambios en la estructura del sitio. Corregir estos errores es importante para mejorar la experiencia del usuario, mantener la reputación del sitio web y garantizar que los visitantes puedan acceder a la información que buscan sin frustraciones.

**Pregunta:** ¿Es responsabilidad del desarrollador corregir un sitio web si un usuario reporta que intentó acceder al sitio y se encontró con un error 500? ¿Por qué?
Sí, es responsabilidad del desarrollador corregir un sitio web si un usuario reporta un error 500. El error 500 indica un problema interno del servidor que impide que la solicitud del cliente se procese correctamente. Esto puede ser causado por errores en el código del servidor, problemas de configuración o fallos en la base de datos. Corregir estos errores es crucial para garantizar que el sitio web funcione correctamente, mantener la confianza de los usuarios y evitar la pérdida de tráfico o clientes potenciales.

**Pregunta:** ¿Qué significa que un atributo HTML5 esté depreciado o desaprobado (deprecated)? Menciona algunos elementos de HTML 4 que en HTML5 estén desaprobados.
Un atributo HTML5 se considera depreciado o desaprobado (deprecated) cuando ya no se recomienda su uso en el desarrollo web y puede ser eliminado en futuras versiones del estándar. Esto generalmente ocurre porque el atributo ha sido reemplazado por una alternativa más eficiente, segura o semántica. Algunos elementos de HTML 4 que están desaprobados en HTML5 incluyen:
- `<font>` - reemplazado por CSS
- `<center>` - reemplazado por CSS
- `<strike>` - reemplazado por `<del>` o CSS
- `<frame>` y `<frameset>` - eliminados completamente
- `<applet>` - reemplazado por `<object>`

**Pregunta:** ¿Cuáles son las diferencias principales entre HTML 4 y HTML5?
HTML5 introduce nuevas características y mejoras en comparación con HTML4, incluyendo soporte nativo para multimedia (audio y video), nuevos elementos semánticos (como header, footer, article, section), mejor soporte para gráficos y efectos visuales con canvas y SVG, y una API más rica para aplicaciones web, como almacenamiento local, geolocalización y arrastrar y soltar.

**Pregunta:** ¿Qué componentes de estructura y estilo tiene una tabla?
Una tabla en HTML se compone de varios elementos estructurales y de estilo, incluyendo:
- **table:** El elemento principal que define la tabla.
- **tr:** Define una fila en la tabla.
- **th:** Define una celda de encabezado en la tabla, generalmente se muestra en negrita y centrada.
- **td:** Define una celda de datos en la tabla, donde se coloca el contenido de la tabla.
- **caption:** Proporciona un título o descripción para la tabla.

**Pregunta:** ¿Cuáles son los principales controles de una forma HTML5?
Los principales controles de una forma HTML5 incluyen:
- email
- search
- tel
- url
- number
- range
- date

*Fuente: https://developer.mozilla.org/es/docs/Learn_web_development/Extensions/Forms/HTML5_input_types*

**Pregunta:** ¿Qué tanto soporte HTML5 tiene el navegador que utilizas? Puedes utilizar la siguiente página para descubrirlo: http://html5test.com/ (Al responder la pregunta recuerda poner el navegador que utilizas)
Utilizo Firefox como mi navegador principal, y tiene un soporte muy completo para HTML5. En html5test Firefox tiene 509 de 555 puntos.

*Fuente: https://html5test.com/*

Sobre el ciclo de vida y desarrollo de los sistemas de información:

**Pregunta:** ¿Cuál es el ciclo de vida de los sistemas de información?
El ciclo de vida de los sistemas de información consta de varias fases, que incluyen:
- **Planificación:** En esta fase se identifican las necesidades del negocio, se definen los objetivos del sistema y se realiza un análisis de viabilidad.
- **Análisis:** Se recopilan y analizan los requisitos del sistema, se crean modelos de datos y se diseñan los procesos de negocio.
- **Diseño:** Se desarrolla la arquitectura del sistema, se diseñan las interfaces de usuario y se especifican los componentes técnicos.
- **Implementación:** Se codifica el sistema, se realizan pruebas unitarias y se integran los componentes para crear una versión funcional.
- **Pruebas:** Se realizan pruebas exhaustivas para identificar y corregir errores, asegurando que el sistema cumpla con los requisitos establecidos.
- **Despliegue:** El sistema se pone en producción y se hace disponible para los usuarios finales.
- **Uso y mantenimiento:** Se realizan actualizaciones, correcciones de errores y mejoras continuas para garantizar el buen funcionamiento del sistema a lo largo del tiempo.

*Fuente: https://flanagan.ugr.es/docencia/2005-2006/2/apuntes/ciclovida.pdf*

**Pregunta:** ¿Cuál es el ciclo de desarrollo de sistemas de información?
- **Planificación:** determinar el alcance y la finalidad del software
- **Análisis de los requisitos:** define las funciones que debe ejecutar el software
- **Diseño:** decidir los parámetros clave, como la arquitectura, las plataformas y las interfaces de usuario
- **Desarrollo:** crear e implementar el software
- **Documentación:** producir la información para que los usuarios y las partes interesadas puedan utilizar el sistema
- **Pruebas:** verificar que el software cumpla con los requisitos
- **Implementación:** poner el software a disposición de los usuarios
- **Mantenimiento:** solucionar los errores y los puntos vulnerables que se descubran en el sistema

*Fuente: https://www.redhat.com/es/topics/security/software-development-lifecycle-security*

### Laboratorio 3: CSS

**Pregunta:** Como ingeniero de software ¿cuál es tu recomendación sobre el uso de !important en un CSS?
El uso de `!important` en CSS debe ser limitado y utilizado con precaución. Aunque puede ser útil para sobrescribir estilos específicos, su uso excesivo puede dificultar el mantenimiento del código y generar conflictos inesperados. Es preferible estructurar el CSS de manera que la especificidad y el orden de los selectores sean suficientes para aplicar los estilos deseados.

**Pregunta:** Si se pone una imagen de fondo en una página HTML, ¿por qué debe escogerse con cuidado?
Porque la imagen puede cambiar la legibilidad del texto o incluso puede llegar a afectar el rendimiento de la página si es muy pesada.

**Pregunta:** Como ingeniero de software, ¿cuál es tu recomendación al elegir las unidades de un propiedad de estilo entre %, px y pt?
Es mejor usar unidades relativas como %, rem que px o pt porque permiten que el diseño funcione en varios dispositivos y tamaños de pantalla.

**Pregunta:** ¿Por qué el uso de una versión minimizada del CSS mejora el rendimiento del sitio?
El CSS minimizado reduce el tamaño del archivo al eliminar espacios, saltos de línea y comentarios, lo que permite que el navegador lo descargue y procese más rápidamente, mejorando así el rendimiento del sitio.

*Fuente: https://www.cloudflare.com/es-es/learning/performance/how-to-minify-css/*

### Laboratorio 4: JavaScript

**Pregunta:** ¿Qué diferencias y semejanzas hay entre Java y JavaScript?
Java es un lenguaje de programación orientado a objetos que se ejecuta en la máquina virtual de Java (JVM), mientras que JavaScript es un lenguaje de scripting que se ejecuta en el navegador web. Aunque ambos lenguajes comparten algunas sintaxis similares, como estructuras de control y operadores, tienen diferencias significativas en su ejecución, tipado y uso.

**Pregunta:** ¿Qué métodos tiene el objeto Date? (Menciona al menos 5*)
1. **getDate():** Devuelve el día del mes (1-31) de la fecha especificada.
2. **setDate(day):** Establece el día del mes para la fecha especificada.
3. **toString():** Devuelve una representación de cadena de la fecha.
4. **Date.now():** Devuelve el número de milisegundos transcurridos desde el 1 de enero de 1970 00:00:00 UTC.
5. **Date.parse():** Analiza una cadena de fecha y devuelve el número de milisegundos desde el 1 de enero de 1970.

*Fuente: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date*

**Pregunta:** ¿Qué métodos tienen los arreglos? (Menciona al menos 5*)
1. **push():** Agrega uno o más elementos al final de un arreglo y devuelve la nueva longitud del arreglo.
2. **pop():** Elimina el último elemento de un arreglo y lo devuelve.
3. **shift():** Elimina el primer elemento de un arreglo y lo devuelve.
4. **unshift():** Agrega uno o más elementos al inicio de un arreglo y devuelve la nueva longitud del arreglo.
5. **map():** Crea un nuevo arreglo con los resultados de la llamada a una función proporcionada aplicada a cada elemento del arreglo.

*Fuente: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array*

**Pregunta:** ¿Cómo se declara una variable con alcance local dentro de una función?
Para declarar una variable con alcance local dentro de una función en JavaScript, se puede utilizar la palabra clave `var`, `let` o `const`. Las palabras clave `let` y `const` son preferibles ya que tienen un alcance de bloque más restrictivo comparado con `var`.

**Pregunta:** ¿Qué implicaciones tiene utilizar variables globales dentro de funciones?
Utilizar variables globales dentro de funciones es considerada una mala práctica, ya que hace que el código sea más frágil y dificulta su mantenimiento. Las variables globales pueden ser modificadas accidentalmente por diferentes partes del código, lo que dificulta el debugging y reduce la modularidad del programa.

### Laboratorio 5: Frameworks de estilo
**Pregunta:** Describe Material design

Material Design es un lenguaje de diseño integral creado por Google en 2014, diseñado para unificar la experiencia de usuario (UX/UI) a través de distintas plataformas y dispositivos. Sus puntos clave incluyen:
- **Fundamentos físicos:** Utiliza principios de profundidad y sombras para crear dimensión visual.
- **Diseño centrado en el usuario:** Prioriza la usabilidad y accesibilidad en todas las interfaces.
- **Animaciones y movimiento:** Incorpora transiciones suaves que mejoran la experiencia interactiva.
- **Multiplataforma:** Mantiene consistencia en web, móvil y otros dispositivos.
- **Componentes:** Proporciona elementos reutilizables y predefinidos para acelerar el desarrollo.

Material Design busca crear interfaces naturales y realistas que, aunque sean planas, se sientan tridimensionales.

*Fuente: https://m3.material.io/*


### Laboratorio 6: Programación orientada a eventos

**Pregunta:** ¿Por qué es una buena práctica usar JavaScript para checar que sean válidos los inputs de las formas antes de enviar los datos al servidor?

Es buena práctica porque mejora la experiencia del usuario (UX). El usuario recibe validación inmediata sin esperar a que los datos se envíen al servidor, además de mensajes de error personalizados. Esto reduce errores de entrada y mejora significativamente la usabilidad.

*Fuente: https://developer.mozilla.org/es/docs/Learn_web_development/Extensions/Forms/Form_validation*

**Pregunta:** ¿Cómo puedes saltarte la seguridad de validaciones hechas con JavaScript?

Las validaciones de JavaScript pueden eludirse fácilmente deshabilitando JavaScript en el navegador o manipulando el DOM mediante herramientas de desarrollo. Por ejemplo, puedes eliminar atributos de validación o modificar el código JavaScript directamente. Por esta razón, las validaciones en el frontend siempre deben complementarse con validaciones en el backend.

*Fuente: https://didacticode.com/como-saltarse-validacion-html5-formulario/*

**Pregunta:** ¿Si te puedes saltar la seguridad de las validaciones de JavaScript, entonces ¿por qué la primera pregunta dice que es una buena práctica?

Porque validaciones en frontend y backend tienen propósitos diferentes y son complementarias. Las validaciones en JavaScript son para mejorar la experiencia del usuario con feedback inmediato. Las validaciones en backend garantizan la seguridad de los datos. Ambas son necesarias: la primera para UX, la segunda para seguridad.

### Laboratorio 11: Express

**Pregunta:** Describe el archivo package.json

El archivo `package.json` es un archivo de configuración utilizado en proyectos de Node.js para gestionar las dependencias, scripts y metadatos del proyecto. Contiene información como el nombre del proyecto, la versión, la descripción, el autor, las licencias, las dependencias necesarias para ejecutar el proyecto y los scripts que pueden ser ejecutados a través de npm y es esencial para la gestión eficiente de proyectos en Node.js y facilita la instalación de paquetes y la ejecución de tareas comunes. Por ejemplo, en el laboratorio, el package.json incluye dependencias como Express, EJS y body-parser, así como scripts para iniciar el servidor como escribir `npm run dev` para correr el servidor.

### Laboratorio 12: HTML dinamico

**Pregunta:** ¿Qué otros templating engines existen para node?
Además de EJS, existen otros templating engines populares para Node.js, como:
- **Pug (anteriormente Jade):** Un motor de plantillas que utiliza una sintaxis de indentación para definir la estructura HTML, lo que lo hace más conciso.
- **Handlebars:** Un motor de plantillas que permite la creación de plantillas reutilizables con una sintaxis simple y fácil de entender.
- **Mustache:** Un motor de plantillas lógico que se centra en la simplicidad y la portabilidad, sin lógica de programación en las plantillas.
- **Nunjucks:** Un motor de plantillas inspirado en Jinja2, que ofrece una sintaxis poderosa y flexible para la creación de plantillas en Node.js.

*Fuente: https://www.npmjs.com/search?q=templating%20engine*

### Laboratorio 13: MVC

**Pregunta:** ¿Qué beneficios encuentras en el estilo MVC?
El estilo MVC tiene varios beneficios:
- **Separación de responsabilidades:** Permite que el código esté organizado en tres componentes distintos (Modelo, Vista y Controlador) por lo que facilita el mantenimiento y la escalabilidad del proyecto.
- **Reutilización de código:** El modelo y la vista pueden ser reutilizados en diferentes partes de la aplicación.
- **Facilita el trabajo en equipo:** Como equipo se puede trabajar en diferentes componentes sin inteferir entre si.

**Pregunta:** ¿Encuentras alguna desventaja en el estilo arquitectónico MVC?
Quizas puede ser un poco complicado para proyectos pequeños, ya que la separación de responsabilidades puede resultar en una mayor cantidad de archivos y complejidad en la estructura del proyecto. Además, podria tener cierta deuda técnica si no se implementa correctamente desde un principio, lo que puede llevar a una mala organización del código y dificultar el mantenimiento a largo plazo.

### Laboratorio 14: Manejo de sesion y cookies

**Pregunta:** ¿Qué beneficios encuentras en el estilo MVC?
Que por el estilo de arquitectura MVC, el código se encuentra organizado y es fácil de mantener. Por ejemplo, puedo separar facilmente entre aspectos de manejo de sesion y directamente lo relacionado con las tareas. Incluso puedo estructurar mejor las carpetas del proyecto para crear una separacion clara entre cada parte.

**Pregunta:** ¿Encuentras alguna desventaja en el estilo arquitectónico MVC?
Que se vuelve un poco complicado saber que parte hacer que, quizas sea por la curva de aprendizaje. Tambien sobretodo por el tamaño del proyecto, aumento mucho la cantidad de archivos y la complejidad del proyecto, lo que puede resultar en una mayor dificultad para entender el flujo de la aplicación, por ejemplo si se lo intentara presentar a alguien más.

### Laboratorio 17: Conexión con base de datos

**Pregunta:** ¿Qué ventajas tiene escribir el código SQL únicamente en la capa del modelo?
Que hace que toda la conexion y extraccion de datos se encuentre en un solo lugar, lo que hace que el codigo sea mas organizado y facil de mantener. Ademas, si se quisiera cambiar la base de datos o la forma en la que se accede a los datos, solo se tendria que modificar el modelo sin afectar las otras capas.

**Pregunta:** ¿Qué es SQL injection y cómo se puede prevenir?
SQL injection es una técnica hackeo en la que un atacante inserta código SQL malicioso en una consulta para manipular la base de datos, como insertar queries en forms para acceder, modificar o eliminar datos de la base de datos sin autorización. Para prevenirlo, se puede ya sea limitar los permisos en la base de datos, o utilizar consultas parametrizadas, que permiten separar el código SQL de los datos ingresados por el usuario, evitando que el código malicioso sea ejecutado (Hace que al poner una consulta no se corra y mas bien se vea como "Bobby; DROP TABLE users;").

## Laboratorio 18: Autentificación

**Pregunta:** ¿Qué otras formas de autentificación existen?
Además de la autenticación basada en sesiones, existen otras formas de autenticación como:
- **Autenticación basada en tokens:** Utiliza tokens para autenticar a los usuarios, como JWT (JSON Web Tokens), que se envían al cliente después de un inicio de sesión exitoso y se incluyen en las solicitudes posteriores para verificar la identidad del usuario.
- **Autenticación multifactor (MFA):** Requiere que los usuarios proporcionen dos o más formas de verificación, como una contraseña y un código enviado a su teléfono móvil, para aumentar la seguridad.
- **Autenticación biométrica:** Utiliza características físicas del usuario, como huellas.

## Laboratorio 19: RBAC

**Pregunta:** ¿En qué consiste el control de acceso basado en roles?

El control de acceso basado en roles (RBAC) es un modelo de seguridad que restringe el acceso a los recursos del sistema en función de los roles asignados a los usuarios. En RBAC, se definen roles específicos con permisos asociados, y los usuarios se asignan a esos roles, permitiendo regular los permisos mas facilmente, ya que en lugar de asignar permisos individualmente a cada usuario, se pueden agrupar en roles y asignar esos roles a los usuarios.

**Pregunta:** Investiguen y describan 2 sistemas, uno que aplique RBAC y uno que no. Realicen un análisis de las ventajas y desventajas de cada uno con respecto al control de acceso.

Por ejemplo Github es un sistema que aplica RBAC, ya que tiene diferentes roles como propietario, colaborador y lector, cada uno con permisos específicos para acceder a los repositorios y realizar acciones. Esto permite una gestión eficiente de los permisos y una mayor seguridad al limitar el acceso a los recursos según el rol del usuario.

Un sistema que no aplica RBAC son por ejemplo sitios como Wikipedia, ya que cualquier usuario puede editar y modificar el contenido sin restricciones de roles específicos. Esto puede llevar a problemas de seguridad y calidad del contenido, ya que no hay un control claro sobre quién tiene acceso a qué recursos y qué acciones pueden realizar. 

Algunas ventajas de RBAC son:
- Facilita la gestión de permisos al agruparlos en roles.
- Mejora la seguridad al limitar el acceso a los recursos según el rol del usuario.

Algunas desventajas de RBAC son:
- Puede aumentar la complejidad en la administración de roles y permisos.
- Requiere un diseño cuidadoso para evitar la creación de roles redundantes o conflictivos.

## Laboratorio 20: Consultas en SQL

Completado en archivo lab20/Lab20.md

## Laboratorio 21: Funciones Agregadas y Sub-consultas 


## Laboratorio 22: Subir y bajar archivos

## Laboratorio 23: Stored procedures
Realizado en cookBook

## Laboratorio 24: AJAX
Ralizado en proyecto de equipo sistema unitas con commit 92e0214598b38805c82f3d037a4beb73472a7d23 en rama develop

## Laboratorio 25: Transacciones

## Laboratorio 26: Servicios web 

## Laboratorio 28: Triggers
