import { defineConfig } from "vite";
import path from "path";

module.exports = defineConfig({
  root: "./",
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/Modal.ts"),
      name: "JsModal",
      fileName: (format) => `js-modal.${format}.js`,
    },
  },
});
