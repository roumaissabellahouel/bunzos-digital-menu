/**
 * js/app.js — Rendu du menu Bunzo's
 * ====================================
 * Aucune donnée en dur ici : tout vient de data/menu.js (contenu) et
 * data/theme.js (design). Ce fichier ne fait que lire ces données et
 * construire le DOM + les liens WhatsApp.
 */

import { theme, applyTheme } from "../data/theme.js";
import { restaurant, categories, products } from "../data/menu.js";

// 1. Applique le design system comme variables CSS avant tout rendu.
applyTheme(theme);

// Icône WhatsApp réutilisée pour le bouton flottant et les boutons produit.
const WHATSAPP_ICON = `
  <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M16.01 3C9.38 3 4 8.38 4 15.01c0 2.35.65 4.55 1.79 6.44L4 29l7.73-1.75a11.9 11.9 0 0 0 4.28.79h.01c6.63 0 12-5.38 12-12.01C28.02 8.38 22.64 3 16.01 3Zm0 21.8h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-4.59 1.04 1.06-4.47-.24-.37a9.8 9.8 0 0 1-1.52-5.4c0-5.45 4.44-9.89 9.91-9.89 2.65 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.9 7c0 5.45-4.45 9.78-10.1 9.78Zm5.44-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.04-.17-.3-.02-.46.13-.6.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.87 1.21 3.07c.15.2 2.09 3.2 5.07 4.48.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z"/>
  </svg>`;

// Un emoji "photo" par catégorie, en attendant les vraies photos produit
// (voir assets/img/ — dès qu'un fichier <id>.webp existe, il remplace ce
// placeholder automatiquement, cf. buildProductPhoto()).
const CATEGORY_GLYPH = {
  signature: "🍔",
  classiques: "🍔",
  menus: "🍔",
  sides: "🍟",
  boissons: "🥤",
  desserts: "🍰",
};

// Teinte de fond du placeholder photo, construite UNIQUEMENT à partir des
// couleurs déjà définies dans data/theme.js (pas de nouvelle couleur).
const CATEGORY_PHOTO_BG = {
  signature: "var(--color-red)",
  classiques: "var(--color-red)",
  menus: "var(--color-red)",
  sides: "var(--color-black)",
  boissons: "var(--color-lilac)",
  desserts: "var(--color-lilac)",
};

const BADGE_LABEL = {
  "best-seller": "Best-seller",
  nouveau: "Nouveau",
  epice: "Épicé 🌶️",
};

function waLink(message) {
  return `https://wa.me/${restaurant.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// ---------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------
function renderHeader() {
  const header = document.getElementById("site-header");
  const hero = restaurant.heroImage
    ? `
    <div class="site-header__hero">
      <img
        src="${restaurant.heroImage}"
        alt="${restaurant.heroAlt || ""}"
        width="736"
        height="920"
        fetchpriority="high"
        decoding="async"
      />
    </div>`
    : "";

  header.innerHTML = `
    <div class="site-header__inner">
      <p class="site-header__logo">${restaurant.name}</p>
      <p class="site-header__tagline">${restaurant.tagline}</p>
      <span class="site-header__hours">
        <span class="dot" aria-hidden="true"></span>
        ${restaurant.hours}
      </span>
    </div>
    ${hero}
  `;
}

// ---------------------------------------------------------------------
// Navigation catégories
// ---------------------------------------------------------------------
function renderNav() {
  const nav = document.getElementById("category-nav");
  const list = document.createElement("div");
  list.className = "category-nav__list";
  list.setAttribute("role", "list");

  categories.forEach((cat, index) => {
    const link = document.createElement("a");
    link.href = `#cat-${cat.id}`;
    link.className = "category-pill";
    link.textContent = cat.short;
    link.dataset.categoryId = cat.id;
    link.setAttribute("aria-current", index === 0 ? "true" : "false");
    list.appendChild(link);
  });

  nav.appendChild(list);
}

