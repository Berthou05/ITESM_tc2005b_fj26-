# TC2005B Construcción de software y toma de decisiones
## Class Labs

------------------------------------------------------------------------
## Explicacion general

Cada laboratorio se encuentra en su propia carpeta, con el nombre del laboratorio. Aunque hay carpetas que contienen mas de un laboratorio, como es el caso de los laboratorios 11 - 13.

A partir del laboratorio 17 donde se integra una base de datos comence a desarrollar un proyecto llamado cookBook. 

Dentro de cada carpeta se encuentran los archivos necesarios para el desarrollo del laboratorio.

------------------------------------------------------------------------

## Preguntas de los laboratorios

### Laboratorio 1: Introducción a las aplicaciones web, HTML5 y ciclo de vida de los sistemas de información

¿Cuál es la diferencia entre Internet y la World Wide Web?
El Internet es una red global de computadoras interconectadas que permite la comunicación y el intercambio de datos a nivel mundial. La World Wide Web (WWW) es un servicio que se ejecuta sobre Internet y permite acceder a documentos y recursos a través de navegadores web utilizando URLs. En resumen, Internet es la infraestructura, mientras que la WWW es una aplicación que utiliza esa infraestructura para proporcionar acceso a información y servicios en línea.

*Fuente: https://www.geeksforgeeks.org/computer-networks/difference-between-internet-and-www*

¿Cuáles son las partes de un URL?
Un URL (Uniform Resource Locator) consta de varias partes: 
- **Esquema:** Indica el protocolo utilizado para acceder al recurso (por ejemplo, http, https, ftp).
- **Nombre de host:** Es la dirección del servidor donde se encuentra el recurso (por ejemplo, www.ejemplo.com).
- **Puerto:** Es un número opcional que especifica el puerto de comunicación en el servidor (por ejemplo, :80 para HTTP).
- **Ruta:** Es la ubicación específica del recurso en el servidor (por ejemplo, /pagina).
- **Parámetros/cadena de consulta:** Son opcionales y se utilizan para enviar datos adicionales al servidor (por ejemplo, ?id=123).

*Fuente: https://www.ibm.com/docs/es/cics-ts/6.x?topic=concepts-components-url*

¿Cuál es el propósito de los métodos HTTP: GET, HEAD, POST, PUT, PATCH, DELETE?
Cada método tiene un distinto propósito:
- **GET:** Solicita un recurso específico del servidor. Es utilizado para obtener datos sin modificar el estado del servidor.
- **HEAD:** Similar a GET, pero solo solicita los encabezados de la respuesta, sin el cuerpo. Es útil para verificar la existencia de un recurso o para obtener metadatos.
- **POST:** Envía datos al servidor para crear un nuevo recurso o realizar una acción específica. Es comúnmente utilizado en formularios web.
- **PUT:** Actualiza completamente un recurso existente o crea uno nuevo si no existe. Reemplaza el recurso completo con los datos proporcionados.
- **PATCH:** Actualiza parcialmente un recurso existente. Solo modifica los campos especificados en la solicitud, en lugar de reemplazar todo el recurso.
- **DELETE:** Elimina un recurso específico del servidor. Se utiliza para eliminar datos o recursos que ya no son necesarios.

*Fuente: https://developer.mozilla.org/es/docs/Web/HTTP/Reference/Methods*

¿Qué método HTTP se debe utilizar al enviar un formulario HTML, por ejemplo cuando ingresas tu usuario y contraseña en algún sitio? ¿Por qué?
El método HTTP recomendado para enviar un formulario HTML que contiene información sensible, como un usuario y contraseña, es el método POST. Esto se debe a que el método POST envía los datos en el cuerpo de la solicitud HTTP, lo que proporciona una capa adicional de seguridad en comparación con el método GET, que envía los datos en la URL. Además, el método POST no tiene limitaciones de longitud de datos como el método GET, lo que permite enviar información más extensa sin problemas.

*Fuente: https://developer.mozilla.org/es/docs/Web/HTTP/Methods/POST*

¿Qué método HTTP se utiliza cuando a través de un navegador web se accede a una página a través de un URL?
El método HTTP que se utiliza cuando se accede a una página web a través de un URL es el método GET. Este método solicita al servidor que envíe el recurso especificado en el URL, como una página HTML, una imagen o un archivo. El método GET es el más comúnmente utilizado para acceder a páginas web y recuperar información sin modificar el estado del servidor.

*Fuente: https://developer.mozilla.org/es/docs/Web/HTTP/Methods/GET*

Un servidor web devuelve una respuesta HTTP con código 200. ¿Qué significa esto? ¿Ocurrió algún error?
El código de estado HTTP 200 significa "OK". Esto indica que la solicitud del cliente fue exitosa y que el servidor ha procesado la solicitud correctamente. No ocurrió ningún error, y el recurso solicitado se ha entregado al cliente sin problemas.

*Fuente: https://developer.mozilla.org/es/docs/Web/HTTP/Status*

¿Es responsabilidad del desarrollador corregir un sitio web si un usuario reporta que intentó acceder al sitio y se encontró con un error 404? ¿Por qué?
Sí, es responsabilidad del desarrollador corregir un sitio web si un usuario reporta un error 404. El error 404 indica que la página o recurso solicitado no se encontró en el servidor. Esto puede deberse a varias razones, como enlaces rotos, archivos eliminados o cambios en la estructura del sitio. Corregir estos errores es importante para mejorar la experiencia del usuario, mantener la reputación del sitio web y garantizar que los visitantes puedan acceder a la información que buscan sin frustraciones.

