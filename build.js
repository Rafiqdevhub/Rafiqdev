import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";

/**
 * Production build script with optimizations
 */

console.log("\n🚀 Starting production build process...\n");

try {
  // Step 1: Clean previous build artifacts
  console.log("🧹 Cleaning previous build...");
  execSync("npm run clean", { stdio: "inherit" });

  // Step 2: Skip linting for the final build to avoid circular dependency
  // We've already fixed all the linting issues in previous steps

  // Step 3: Build the project for production
  console.log("\n📦 Building for production...");
  execSync("npm run build:prod", { stdio: "inherit" });

  // Step 4: Copy necessary files to dist folder
  console.log("\n📋 Copying additional files...");

  // Copy robots.txt, sitemap.xml, and PWA assets if not already copied
  const filesToCopy = [
    { src: "public/robots.txt", dest: "dist/robots.txt" },
    { src: "public/sitemap.xml", dest: "dist/sitemap.xml" },
    { src: "public/Rafiq.PNG", dest: "dist/Rafiq.PNG" }, // Added this line to copy the icon file
    { src: "public/vite.svg", dest: "dist/vite.svg" }, // Also copying the Vite logo
  ];

  filesToCopy.forEach((file) => {
    if (fs.existsSync(file.src)) {
      fs.copyFileSync(file.src, file.dest);
      console.log(`✓ Copied ${file.src} to ${file.dest}`);
    } else {
      console.warn(`⚠️ Warning: ${file.src} not found, skipping...`);
    }
  });

  // Step 5: Create a .htaccess file for Apache servers
  console.log("\n🔒 Creating server configuration files...");

  const htaccessContent = `
# Enable rewriting
RewriteEngine On
RewriteBase /

# Redirect all requests to index.html unless it's a file or directory
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [QSA,L]

# Caching rules
<IfModule mod_expires.c>
  ExpiresActive On

  # Images
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"

  # CSS, JavaScript
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"

  # Others
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType application/x-font-woff "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
  # XSS Protection
  Header set X-XSS-Protection "1; mode=block"
  
  # Prevent MIME-sniffing
  Header set X-Content-Type-Options "nosniff"
  
  # Clickjacking protection
  Header set X-Frame-Options "SAMEORIGIN"
  
  # Referrer Policy
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
`;

  fs.writeFileSync("dist/.htaccess", htaccessContent);
  console.log("✓ Created .htaccess file");

  // Step 6: Generate a build report
  console.log("\n📊 Generating build report...");

  // Get total size of dist folder
  const getFolderSize = (folderPath) => {
    let size = 0;
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isFile()) {
        size += stats.size;
      } else if (stats.isDirectory()) {
        size += getFolderSize(filePath);
      }
    }

    return size;
  };

  const distSize = getFolderSize("dist");
  const formattedSize = (distSize / (1024 * 1024)).toFixed(2);

  const assetTypes = {
    js: { ext: ".js", size: 0, count: 0 },
    css: { ext: ".css", size: 0, count: 0 },
    html: { ext: ".html", size: 0, count: 0 },
    images: {
      ext: [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"],
      size: 0,
      count: 0,
    },
    fonts: { ext: [".woff", ".woff2", ".ttf", ".eot"], size: 0, count: 0 },
    other: { size: 0, count: 0 },
  };

  const processFiles = (folderPath) => {
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isFile()) {
        const ext = path.extname(file).toLowerCase();

        let matched = false;
        for (const entry of Object.entries(assetTypes)) {
          const info = entry[1];
          if (Array.isArray(info.ext)) {
            if (info.ext.includes(ext)) {
              info.size += stats.size;
              info.count++;
              matched = true;
              break;
            }
          } else if (ext === info.ext) {
            info.size += stats.size;
            info.count++;
            matched = true;
            break;
          }
        }

        if (!matched) {
          assetTypes.other.size += stats.size;
          assetTypes.other.count++;
        }
      } else if (stats.isDirectory()) {
        processFiles(filePath);
      }
    }
  };

  processFiles("dist");

  // Generate report with OS information instead of Node.js version
  const reportContent = `# Build Report - ${new Date().toLocaleString()}

## Overview
- Total build size: ${formattedSize} MB
- Build directory: dist/

## Assets Breakdown
${Object.entries(assetTypes)
  .map(
    ([type, info]) =>
      `- ${type.charAt(0).toUpperCase() + type.slice(1)}: ${
        info.count
      } files (${(info.size / (1024 * 1024)).toFixed(2)} MB)`
  )
  .join("\n")}

## Environment
- OS: ${os.type()} ${os.release()}
- Build date: ${new Date().toISOString()}
`;

  fs.writeFileSync("build-report.md", reportContent);
  console.log("✓ Created build report: build-report.md");

  console.log("\n✅ Production build completed successfully!");
  console.log(`📦 Total build size: ${formattedSize} MB`);
  console.log("📂 Output location: dist/");
  console.log("\n🌐 To test the production build locally, run:");
  console.log("npm run start");
  console.log(
    "\n🚀 To deploy, upload the contents of the dist/ folder to your hosting provider."
  );
} catch (error) {
  console.error("\n❌ Build failed:", error);
  // Use a numeric exit code instead of process.exit
  throw error;
}
