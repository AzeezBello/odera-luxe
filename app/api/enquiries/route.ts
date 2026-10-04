import { NextResponse } from 'next/server';
import { createEnquiry } from '@/lib/enquiries';
import { randomUUID } from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const items = Array.isArray(body.items) ? body.items.slice(0, 30) : [];
    if (!items.length) return NextResponse.json({error:'At least one product is required'}, {status:400});
    const id = String(body.id || `OD-${randomUUID().slice(0,8).toUpperCase()}`);
    createEnquiry({id, customerName:String(body.customerName||'').slice(0,120), customerPhone:String(body.customerPhone||'').slice(0,40), note:String(body.note||'').slice(0,2000), items, totals: body.totals && typeof body.totals === 'object' ? body.totals : {}});
    return NextResponse.json({ok:true,id});
  } catch { return NextResponse.json({error:'Could not save enquiry'}, {status:500}); }
}
