import { db } from '../lib/db';
import { slugify } from '../lib/products';

const products = [
  ['The Lagos Double-Breasted', 'Men', 'A sculpted double-breasted jacket cut for a commanding silhouette.', 285000, '/images/men.jpg', 'Signature', 1],
  ['Odera Ivory Suit', 'Men', 'A refined ivory tailoring statement for ceremonies and elevated evenings.', 320000, '/images/look1.jpg', 'New', 1],
  ['Aso Modern Tuxedo', 'Men', 'Contemporary evening tailoring with subtle African character.', 295000, '/images/look3.jpg', '', 1],
  ['Sculpted Wine Dress', 'Women', 'A structured silhouette designed around movement and presence.', 240000, '/images/signature.jpg', 'Featured', 1],
  ['Odera Power Blazer', 'Women', 'A tailored blazer with a confident architectural shoulder.', 185000, '/images/women.jpg', '', 1],
  ['Midnight Bespoke Set', 'Women', 'A modern black ensemble designed for understated luxury.', 265000, '/images/look4.jpg', 'Signature', 1]
];

const insert = db.prepare(`INSERT OR IGNORE INTO products (name, slug, category, description, price, image, badge, featured, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
products.forEach((p, i) => insert.run(p[0], slugify(String(p[0])), p[1], p[2], p[3], p[4], p[5], p[6], i));
console.log('ODERA Luxe database seeded.');
