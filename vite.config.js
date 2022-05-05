import { defineConfig } from "vite";
import path from "path";

module.exports = defineConfig({
  root: "./",
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/main.ts"),
      name: "OpenModalJs",
      fileName: (format) => `open-modal-js.${format}.js`,
    },
    rollupOptions: {
      output: {
        exports: "named",
      },
    },
  },
});
