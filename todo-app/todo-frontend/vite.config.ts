/// <reference types="vitest/config" />
import { defineConfig, mergeConfig } from "vitest/config";
import { defineConfig as defineConfigVite } from "vite";
import react from "@vitejs/plugin-react";

const config = defineConfigVite({
  plugins: [react()],
});

const testConfig = defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setupTests.ts",
    bail: 1,
  },
});

export default mergeConfig(config, testConfig);
