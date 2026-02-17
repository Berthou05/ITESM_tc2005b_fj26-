// ejercicio 1
// Entrada: un número pedido con un prompt. 
// Salida: Una tabla con los números del 1 al número dado con sus cuadrados y cubos. Utiliza document.write para producir la salida 

const createTable = () => {
    let validLength = false;
    let tablelength = 0;
    while (!validLength) {
        tablelength = parseInt(prompt("Ingresa el tamaño de tu tabla:"));
        if (isNaN(tablelength) || tablelength <= 0) {
            alert("Por favor, ingresa un número válido mayor que 0.");
        } else {
            validLength = true;
        }
    }

    // Create and display table in HTML
    let htmlTable = '<table border=1><tr><th>Number</th><th>Square</th><th>Cube</th></tr>';

    for (let i = 0; i < tablelength; i++) {
        // Assuming table[i][0] is Square, table[i][1] is Cube
        htmlTable += `<tr><td>${i}</td><td>${i*i}</td><td>${i*i*i}</td></tr>`;
    }
    
    htmlTable += '</table>';
    document.getElementById("tableContainer").innerHTML = htmlTable;
}

// ejercicio 2
// Entrada: Usando un prompt se pide el resultado de la suma de 2 números generados de manera aleatoria. 
// Salida: La página debe indicar si el resultado fue correcto o incorrecto, y el tiempo que tardó el usuario en escribir la respuesta. 
const sumGame = () => {
   let num1 = Math.floor(Math.random() * 100);
    let num2 = Math.floor(Math.random() * 100);
    
    let startTime = Date.now();
    let userAnswer = parseInt(prompt(`¿Cuánto es ${num1} + ${num2}?`));
    let endTime = Date.now();

    let correctAnswer = num1 + num2;
    let timeTaken = (endTime - startTime) / 1000; // Convert to seconds

    if (userAnswer === correctAnswer) {
        alert(`¡Correcto! La suma es ${correctAnswer} y tardaste ${timeTaken} segundos.`);
    } else {
        alert(`Incorrecto. La suma correcta es ${correctAnswer} y tardaste ${timeTaken} segundos.`);
    }
}

// ejercicio 3
// Función: contador. 
// Parámetros: Un arreglo de números. 
// Regresa: La cantidad de números negativos en el arreglo, la cantidad de 0's, y la cantidad de valores mayores a 0 en el arreglo.

const contador = () => {
    let arr = [];
    for (let i = 0; i < 10; i++) {
        let num = Math.floor(Math.random() * 21) - 10; // Random number between -10 and 10
        arr.push(num);
    }

    let negativeCount = 0;
    let zeroCount = 0;
    let positiveCount = 0;

    for (let num of arr) {
        if (num < 0) {
            negativeCount++;
        } else if (num === 0) {
            zeroCount++;
        } else {
            positiveCount++;
        }
    }

    let htmlArray = '<table border="1"><tr><th>Number</th></tr>';
    for (let num of arr) {
        htmlArray += `<tr><td>${num}</td></tr>`;
    }

    htmlArray += '</table>';
    document.getElementById("arrayContainer").innerHTML = htmlArray;

    let result = `Cantidad de números negativos: ${negativeCount}\nCantidad de ceros: ${zeroCount}\nCantidad de números positivos: ${positiveCount}`;
    document.getElementById("resultContainer").innerText = result;

    return {
        negative: negativeCount,
        zero: zeroCount,
        positive: positiveCount
    };
}

// ejercicio 4
// Función: promedios.
// Parámetros: Un arreglo de arreglos de números.
// Regresa: Un arreglo con el promedio de cada uno de los arreglos internos.

