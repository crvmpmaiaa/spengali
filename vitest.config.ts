// spencer-lynch/vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    environmentOptions: {
      jsdom: { url: "http://localhost:3000" },
      additionalKeys: ["localStorage", "sessionStorage"],
    },
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/unit/**/*.test.{ts,tsx}"],
    passWithNoTests: true,
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