// ---------------------------------------------------------------------
// Carte produit
// ---------------------------------------------------------------------
function buildProductPhoto(product) {
  const bg = CATEGORY_PHOTO_BG[product.category] || "var(--color-red)";
  const glyph = CATEGORY_GLYPH[product.category] || "🍔";
  // Une vraie photo (assets/img/<id>.webp) remplace ce placeholder dès
  // qu'elle existe : on tente de la charger, et on garde le placeholder
  // visible en dessous si elle est absente (404 silencieux).
  // Le tampon prix est imbriqué DANS la photo pour rester accroché à son
  // coin, quelle que soit la largeur de la carte.
  return `
    <div class="product-photo" style="--photo-bg:${bg}">
      <span class="product-photo__glyph" aria-hidden="true">${glyph}</span>
      <img
        src="assets/img/${product.image}"
        alt=""
        loading="lazy"
        decoding="async"
        onerror="this.remove()"
      />
      <span class="product-stamp">${product.price}<br />DA</span>
    </div>
  `;
}

function buildBadges(badges) {
  if (!badges || badges.length === 0) return "";
  return badges
    .map(
      (b) =>
        `<span class="product-badge product-badge--${b}">${BADGE_LABEL[b] || b}</span>`
    )
    .join("");
}

function renderProductCard(product) {
  const card = document.createElement("li");
  card.className = "product-card";

  const message = restaurant.whatsappMessage.product(product.name, product.price);

  card.innerHTML = `
    ${buildProductPhoto(product)}
    <div class="product-body">
      <div class="product-name-row">
        <span class="product-name">${product.name}</span>
        ${buildBadges(product.badges)}
      </div>
      <p class="product-desc">${product.description}</p>
      <div class="product-footer">
        <span class="product-price">${product.price} DA</span>
        <a class="product-order-btn" href="${waLink(message)}" target="_blank" rel="noopener">
          ${WHATSAPP_ICON}
          Commander
        </a>
      </div>
    </div>
  `;

  return card;
}

// ---------------------------------------------------------------------
// Sections de catégories
// ---------------------------------------------------------------------
function renderMenu() {
  const main = document.getElementById("menu");

  categories.forEach((cat) => {
    const section = document.createElement("section");
    section.id = `cat-${cat.id}`;
    section.className = "menu-section";

    const title = document.createElement("h2");
    title.className = "menu-section__title";
    title.textContent = cat.name;
    section.appendChild(title);

    const list = document.createElement("ul");
    list.className = "menu-section__list";

    products
      .filter((p) => p.category === cat.id)
      .forEach((p) => list.appendChild(renderProductCard(p)));

    section.appendChild(list);
    main.appendChild(section);
  });
}

// ---------------------------------------------------------------------
// Bouton WhatsApp flottant
// ---------------------------------------------------------------------
function renderWhatsappFab() {
  const fab = document.getElementById("whatsapp-fab");
  fab.href = waLink(restaurant.whatsappMessage.generic);
}

// ---------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------
function renderFooter() {
  const footer = document.getElementById("site-footer");
  footer.innerHTML = `
    <div class="site-footer__inner">
      <p class="site-footer__name">${restaurant.name}</p>
      <p class="site-footer__address">${restaurant.address}</p>
      <div class="site-footer__links">
        <a class="site-footer__link" href="${restaurant.mapsUrl}" target="_blank" rel="noopener">
          Voir sur Maps
        </a>
        <a class="site-footer__link" href="tel:${restaurant.phoneHref}">
          ${restaurant.phoneDisplay}
        </a>
        <a class="site-footer__link" href="${restaurant.instagramUrl}" target="_blank" rel="noopener">
          Instagram
        </a>
      </div>
      <p class="site-footer__credit">Menu digital Bunzo's</p>
    </div>
  `;
}

// ---------------------------------------------------------------------
// Nav active au scroll (IntersectionObserver, pas de scroll listener)
// ---------------------------------------------------------------------
function observeSections() {
  const pills = document.querySelectorAll(".category-pill");
  const pillById = new Map(
    Array.from(pills).map((pill) => [pill.dataset.categoryId, pill])
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const catId = entry.target.id.replace("cat-", "");
        pills.forEach((pill) => pill.setAttribute("aria-current", "false"));
        const activePill = pillById.get(catId);
        if (activePill) {
          activePill.setAttribute("aria-current", "true");
          activePill.scrollIntoView({ block: "nearest", inline: "center" });
        }
      });
    },
    { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
  );

  document.querySelectorAll(".menu-section").forEach((section) => {
    observer.observe(section);
  });
}

// ---------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------
renderHeader();
renderNav();
renderMenu();
renderWhatsappFab();
renderFooter();
observeSections();
