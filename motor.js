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
    if (!texto) return '';
    return texto.toLowerCase()
        .replace(/[áäâà]/g, 'a')
        .replace(/[éëêè]/g, 'e')
        .replace(/[íïîì]/g, 'i')
        .replace(/[óöôò]/g, 'o')
        .replace(/[úüûù]/g, 'u')
        .replace(/[^a-zñ]/g, '');
}

function reducirNumero(numero) {
    if (!numero || numero === 0) return 0;
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
        puntos.push({ x: centro + radio * Math.cos(angulo), y: centro + Math.sin(angulo) * radio });
    }

    let lineas = '';
    for (let i = 0; i < puntos.length; i++) {
        for (let j = i + 1; j < puntos.length; j++) {
            lineas += `<line x1="${puntos[i].x}" y1="${puntos[i].y}" x2="${puntos[j].x}" y2="${puntos[j].y}" stroke="#ffd700" stroke-width="0.5" opacity="0.4" />`;
        }
    }
    let poligono = `<polygon points="${puntos.map(p => `${p.x},${p.y}`).join(' ')}" stroke="#d4af37" stroke-width="1.5" fill="rgba(212, 175, 55, 0.05)" />`;
    
    contenedor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="figura-sagrada">${lineas}${poligono}</svg>`;
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
        puntos[alfabeto[i]] = { x: centro + radio * Math.cos(angulo), y: centro + Math.sin(angulo) * radio };
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

    let sigiloSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="figura-sigilo">`;
    sigiloSVG += `<circle cx="50" cy="50" r="45" stroke="rgba(178, 101, 232, 0.2)" stroke-width="0.5" fill="none" />`;
    if (puntosCamino.length > 0) {
        sigiloSVG += `<path d="${pathD}" stroke="#ffd700" stroke-width="1.5" fill="none" stroke-linejoin="round" />`;
        sigiloSVG += `<circle cx="${puntosCamino[0].x}" cy="${puntosCamino[0].y}" r="2.5" fill="#d4af37" />`;
        const last = puntosCamino[puntosCamino.length - 1];
        sigiloSVG += `<circle cx="${last.x}" cy="${last.y}" r="1" fill="#fff" />`;
    }
    sigiloSVG += `</svg>`;
    contenedor.innerHTML = sigiloSVG;
}

