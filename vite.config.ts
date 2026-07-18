// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// VDS_BUILD=1 switches the build to a Node.js server (for Selectel VDS via Docker).
// Default build stays on Cloudflare Workers (Lovable-hosted).
const isVdsBuild = process.env.VDS_BUILD === "1";

export default defineConfig(
  isVdsBuild
    ? {
        // Node-server preset: our Cloudflare-shaped src/server.ts wrapper is skipped,
        // TanStack Start uses its default Node entry which listens on process.env.PORT.
        nitro: { preset: "node-server" },
      }
    : {
        tanstackStart: {
          // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
          // nitro/vite builds from this
          server: { entry: "server" },
        },
      },
);
