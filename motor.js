// ==========================================
// DICCIONARIOS GEMÁTRICOS
// ==========================================
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

// ==========================================
// 1. GEOMETRÍA SAGRADA (3D WIREFRAME)
// ==========================================
function dibujarGeometria(numero, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;
    if (numero === 0) { contenedor.innerHTML = ''; return; }

    let lados = numero < 3 ? 3 : numero; 
    let puntos = [];
    const radio = 45; const centro = 50; 

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

// ==========================================
// 2. MAGIA SIGILAR (2D ROSACRUZ)
// ==========================================
function dibujarSigilo(palabra, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;
    if (!palabra) { contenedor.innerHTML = ''; return; }

    const radio = 40; const centro = 50;
    const alfabeto = "abcdefghijklmnñopqrstuvwxyz";
    const puntos = {};

    for (let i = 0; i < alfabeto.length; i++) {
        const angulo = (i * 2 * Math.PI) / alfabeto.length - Math.PI / 2;
        puntos[alfabeto[i]] = { x: centro + radio * Math.cos(angulo), y: centro + radio * Math.sin(angulo) };
    }

    let pathD = ""; let puntosCamino = [];
    for (let i = 0; i < palabra.length; i++) {
        const letra = palabra[i];
        if (puntos[letra]) {
            puntosCamino.push(puntos[letra]);
            if (pathD === "") pathD += `M ${puntos[letra].x} ${puntos[letra].y} `;
            else pathD += `L ${puntos[letra].x} ${puntos[letra].y} `;
        }
    }

    let sigiloSVG = `<svg viewBox="0 0 100 100" class="figura-sigilo">`;
    sigiloSVG += `<circle cx="50" cy="50" r="45" stroke="rgba(178, 101, 232, 0.2)" stroke-width="0.5" fill="none" />`;
    if (puntosCamino.length > 0) {
        sigiloSVG += `<path d="${pathD}" stroke="var(--gold-bright)" stroke-width="1.5" fill="none" stroke-linejoin="round" />`;
        sigiloSVG += `<circle cx="${puntosCamino[0].x}" cy="${puntosCamino[0].y}" r="2.5" fill="var(--gold)" />`;
        const last = puntosCamino[puntosCamino.length - 1];
        sigiloSVG += `<circle cx="${last.x}" cy="${last.y}" r="1" fill="#fff" />`;
    }
    sigiloSVG += `</svg>`;
    contenedor.innerHTML = sigiloSVG;
}

// ==========================================
// 3. RUEDA LULIANA (GIORDANO BRUNO)
// ==========================================
function dibujarRuedaBruno(simple, pitagorica, sintesis, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;
    if (simple === 0) { contenedor.innerHTML = ''; return; }

    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZÑ";
    const numeros = "123456789";

    // Función para crear textos curvos distribuidos en los anillos
    function crearAnilloTexto(caracteres, radio, clase) {
        let elementos = '';
        const total = caracteres.length;
        const anguloPaso = 360 / total;
        for(let i = 0; i < total; i++) {
            const rot = i * anguloPaso;
            elementos += `<text x="50" y="${50 - radio}" transform="rotate(${rot}, 50, 50)" text-anchor="middle" font-size="${radio > 20 ? 3.5 : 4}" class="${clase}">${caracteres[i]}</text>`;
        }
        return elementos;
    }

    // Cálculos de engranajes: Dinámica de rotación
    const rotExt = simple * (360 / 27); // Gira basada en el Simple
    const rotMed = pitagorica * (360 / 27); // Gira invertida basada en Pitagórica
    const rotInt = sintesis * (360 / 9); // Gira basada en Síntesis Maestro

    let svg = `<svg viewBox="0 0 100 100" class="figura-bruno">`;
    
    // El Eje Hermético (Indicador del Cenit - 12 o'clock)
    svg += `<polygon points="50,2 53,8 47,8" fill="var(--ember)" />`;
    svg += `<line x1="50" y1="8" x2="50" y2="50" stroke="rgba(255,127,0,0.4)" stroke-width="0.5" stroke-dasharray="1,2" />`;

    // 1. Rueda Exterior
    svg += `<g style="transform: rotate(${rotExt}deg); transform-origin: 50px 50px; transition: transform 2s cubic-bezier(0.25, 1, 0.5, 1);">`;
    svg += `<circle cx="50" cy="50" r="45" fill="rgba(30,17,42,0.8)" stroke="var(--purple-glow)" stroke-width="0.5"/>`;
    svg += crearAnilloTexto(alfabeto, 41, 'texto-rueda-ext');
    svg += `</g>`;

    // 2. Rueda Media
    svg += `<g style="transform: rotate(-${rotMed}deg); transform-origin: 50px 50px; transition: transform 2.5s cubic-bezier(0.25, 1, 0.5, 1);">`;
    svg += `<circle cx="50" cy="50" r="34" fill="rgba(20,10,35,0.9)" stroke="var(--gold)" stroke-width="0.5"/>`;
    svg += crearAnilloTexto(alfabeto, 30, 'texto-rueda-med');
    svg += `</g>`;

    // 3. Rueda Interior
    svg += `<g style="transform: rotate(${rotInt}deg); transform-origin: 50px 50px; transition: transform 3s cubic-bezier(0.25, 1, 0.5, 1);">`;
    svg += `<circle cx="50" cy="50" r="23" fill="rgba(10,5,20,1)" stroke="var(--gold-bright)" stroke-width="1"/>`;
    svg += crearAnilloTexto(numeros, 18, 'texto-rueda-int');
    svg += `</g>`;

    // Eje Central
    svg += `<circle cx="50" cy="50" r="4" fill="var(--gold-bright)"/>`;
    svg += `<circle cx="50" cy="50" r="1.5" fill="#000"/>`;

    svg += `</svg>`;
    contenedor.innerHTML = svg;
}

// ==========================================
// CONTROLADOR CENTRAL
// ==========================================
window.procesarInput = function(indice) {
    const input = document.getElementById(`input-${indice}`);
    if(!input) return;

    const textoLimpio = limpiarTexto(input.value);
    let sumaSimple = 0; let sumaPitagorica = 0;

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

    const fuenteSelect = document.getElementById(`fuente-geo-${indice}`);
    let numeroGeometria = numeroSintesis; 
    
    if (fuenteSelect) {
        if (fuenteSelect.value === 'destino') numeroGeometria = numeroDestino;
        else if (fuenteSelect.value === 'pitagorica') numeroGeometria = sumaPitagorica;
        else if (fuenteSelect.value === 'simple') numeroGeometria = sumaSimple;
    }

    // Ejecución simultánea de las 3 artes herméticas
    dibujarGeometria(numeroGeometria, `geometria-${indice}`);
    dibujarSigilo(textoLimpio, `sigilo-${indice}`);
    dibujarRuedaBruno(sumaSimple, sumaPitagorica, numeroSintesis, `bruno-${indice}`);
}

// Ciclador de Estados Visuales
window.ciclarArte = function(indice) {
    const geo = document.getElementById(`geometria-${indice}`);
    const sig = document.getElementById(`sigilo-${indice}`);
    const bru = document.getElementById(`bruno-${indice}`);
    const btn = document.querySelector(`#panel-${indice} .btn-visual`);

    let estado = btn.getAttribute('data-estado') || 'geo';

    if (estado === 'geo') {
        // Pasa a Sigilo
        geo.style.display = 'none'; sig.style.display = 'flex'; bru.style.display = 'none';
        btn.setAttribute('data-estado', 'sig');
        btn.textContent = 'Ver Rueda';
        btn.classList.add('active-sig'); btn.classList.remove('active-bru');
    } else if (estado === 'sig') {
        // Pasa a Rueda de Bruno
        geo.style.display = 'none'; sig.style.display = 'none'; bru.style.display = 'flex';
        btn.setAttribute('data-estado', 'bru');
        btn.textContent = 'Ver Geometría';
        btn.classList.add('active-bru'); btn.classList.remove('active-sig');
    } else {
        // Vuelve a Geometría
        geo.style.display = 'flex'; sig.style.display = 'none'; bru.style.display = 'none';
        btn.setAttribute('data-estado', 'geo');
        btn.textContent = 'Crear Sigilo';
        btn.classList.remove('active-bru', 'active-sig');
    }
}

window.cambiarColumnas = function(cantidad) {
    document.querySelectorAll('.btn-control').forEach((btn, index) => {
        if (index + 1 === cantidad) btn.classList.add('active'); else btn.classList.remove('active');
    });

    for (let i = 1; i <= 4; i++) {
        const panel = document.getElementById(`panel-${i}`);
        if (panel) panel.style.display = i <= cantidad ? 'flex' : 'none';
    }
    const container = document.getElementById('paneles-container');
    container.className = `paneles-grid layout-${cantidad}`;
}

document.addEventListener('DOMContentLoaded', () => {
    for (let i = 1; i <= 4; i++) {
        const input = document.getElementById(`input-${i}`);
        if(input) input.addEventListener('input', () => procesarInput(i));
    }
});
