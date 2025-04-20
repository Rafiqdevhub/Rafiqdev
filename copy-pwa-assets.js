import fs from "fs";
import path from "path";

// Ensure the image is available in the public directory for the PWA manifest
console.log("🖼️ Copying PWA assets to public directory...");

try {
  // Copy the Rafiq PNG image from Assets to public
  const srcImagePath = path.resolve("src/Assets/images/Rafiq.PNG");
  const destImagePath = path.resolve("public/Rafiq.PNG");

  // Check if source file exists
  if (fs.existsSync(srcImagePath)) {
    // Create a copy of the file in the public directory
    fs.copyFileSync(srcImagePath, destImagePath);
    console.log("✅ Successfully copied Rafiq.PNG to public directory");
  } else {
    console.warn("⚠️ Could not find Rafiq.PNG in src/Assets/images");
    // Check if we already have a copy in the public directory
    if (fs.existsSync(destImagePath)) {
      console.log("✅ Rafiq.PNG already exists in public directory");
    }
  }

  console.log("✅ PWA assets preparation complete");
} catch (error) {
  console.error("❌ Error copying PWA assets:", error);
  // Exit with error code instead of using process.exit
  throw new Error("Failed to copy PWA assets");
}
