import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { imagetools } from "vite-imagetools";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
            src: "./Rafiq.PNG",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "./Rafiq.PNG",
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
    outDir: "dist",
    minify: true,
    sourcemap: false,
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
  server: {
    port: 5175,
    open: true,
  },
});