const promedios = () => {
    let validLength = false;
    let tablelength = 0;
    while (!validLength) {
        tablelength = parseInt(prompt("Ingresa el tamaño de tu tabla:"));
        if (isNaN(tablelength) || tablelength <= 0) {
            alert("Por favor, ingresa un número válido mayor que 0.");
        } else {
            validLength = true;
        }
    }

    let arr = [];
    let htmlArrayPromedios = '<table border="1"><tr><th>Array</th><th>Average</th></tr>';
    for (let i = 0; i < tablelength; i++) {
        let innerArr = [];
        for (let j = 0; j < 5; j++) {
            innerArr.push(Math.floor(Math.random() * 101));
        }
        arr.push(innerArr);
        let sum = innerArr.reduce((acc, num) => acc + num, 0);
        let average = sum / innerArr.length;
        htmlArrayPromedios += `<tr><td>${innerArr.join(", ")}</td><td>${average.toFixed(2)}</td></tr>`;
    }

    htmlArrayPromedios += '</table>';
    document.getElementById("promediosContainer").innerHTML = htmlArrayPromedios;
}

// ejercicio 5
// Función: inverso. 
// Parámetros: Un número. 
// Regresa: El número con sus dígitos en orden inverso.

const inverso = (num) => {
    let inverted = 0;
    while (num > 0) {
        inverted = inverted * 10 + (num % 10);
        num = Math.floor(num / 10);
    }
    console.log(inverted);
    return inverted;
}

// ejercicio 6
// Crea una solución para un problema de tu elección (puede ser algo relacionado con tus intereses, alguna problemática que hayas identificado en algún ámbito, 
// un problema de programación que hayas resuelto en otro lenguaje, un problema de la ACM, entre otros). 
// El problema debe estar descrito en un documento HTML, y la solución implementada en JavaScript, utilizando al menos la creación de un objeto, el objeto 
// además de su constructor deben tener al menos 2 métodos. Muestra los resultados en el documento HTML.

// Ejemplo: Una cuenta de banco, con métodos para depositar, retirar y mostrar el balance.

class BankAccount {
    constructor(owner = "Nadie", balance = 0) {
        this.owner = owner;
        this.balance = balance;
        this.historial = [];
    }

    deposit(amount) {
        if (!Number.isFinite(amount) || amount <= 0) {
            return false;
        }

        this.balance += amount;
        this.historial.push({
            type: "Deposito",
            amount: amount,
            date: new Date()
        });
        return true;
    }

    withdraw(amount) {
        if (!Number.isFinite(amount) || amount <= 0 || amount > this.balance) {
            return false;
        }

        this.balance -= amount;
        this.historial.push({
            type: "Retiro",
            amount: amount,
            date: new Date()
        });
        return true;
    }

    getBalance() {
        return this.balance;
    }

    getHistory() {
        return this.historial;
    }
}

const account = new BankAccount("Alexis", 0);

function updateBankUI() {
    const balanceElement = document.getElementById("balance");
    const bankContainer = document.getElementById("bankContainer");

    balanceElement.textContent = account.getBalance().toFixed(2);

    const history = account.getHistory();
    if (history.length === 0) {
        bankContainer.innerHTML = "<p>Sin transacciones todavia.</p>";
        return;
    }

    let html = "<table border='1'><tr><th>Fecha</th><th>Tipo</th><th>Monto</th></tr>";
    for (const item of history) {
        html += `<tr><td>${item.date.toLocaleString()}</td><td>${item.type}</td><td>$${item.amount.toFixed(2)}</td></tr>`;
    }
    html += "</table>";
    bankContainer.innerHTML = html;
}

function showBalance() {
    updateBankUI();
    alert(`Saldo actual: $${account.getBalance().toFixed(2)}`);
}

function deposit() {
    const amount = parseFloat(prompt("Cuanto deseas depositar?"));
    if (!account.deposit(amount)) {
        alert("Monto invalido. Debe ser mayor que 0.");
    }
    updateBankUI();
}

function withdraw() {
    const amount = parseFloat(prompt("Cuanto deseas retirar?"));
    if (!account.withdraw(amount)) {
        alert("Monto invalido o saldo insuficiente.");
    }
    updateBankUI();
}

function showHistory() {
    updateBankUI();
    const history = account.getHistory();
    if (history.length === 0) {
        alert("No hay transacciones registradas.");
        return;
    }

    const lines = history.map((item) => {
        return `${item.date.toLocaleString()} - ${item.type}: $${item.amount.toFixed(2)}`;
    });
    alert(`Historial de transacciones:\n${lines.join("\n")}`);
}

window.addEventListener("DOMContentLoaded", updateBankUI);
