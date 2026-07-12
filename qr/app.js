/**
 * qr/app.js — Générateur de QR Code Bunzo's
 * ============================================
 * Utilise le générateur QR vendu en local (../js/vendor/qrcode.js, expose
 * un global `qrcode`) pour dessiner le code sur <canvas>, à n'importe
 * quelle résolution — nécessaire pour l'export PNG haute résolution.
 *
 * Aucune dépendance réseau : tout tourne hors-ligne, y compris l'export.
 */

import { theme, applyTheme } from "../data/theme.js";
import { restaurant } from "../data/menu.js";

applyTheme(theme);

// ---------------------------------------------------------------------
// Contenu statique (nom du resto) — vient de data/menu.js, pas en dur
// ---------------------------------------------------------------------
document.getElementById("qr-header-logo").textContent = restaurant.name;
document.getElementById("a6-frame-name").textContent = restaurant.name;

// ---------------------------------------------------------------------
// Dessin du QR code sur un canvas, à une résolution donnée
// ---------------------------------------------------------------------
const QUIET_ZONE_MODULES = 4; // marge de sécurité standard autour du QR

/**
 * @param {HTMLCanvasElement} canvas
 * @param {string} text
 * @param {number} pixelSize - largeur/hauteur finale du canvas, en pixels
 */
function drawQR(canvas, text, pixelSize) {
  const qr = qrcode(0, "H"); // typeNumber 0 = auto, "H" = correction max (impression)
  qr.addData(text);
  qr.make();

  const moduleCount = qr.getModuleCount();
  const cellSize = pixelSize / (moduleCount + QUIET_ZONE_MODULES * 2);

  canvas.width = pixelSize;
  canvas.height = pixelSize;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, pixelSize, pixelSize);

  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--color-ink").trim() || "#211812";

  for (let row = 0; row < moduleCount; row += 1) {
    for (let col = 0; col < moduleCount; col += 1) {
      if (!qr.isDark(row, col)) continue;
      const x = (col + QUIET_ZONE_MODULES) * cellSize;
      const y = (row + QUIET_ZONE_MODULES) * cellSize;
      // +0.5px de recouvrement pour éviter les liserés blancs entre modules
      // dus aux arrondis de sous-pixel.
      ctx.fillRect(Math.floor(x), Math.floor(y), Math.ceil(cellSize) + 1, Math.ceil(cellSize) + 1);
    }
  }
}

// ---------------------------------------------------------------------
// État : URL cible, avec persistance locale pour le confort d'usage
// ---------------------------------------------------------------------
const urlInput = document.getElementById("menu-url");
const previewUrl = document.getElementById("qr-preview-url");
const previewCanvas = document.getElementById("qr-canvas");
const a6Canvas = document.getElementById("qr-canvas-print");
const downloadBtn = document.getElementById("download-png");
const copyBtn = document.getElementById("copy-url");
const printBtn = document.getElementById("print-a6");

const STORAGE_KEY = "bunzos-qr-menu-url";

function getCurrentUrl() {
  return urlInput.value.trim();
}

function refresh() {
  const url = getCurrentUrl();
  const isValid = url.length > 0 && urlInput.checkValidity();

  downloadBtn.disabled = !isValid;
  copyBtn.disabled = !isValid;
  printBtn.disabled = !isValid;

  if (!isValid) {
    previewUrl.textContent = "Entre une URL valide pour générer le QR code.";
    return;
  }

  previewUrl.textContent = url;
  drawQR(previewCanvas, url, 560);
  drawQR(a6Canvas, url, 400);

  try {
    localStorage.setItem(STORAGE_KEY, url);
  } catch (err) {
    // localStorage indisponible (navigation privée...) — pas bloquant
  }
}

let debounceTimer;
urlInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(refresh, 250);
});

// Valeur de départ : URL déjà stockée localement, sinon celle de menu.js
let initialUrl = restaurant.menuUrl || "";
try {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) initialUrl = stored;
} catch (err) {
  // ignore
}
urlInput.value = initialUrl;
refresh();

// ---------------------------------------------------------------------
// Téléchargement PNG haute résolution
// ---------------------------------------------------------------------
downloadBtn.addEventListener("click", () => {
  const url = getCurrentUrl();
  if (!url) return;

  const exportCanvas = document.createElement("canvas");
  drawQR(exportCanvas, url, 2000);

  exportCanvas.toBlob((blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${slugify(restaurant.name)}-qr-code.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  }, "image/png");
});

function slugify(str) {
  return str
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // retire les accents (é -> e, etc.)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ---------------------------------------------------------------------
// Copier le lien
// ---------------------------------------------------------------------
copyBtn.addEventListener("click", async () => {
  const url = getCurrentUrl();
  if (!url) return;
  try {
    await navigator.clipboard.writeText(url);
    const original = copyBtn.textContent;
    copyBtn.textContent = "Copié !";
    setTimeout(() => {
      copyBtn.textContent = original;
    }, 1500);
  } catch (err) {
    previewUrl.textContent = url; // au moins visible pour copier à la main
  }
});

// ---------------------------------------------------------------------
// Impression du cadre A6 — construit une version isolée dans
// .a6-print-only (seul élément visible pendant l'impression, cf. qr.css)
// ---------------------------------------------------------------------
const printContainer = document.getElementById("a6-print-only");

printBtn.addEventListener("click", () => {
  const url = getCurrentUrl();
  if (!url) return;

  printContainer.innerHTML = `
    <div class="a6-frame__checker a6-frame__checker--top"></div>
    <div class="a6-frame__body">
      <p class="a6-frame__cta">Scannez pour<br />voir le menu 🍔</p>
      <div class="a6-frame__qr">
        <canvas id="qr-canvas-a6-final" width="600" height="600"></canvas>
      </div>
      <p class="a6-frame__name">${restaurant.name}</p>
    </div>
    <div class="a6-frame__checker a6-frame__checker--bottom"></div>
  `;

  drawQR(document.getElementById("qr-canvas-a6-final"), url, 600);

  requestAnimationFrame(() => window.print());
});
