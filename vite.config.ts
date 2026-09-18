// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//
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
// Additional Vite configuration can be passed through defineConfig.

import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import netlify from "@netlify/vite-plugin-tanstack-start";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts
    // for our SSR error wrapper.
    server: {
      entry: "server",
    },
  },

  vite: {
    plugins: [netlify()],
  },
});