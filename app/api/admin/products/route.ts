import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { isAdmin } from '@/lib/auth';
import { slugify } from '@/lib/products';

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({error:'Unauthorized'}, {status:401});
  const b = await request.json();
  const name = String(b.name || '').trim();
  if (!name) return NextResponse.json({error:'Product name is required'}, {status:400});
  const slug = slugify(String(b.slug || name));
  const result = db.prepare(`INSERT INTO products (name,slug,category,description,price,currency,image,badge,available,featured,sort_order) VALUES (?,?,?,?,?,?,?,?,?,?,?)`).run(
    name, slug, String(b.category||'Collection'), String(b.description||''), Number(b.price||0), String(b.currency||'NGN'), String(b.image||'/images/look1.jpg'), String(b.badge||''), b.available ? 1:0, b.featured ? 1:0, Number(b.sort_order||0)
  );
  return NextResponse.json({id:result.lastInsertRowid});
}
