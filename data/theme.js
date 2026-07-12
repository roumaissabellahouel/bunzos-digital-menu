/**
 * data/theme.js — Design system de Bunzo's
 * ==========================================
 * TOUTES les décisions visuelles (couleurs, fonts, rayons, ombres, espacements)
 * vivent ici. Le CSS (css/styles.css) ne fait QUE consommer ces valeurs via
 * `var(--nom-de-la-variable)` — aucune couleur ni font ne doit être écrite
 * en dur ailleurs dans le projet.
 *
 * Pour dupliquer ce template pour un autre restaurant : ne modifier QUE ce
 * fichier (+ éventuellement quelques détails structurels dans le CSS/HTML).
 *
 * Direction artistique Bunzo's (validée) : street-food premium, rouge signature
 * extrait du packaging de marque, crème chaude, noir profond en contraste,
 * lilas poudré comme accent surprise. Typographie bold condensée (Anton) +
 * corps lisible (Poppins). Détail signature : liseré damier rouge/crème.
 */

export const theme = {
  // ---------------------------------------------------------------------
  // Couleurs — extraites des visuels de marque (brand/)
  // ---------------------------------------------------------------------
  colors: {
    // Couleur de marque — constante sur les 3 traitements de logo Bunzo's
    red: "#E51A1F",
    redDark: "#B7130F", // hover / pressed
    redSoft: "#F6D4CF", // fond très clair teinté rouge (ex: focus ring)

    // Fond principal (mode clair) — crème chaude du packaging, pas blanc pur
    cream: "#FBF4E4",
    creamAlt: "#F3E9D6", // panneaux secondaires (nav, footer)

    // Contraste dramatique — header, footer, bouton WhatsApp flottant
    black: "#171210",
    blackSoft: "#241C17",

    // Accent signature — inattendu pour un burger, différencie Bunzo's
    lilac: "#DDACCE",
    lilacInk: "#3A1F30", // texte lisible sur fond lilas

    // Texte
    ink: "#211812", // texte principal sur fond clair (jamais #000)
    inkSoft: "rgba(33, 24, 18, 0.62)", // texte secondaire / descriptions
    creamText: "#FBF4E4", // texte sur fond rouge / noir

    // Utilitaires
    white: "#FFFFFF",
    line: "rgba(33, 24, 18, 0.14)", // bordures discrètes sur fond clair
    lineOnDark: "rgba(251, 244, 228, 0.16)",
  },

  // ---------------------------------------------------------------------
  // Typographie — 2 fonts Google Fonts, hébergées en local (assets/fonts)
  // ---------------------------------------------------------------------
  fonts: {
    // Titres, logo, prix : capitales condensées très grasses (écho des 3
    // logos Bunzo's, tous en display bold, jamais fin)
    display: "'Anton', 'Arial Narrow', sans-serif",
    // Corps de texte, navigation, boutons : lisible, léger, rapide en 3G
    body: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  // ---------------------------------------------------------------------
  // Rayons — un seul système, appliqué partout (verrou de cohérence)
  // ---------------------------------------------------------------------
  radius: {
    sm: "8px", // chips, petits éléments
    md: "16px", // cartes produits
    lg: "24px", // grands panneaux (ex: bas du header)
    pill: "999px", // pills de navigation, boutons
    circle: "50%", // badge prix (tampon), bouton WhatsApp flottant
  },

  // ---------------------------------------------------------------------
  // Ombres — toujours teintées vers l'encre, jamais noir pur
  // ---------------------------------------------------------------------
  shadow: {
    card: "0 2px 0 rgba(23, 18, 16, 0.15)", // ombre plate "sticker"
    stamp: "0 3px 0 rgba(23, 18, 16, 0.18)",
    fab: "0 6px 18px rgba(23, 18, 16, 0.3)",
    nav: "0 2px 10px rgba(23, 18, 16, 0.08)",
  },

  // ---------------------------------------------------------------------
  // Espacements — échelle unique en rem
  // ---------------------------------------------------------------------
  space: {
    1: "0.25rem", // 4px
    2: "0.5rem", // 8px
    3: "0.75rem", // 12px
    4: "1rem", // 16px
    5: "1.5rem", // 24px
    6: "2rem", // 32px
    7: "3rem", // 48px
  },

  // ---------------------------------------------------------------------
  // Échelle de z-index — jamais de valeur arbitraire (999, 9999...)
  // ---------------------------------------------------------------------
  z: {
    stickyNav: 20,
    fab: 30,
  },

  // ---------------------------------------------------------------------
  // Motif signature — liseré damier rouge/crème (issu du sol de diner
  // vu dans les visuels de marque). Utilisé comme séparateur entre
  // sections de catégories.
  // ---------------------------------------------------------------------
  pattern: {
    checkerSize: "16px",
  },
};

/**
 * Applique le design system comme variables CSS sur :root.
 * Appelée une seule fois au chargement (voir js/app.js).
 */
export function applyTheme(t = theme) {
  const root = document.documentElement.style;

  for (const [key, value] of Object.entries(t.colors)) {
    root.setProperty(`--color-${kebab(key)}`, value);
  }
  for (const [key, value] of Object.entries(t.fonts)) {
    root.setProperty(`--font-${kebab(key)}`, value);
  }
  for (const [key, value] of Object.entries(t.radius)) {
    root.setProperty(`--radius-${kebab(key)}`, value);
  }
  for (const [key, value] of Object.entries(t.shadow)) {
    root.setProperty(`--shadow-${kebab(key)}`, value);
  }
  for (const [key, value] of Object.entries(t.space)) {
    root.setProperty(`--space-${key}`, value);
  }
  for (const [key, value] of Object.entries(t.z)) {
    root.setProperty(`--z-${kebab(key)}`, String(value));
  }
  root.setProperty("--pattern-checker-size", t.pattern.checkerSize);
}

function kebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
