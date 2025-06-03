import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { imagetools } from "vite-imagetools";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define isProd based on NODE_ENV
const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    imagetools(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "Rafiq.PNG", "vite.svg"],
      manifest: {
        name: "Muhammad Rafiq Portfolio",
        short_name: "Rafiq Portfolio",
        description:
          "Full Stack Developer Portfolio showcasing projects and skills",
        theme_color: "#0f0f1a",
        background_color: "#0f0f1a",
        start_url: "./",
        display: "standalone",
        icons: [
          {
            src: "./Rafiq.PNG", // Using relative path
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "./Rafiq.PNG", // Using relative path
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    // Output directory for production build
    outDir: "dist_new",

    // Enable minification for production
    minify: "terser",

    // Configure terser options
    terserOptions: {
      compress: {
        drop_console: isProd, // Remove console logs in production
        drop_debugger: isProd,
      },
    },

    // Generate sourcemaps for debugging
    sourcemap: !isProd,

    // Split chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
          icons: ["react-icons"],
          utils: [
            "@emailjs/browser",
            "react-fast-marquee",
            "typewriter-effect",
          ],
        },
      },
    },
  },

  // Configure optimizations
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },

  // Add compression options
  server: {
    // Enable this in development to simulate production compression
    // compress: true,
    port: 5175,
    open: true,
  },
});
