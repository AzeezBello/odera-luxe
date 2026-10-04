import { sql, type Product } from './db';
export async function getProducts(featuredOnly=false):Promise<Product[]> { const rows=featuredOnly ? await sql`SELECT * FROM products WHERE available=1 AND featured=1 ORDER BY sort_order ASC,id DESC` : await sql`SELECT * FROM products ORDER BY sort_order ASC,id DESC`; return rows as Product[]; }
export async function getAvailableProducts():Promise<Product[]> { return await sql`SELECT * FROM products WHERE available=1 ORDER BY sort_order ASC,id DESC` as Product[]; }
export async function getProductBySlug(slug:string):Promise<Product|undefined> { const rows=await sql`SELECT * FROM products WHERE slug=${slug} LIMIT 1`; return rows[0] as Product|undefined; }
export async function getProductsByCategory(category:string):Promise<Product[]> { return await sql`SELECT * FROM products WHERE available=1 AND lower(category)=lower(${category}) ORDER BY sort_order ASC,id DESC` as Product[]; }
export function slugify(value:string){return value.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');}
