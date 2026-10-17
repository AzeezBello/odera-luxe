import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { ODERA_IMAGES } from './media';

const isServerless = Boolean(
  process.env.VERCEL ||
  process.env.AWS_LAMBDA_FUNCTION_NAME ||
  process.env.LAMBDA_TASK_ROOT ||
  (typeof process.cwd === 'function' && process.cwd().startsWith('/var/task'))
);

function resolveDbPath(): string {
  if (isServerless) {
    return '/tmp/odera.sqlite';
  }
  const configured = process.env.DB_PATH;
  if (configured) {
    return path.isAbsolute(configured) ? configured : path.join(/*turbopackIgnore: true*/ process.cwd(), configured);
  }
  return path.join(/*turbopackIgnore: true*/ process.cwd(), 'data', 'odera.sqlite');
}

const absolute = resolveDbPath();

// Attempt to copy bundled database to /tmp if running in serverless and target does not exist
if (isServerless && !fs.existsSync(/*turbopackIgnore: true*/ absolute)) {
  const candidateBundledPaths = [
    path.join(/*turbopackIgnore: true*/ process.cwd(), 'data', 'odera.sqlite'),
    path.join(/*turbopackIgnore: true*/ '/var/task', 'data', 'odera.sqlite'),
  ];
  for (const src of candidateBundledPaths) {
    try {
      if (fs.existsSync(/*turbopackIgnore: true*/ src)) {
        fs.copyFileSync(src, absolute);
        break;
      }
    } catch {}
  }
}

// Safely ensure the directory exists without throwing in read-only filesystems
try {
  const targetDir = path.dirname(absolute);
  if (!fs.existsSync(/*turbopackIgnore: true*/ targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
} catch (err) {
  console.warn('Notice: Could not create database directory:', err);
}

function getDatabaseInstance(): Database.Database {
  const globalForDb = globalThis as unknown as { odEraDb?: Database.Database };
  if (globalForDb.odEraDb) {
    return globalForDb.odEraDb;
  }

  const instance = new Database(absolute);
  if (process.env.NODE_ENV !== 'production') {
    globalForDb.odEraDb = instance;
  }

  try {
    instance.pragma('journal_mode = WAL');
  } catch {
    try {
      instance.pragma('journal_mode = DELETE');
    } catch {}
  }

  try {
    instance.pragma('foreign_keys = ON');
  } catch {}

  instance.exec(`
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

  // Auto-seed if database is empty
  try {
    const row = instance.prepare('SELECT count(*) as count FROM products').get() as { count: number } | undefined;
    if (!row || row.count === 0) {
      const defaultProducts = [
        ['The Lagos Double-Breasted', 'the-lagos-double-breasted', 'Men', 'A sculpted double-breasted jacket cut for a commanding silhouette.', 285000, ODERA_IMAGES[2], 'Signature', 1, 1, 0],
        ['Odera Ivory Suit', 'odera-ivory-suit', 'Men', 'A refined ivory tailoring statement for ceremonies and elevated evenings.', 320000, ODERA_IMAGES[5], 'New', 1, 1, 1],
        ['Aso Modern Tuxedo', 'aso-modern-tuxedo', 'Men', 'Contemporary evening tailoring with subtle African character.', 295000, ODERA_IMAGES[7], '', 1, 1, 2],
        ['Sculpted Wine Dress', 'sculpted-wine-dress', 'Women', 'A structured silhouette designed around movement and presence.', 240000, ODERA_IMAGES[1], 'Featured', 1, 1, 3],
        ['Odera Power Blazer', 'odera-power-blazer', 'Women', 'A tailored blazer with a confident architectural shoulder.', 185000, ODERA_IMAGES[3], '', 1, 1, 4],
        ['Midnight Bespoke Set', 'midnight-bespoke-set', 'Women', 'A modern black ensemble designed for understated luxury.', 265000, ODERA_IMAGES[8], 'Signature', 1, 1, 5]
      ] as const;

      const insertStmt = instance.prepare(
        `INSERT INTO products (name, slug, category, description, price, currency, image, badge, featured, available, sort_order)
         VALUES (?, ?, ?, ?, ?, 'NGN', ?, ?, ?, ?, ?)`
      );

      for (const p of defaultProducts) {
        insertStmt.run(p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7], p[8], p[9]);
      }
    }
  } catch (err) {
    console.warn('Notice: Error checking/auto-seeding default products:', err);
  }

  return instance;
}

export const db = getDatabaseInstance();

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
