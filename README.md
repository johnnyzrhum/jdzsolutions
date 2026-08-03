# JDZ Solutions landing page

This folder contains a complete responsive one-page website for GitHub Pages.

## Files

- `index.html` — page structure and copy
- `styles.css` — responsive layout and visual design
- `script.js` — mobile navigation, reveal animations and current year
- `CNAME` — custom domain for GitHub Pages
- `assets/jdz-solutions-logo.png` — supplied JDZ Solutions logo
- `assets/tron-globe.svg` — original Tron-inspired globe illustration
- `assets/circuit-bg.svg` — circuit background graphic
- `assets/favicon.svg` — browser icon

## Publish with GitHub Pages

1. Create a public GitHub repository, such as `jdzsolutions`.
2. Upload all files and folders from this package to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose `main` and `/ (root)`, then save.
6. GitHub will publish the site.

## Connect `jdzsolutions.co`

The included `CNAME` file contains:

`jdzsolutions.co`

At Porkbun, add the DNS records GitHub currently instructs you to use for an apex domain, then add `www` as a CNAME to your GitHub Pages hostname if desired. GitHub's required DNS values can change, so use the current values displayed in your repository's Pages settings.

## Contact form

The form is prepared for Formspree but the action currently contains:

`https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID`

Create a free Formspree form, copy its endpoint, and replace that placeholder in `index.html`. Until then, the email link `hello@jdzsolutions.co` works normally.

## Edit text

All visible text is in `index.html`. The colors are defined near the top of `styles.css` under `:root`.
