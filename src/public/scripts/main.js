import { createElementFromHTML } from "/js/utils.js";

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
