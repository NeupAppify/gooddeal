# Implementation Plan: Good Deal - Real Estate Advisory Platform

A premium, high-trust Real Estate Advisory Platform focused on clarity, structure, and professional verification.

## 1. Design System & Foundation

### 🎨 Color System (Russian Purple Theme)
- **Primary**: Russian Purple (`#32174D`) - CTAs, Headings accents, Icons.
- **Secondary**: Charcoal Black (`#1C1C1E`) - Body text, Footers.
- **Background**: Soft Platinum (`#F5F4F7`) - Page canvas.
- **Accent**: Deep Sage Green (`#2F6F5E`) - Trust/Verification badges.
- **Neutral**: Warm Gray (`#8E8E93`) - Secondary text.

### ✍️ Typography (Single Family)
- **Primary**: Outfit (Headings & Body) - Geometric, circular, professional, and friendly.
- **Rules**: Max-width 680px for text blocks, generous line-height.

### 📐 Layout & Components
- **Canvas**: Max-width 1440px, strong vertical rhythm, generous whitespace.
- **Buttons**:
  - Primary: Russian Purple background, 6-8px radius, generous padding.
  - Secondary: Russian Purple border, transparent background.
- **Cards**: Document-style, white background, soft shadow, no loud borders.
- **Motion**: Subtle fade-ins and 8-12px slide-ups. No flashy loaders.

---

## 2. Core Structure & Navigation

- [ ] **Global Header**: Logo, Services, Properties, How It Works, Insights, About, Contact + "Get Consultation" CTA.
- [ ] **Global Footer**: Charcoal background, service links, trust statements, legal/compliance links.

---

## 3. Development Phases

### Phase 1: Brand & Theme Setup
- [x] Implement `globals.css` with tailwind variables for the color system.
- [x] Configure Google Fonts (Outfit).
- [x] Build global layout components (Header, Footer).

### Phase 2: Landing Page (The Entrypoint)
- [x] **Hero**: "Real Estate, Handled With Clarity and Care" with search and action cards.
- [x] **Trust Indicators**: Numbers and locations.
- [x] **Service Cards**: Buying, Selling, Verification, Legal.
- [x] **Featured Properties**: Verified listings with trust badges.

### Phase 3: Core Pages & Services
- [x] **About Pages**: Team, Careers, Founder sections implemented.
- [x] **Legal Pages**: Privacy, Terms, Documents.
- [x] **Blog/Insights**: Listing and slug pages with custom typography.
- [x] **Properties**: Listing page with "Contact Agent" integration.
- [x] **Consultation**: Booking form and FAQs.
- [ ] **Service Detail Pages**: Specific content for Buying, Selling, etc.

### Phase 4: Properties & Verification
- [ ] **Listing System**: Filtering by location/price with verification status.
- [ ] **Verification framework**: Checklist and risk assessment educational content.

### Phase 5: Insights & Case Studies
- [ ] **Knowledge Hub**: Category-based guides (Legal, Market, NRN).
- [ ] **Case Studies**: Outcome-focused stories showing the firm's impact.

### Phase 6: Contact & Conversion
- [ ] **Structured Forms**: Minimum fields, clear labels, privacy reassurance.
- [ ] **Consultation Booking**: Direct flow for advisory inquiries.

---

## 4. Technical Requirements
- Next.js (App Router) + TypeScript.
- Tailwind CSS 4.
- Form handling with validation and clear error states.
- High-quality, natural-light photography (No stock-smiling).
- SEO optimization for property and legal keywords.
