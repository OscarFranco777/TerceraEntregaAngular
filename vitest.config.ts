/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.spec.ts'],
    setupFiles: [],
    ui: true,
    uiBase: './vitest-ui/',
    reporters: ['default', 'html'],
    outputFile: './vitest-ui/index.html',
  }
});
