# ODERA Luxe

Premium urban-African bespoke tailoring website with a WhatsApp-first store and SQLite product admin.

## Features

- Editorial luxury homepage inspired by the approved ODERA direction
- WhatsApp Concierge floating widget
- WhatsApp-first product store: no conventional checkout; every product can be ordered via WhatsApp
- SQLite database using `better-sqlite3`
- Protected admin dashboard at `/admin`
- Create, edit, delete products
- Update price, currency, category, description, image path, badge, availability and featured status
- Responsive mobile layout
- Local temporary imagery in `public/images/` ready to be replaced by your ODERA images

## Run locally

```bash
npm install
cp .env.example .env.local
npm run db:seed
npm run dev
```

Open `http://localhost:3000` and `http://localhost:3000/admin`.

Default development credentials from `.env.example`:

- Email: `admin@odera.luxe`
- Password: `change-this-password`

**Change the password and SESSION_SECRET before any real deployment.**

## WhatsApp

Set the number in `.env.local` as digits only with country code:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=000000000000
```

The site generates product-specific WhatsApp messages containing the product name, price, category and an availability/size request.

## Images

Replace these temporary files with your real brand photography while keeping the same filenames, or update the image path from the admin dashboard:

`hero.jpg`, `signature.jpg`, `men.jpg`, `women.jpg`, `bespoke.jpg`, `look1.jpg`–`look4.jpg`, `journal1.jpg`–`journal3.jpg`.

## SQLite production note

This implementation intentionally uses SQLite as requested. A local or persistent-server deployment is ideal. Standard serverless Vercel functions do **not** provide a persistent writable filesystem, so do not treat a local `.sqlite` file as production persistence on Vercel. If ODERA will be deployed on Vercel, the same data layer can later be moved to Turso/libSQL or another persistent SQL provider without changing the storefront UX.

`public/images/design-reference.png` is the temporary visual reference used to build this first version. It can be removed when your real ODERA assets are uploaded.
# odera-luxe
