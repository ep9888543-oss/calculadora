const acciones = ["---", "--x", "-w-", "-wx", "r--", "r-x", "rw-", "rwx"];

function soloNumeros(e) {
    const char = String.fromCharCode(e.which);
    if (!/[0-7]/.test(char)) {
        return false;
    }
}

function reproducirSonido() {
    document.getElementById("sonido").play();
}

function llenarSelects() {
    for (let i = 0; i <= 7; i++) {
        const texto = `${i} - ${acciones[i]}`;
        usuario.innerHTML += `<option value="${i}">${texto}</option>`;
        grupo.innerHTML += `<option value="${i}">${texto}</option>`;
        otros.innerHTML += `<option value="${i}">${texto}</option>`;
    }
}

function colorearPermiso(texto) {
    return texto.split("").map(l => 
        l === "-" 
        ? `<span class="inactivo">-</span>` 
        : `<span class="activo">${l}</span>`
    ).join("");
}

function explicarCompleto(u, g, o) {
    const roles = ["Usuario", "Grupo", "Otros"];
    const valores = [u, g, o];

    let html = `<strong>🏴‍☠️ Permiso ${u}${g}${o}</strong><br><br>`;

    for (let i = 0; i < 3; i++) {
        let p = acciones[valores[i]];
        let desc = [];

        if (p.includes("r")) desc.push("leer");
        if (p.includes("w")) desc.push("modificar");
        if (p.includes("x")) desc.push("ejecutar");

        if (desc.length === 0) desc.push("sin permisos");

        html += `👉 <strong>${roles[i]}:</strong> ${desc.join(", ")}<br>`;
    }

    return html;
}

function actualizarVista(u, g, o) {
    resultado.innerHTML = `
        <p><strong>Permiso:</strong> ${u}${g}${o}</p>

        <div class="permiso-card">
            <span>Usuario</span>
            <span>${colorearPermiso(acciones[u])}</span>
        </div>

        <div class="permiso-card">
            <span>Grupo</span>
            <span>${colorearPermiso(acciones[g])}</span>
        </div>

        <div class="permiso-card">
            <span>Otros</span>
            <span>${colorearPermiso(acciones[o])}</span>
        </div>
    `;

    explicacionFinal.innerHTML = explicarCompleto(u, g, o);

    reproducirSonido(); // 🔊 sonido
}

function actualizarInput() {
    const u = usuario.value;
    const g = grupo.value;
    const o = otros.value;

    permisoInput.value = u + g + o;
    actualizarVista(u, g, o);
}

function actualizarDesdeInput() {
    let val = permisoInput.value;

    if (!/^\d*$/.test(val)) {
        permisoInput.value = val.replace(/[^0-7]/g, "");
        return;
    }

    if (val === "") return;
    if (parseInt(val) > 777) return;

    val = val.padStart(3, "0");

    usuario.value = val[0];
    grupo.value = val[1];
    otros.value = val[2];

    actualizarVista(val[0], val[1], val[2]);
}

window.onload = () => {
    llenarSelects();
    actualizarInput();
};