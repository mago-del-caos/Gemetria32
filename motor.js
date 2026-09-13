// ==========================================
// DICCIONARIOS GEMÁTRICOS
// ==========================================

// 1. Gematría Simple (27 Letras - Español)
const valoresSimples = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
    'j': 10, 'k': 11, 'l': 12, 'm': 13, 'n': 14, 'ñ': 15, 'o': 16, 'p': 17, 'q': 18,
    'r': 19, 's': 20, 't': 21, 'u': 22, 'v': 23, 'w': 24, 'x': 25, 'y': 26, 'z': 27
};

// 2. Gematría Pitagórica (Reducción 1-9)
const valoresPitagoricos = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
    'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'ñ': 6, 'o': 7, 'p': 8, 'q': 9,
    'r': 1, 's': 2, 't': 3, 'u': 4, 'v': 5, 'w': 6, 'x': 7, 'y': 8, 'z': 9
};

// ==========================================
// FUNCIONES DE PROCESAMIENTO
// ==========================================

function limpiarTexto(texto) {
    return texto.toLowerCase()
        .replace(/[áäâà]/g, 'a')
        .replace(/[éëêè]/g, 'e')
        .replace(/[íïîì]/g, 'i')
        .replace(/[óöôò]/g, 'o')
        .replace(/[úüûù]/g, 'u')
        .replace(/[^a-zñ]/g, ''); // Deja solo letras del abecedario incluyendo la ñ
}

function reducirNumero(numero) {
    if (numero === 0) return 0;
    let numStr = numero.toString();
    
    // Reducción continua respetando Números Maestros (11, 22, 33)
    while (numStr.length > 1) {
        let numObj = parseInt(numStr);
        if (numObj === 11 || numObj === 22 || numObj === 33) return numObj;
        
        let suma = 0;
        for (let i = 0; i < numStr.length; i++) {
            suma += parseInt(numStr[i]);
        }
        numStr = suma.toString();
    }
    return parseInt(numStr);
}

// ==========================================
// MOTOR DE GEOMETRÍA SAGRADA 3D (SVG)
// ==========================================
function dibujarGeometria(numero) {
    const contenedor = document.getElementById('geometriaContenedor');
    if (numero === 0) { 
        contenedor.innerHTML = ''; 
        return; 
    }

    // Determinamos los lados del polígono. Mínimo 3 (Triángulo) para poder trazar un área.
    let lados = numero;
    if (lados < 3) lados = 3; 

    let puntos = [];
    const radio = 45; // Radio del círculo circunscrito
    const centro = 50; // Centro (x,y) en el viewBox (0 0 100 100)

    // Cálculo de vértices mediante trigonometría
    for (let i = 0; i < lados; i++) {
        const angulo = (i * 2 * Math.PI) / lados - Math.PI / 2;
        const x = centro + radio * Math.cos(angulo);
        const y = centro + radio * Math.sin(angulo);
        puntos.push({ x, y });
    }

    // Trazado de líneas internas (Wireframe / Nodos conectados)
    let lineas = '';
    for (let i = 0; i < puntos.length; i++) {
        for (let j = i + 1; j < puntos.length; j++) {
            lineas += `<line x1="${puntos[i].x}" y1="${puntos[i].y}" x2="${puntos[j].x}" y2="${puntos[j].y}" stroke="var(--gold-bright)" stroke-width="0.5" opacity="0.4" />`;
        }
    }

    // Trazado del perímetro exterior (Polígono base)
    let poligono = `<polygon points="${puntos.map(p => `${p.x},${p.y}`).join(' ')}" stroke="var(--gold)" stroke-width="1.5" fill="rgba(212, 175, 55, 0.05)" />`;

    // Inyección del SVG en el DOM
    contenedor.innerHTML = `
        <svg viewBox="0 0 100 100" class="figura-sagrada">
            ${lineas}
            ${poligono}
        </svg>
    `;
}

// ==========================================
// CONEXIÓN CON LA INTERFAZ (DOM)
// ==========================================
const inputPalabra = document.getElementById('palabraInput');
const displaySimple = document.getElementById('resSimple');
const displayPitagorica = document.getElementById('resPitagorica');
const displayMaestro = document.getElementById('resMaestro');
const displayDestino = document.getElementById('resDestino');

inputPalabra.addEventListener('input', (e) => {
    const textoLimpio = limpiarTexto(e.target.value);
    
    let sumaSimple = 0;
    let sumaPitagorica = 0;

    for (let i = 0; i < textoLimpio.length; i++) {
        let letra = textoLimpio[i];
        sumaSimple += valoresSimples[letra] || 0;
        sumaPitagorica += valoresPitagoricos[letra] || 0;
    }

    // La Síntesis nace de la reducción del valor Pitagórico
    let numeroSintesis = reducirNumero(sumaPitagorica);
    // El Número de Destino nace de la reducción del valor Simple
    let numeroDestino = reducirNumero(sumaSimple); 
    
    if (textoLimpio.length === 0) {
        numeroSintesis = 0;
        numeroDestino = 0;
    }

    // Proyección de resultados en las tarjetas
    displaySimple.textContent = sumaSimple;
    displayPitagorica.textContent = sumaPitagorica;
    displayMaestro.textContent = numeroSintesis;
    displayDestino.textContent = numeroDestino;

    // Proyección de la Geometría basada en la Síntesis Pitagórica
    dibujarGeometria(numeroSintesis);
});
