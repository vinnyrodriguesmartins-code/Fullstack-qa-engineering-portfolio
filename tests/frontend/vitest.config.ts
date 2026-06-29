import path from "node:path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const appRoot = path.resolve(__dirname, "../../ExameDesenvolvedorDeTestes/web");
const testRoot = __dirname;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(appRoot, "src"),
      zod: path.resolve(testRoot, "node_modules/zod"),
      "react-hook-form": path.resolve(testRoot, "node_modules/react-hook-form"),
      "@hookform/resolvers": path.resolve(testRoot, "node_modules/@hookform/resolvers"),
      "react-hot-toast": path.resolve(testRoot, "node_modules/react-hot-toast"),
      "@tanstack/react-query": path.resolve(testRoot, "node_modules/@tanstack/react-query"),
      "lucide-react": path.resolve(testRoot, "node_modules/lucide-react"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    include: ["unit/**/*.test.{ts,tsx}"],
    setupFiles: ["./vitest.setup.ts"],
    server: {
      deps: {
        inline: [path.resolve(appRoot, "src")],
      },
    },
  },
});
