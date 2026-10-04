import { db, type Enquiry } from './db';

export type EnquiryItem = { id: number; name: string; category: string; price: number; currency: string; slug?: string };

export function createEnquiry(input: { id: string; customerName?: string; customerPhone?: string; note?: string; items: EnquiryItem[]; totals: Record<string, number> }) {
  db.prepare(`INSERT INTO enquiries (id, customer_name, customer_phone, note, items_json, total_json) VALUES (?, ?, ?, ?, ?, ?)`)
    .run(input.id, input.customerName || '', input.customerPhone || '', input.note || '', JSON.stringify(input.items), JSON.stringify(input.totals));
}
export function getEnquiries(): Enquiry[] {
  return db.prepare('SELECT * FROM enquiries ORDER BY created_at DESC').all() as Enquiry[];
}
export function updateEnquiryStatus(id: string, status: Enquiry['status']) {
  db.prepare('UPDATE enquiries SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(status, id);
}
