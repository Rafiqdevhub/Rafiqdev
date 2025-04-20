import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables based on mode
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    build: {
      // Output directory for production build
      outDir: "dist",

      // Enable minification for production
      minify: "terser",

      // Configure terser options
      terserOptions: {
        compress: {
          drop_console: mode === "production", // Remove console logs in production
          drop_debugger: mode === "production",
        },
      },

      // Generate sourcemaps for debugging
      sourcemap: mode !== "production",

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
      port: 5173,
      open: true,
    },
  };
});
