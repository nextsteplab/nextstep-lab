/**
 * Pre-render script for Static Site Generation (SSG).
 * Builds the client and server bundles, then renders each route to static HTML.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// All routes to pre-render
const routesToPrerender = [
  "/",
  "/services",
  "/pricing",
  "/schedule",
  "/about",
  "/contact",
];

async function prerender() {
  // Read the generated index.html template from the client build
  const templatePath = path.resolve(__dirname, "dist/client/index.html");
  const template = fs.readFileSync(templatePath, "utf-8");

  // Import the server entry
  const { render } = await import("./dist/server/entry-server.js");

  for (const url of routesToPrerender) {
    console.log(`Pre-rendering: ${url}`);

    const { html: appHtml } = render(url);

    // Inject rendered HTML into the template
    const finalHtml = template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    // Determine output path
    const filePath =
      url === "/"
        ? path.resolve(__dirname, "dist/client/index.html")
        : path.resolve(__dirname, `dist/client${url}/index.html`);

    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, finalHtml);
    console.log(`  → ${filePath}`);
  }

  console.log("\n✅ Pre-rendering complete!");
}

prerender().catch((err) => {
  console.error("Pre-rendering failed:", err);
  process.exit(1);
});
