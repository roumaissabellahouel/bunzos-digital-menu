/**
 * data/menu.js — Contenu du menu Bunzo's
 * ========================================
 * Ce fichier est fait pour être modifié par une personne NON développeuse.
 *
 * -> Pour changer un prix : cherche le produit par son "name" et change
 *    la valeur "price" (nombre entier, en dinars, sans le "DA").
 *
 * -> Pour ajouter un produit : copie un objet existant dans le tableau
 *    "products", change les valeurs, donne-lui un "id" unique (en minuscules,
 *    avec des tirets, sans accents ni espaces — ex: "le-super-burger").
 *
 * -> "category" doit correspondre à l'un des "id" listés dans "categories"
 *    ci-dessous (ex: "signature", "sides"...).
 *
 * -> "badges" est une liste optionnelle parmi : "best-seller", "nouveau", "epice".
 *
 * -> "image" est le nom du fichier photo attendu dans assets/img/ (format
 *    webp, ratio 4:3, largeur max 800px). Tant que la photo n'existe pas,
 *    une vignette de remplacement s'affiche automatiquement.
 */

// ---------------------------------------------------------------------------
// Informations du restaurant
// ---------------------------------------------------------------------------
export const restaurant = {
  name: "Bunzo's",
  tagline: "Street burgers, sauce maison",
  heroImage: "assets/img/hero.webp",
  heroAlt: "Burger Bunzo's fraîchement emballé, posé sur son papier à damier.",
  hours: "11h - 23h, 7j/7",
  address: "12 Rue Larbi Ben M'hidi, Oran",
  mapsUrl: "https://maps.google.com/?q=Oran+Algerie",
  phoneDisplay: "+213 555 00 00 00",
  phoneHref: "+213555000000",
  instagramUrl: "https://instagram.com/bunzos.dz",

  // URL du menu déployé (utilisée par qr/index.html pour générer le QR code).
  // À remplacer par l'URL réelle une fois le site publié sur Netlify/Vercel
  // (ex: "https://bunzos.netlify.app"). La page /qr permet aussi de la
  // modifier ponctuellement sans toucher au code, pour tester avant le
  // déploiement final.
  menuUrl: "https://bunzos.netlify.app",

  // Numéro WhatsApp au format international, sans le "+" (format wa.me)
  // Donnée factice pour la démo — à remplacer par le vrai numéro du client.
  whatsappNumber: "213555000000",

  // Messages pré-remplis WhatsApp (contenu éditorial, pas du code)
  whatsappMessage: {
    generic: "Salam ! Je veux commander chez Bunzo's : ",
    product: (name, price) => `Salam ! Je veux commander : ${name} (${price} DA)`,
  },
};

// ---------------------------------------------------------------------------
// Catégories — l'ordre ici définit l'ordre d'affichage sur le site
// ---------------------------------------------------------------------------
export const categories = [
  { id: "signature", name: "Signature", short: "Signature" },
  { id: "classiques", name: "Burgers Classiques", short: "Classiques" },
  { id: "menus", name: "Menus & Formules", short: "Menus" },
  { id: "sides", name: "Sides", short: "Sides" },
  { id: "boissons", name: "Boissons", short: "Boissons" },
  { id: "desserts", name: "Desserts", short: "Desserts" },
];

