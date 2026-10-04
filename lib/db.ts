import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not configured');
export const sql = neon(process.env.DATABASE_URL);

export type Product = { id:number; name:string; slug:string; category:string; description:string; price:number; currency:string; image:string; badge:string; available:number; featured:number; sort_order:number; created_at:string; updated_at:string };
export type Enquiry = { id:string; customer_name:string; customer_phone:string; note:string; items_json:string; total_json:string; status:'new'|'contacted'|'fitting'|'confirmed'|'completed'|'cancelled'; created_at:string; updated_at:string };
