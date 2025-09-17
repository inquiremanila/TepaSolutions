// scripts/favicon.mjs
import { promises as fs } from "fs";
import path from "path";
import favicons from "favicons";

const source = "public/tepa.png"; // Path to your source image
const outputDir = path.resolve("public");

const configuration = {
  path: "/",
  appName: "Tepa Solutions",
  appShortName: "Tepa",
  appDescription: "Tepa Solutions - Digital Transformation Services",
  developerName: "Tepa Solutions",
  theme_color: "#030213",
  background: "#ffffff",
  display: "standalone",
  orientation: "any",
  scope: "/",
  start_url: "/",
  version: "1.0",
  logging: false,
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: false,
    favicons: true,
    windows: true,
    yandex: false
  }
};

async function run() {
  try {
    // Check if source image exists
    try {
      await fs.access(source);
      console.log(`✅ Found source image: ${source}`);
    } catch {
      console.error(`❌ Source image not found at: ${source}`);
      console.log(`📝 Please place a 512x512 PNG image at ${source}`);
      return;
    }

    const response = await favicons(source, configuration);

    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Save images
    for (const image of response.images) {
      const filePath = path.join(outputDir, image.name);
      await fs.writeFile(filePath, image.contents);
      console.log(`✅ Generated: ${image.name}`);
    }

    // Save files
    for (const file of response.files) {
      const filePath = path.join(outputDir, file.name);
      await fs.writeFile(filePath, file.contents);
      console.log(`✅ Generated: ${file.name}`);
    }

    console.log("🎉 Favicon generation completed successfully!");
    console.log("📁 All files saved to /public directory");
    
  } catch (err) {
    console.error("❌ Favicon generation failed:", err.message);
  }
}

// Run the script
run();