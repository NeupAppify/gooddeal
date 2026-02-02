I recommend **Outfit** as the best fit for your request.

**Why Outfit?**
*   **Circular & Geometric**: It has the clean, circular structure you are looking for (similar to the premium "Circular Std" or "Gotham").
*   **Professional & Trustworthy**: It is modern and balanced, avoiding the overly playful feel of some rounded fonts.
*   **Friendly**: The open shapes make it approachable and easy to read.
*   **Distinct**: It stands out from the ubiquitous Montserrat and Poppins.

### Proposed Changes

1.  **Update `src/app/layout.tsx`**:
    *   Remove `Urbanist`.
    *   Import and configure **`Outfit`** from `next/font/google`.

2.  **Update `src/app/globals.css`**:
    *   Set the CSS variables `--font-sans` and `--font-serif` to use the new `Outfit` font variable.

3.  **Update `IMPLEMENTATION_PLAN.md`**:
    *   Document **Outfit** as the official font for the project.

Shall I proceed with switching the site to **Outfit**?