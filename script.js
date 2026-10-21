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

const root = document.documentElement;
const saved = localStorage.getItem("tema");
if (saved) root.dataset.theme = saved;
$("#theme-btn").onclick = () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("tema", next);
};
