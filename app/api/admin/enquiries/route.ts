import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { getEnquiries } from '@/lib/enquiries';
export async function GET(){if(!(await isAdmin()))return NextResponse.json({error:'Unauthorized'},{status:401});return NextResponse.json(getEnquiries());}
