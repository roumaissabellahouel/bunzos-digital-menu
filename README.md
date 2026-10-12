# 🍔 Bunzo's — Menu digital

Menu digital pour **Bunzo's**, restaurant de street burgers à Oran.
Les clients scannent un QR code sur la table, parcourent le menu et commandent directement sur WhatsApp.

🔗 **Démo : [bunzos-digital-menu.vercel.app](https://bunzos-digital-menu.vercel.app)**

## ✨ Fonctionnalités

- Menu par catégories, prix en DA, pensé pour mobile
- Commande envoyée directement sur WhatsApp
- Générateur de QR code intégré (`/qr`) pour imprimer les supports de table
- Contenu modifiable par une personne non-développeuse : tout est dans `data/menu.js`, et le thème dans `data/theme.js`
- Vignette de remplacement automatique quand une photo produit manque

## 🛠️ Stack

HTML · CSS · JavaScript vanilla, sans build ni dépendance · Vercel

## 🚀 Lancer en local

```bash
python3 -m http.server 8000   # puis ouvrir http://localhost:8000
```
