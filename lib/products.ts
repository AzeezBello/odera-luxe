import { db, type Product } from './db';

export function getProducts(featuredOnly = false): Product[] {
  const sql = featuredOnly
    ? 'SELECT * FROM products WHERE available = 1 AND featured = 1 ORDER BY sort_order ASC, id DESC'
    : 'SELECT * FROM products ORDER BY sort_order ASC, id DESC';
  return db.prepare(sql).all() as Product[];
}

export function getAvailableProducts(): Product[] {
  return db.prepare('SELECT * FROM products WHERE available = 1 ORDER BY sort_order ASC, id DESC').all() as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
  return db.prepare('SELECT * FROM products WHERE slug = ?').get(slug) as Product | undefined;
}

export function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
