# Strict Project Rules

This project adheres to the following non-negotiable guidelines:

## 1. Next.js 15 Optimization & Best Practices
- **App Router First**: All pages must use the `app/` directory.
- **Server Components**: Prefer Server Components by default. Use `"use client"` only for interactive UI parts.
- **Image Optimization**: Strictly use `next/image` for all images. Add `priority` for above-the-fold images to improve LCP.
- **Font Optimization**: Use `next/font` for loading Google Fonts (e.g., Inter, Roboto).
- **Data Fetching**: Use `fetch` with appropriate caching (`cache: 'force-cache'`, `revalidate: 3600`, or `no-store`) for dynamic data.
- **Metadata**: Leverage the Metadata API for dynamic SEO tags.

## 2. Strong SEO Compliance
- **Semantic Structure**: Maintain a logical HTML structure (`<h1>` -> `<h2>` -> `<h3>`). Only one `<h1>` per page.
- **Meta Tags**: Every page must have a unique `title` and `description`.
- **Open Graph**: Implement OG tags for social sharing (title, description, image).
- **Canonical URLs**: Ensure canonical tags are present to avoid duplicate content issues.
- **Structured Data**: Implement JSON-LD schema markup for rich snippets (Review, Article, Product, etc.).
- **Sitemap & Robots**: Maintain `sitemap.xml` and `robots.txt`.

## 3. Semantic HTML & Accessibility
- **Semantic Tags**: Use `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>` appropriately. Do not use `<div>` for everything.
- **Headings**: Use headings to create a clear outline of the page content.
- **Lists**: Use `<ul>`, `<ol>`, and `<dl>` for lists.
- **Forms**: Use `<label>` associated with inputs, and `<fieldset>`/`<legend>` for grouping.
- **Buttons vs Links**: Use `<button>` for actions and `<a>` (or `Link`) for navigation.
- **Accessibility Attributes**: Use `aria-` attributes only when necessary (e.g., for custom widgets). Prefer native elements first.
