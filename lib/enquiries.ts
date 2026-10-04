import { sql, type Enquiry } from './db';
export type EnquiryItem={id:number;name:string;category:string;price:number;currency:string;slug?:string};
export async function createEnquiry(input:{id:string;customerName?:string;customerPhone?:string;note?:string;items:EnquiryItem[];totals:Record<string,number>}){await sql`INSERT INTO enquiries(id,customer_name,customer_phone,note,items_json,total_json) VALUES(${input.id},${input.customerName||''},${input.customerPhone||''},${input.note||''},${JSON.stringify(input.items)},${JSON.stringify(input.totals)})`;}
export async function getEnquiries():Promise<Enquiry[]>{return await sql`SELECT * FROM enquiries ORDER BY created_at DESC` as Enquiry[];}
export async function updateEnquiryStatus(id:string,status:Enquiry['status']){await sql`UPDATE enquiries SET status=${status},updated_at=CURRENT_TIMESTAMP WHERE id=${id}`;}
