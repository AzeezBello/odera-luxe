import { isAdmin } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getProducts } from '@/lib/products';
import { getEnquiries } from '@/lib/enquiries';
import { AdminDashboard } from './ui';
export const dynamic = 'force-dynamic';
export default async function AdminPage(){if(!(await isAdmin()))redirect('/admin/login');return <AdminDashboard initialProducts={getProducts()} initialEnquiries={getEnquiries()}/>;}
