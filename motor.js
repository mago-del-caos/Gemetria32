// ==========================================
// DICCIONARIOS GEMÁTRICOS
// ==========================================

// 1. Sistema Simple (27 Letras - Español)
const valoresSimples = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
    'j': 10, 'k': 11, 'l': 12, 'm': 13, 'n': 14, 'ñ': 15, 'o': 16, 'p': 17, 'q': 18,
    'r': 19, 's': 20, 't': 21, 'u': 22, 'v': 23, 'w': 24, 'x': 25, 'y': 26, 'z': 27
};

// 2. Sistema Pitagórico (Reducción 1-9)
const valoresPitagoricos = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
    'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'ñ': 6, 'o': 7, 'p': 8, 'q': 9,
    'r': 1, 's': 2, 't': 3, 'u': 4, 'v': 5, 'w': 6, 'x': 7, 'y': 8, 'z': 9
};

// ==========================================
// FUNCIONES DE PROCESAMIENTO
// ==========================================

// Función para quitar acentos pero proteger nuestra 'ñ'
function limpiarTexto(texto) {
    return texto.toLowerCase()
        .replace(/[áäâà]/g, 'a')
        .replace(/[éëêè]/g, 'e')
        .replace(/[íïîì]/g, 'i')
        .replace(/[óöôò]/g, 'o')
        .replace(/[úüûù]/g, 'u')
        .replace(/[^a-zñ]/g, ''); // Elimina espacios, números y símbolos, dejando solo las letras
}

// Función para la Reducción Final (Respetando los Números Maestros del constructor)
function reducirNumero(numero) {
    if (numero === 0) return 0;

    let numStr = numero.toString();
    
    // Mientras tenga más de un dígito, seguimos sumando
    while (numStr.length > 1) {
        let numObj = parseInt(numStr);
        
        // Si encontramos un Número Maestro (11, 22, 33), detenemos la reducción
        if (numObj === 11 || numObj === 22 || numObj === 33) {
            return numObj;
        }

        let suma = 0;
        for (let i = 0; i < numStr.length; i++) {
            suma += parseInt(numStr[i]);
        }
        numStr = suma.toString();
    }
    
    return parseInt(numStr);
}

// ==========================================
// CONEXIÓN CON EL DOM (INTERFAZ)
// ==========================================

// Seleccionamos los elementos del HTML
const inputPalabra = document.getElementById('palabraInput');
const displaySimple = document.getElementById('resSimple');
const displayPitagorica = document.getElementById('resPitagorica');
const displayMaestro = document.getElementById('resMaestro');

// Evento que se dispara cada vez que tecleas algo
inputPalabra.addEventListener('input', (e) => {
    const textoOriginal = e.target.value;
    const textoLimpio = limpiarTexto(textoOriginal); // Filtramos lo que escribes

    let sumaSimple = 0;
    let sumaPitagorica = 0;

    // Calculamos letra por letra
    for (let i = 0; i < textoLimpio.length; i++) {
        let letra = textoLimpio[i];
        sumaSimple += valoresSimples[letra] || 0;
        sumaPitagorica += valoresPitagoricos[letra] || 0;
    }

    // Para el número destino/maestro, la regla esotérica suele basarse 
    // en reducir la suma pitagórica (o la suma total de la fecha/palabra).
    // Aquí reducimos el valor pitagórico:
    let numeroMaestro = reducirNumero(sumaPitagorica);
    
    // Si el input está vacío, devolvemos a cero
    if (textoLimpio.length === 0) {
        numeroMaestro = 0;
    }

    // Enviamos los resultados a las tarjetas de la pantalla
    displaySimple.textContent = sumaSimple;
    displayPitagorica.textContent = sumaPitagorica;
    displayMaestro.textContent = numeroMaestro;
});
