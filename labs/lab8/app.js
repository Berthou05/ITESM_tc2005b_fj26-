const filesystem = require('fs');

// funciones 
// promedio de un array n de numeros

let average = (numbers) => {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum / numbers.length;
}

// Pruebas
console.log("Promedio de [10, 20, 30] =", average([10, 20, 30]));
console.log("Promedio de [5, 7, 9, 11] =", average([5, 7, 9, 11]));



// Escribir un string en un archivo de texto

let writeToFile = (filename, content) => {
    filesystem.writeFileSync(filename, content);
}

// Pruebas
// La ultima prueba sobreescribe el contenido del archivo
writeToFile('hello.txt', 'Laboratorio de Node.js - 8');
writeToFile('hello.txt', 'Escribiendo en el mismo archivo de nuevo');
// Si quieres escribir sin sobreescribir, puedes usar appendFileSync


// Grey code
// El código Gray es un sistema de numeración binaria en el que dos números consecutivos difieren en solo un bit.
// Para generar el código Gray para un número n, puedes usar la fórmula: G(n) = n XOR (n >> 1)

// Esta es mi solucion al problema 89 de leet code Codigo Gray con bitwise operators

let greyCode = (n) => {
    let result = [];
    for (let i=0; i < (1 << n); i++) {
        result.push( i ^ (i >> 1) );
    }

    return result;
}

// Pruebas
console.log("Código Gray para n=2:", greyCode(2)); // Output: [0, 1, 3, 2]
console.log("Código Gray para n=3:", greyCode(3)); // Output: [0, 1, 3, 2, 6, 7, 5, 4]


const html = filesystem.readFileSync('../lab6/index.html');
const css = filesystem.readFileSync('../lab6/css/styles.css');
const js = filesystem.readFileSync('../lab6/js/app.js');

const http = require('http');

const server = http.createServer((request,response) => {
    if (request.url === '/') {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(html);
    } else if (request.url === '/css/styles.css') {
        response.writeHead(200, {'Content-Type': 'text/css'});
        response.end(css);
    } else if (request.url === '/js/app.js') {
        response.writeHead(200, {'Content-Type': 'application/javascript'});
        response.end(js);
    } else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});