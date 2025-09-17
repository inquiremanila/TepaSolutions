// scripts/generate-favicons.ts
import { promises as fs } from "fs";
import path from "path";
import favicons from "favicons";

const source = "tepa.png"; // put your 512x512+ PNG or SVG in project root or assets

const configuration = {
  path: "/", // Path for overriding default icons path
  appName: "Tepa Solutions",
  appShortName: "Tepa",
  appDescription: "Tepa Solutions Blog",
  developerName: "Tepa Solutions",
  theme_color: "#2d2d2d",
  background: "#2d2d2d",
  display: "standalone",
  orientation: "any",
  scope: "/",
  start_url: "/",
  version: "1.0",
  logging: true,
};

const outputDir = path.resolve("public");

async function run() {
  try {
    const response = await favicons(source, configuration);

    // Save images
    for (const image of response.images) {
      await fs.writeFile(path.join(outputDir, image.name), image.contents);
    }

    // Save additional files (manifest, browserconfig, etc.)
    for (const file of response.files) {
      await fs.writeFile(path.join(outputDir, file.name), file.contents);
    }

    // Save HTML link tags
    await fs.writeFile(path.join(outputDir, "favicons.html"), response.html.join("\n"));

    console.log("✅ Favicons generated in /public");
  } catch (err) {
    console.error("❌ Favicon generation failed:", err);
  }
}

run();
