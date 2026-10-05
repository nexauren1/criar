# ForgeKit Customization Guide

## 1. Brand

Replace ForgeKit branding in the HTML files. Update page titles, meta descriptions and any sample copy you plan to keep.

## 2. Colors

The first block of `assets/css/style.css` contains the design tokens for backgrounds, surfaces, text, accents, spacing and shadows. Change these variables to create a new visual identity quickly.

## 3. Content

Replace the sample hero copy, feature text, testimonials, pricing values and calls to action with your own content.

The included pricing and testimonial sections are examples, not real commercial claims.

## 4. Demo logic

The Demo Lab uses a small local calculation in `assets/js/main.js`. Replace the sample calculation with your own browser-side logic, API call or application state as needed.

## 5. Contact form

The Contact page validates fields and displays processing/success states locally. Connect the form to your backend, serverless function or form provider for real submissions.

## 6. Links

Replace sample destinations with your app, documentation, checkout, social profiles or real contact destinations. The template does not bundle a payment processor.

## 7. Theme

The theme toggle is handled by `assets/js/main.js` and saved locally in the browser under the key `forgekit-theme`.

## 8. Publishing

This is a static site. It can be hosted on GitHub Pages, Netlify, Vercel, Cloudflare Pages or regular web hosting without a build step.

## Launch checklist

Replace sample content, test mobile navigation, keyboard focus, all links, form behavior and the final deployed URL.