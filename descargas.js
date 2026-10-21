// Datos de cada ISO. Los SHA256 se copiaron de los archivos de sumas oficiales de cada distribución
// (SHA256SUMS / sha256sum.txt / CHECKSUM). Windows no publica SHA256 en su página de descarga.
const SISTEMAS = {
  Windows: [
    {
      slug: "windows-11", nombre: "Windows 11", version: "Latest",
      url: "https://www.microsoft.com/software-download/windows11",
      archivo: null, sha256: null,
      nota: "Microsoft no publica el SHA256 de este ISO. Descárgalo desde su página oficial.",
    },
    {
      slug: "windows-10", nombre: "Windows 10", version: "22H2",
      url: "https://www.microsoft.com/software-download/windows10",
      archivo: null, sha256: null,
      nota: "Microsoft no publica el SHA256 de este ISO. Descárgalo desde su página oficial.",
    },
  ],
  Linux: [
    {
      slug: "ubuntu", nombre: "Ubuntu", version: "26.04.1 LTS",
      url: "https://ubuntu.com/download/desktop",
      archivo: "ubuntu-26.04.1-desktop-amd64.iso",
      sha256: "601e30fbf5d97759367c632e2c33630665039b7e2158fd068403da3ccf1bda1f",
      fuente: "https://releases.ubuntu.com/26.04.1/SHA256SUMS",
    },
    {
      slug: "debian", nombre: "Debian", version: "13.7.0",
      url: "https://www.debian.org/CD/",
      archivo: "debian-13.7.0-amd64-netinst.iso",
      sha256: "a7ef94ac2fb9a7fec454552abd629b7cc9d5155c886165a45649f5ce6167e355",
      fuente: "https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/SHA256SUMS",
    },
    {
      slug: "fedora", nombre: "Fedora Workstation", version: "44",
      url: "https://fedoraproject.org/workstation/download/",
      archivo: "Fedora-Workstation-Live-44-1.7.x86_64.iso",
      sha256: "1620295f6a00c27c3208f0c00b8ece4eab1ec69b9002152d97488bf26a426ddf",
      fuente: "https://dl.fedoraproject.org/pub/fedora/linux/releases/44/Workstation/x86_64/iso/Fedora-Workstation-44-1.7-x86_64-CHECKSUM",
    },
    {
      slug: "linux-mint", nombre: "Linux Mint Cinnamon", version: "22.3",
      url: "https://linuxmint.com/download.php",
      archivo: "linuxmint-22.3-cinnamon-64bit.iso",
      sha256: "a081ab202cfda17f6924128dbd2de8b63518ac0531bcfe3f1a1b88097c459bd4",
      fuente: "https://mirrors.kernel.org/linuxmint/stable/22.3/sha256sum.txt",
    },
    {
      slug: "arch", nombre: "Arch Linux", version: "2026.10.01",
      url: "https://archlinux.org/download/",
      archivo: "archlinux-2026.10.01-x86_64.iso",
      sha256: "684ded26c63240ff4a41e8c25ee84ea6da233f557364821f13d12c2b0a9059a5",
      fuente: "https://geo.mirror.pkgbuild.com/iso/latest/sha256sums.txt",
    },
    {
      slug: "kali", nombre: "Kali Linux", version: "2026.3 (installer)",
      url: "https://www.kali.org/get-kali/",
      archivo: "kali-linux-2026.3-installer-amd64.iso",
      sha256: "db9cbed33edb45727d16911813c2434fcd1419585007884153be22a03b30ec2f",
      fuente: "https://cdimage.kali.org/current/SHA256SUMS",
    },
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
    $("#titulo-sistema").textContent = `${sistema.nombre} ${sistema.version}`;
    $("#texto-sistema").textContent = sistema.nota || "Descarga la ISO oficial desde el sitio del fabricante.";
    $("#enlace-oficial").href = sistema.url;
    $("#archivo").textContent = sistema.archivo || "—";
    $("#sha256").textContent = sistema.sha256 || "No publicado por el fabricante";
    $("#fuente-sha").hidden = !sistema.fuente;
    if (sistema.fuente) $("#fuente-sha").href = sistema.fuente;
    document.title = `${sistema.nombre} · Downloads · Fer`;
  } else {
    document.title = "Downloads · Fer";
  }
}

$("#anio").textContent = new Date().getFullYear();
addEventListener("popstate", pintar);
pintar();
