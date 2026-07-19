// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// VDS_BUILD=1 switches the build to a fully static site (Nitro static preset
// + prerender). Output is emitted to .output/public/ and can be served by
// plain Nginx — no Node.js runtime required. The lead form still works: it
// POSTs cross-origin to VITE_LEAD_ENDPOINT (the Lovable-hosted API).
// Default build stays on Cloudflare Workers (Lovable-hosted).
const isVdsBuild = process.env.VDS_BUILD === "1";

export default defineConfig(
  isVdsBuild
    ? ({
        tanstackStart: {
          // Use the same SSR entry wrapper for prerendering.
          server: { entry: "server" },
        },
        nitro: {
          preset: "static",
          prerender: {
            routes: ["/", "/sitemap.xml", "/robots.txt"],
          },
        },
      } as any)
    : {
        tanstackStart: {
          // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
          // nitro/vite builds from this
          server: { entry: "server" },
        },
      },
);