¿Es responsabilidad del desarrollador corregir un sitio web si un usuario reporta que intentó acceder al sitio y se encontró con un error 500? ¿Por qué?
Sí, es responsabilidad del desarrollador corregir un sitio web si un usuario reporta un error 500. El error 500 indica un problema interno del servidor que impide que la solicitud del cliente se procese correctamente. Esto puede ser causado por errores en el código del servidor, problemas de configuración o fallos en la base de datos. Corregir estos errores es crucial para garantizar que el sitio web funcione correctamente, mantener la confianza de los usuarios y evitar la pérdida de tráfico o clientes potenciales.

¿Qué significa que un atributo HTML5 esté depreciado o desaprobado (deprecated)? Menciona algunos elementos de HTML 4 que en HTML5 estén desaprobados.
Un atributo HTML5 se considera depreciado o desaprobado (deprecated) cuando ya no se recomienda su uso en el desarrollo web y puede ser eliminado en futuras versiones del estándar. Esto generalmente ocurre porque el atributo ha sido reemplazado por una alternativa más eficiente, segura o semántica. Algunos elementos de HTML 4 que están desaprobados en HTML5 incluyen:
- `<font>` - reemplazado por CSS
- `<center>` - reemplazado por CSS
- `<strike>` - reemplazado por `<del>` o CSS
- `<frame>` y `<frameset>` - eliminados completamente
- `<applet>` - reemplazado por `<object>`

¿Cuáles son las diferencias principales entre HTML 4 y HTML5?
HTML5 introduce nuevas características y mejoras en comparación con HTML4, incluyendo soporte nativo para multimedia (audio y video), nuevos elementos semánticos (como header, footer, article, section), mejor soporte para gráficos y efectos visuales con canvas y SVG, y una API más rica para aplicaciones web, como almacenamiento local, geolocalización y arrastrar y soltar.

¿Qué componentes de estructura y estilo tiene una tabla?
Una tabla en HTML se compone de varios elementos estructurales y de estilo, incluyendo:
- **table:** El elemento principal que define la tabla.
- **tr:** Define una fila en la tabla.
- **th:** Define una celda de encabezado en la tabla, generalmente se muestra en negrita y centrada.
- **td:** Define una celda de datos en la tabla, donde se coloca el contenido de la tabla.
- **caption:** Proporciona un título o descripción para la tabla.

¿Cuáles son los principales controles de una forma HTML5?
Los principales controles de una forma HTML5 incluyen:
- email
- search
- tel
- url
- number
- range
- date

*Fuente: https://developer.mozilla.org/es/docs/Learn_web_development/Extensions/Forms/HTML5_input_types*

¿Qué tanto soporte HTML5 tiene el navegador que utilizas? Puedes utilizar la siguiente página para descubrirlo: http://html5test.com/ (Al responder la pregunta recuerda poner el navegador que utilizas)
Utilizo Firefox como mi navegador principal, y tiene un soporte muy completo para HTML5. En html5test Firefox tiene 509 de 555 puntos.

*Fuente: https://html5test.com/*

Sobre el ciclo de vida y desarrollo de los sistemas de información:

¿Cuál es el ciclo de vida de los sistemas de información?
El ciclo de vida de los sistemas de información consta de varias fases, que incluyen:
- **Planificación:** En esta fase se identifican las necesidades del negocio, se definen los objetivos del sistema y se realiza un análisis de viabilidad.
- **Análisis:** Se recopilan y analizan los requisitos del sistema, se crean modelos de datos y se diseñan los procesos de negocio.
- **Diseño:** Se desarrolla la arquitectura del sistema, se diseñan las interfaces de usuario y se especifican los componentes técnicos.
- **Implementación:** Se codifica el sistema, se realizan pruebas unitarias y se integran los componentes para crear una versión funcional.
- **Pruebas:** Se realizan pruebas exhaustivas para identificar y corregir errores, asegurando que el sistema cumpla con los requisitos establecidos.
- **Despliegue:** El sistema se pone en producción y se hace disponible para los usuarios finales.
- **Uso y mantenimiento:** Se realizan actualizaciones, correcciones de errores y mejoras continuas para garantizar el buen funcionamiento del sistema a lo largo del tiempo.

*Fuente: https://flanagan.ugr.es/docencia/2005-2006/2/apuntes/ciclovida.pdf*

¿Cuál es el ciclo de desarrollo de sistemas de información?
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

Como ingeniero de software ¿cuál es tu recomendación sobre el uso de !important en un CSS?
El uso de `!important` en CSS debe ser limitado y utilizado con precaución. Aunque puede ser útil para sobrescribir estilos específicos, su uso excesivo puede dificultar el mantenimiento del código y generar conflictos inesperados. Es preferible estructurar el CSS de manera que la especificidad y el orden de los selectores sean suficientes para aplicar los estilos deseados.

Si se pone una imagen de fondo en una página HTML, ¿por qué debe escogerse con cuidado?
Porque la imagen puede cambiar la legibilidad del texto o incluso puede llegar a afectar el rendimiento de la página si es muy pesada.

Como ingeniero de software, ¿cuál es tu recomendación al elegir las unidades de un propiedad de estilo entre %, px y pt?
Es mejor usar unidades relativas como %, rem que px o pt porque permiten que el diseño funcione en varios dispositivos y tamaños de pantalla.

¿Por qué el uso de una versión minimizada del CSS mejora el rendimiento del sitio?
El CSS minimizado reduce el tamaño del archivo al eliminar espacios, saltos de línea y comentarios, lo que permite que el navegador lo descargue y procese más rápidamente, mejorando así el rendimiento del sitio.

*Fuente: https://www.cloudflare.com/es-es/learning/performance/how-to-minify-css/*
