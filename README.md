# Wildkin storefront template

A responsive Next.js storefront concept for collectible endangered-species plushies. It is ready to deploy on Vercel and intentionally uses image placeholders so real listing photography can be added later.

## Update the listings

Edit the `products` array near the top of `app/page.tsx`. Each entry controls the product name, species, region filter, price, conservation status, placeholder icon, colors, fact, and optional badge.

## Replace placeholders

Add product images to `public/products/`, add an `image` field to each product, and replace the `.animal` placeholder in the product card with Next.js `Image`. The hero placeholder is the `.hero-template` block in `app/page.tsx`.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

1. Push the `wildkin` folder to a Git repository.
2. Import the repository in Vercel.
3. If this folder remains in a larger repository, set the Vercel Root Directory to `wildkin`.
4. Keep the detected framework as Next.js and deploy.

The cart, filters, favorites, mobile navigation, and newsletter success state are front-end demo interactions. Connect them to your preferred commerce and email providers when the real catalog is ready.
