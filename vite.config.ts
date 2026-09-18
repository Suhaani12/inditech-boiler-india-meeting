// @lovable.dev/vite-tanstack-config already includes:
// - TanStack devtools
// - tanstackStart
// - viteReact
// - tailwindcss
// - tsConfigPaths
// - Nitro
// - VITE_* env injection
// - @ path alias
// - React/TanStack dedupe
// - error logger plugins
// - sandbox detection
//
// We disable the automatic Nitro build target because Netlify's
// TanStack Start plugin handles the Netlify deployment output.

import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import netlify from "@netlify/vite-plugin-tanstack-start";

export default defineConfig({
  // IMPORTANT:
  // Lovable's config automatically enables Nitro.
  // Disable it because Netlify's TanStack Start plugin handles
  // the Netlify server/function build.
  nitro: false,

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