// ==========================================
// 3. SELLO ESTÁTICO (CUADRO MÁGICO / KAMEA)
// ==========================================
function dibujarCuadroMagico(palabra, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;
    if (!palabra) { contenedor.innerHTML = ''; return; }

    const coords = {
        1: {x: 50, y: 83.3},
        2: {x: 83.3, y: 16.6},
        3: {x: 16.6, y: 50},
        4: {x: 16.6, y: 16.6},
        5: {x: 50, y: 50},
        6: {x: 83.3, y: 83.3},
        7: {x: 83.3, y: 50},
        8: {x: 16.6, y: 83.3},
        9: {x: 50, y: 16.6}
    };

    let pathD = "";
    let puntosCamino = [];

    for (let i = 0; i < palabra.length; i++) {
        let letra = palabra[i];
        let valorPitagorico = valoresPitagoricos[letra];
        if (valorPitagorico && coords[valorPitagorico]) {
            let punto = coords[valorPitagorico];
            puntosCamino.push(punto);
            if (pathD === "") pathD += `M ${punto.x} ${punto.y} `;
            else pathD += `L ${punto.x} ${punto.y} `;
        }
    }

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="figura-kamea">`;
    svg += `<line x1="33.3" y1="5" x2="33.3" y2="95" stroke="rgba(178, 101, 232, 0.2)" stroke-width="0.5" />`;
    svg += `<line x1="66.6" y1="5" x2="66.6" y2="95" stroke="rgba(178, 101, 232, 0.2)" stroke-width="0.5" />`;
    svg += `<line x1="5" y1="33.3" x2="95" y2="33.3" stroke="rgba(178, 101, 232, 0.2)" stroke-width="0.5" />`;
    svg += `<line x1="5" y1="66.6" x2="95" y2="66.6" stroke="rgba(178, 101, 232, 0.2)" stroke-width="0.5" />`;

    if (puntosCamino.length > 0) {
        svg += `<path d="${pathD}" stroke="#ffd700" stroke-width="1.5" fill="none" stroke-linejoin="bevel" />`;
        svg += `<circle cx="${puntosCamino[0].x}" cy="${puntosCamino[0].y}" r="2.5" fill="#ff7f00" />`;
        const last = puntosCamino[puntosCamino.length - 1];
        svg += `<rect x="${last.x - 1.5}" y="${last.y - 1.5}" width="3" height="3" fill="#fff" />`;
    }

    for (let num in coords) {
        svg += `<text x="${coords[num].x}" y="${coords[num].y + 1}" text-anchor="middle" font-family="Courier New, monospace" font-size="4" fill="rgba(212, 175, 55, 0.3)">${num}</text>`;
    }

    svg += `</svg>`;
    contenedor.innerHTML = svg;
}

// ==========================================
// CONTROLADOR CENTRAL BLINDADO
// ==========================================
window.procesarInput = function(indice) {
    try {
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

        dibujarGeometria(numeroGeometria, `geometria-${indice}`);
        dibujarSigilo(textoLimpio, `sigilo-${indice}`);
        dibujarCuadroMagico(textoLimpio, `bruno-${indice}`);
    } catch (error) {
        console.error("Error en procesarInput:", error);
    }
}

// ==========================================
// FUNCIONES EXTRAS REFORZADAS
// ==========================================
window.limpiarPilar = function(indice) {
    const input = document.getElementById(`input-${indice}`);
    if(input) {
        input.value = '';
        window.procesarInput(indice);
    }
}

window.descargarArte = function(indice) {
    try {
        const input = document.getElementById(`input-${indice}`);
        let palabra = input && input.value.trim() !== '' ? limpiarTexto(input.value) : 'Vacio';
        if (palabra === 'Vacio') {
            alert('Por favor, ingresa un término primero para generar un símbolo.');
            return;
        }

        const btn = document.querySelector(`#panel-${indice} .btn-visual`);
        const estado = btn.getAttribute('data-estado') || 'geo';
        
        let contenedorId = ''; let sufijo = '';
        if (estado === 'geo') { contenedorId = `geometria-${indice}`; sufijo = 'Geometria'; }
        else if (estado === 'sig') { contenedorId = `sigilo-${indice}`; sufijo = 'Sigilo'; }
        else if (estado === 'bru') { contenedorId = `bruno-${indice}`; sufijo = 'Kamea'; }

        const contenedor = document.getElementById(contenedorId);
        const svgOriginal = contenedor.querySelector('svg');
        if (!svgOriginal) return;

        // Clonamos el SVG para forzar su tamaño a 1000x1000 sin afectar la vista del celular
        const svgElement = svgOriginal.cloneNode(true);
        svgElement.setAttribute("width", "1000");
        svgElement.setAttribute("height", "1000");

        const svgData = new XMLSerializer().serializeToString(svgElement);
        const canvas = document.createElement("canvas");
        canvas.width = 1000; canvas.height = 1000;
        const ctx = canvas.getContext("2d");

        // Rellenar fondo oscuro
        ctx.fillStyle = "#1e112a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const pngFile = canvas.toDataURL("image/png");
            
            const enlace = document.createElement("a");
            enlace.download = `Gematria32_${palabra}_${sufijo}.png`;
            enlace.href = pngFile;
            document.body.appendChild(enlace);
            enlace.click();
            document.body.removeChild(enlace);
        };
        
        // Conversión segura Base64
        const svg64 = btoa(unescape(encodeURIComponent(svgData)));
        img.src = 'data:image/svg+xml;base64,' + svg64;
    } catch (error) {
        alert("Ocurrió un error al intentar descargar la imagen: " + error.message);
    }
}

window.ciclarArte = function(indice) {
    const geo = document.getElementById(`geometria-${indice}`);
    const sig = document.getElementById(`sigilo-${indice}`);
    const bru = document.getElementById(`bruno-${indice}`);
    const btn = document.querySelector(`#panel-${indice} .btn-visual`);

    let estado = btn.getAttribute('data-estado') || 'geo';

    if (estado === 'geo') {
        geo.style.display = 'none'; sig.style.display = 'flex'; bru.style.display = 'none';
        btn.setAttribute('data-estado', 'sig'); btn.textContent = 'Ver Cuadro Mágico';
        btn.classList.add('active-sig'); btn.classList.remove('active-bru');
    } else if (estado === 'sig') {
        geo.style.display = 'none'; sig.style.display = 'none'; bru.style.display = 'flex';
        btn.setAttribute('data-estado', 'bru'); btn.textContent = 'Ver Geometría';
        btn.classList.add('active-bru'); btn.classList.remove('active-sig');
    } else {
        geo.style.display = 'flex'; sig.style.display = 'none'; bru.style.display = 'none';
        btn.setAttribute('data-estado', 'geo'); btn.textContent = 'Crear Sigilo';
        btn.classList.remove('active-bru', 'active-sig');
    }
}

window.cambiarColumnas = function(cantidad) {
    const botones = document.querySelectorAll('.btn-control');
    for (let i = 0; i < botones.length; i++) {
        if (i + 1 === cantidad) botones[i].classList.add('active'); 
        else botones[i].classList.remove('active');
    }

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
        if(input) input.addEventListener('input', () => window.procesarInput(i));
    }
});
