import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createAdminSession } from '@/lib/auth';
export async function POST(request: Request){const body=await request.json();const email=String(body.email||'').trim().toLowerCase();const password=String(body.password||'');const adminEmail=(process.env.ADMIN_EMAIL||'admin@odera.luxe').toLowerCase();const configured=process.env.ADMIN_PASSWORD||'change-this-password';const passwordOk=configured.startsWith('$2')?await bcrypt.compare(password,configured):password===configured;if(email!==adminEmail||!passwordOk)return NextResponse.json({error:'Invalid credentials'},{status:401});await createAdminSession();return NextResponse.json({ok:true});}
