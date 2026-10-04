import { NextResponse } from 'next/server';
import { getAvailableProducts } from '@/lib/products';
export async function GET(){return NextResponse.json(getAvailableProducts());}
