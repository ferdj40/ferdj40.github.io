const $ = (s) => document.querySelector(s);
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

$("#lista-proyectos").innerHTML = PROYECTOS.map((p, i) => `
  <button class="card" data-i="${i}" aria-haspopup="dialog">
    ${p.imagen ? `<img src="${esc(p.imagen)}" alt="" loading="lazy">` : ""}
    <h3>${esc(p.titulo)}</h3>
    <p>${esc(p.texto)}</p>
    <span class="more">View details →</span>
  </button>`).join("");

const dlg = $("#detalle");
function openProject(i) {
  const p = PROYECTOS[i];
  $("#detalle-body").innerHTML = `
    <h2>${esc(p.titulo)}</h2>
    <p class="estado">${esc(p.estado || "")}</p>
    ${p.imagen ? `<img src="${esc(p.imagen)}" alt="${esc(p.titulo)} screenshot">` : ""}
    <p>${esc(p.detalle || p.texto)}</p>
    ${p.funciones ? `<h3>What it does</h3><ul>${p.funciones.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
    ${p.stack ? `<h3>Built with</h3><p>${esc(p.stack)}</p>` : ""}
    ${p.enlace ? `<p><a class="btn" href="${esc(p.enlace)}" target="_blank" rel="noopener">Open project</a></p>` : ""}`;
  dlg.showModal();
}
$("#lista-proyectos").onclick = (e) => { const c = e.target.closest(".card"); if (c) openProject(+c.dataset.i); };
$("#cerrar").onclick = () => dlg.close();
dlg.onclick = (e) => { if (e.target === dlg) dlg.close(); };

$("#lista-actividades").innerHTML = [...ACTIVIDADES]
  .sort((a, b) => b.fecha.localeCompare(a.fecha))
  .map((a) => `<li><time>${esc(a.fecha)}</time>${esc(a.texto)}</li>`).join("");

$("#anio").textContent = new Date().getFullYear();

const menu = $("#menu"), btn = $("#menu-btn");
btn.onclick = () => btn.setAttribute("aria-expanded", menu.classList.toggle("open"));
menu.onclick = (e) => { if (e.target.tagName === "A") menu.classList.remove("open"); };

// Enlaces oficiales de cada sistema (no son de terceros ni se descargan desde aquí).
const DESCARGAS = {
  Windows: [
    { nombre: "Windows 11", url: "https://www.microsoft.com/software-download/windows11" },
    { nombre: "Windows 10", url: "https://www.microsoft.com/software-download/windows10" },
  ],
  Linux: [
    { nombre: "Ubuntu", url: "https://ubuntu.com/download/desktop" },
    { nombre: "Debian", url: "https://www.debian.org/CD/" },
    { nombre: "Fedora", url: "https://fedoraproject.org/workstation/download/" },
    { nombre: "Linux Mint", url: "https://linuxmint.com/download.php" },
    { nombre: "Arch Linux", url: "https://archlinux.org/download/" },
    { nombre: "Kali Linux", url: "https://www.kali.org/get-kali/" },
  ],
};

const boton = (texto, onclick) => {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = texto;
  b.onclick = onclick;
  return b;
};
const pasoSistema = $("#paso-sistema"), pasoDescarga = $("#paso-descarga");
function mostrarSistemas(familia) {
  const cont = $("#sistemas");
  cont.replaceChildren(...DESCARGAS[familia].map((s) => boton(s.nombre, () => mostrarDescarga(familia, s))));
  pasoSistema.hidden = false;
  pasoDescarga.hidden = true;
}
function mostrarDescarga(familia, s) {
  $("#descarga-texto").textContent = `${s.nombre} (${familia}): ISO oficial del fabricante.`;
  $("#descarga-enlace").href = s.url;
  pasoDescarga.hidden = false;
}
$("#familias").replaceChildren(...Object.keys(DESCARGAS).map((f) => boton(f, () => mostrarSistemas(f))));
$("#descarga-volver").onclick = () => { pasoDescarga.hidden = true; pasoSistema.hidden = true; };

const root = document.documentElement;
const saved = localStorage.getItem("tema");
if (saved) root.dataset.theme = saved;
$("#theme-btn").onclick = () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("tema", next);
};
