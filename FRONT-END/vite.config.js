import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    port: 1111,
    proxy: {
      "/api": {
        target: "http://localhost:5555",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "../server/public", // Build output to server/public for deployment
    emptyOutDir: true,
  },
});
