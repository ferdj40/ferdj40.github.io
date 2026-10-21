// Enlaces oficiales de cada sistema. Los ISOs se descargan del fabricante, no de esta web.
const SISTEMAS = {
  Windows: [
    { slug: "windows-11", nombre: "Windows 11", url: "https://www.microsoft.com/software-download/windows11" },
    { slug: "windows-10", nombre: "Windows 10", url: "https://www.microsoft.com/software-download/windows10" },
  ],
  Linux: [
    { slug: "ubuntu", nombre: "Ubuntu", url: "https://ubuntu.com/download/desktop" },
    { slug: "debian", nombre: "Debian", url: "https://www.debian.org/CD/" },
    { slug: "fedora", nombre: "Fedora", url: "https://fedoraproject.org/workstation/download/" },
    { slug: "linux-mint", nombre: "Linux Mint", url: "https://linuxmint.com/download.php" },
    { slug: "arch", nombre: "Arch Linux", url: "https://archlinux.org/download/" },
    { slug: "kali", nombre: "Kali Linux", url: "https://www.kali.org/get-kali/" },
  ],
};

const $ = (s) => document.querySelector(s);
const boton = (texto, onclick) => {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = texto;
  b.onclick = onclick;
  return b;
};

// Estado en la URL (?f=Linux&s=ubuntu) para que cada sistema tenga su propia dirección y el botón atrás funcione.
function irA(familia, sistema) {
  const url = new URL(location.href);
  url.search = "";
  if (familia) url.searchParams.set("f", familia);
  if (sistema) url.searchParams.set("s", sistema);
  history.pushState({}, "", url);
  pintar();
}

function pintar() {
  const p = new URLSearchParams(location.search);
  const familia = p.get("f");
  const sistema = familia && SISTEMAS[familia] ? SISTEMAS[familia].find((s) => s.slug === p.get("s")) : null;

  $("#familias").replaceChildren(...Object.keys(SISTEMAS).map((f) => boton(f, () => irA(f, null))));

  $("#paso-sistema").hidden = !(familia && SISTEMAS[familia]);
  if (familia && SISTEMAS[familia]) {
    $("#sistemas").replaceChildren(...SISTEMAS[familia].map((s) => boton(s.nombre, () => irA(familia, s.slug))));
  }

  const detalle = $("#detalle-descarga");
  detalle.hidden = !sistema;
  $("#elegir").hidden = !!sistema;
  if (sistema) {
    $("#titulo-sistema").textContent = `${sistema.nombre} (${familia})`;
    $("#texto-sistema").textContent = "Descarga la ISO oficial desde el sitio del fabricante.";
    $("#enlace-oficial").href = sistema.url;
    document.title = `${sistema.nombre} · Downloads · Fer`;
  } else {
    document.title = "Downloads · Fer";
  }
}

$("#anio").textContent = new Date().getFullYear();
addEventListener("popstate", pintar);
pintar();
