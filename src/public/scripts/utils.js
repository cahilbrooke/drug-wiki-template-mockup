/**
 * Creates a DOM element from an HTML string.
 * 
 * @param {string} htmlString - The HTML markup to convert into a DOM element.
 * @returns {HTMLElement} The resulting DOM element.
 * 
 * @example
 * const el = createElementFromHTML('<div class="card">Hello</div>');
 * document.body.appendChild(el);
 */
export function createElementFromHTML(htmlString) {
  if (typeof htmlString !== "string") {
    throw new TypeError("createElementFromHTML expects a string");
  }

  const template = document.createElement("template");
  template.innerHTML = htmlString.trim(); // remove whitespace around

  return template.content.firstElementChild;
}