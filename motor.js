// ==========================================
// 3. RUEDA LULIANA (GIORDANO BRUNO) - MOTOR REPARADO
// ==========================================
function dibujarRuedaBruno(simple, pitagorica, sintesis, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;
    if (simple === 0) { contenedor.innerHTML = ''; return; }

    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZÑ";
    const numeros = "123456789";

    function crearAnilloTexto(caracteres, radio, color, negrita, tamañoBase) {
        let elementos = '';
        const total = caracteres.length;
        const anguloPaso = 360 / total;
        const fw = negrita ? 'bold' : 'normal';
        for(let i = 0; i < total; i++) {
            const rot = i * anguloPaso;
            // El texto se ancla firmemente a su coordenada
            elementos += `<text x="50" y="${50 - radio}" transform="rotate(${rot}, 50, 50)" text-anchor="middle" font-family="Courier New, monospace" font-size="${tamañoBase}" font-weight="${fw}" fill="${color}">${caracteres[i]}</text>`;
        }
        return elementos;
    }

    // Le añadimos 360 grados extra (vueltas completas) para crear un efecto de máquina giratoria
    const rotExt = (360 * 1) + (simple * (360 / 27)); 
    const rotMed = -(360 * 1) - (pitagorica * (360 / 27)); 
    const rotInt = (360 * 2) + (sintesis * (360 / 9)); 

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="figura-bruno">`;
    
    // Eje Hermético (La Aguja Lectora)
    svg += `<polygon points="50,2 53,8 47,8" fill="#ff7f00" />`;
    svg += `<line x1="50" y1="8" x2="50" y2="50" stroke="rgba(255,127,0,0.4)" stroke-width="0.5" stroke-dasharray="1,2" />`;

    // 1. Rueda Exterior (Gematría Simple) - Usa animación SVG nativa
    svg += `<g>`;
    svg += `<animateTransform attributeName="transform" type="rotate" from="0 50 50" to="${rotExt} 50 50" dur="1.5s" fill="freeze" calcMode="spline" keySplines="0.25 0.1 0.25 1" keyTimes="0;1" />`;
    svg += `<circle cx="50" cy="50" r="45" fill="rgba(30,17,42,0.8)" stroke="#9d4edd" stroke-width="0.5"/>`;
    svg += crearAnilloTexto(alfabeto, 41, '#a392b8', false, 4);
    svg += `</g>`;

    // 2. Rueda Media (Gematría Pitagórica) - Gira en sentido contrario
    svg += `<g>`;
    svg += `<animateTransform attributeName="transform" type="rotate" from="0 50 50" to="${rotMed} 50 50" dur="2s" fill="freeze" calcMode="spline" keySplines="0.25 0.1 0.25 1" keyTimes="0;1" />`;
    svg += `<circle cx="50" cy="50" r="34" fill="rgba(20,10,35,0.9)" stroke="#d4af37" stroke-width="0.5"/>`;
    svg += crearAnilloTexto(alfabeto, 30, '#d4af37', true, 4);
    svg += `</g>`;

    // 3. Rueda Interior (Síntesis Maestro)
    svg += `<g>`;
    svg += `<animateTransform attributeName="transform" type="rotate" from="0 50 50" to="${rotInt} 50 50" dur="2.5s" fill="freeze" calcMode="spline" keySplines="0.25 0.1 0.25 1" keyTimes="0;1" />`;
    svg += `<circle cx="50" cy="50" r="23" fill="rgba(10,5,20,1)" stroke="#ffd700" stroke-width="1"/>`;
    svg += crearAnilloTexto(numeros, 18, '#ffd700', true, 3.5);
    svg += `</g>`;

    // Clavo Central
    svg += `<circle cx="50" cy="50" r="4" fill="#ffd700"/>`;
    svg += `<circle cx="50" cy="50" r="1.5" fill="#000"/>`;
    svg += `</svg>`;
    
    contenedor.innerHTML = svg;
}
