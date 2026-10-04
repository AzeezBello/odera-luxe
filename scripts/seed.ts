import { db } from '../lib/db';
import { slugify } from '../lib/products';
import { ODERA_IMAGES } from '../lib/media';

const products = [
  ['The Lagos Double-Breasted','Men','A sculpted double-breasted jacket cut for a commanding silhouette.',285000,ODERA_IMAGES[2],'Signature',1],
  ['Odera Ivory Suit','Men','A refined ivory tailoring statement for ceremonies and elevated evenings.',320000,ODERA_IMAGES[5],'New',1],
  ['Aso Modern Tuxedo','Men','Contemporary evening tailoring with subtle African character.',295000,ODERA_IMAGES[7],'',1],
  ['Sculpted Wine Dress','Women','A structured silhouette designed around movement and presence.',240000,ODERA_IMAGES[1],'Featured',1],
  ['Odera Power Blazer','Women','A tailored blazer with a confident architectural shoulder.',185000,ODERA_IMAGES[3],'',1],
  ['Midnight Bespoke Set','Women','A modern black ensemble designed for understated luxury.',265000,ODERA_IMAGES[8],'Signature',1]
] as const;
const upsert=db.prepare(`INSERT INTO products (name,slug,category,description,price,currency,image,badge,featured,available,sort_order) VALUES (?,?,?,?,?,'NGN',?,?,?,1,?) ON CONFLICT(slug) DO UPDATE SET name=excluded.name,category=excluded.category,description=excluded.description,price=excluded.price,currency=excluded.currency,image=excluded.image,badge=excluded.badge,featured=excluded.featured,available=1,sort_order=excluded.sort_order,updated_at=CURRENT_TIMESTAMP`);
products.forEach((p,i)=>upsert.run(p[0],slugify(p[0]),p[1],p[2],p[3],p[4],p[5],p[6],i));
console.log(`Seeded ${products.length} ODERA products.`);
