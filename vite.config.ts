// @lovable.dev/vite-tanstack-config already includes the following:
// - TanStack devtools (dev-only, first)
// - tanstackStart
// - viteReact
// - tailwindcss
// - tsConfigPaths
// - nitro
// - VITE_* env injection
// - @ path alias
// - React/TanStack dedupe
// - error logger plugins
// - sandbox detection (port/host/strictPort)
//
// Do NOT add those plugins manually because it can cause duplicate plugins.

import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import netlify from "@netlify/vite-plugin-tanstack-start";

export default defineConfig({
  tanstackStart: {
    // Use src/server.ts as the TanStack Start server entry
    server: {
      entry: "server",
    },
  },

  vite: {
    plugins: [netlify()],
  },
});