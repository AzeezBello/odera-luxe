import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { isAdmin } from '@/lib/auth';
import { slugify } from '@/lib/products';

export async function PUT(request: Request, {params}:{params:Promise<{id:string}>}) {
  if (!(await isAdmin())) return NextResponse.json({error:'Unauthorized'}, {status:401});
  const {id}=await params; const b=await request.json();
  const name=String(b.name||'').trim();
  db.prepare(`UPDATE products SET name=?,slug=?,category=?,description=?,price=?,currency=?,image=?,badge=?,available=?,featured=?,sort_order=?,updated_at=CURRENT_TIMESTAMP WHERE id=?`).run(
    name, slugify(String(b.slug||name)), String(b.category||'Collection'), String(b.description||''), Number(b.price||0), String(b.currency||'NGN'), String(b.image||'/images/look1.jpg'), String(b.badge||''), b.available?1:0, b.featured?1:0, Number(b.sort_order||0), Number(id)
  );
  return NextResponse.json({ok:true});
}

export async function DELETE(_request: Request, {params}:{params:Promise<{id:string}>}) {
  if (!(await isAdmin())) return NextResponse.json({error:'Unauthorized'}, {status:401});
  const {id}=await params; db.prepare('DELETE FROM products WHERE id=?').run(Number(id));
  return NextResponse.json({ok:true});
}
