const $ = (s) => document.querySelector(s);
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

$("#lista-proyectos").innerHTML = PROYECTOS.map((p) => `
  <article class="card">
    ${p.imagen ? `<img src="${esc(p.imagen)}" alt="${esc(p.titulo)} screenshot" loading="lazy">` : ""}
    <h3>${esc(p.titulo)}</h3>
    <p>${esc(p.texto)}</p>
    ${p.enlace ? `<a href="${esc(p.enlace)}" target="_blank" rel="noopener">Learn more →</a>` : ""}
  </article>`).join("");

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
