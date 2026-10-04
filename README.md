# ODERA Luxe

Premium urban-African bespoke tailoring website with a WhatsApp-first store and SQLite studio admin.

## What is included

1. Real ODERA photography wired into hero, collections, lookbook, journal and product seed data.
2. WhatsApp-first shopping bag with one consolidated enquiry message.
3. SQLite product catalog with indexed products and enquiry/order pipeline.
4. Protected `/admin` studio for product CRUD, pricing, descriptions, availability, featured placement and image selection.
5. `/collections/men` and `/collections/women` collection pages.
6. `/look/[slug]` individual look/product pages.
7. WhatsApp enquiry references such as `OD-AB12CD34` saved before WhatsApp opens.
8. Admin enquiry tracking: new → contacted → fitting → confirmed → completed/cancelled.
9. SQLite WAL/SHM artifacts ignored by Git and seed data synchronized with current ODERA imagery.
10. Next.js production build configuration and current App Router dynamic route patterns.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run db:seed
npm run dev
```

Open `http://localhost:3000` and `http://localhost:3000/admin`.

Change `ADMIN_PASSWORD` and `SESSION_SECRET` before real deployment.

## WhatsApp

Set `NEXT_PUBLIC_WHATSAPP_NUMBER` to digits only with the Nigerian country code, for example:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=2348061542075
```

The store creates an enquiry record first, then opens WhatsApp with the reference, selected pieces, prices, customer details and requested next steps.

## Images

The current ODERA repository contains the uploaded files under `public/images/` using the WhatsApp-export filenames. The code references the files directly with URL-encoded spaces, so no image renaming is required.

The admin image picker exposes the current ODERA image set for product assignment.

## SQLite deployment note

SQLite is intentionally used for a simple studio/admin workflow. A writable local/server filesystem is required for persistence. Standard Vercel serverless functions do not provide persistent writable SQLite storage. If this site is deployed on Vercel, move the same schema/data layer to Turso/libSQL or another persistent SQL provider.
