# Peptide Site

Next.js (App Router) + Tailwind + shadcn/ui + Supabase.

## Setup

```
npm install
cp .env.local.example .env.local   # fill in Supabase URL/anon key/service role key
npm run dev                        # http://localhost:3000
```

## Status

Scaffold only — no visual design, content, or product/e-commerce features
decided yet. Supabase project not yet created (pending customer account
access). Built for a customer; Supabase, GitHub, and hosting all belong
under the customer's own accounts, not the developer's.

`reference/erppeptide/` holds a crawl of the client's current live site
(erppeptide.shop) — product data, images, and page content pulled for
reference while rebuilding. Not part of the app; gitignored.
