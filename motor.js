const valoresSimples = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
    'j': 10, 'k': 11, 'l': 12, 'm': 13, 'n': 14, 'ñ': 15, 'o': 16, 'p': 17, 'q': 18,
    'r': 19, 's': 20, 't': 21, 'u': 22, 'v': 23, 'w': 24, 'x': 25, 'y': 26, 'z': 27
};

const valoresPitagoricos = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
    'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'ñ': 6, 'o': 7, 'p': 8, 'q': 9,
    'r': 1, 's': 2, 't': 3, 'u': 4, 'v': 5, 'w': 6, 'x': 7, 'y': 8, 'z': 9
};

function limpiarTexto(texto) {
    return texto.toLowerCase().replace(/[áäâà]/g, 'a').replace(/[éëêè]/g, 'e').replace(/[íïîì]/g, 'i').replace(/[óöôò]/g, 'o').replace(/[úüûù]/g, 'u').replace(/[^a-zñ]/g, '');
}

function reducirNumero(numero) {
    if (numero === 0) return 0;
    let numStr = numero.toString();
    while (numStr.length > 1) {
        let numObj = parseInt(numStr);
        if (numObj === 11 || numObj === 22 || numObj === 33) return numObj;
        let suma = 0;
        for (let i = 0; i < numStr.length; i++) suma += parseInt(numStr[i]);
        numStr = suma.toString();
    }
    return parseInt(numStr);
}

function dibujarGeometria(numero, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    if (numero === 0 || !contenedor) { 
        if(contenedor) contenedor.innerHTML = ''; 
        return; 
    }

    let lados = numero < 3 ? 3 : numero; 
    let puntos = [];
    const radio = 45; 
    const centro = 50; 

    for (let i = 0; i < lados; i++) {
        const angulo = (i * 2 * Math.PI) / lados - Math.PI / 2;
        puntos.push({ x: centro + radio * Math.cos(angulo), y: centro + radio * Math.sin(angulo) });
    }

    let lineas = '';
    for (let i = 0; i < puntos.length; i++) {
        for (let j = i + 1; j < puntos.length; j++) {
            lineas += `<line x1="${puntos[i].x}" y1="${puntos[i].y}" x2="${puntos[j].x}" y2="${puntos[j].y}" stroke="var(--gold-bright)" stroke-width="0.5" opacity="0.4" />`;
        }
    }

    let poligono = `<polygon points="${puntos.map(p => `${p.x},${p.y}`).join(' ')}" stroke="var(--gold)" stroke-width="1.5" fill="rgba(212, 175, 55, 0.05)" />`;

    contenedor.innerHTML = `<svg viewBox="0 0 100 100" class="figura-sagrada">${lineas}${poligono}</svg>`;
}

// Función principal de procesamiento por panel
function procesarInput(indice) {
    const input = document.getElementById(`input-${indice}`);
    if(!input) return;

    const textoLimpio = limpiarTexto(input.value);
    let sumaSimple = 0;
    let sumaPitagorica = 0;

    for (let i = 0; i < textoLimpio.length; i++) {
        let letra = textoLimpio[i];
        sumaSimple += valoresSimples[letra] || 0;
        sumaPitagorica += valoresPitagoricos[letra] || 0;
    }

    let numeroSintesis = textoLimpio.length === 0 ? 0 : reducirNumero(sumaPitagorica);
    let numeroDestino = textoLimpio.length === 0 ? 0 : reducirNumero(sumaSimple); 

    document.getElementById(`simple-${indice}`).textContent = sumaSimple;
    document.getElementById(`pitagorica-${indice}`).textContent = sumaPitagorica;
    document.getElementById(`maestro-${indice}`).textContent = numeroSintesis;
    document.getElementById(`destino-${indice}`).textContent = numeroDestino;

    dibujarGeometria(numeroSintesis, `geometria-${indice}`);
}

// Control de UI: Cambio de columnas
window.cambiarColumnas = function(cantidad) {
    // Actualizar botones activos
    document.querySelectorAll('.btn-control').forEach((btn, index) => {
        if (index + 1 === cantidad) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    // Mostrar/Ocultar paneles
    for (let i = 1; i <= 4; i++) {
        const panel = document.getElementById(`panel-${i}`);
        if (panel) {
            panel.style.display = i <= cantidad ? 'block' : 'none';
        }
    }

    // Actualizar el layout del grid contenedor
    const container = document.getElementById('paneles-container');
    container.className = `paneles-grid layout-${cantidad}`;
}

// Asignar listeners a los 4 inputs
document.addEventListener('DOMContentLoaded', () => {
    for (let i = 1; i <= 4; i++) {
        const input = document.getElementById(`input-${i}`);
        if(input) {
            input.addEventListener('input', () => procesarInput(i));
        }
    }
});
