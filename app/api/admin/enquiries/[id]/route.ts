import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { updateEnquiryStatus } from '@/lib/enquiries';
import type { Enquiry } from '@/lib/db';

const statuses: Enquiry['status'][] = ['new','contacted','fitting','confirmed','completed','cancelled'];
export async function PUT(request:Request,{params}:{params:Promise<{id:string}>}) {
  if (!(await isAdmin())) return NextResponse.json({error:'Unauthorized'},{status:401});
  const {id}=await params; const {status}=await request.json();
  if (!statuses.includes(status)) return NextResponse.json({error:'Invalid status'},{status:400});
  updateEnquiryStatus(id,status); return NextResponse.json({ok:true});
}
