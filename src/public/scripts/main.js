import { createElementFromHTML } from "/scripts/utils.js";
import { nav_init } from "/scripts/components/nav.js";

/**
 * Loads and injects /components/head.html into <head>,
 * applying stylesheets and running scripts from that file.
 */
async function loadHeadComponents() {
  try {
    const response = await fetch("/components/head.html");
    if (!response.ok) throw new Error(`Failed to load head.html (${response.status})`);

    const html = await response.text();
    const container = createElementFromHTML(`<div>${html}</div>`);

    // Insert link and meta elements first
    container.querySelectorAll("link, meta, title, style").forEach((el) => {
      document.head.appendChild(el);
    });

    // Handle any script tags — load & execute them properly
    const scripts = container.querySelectorAll("script");
    for (const oldScript of scripts) {
      const newScript = document.createElement("script");

      // Copy attributes (src, type, etc.)
      for (const { name, value } of oldScript.attributes) {
        newScript.setAttribute(name, value);
      }

      // Inline script content (if any)
      if (oldScript.textContent) {
        newScript.textContent = oldScript.textContent;
      }

      // Append to head so it executes
      document.head.appendChild(newScript);
    }

    console.log("✅ head.html loaded successfully");
  } catch (err) {
    console.error("Error loading head.html:", err);
  }
}

// Run after DOM is ready
document.addEventListener("DOMContentLoaded", loadHeadComponents);

// nav & footer

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // --- Load and insert head ---
    const headResponse = await fetch('/components/head.html');
    if (headResponse.ok) {
      const headHTML = await headResponse.text();
      const headElement = createElementFromHTML(headHTML);
      document.querySelector('header')?.appendChild(headElement);
    }

    const pageWrapper = document.querySelector('.page-wrapper');
    const mainElement = pageWrapper?.querySelector('main');

    if (!pageWrapper || !mainElement) {
      console.warn('Missing .page-wrapper or <main> element.');
      return;
    }

    // --- Load and insert nav before main ---
    const navResponse = await fetch('/components/nav.html');
    if (navResponse.ok) {
      const navHTML = await navResponse.text();
      const navElement = createElementFromHTML(navHTML);
      pageWrapper.insertBefore(navElement, mainElement);
      nav_init();
    } else {
      console.error('Failed to fetch nav.html:', navResponse.status);
    }

    // --- Load and insert footer after main ---
    const footerResponse = await fetch('/components/footer.html');
    if (footerResponse.ok) {
      const footerHTML = await footerResponse.text();
      const footerElement = createElementFromHTML(footerHTML);
      pageWrapper.insertBefore(footerElement, mainElement.nextSibling);
    } else {
      console.error('Failed to fetch footer.html:', footerResponse.status);
    }

  } catch (error) {
    console.error('Error loading components:', error);
  }
});