// ---------------------------------------------------------------------------
// Produits
// ---------------------------------------------------------------------------
export const products = [
  // --- Signature (produits stars, mis en avant en premier) -----------------
  {
    id: "bunzos-classic",
    category: "signature",
    name: "Le Bunzo's Classic",
    description: "Steak haché, cheddar fondu, sauce maison, salade croquante.",
    price: 550,
    image: "bunzos-classic.webp",
    badges: ["best-seller"],
  },
  {
    id: "double-trouble",
    category: "signature",
    name: "Le Double Trouble",
    description: "Double steak, double cheddar, oignons caramélisés, sauce burger.",
    price: 850,
    image: "double-trouble.webp",
    badges: [],
  },
  {
    id: "spicy-bunzos",
    category: "signature",
    name: "Le Spicy Bunzo's",
    description: "Steak, sauce algérienne piquante, jalapeños, cheddar.",
    price: 650,
    image: "spicy-bunzos.webp",
    badges: ["epice"],
  },
  {
    id: "chicken-crunch",
    category: "signature",
    name: "Le Chicken Crunch",
    description: "Poulet pané croustillant, coleslaw maison, sauce blanche.",
    price: 600,
    image: "chicken-crunch.webp",
    badges: ["nouveau"],
  },

  // --- Burgers Classiques ----------------------------------------------------
  {
    id: "cheeseburger",
    category: "classiques",
    name: "Le Cheeseburger",
    description: "Steak haché, cheddar, cornichons, ketchup maison.",
    price: 450,
    image: "cheeseburger.webp",
    badges: [],
  },
  {
    id: "ranch-chicken",
    category: "classiques",
    name: "Le Ranch Chicken",
    description: "Poulet grillé, sauce ranch, tomate, salade.",
    price: 500,
    image: "ranch-chicken.webp",
    badges: [],
  },
  {
    id: "fish-crisp",
    category: "classiques",
    name: "Le Fish Crisp",
    description: "Filet de poisson pané, sauce tartare, salade.",
    price: 500,
    image: "fish-crisp.webp",
    badges: [],
  },

  // --- Menus & Formules (burger + frites + boisson) ---------------------------
  {
    id: "menu-classic",
    category: "menus",
    name: "Menu Classic",
    description: "Bunzo's Classic, frites maison et boisson au choix.",
    price: 800,
    image: "menu-classic.webp",
    badges: ["best-seller"],
  },
  {
    id: "menu-double-trouble",
    category: "menus",
    name: "Menu Double Trouble",
    description: "Double Trouble, frites maison et boisson au choix.",
    price: 1050,
    image: "menu-double-trouble.webp",
    badges: [],
  },
  {
    id: "menu-spicy",
    category: "menus",
    name: "Menu Spicy",
    description: "Spicy Bunzo's, frites maison et boisson au choix.",
    price: 900,
    image: "menu-spicy.webp",
    badges: ["epice"],
  },

  // --- Sides -------------------------------------------------------------
  {
    id: "frites-maison",
    category: "sides",
    name: "Frites Maison",
    description: "Frites fraîches coupées minute, sel fin.",
    price: 200,
    image: "frites-maison.webp",
    badges: [],
  },
  {
    id: "cheese-fries",
    category: "sides",
    name: "Cheese Fries",
    description: "Frites nappées de sauce cheddar fondu.",
    price: 350,
    image: "cheese-fries.webp",
    badges: ["best-seller"],
  },
  {
    id: "chicken-tenders",
    category: "sides",
    name: "Chicken Tenders",
    description: "5 filets de poulet pané, sauce au choix.",
    price: 450,
    image: "chicken-tenders.webp",
    badges: [],
  },
  {
    id: "nuggets",
    category: "sides",
    name: "Nuggets",
    description: "6 nuggets de poulet croustillants, sauce au choix.",
    price: 400,
    image: "nuggets.webp",
    badges: [],
  },

  // --- Boissons ------------------------------------------------------------
  {
    id: "coca-cola",
    category: "boissons",
    name: "Coca-Cola 33cl",
    description: "Canette fraîche.",
    price: 150,
    image: "coca-cola.webp",
    badges: [],
  },
  {
    id: "fanta",
    category: "boissons",
    name: "Fanta 33cl",
    description: "Canette fraîche.",
    price: 150,
    image: "fanta.webp",
    badges: [],
  },
  {
    id: "jus-orange",
    category: "boissons",
    name: "Jus d'Orange Pressé",
    description: "100% naturel, pressé minute.",
    price: 250,
    image: "jus-orange.webp",
    badges: ["nouveau"],
  },
  {
    id: "eau-minerale",
    category: "boissons",
    name: "Eau Minérale 50cl",
    description: "Bouteille fraîche.",
    price: 100,
    image: "eau-minerale.webp",
    badges: [],
  },

  // --- Desserts ------------------------------------------------------------
  {
    id: "milkshake-vanille",
    category: "desserts",
    name: "Milkshake Vanille",
    description: "Onctueux, glace vanille, chantilly.",
    price: 400,
    image: "milkshake-vanille.webp",
    badges: [],
  },
  {
    id: "milkshake-chocolat",
    category: "desserts",
    name: "Milkshake Chocolat",
    description: "Onctueux, glace chocolat, chantilly.",
    price: 400,
    image: "milkshake-chocolat.webp",
    badges: ["best-seller"],
  },
  {
    id: "milkshake-fraise",
    category: "desserts",
    name: "Milkshake Fraise",
    description: "Onctueux, glace fraise, chantilly.",
    price: 400,
    image: "milkshake-fraise.webp",
    badges: [],
  },
  {
    id: "cookie-maison",
    category: "desserts",
    name: "Cookie Maison",
    description: "Pépites de chocolat, moelleux au centre.",
    price: 200,
    image: "cookie-maison.webp",
    badges: [],
  },
  {
    id: "tiramisu-maison",
    category: "desserts",
    name: "Tiramisu Maison",
    description: "Recette classique, cacao, mascarpone.",
    price: 350,
    image: "tiramisu-maison.webp",
    badges: ["nouveau"],
  },
];
