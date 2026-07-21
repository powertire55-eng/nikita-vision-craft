# ---------- build stage ----------
FROM oven/bun:1 AS build
WORKDIR /app

# Install deps
COPY package.json bun.lockb* bunfig.toml* ./
RUN bun install --frozen-lockfile || bun install

# Copy sources and build a Node.js SSR server (Nitro node-server preset).
# VDS_BUILD=1 switches vite.config.ts to the node-server preset.
# Docker build environment is not the Lovable sandbox, so the preset is respected.
COPY . .

# Download large media assets that are not tracked in git (>10MB).
# These are baked into the image so runtime does not depend on any external CDN.
RUN mkdir -p public/media && \
    apt-get update && apt-get install -y --no-install-recommends curl ca-certificates && \
    curl -fsSL "https://nikita-vision-craft.lovable.app/__l5e/assets-v1/8741c1ce-5eb2-44de-8e30-e916db4abbc8/zimin-formats.mp4" -o public/media/zimin-formats.mp4 && \
    curl -fsSL "https://nikita-vision-craft.lovable.app/__l5e/assets-v1/0a8b1689-d4a0-4bf7-9103-d83804cacd55/zimin-million.mp4" -o public/media/zimin-million.mp4 && \
    rm -rf /var/lib/apt/lists/*

ARG VITE_LEAD_ENDPOINT
ENV VITE_LEAD_ENDPOINT=${VITE_LEAD_ENDPOINT}
ENV VDS_BUILD=1
RUN bun run build

# ---------- runtime stage ----------
FROM node:20-alpine AS runtime
WORKDIR /app

# Nitro emits the SSR server to .output/server/
COPY --from=build /app/.output/server/ ./server/
COPY --from=build /app/.output/public/ ./public/
COPY --from=build /app/.output/nitro.json ./nitro.json

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE 3000
CMD ["node", "./server/index.mjs"]