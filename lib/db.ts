import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const dbPath = process.env.DB_PATH || './data/odera.sqlite';
const absolute = path.isAbsolute(dbPath) ? dbPath : path.join(process.cwd(), dbPath);
fs.mkdirSync(path.dirname(absolute), { recursive: true });

const globalForDb = globalThis as unknown as { odEraDb?: Database.Database };
export const db = globalForDb.odEraDb || new Database(absolute);
if (process.env.NODE_ENV !== 'production') globalForDb.odEraDb = db;

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL DEFAULT 'Collection',
  description TEXT NOT NULL DEFAULT '',
  price INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'NGN',
  image TEXT NOT NULL DEFAULT '/images/WhatsApp%20Image%202026-10-03%20at%2011.46.20.jpeg',
  badge TEXT DEFAULT '',
  available INTEGER NOT NULL DEFAULT 1,
  featured INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS enquiries (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL DEFAULT '',
  customer_phone TEXT NOT NULL DEFAULT '',
  note TEXT NOT NULL DEFAULT '',
  items_json TEXT NOT NULL DEFAULT '[]',
  total_json TEXT NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new','contacted','fitting','confirmed','completed','cancelled')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_available_featured ON products(available, featured);
CREATE INDEX IF NOT EXISTS idx_products_sort_order ON products(sort_order);
CREATE INDEX IF NOT EXISTS idx_enquiries_status_created_at ON enquiries(status, created_at DESC);
`);

export type Product = {
  id: number; name: string; slug: string; category: string; description: string;
  price: number; currency: string; image: string; badge: string; available: number;
  featured: number; sort_order: number; created_at: string; updated_at: string;
};

export type Enquiry = {
  id: string; customer_name: string; customer_phone: string; note: string;
  items_json: string; total_json: string;
  status: 'new' | 'contacted' | 'fitting' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string; updated_at: string;
};
