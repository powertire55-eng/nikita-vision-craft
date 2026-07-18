# ---------- build stage ----------
FROM oven/bun:1 AS build
WORKDIR /app

# Install deps
COPY package.json bun.lockb* bunfig.toml* ./
RUN bun install --frozen-lockfile || bun install

# Copy sources and build for Node.js server
COPY . .
ARG VITE_LEAD_ENDPOINT
ENV VITE_LEAD_ENDPOINT=${VITE_LEAD_ENDPOINT}
ENV VDS_BUILD=1
ENV NITRO_PRESET=node-server
RUN bun run build

# ---------- runtime stage ----------
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Nitro node-server output is fully self-contained under .output/
COPY --from=build /app/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]