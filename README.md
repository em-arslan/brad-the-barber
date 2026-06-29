# BRAD.THE.BARBER — Premium Website

A luxury, conversion-focused barber website for **BRAD.THE.BARBER** in Burnley, Lancashire.

Built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

---

## Project Overview

This website includes:

- **Home page** — Hero slider, about, services preview, booking flow, gallery, reviews, location, and contact
- **Services page** — Full service menu with search and category filters
- **Contact page** — Contact form, map, opening hours, and social links
- **Member login** — Mock authentication with appointment dashboard
- **Booking system** — Step-by-step flow with localStorage (ready for backend integration)
- **SEO** — Metadata, JSON-LD schema, sitemap, and robots.txt

---

## Run Locally

```bash
cd BRAD_THE_BARBER_PREMIUM_WEBSITE
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## Replace Logo & Images

Place your assets in the `public/assets/` folder:

### Logo
```
public/assets/logo/logo.png
```
Recommended: PNG with transparent background, ~400×120px. Used in header and footer.

### Hero Images
```
public/assets/images/hero-1.jpg
public/assets/images/hero-2.jpg
public/assets/images/hero-3.jpg
```
Recommended: 1920×1080 or larger, landscape orientation.

### Gallery Images
```
public/assets/images/gallery-1.jpg
public/assets/images/gallery-2.jpg
public/assets/images/gallery-3.jpg
public/assets/images/gallery-4.jpg
public/assets/images/gallery-5.jpg
public/assets/images/gallery-6.jpg
```
Recommended: Portrait or square, minimum 800×1000px.

### Open Graph Image
```
public/assets/images/og-image.jpg
```
Recommended: 1200×630px for social sharing previews.

> If images are missing, the site shows elegant placeholder states until you add your files. No code changes needed — just drop files in with the names above.

---

## Connect Real Booking Backend

The booking system currently uses **localStorage**. Integration points are marked with `TODO` comments in:

| File | Purpose |
|------|---------|
| `src/lib/booking.ts` | Create, cancel, and find appointments |
| `src/lib/auth.ts` | User login, register, Google OAuth |
| `src/components/sections/Contact.tsx` | Contact form submission |

### Supabase Example

```typescript
// src/lib/booking.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function createBooking(data) {
  const { data: booking, error } = await supabase.from('bookings').insert(data).select().single()
  if (error) throw error
  return booking
}
```

### Firebase Example

```typescript
import { collection, addDoc } from 'firebase/firestore'
await addDoc(collection(db, 'bookings'), bookingData)
```

### Email Confirmations

Connect [Resend](https://resend.com) or SendGrid to send booking confirmation and cancellation emails.

---

## Connect Authentication

Replace mock auth in `src/lib/auth.ts` with:

- **Supabase Auth** — `signInWithPassword`, `signInWithOAuth({ provider: 'google' })`
- **Firebase Auth** — `signInWithEmailAndPassword`, `signInWithPopup`
- **NextAuth.js** — Google provider + credentials

---

## Deploy on Vercel

1. Push the project to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel auto-detects Next.js — no extra config needed
4. Set environment variables if using Supabase/Firebase:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Update `SITE_URL` in `src/lib/data.ts` to your production domain
6. Deploy

### Custom Domain

Add your domain in Vercel project settings → Domains, then update DNS records as instructed.

---

## Tech Stack

- **Next.js 15** — App Router
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — Scroll and UI animations
- **Google Fonts** — Playfair Display + Inter

---

## SEO Features

- Page metadata and Open Graph tags
- JSON-LD: LocalBusiness, BarberShop, Service, FAQ, Breadcrumb, WebSite
- Auto-generated `sitemap.xml` and `robots.txt`
- Semantic HTML with proper heading hierarchy
- Image alt text and lazy loading

---

## Contact Details (Site Content)

- **Address:** 16 Hargreaves St, Burnley, BB11 1DZ
- **Phone:** 07874 071809
- **Facebook:** brad.the.barber
- **Instagram / TikTok:** brad_the_barber1

---

Built by **WebCrux**
