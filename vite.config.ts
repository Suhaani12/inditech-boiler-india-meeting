// @lovable.dev/vite-tanstack-config already includes:
// - TanStack devtools
// - tanstackStart
// - viteReact
// - tailwindcss
// - tsConfigPaths
// - nitro
// - VITE_* env injection
// - @ path alias
// - React/TanStack dedupe
// - error logger plugins
// - sandbox detection

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