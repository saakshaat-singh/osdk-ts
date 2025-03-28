import foundryWidgetPlugin from "@osdk/widget.vite-plugin.unstable";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), foundryWidgetPlugin()],
  server: {
    port: 8080,
    cors: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        second: fileURLToPath(new URL("./second.html", import.meta.url)),
      },
    },
  },
});
