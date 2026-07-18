# ---------- build stage ----------
FROM oven/bun:1 AS build
WORKDIR /app

# Install deps
COPY package.json bun.lockb* bunfig.toml* ./
RUN bun install --frozen-lockfile || bun install

# Copy sources and build a fully static site (Nitro static preset + prerender)
COPY . .
ARG VITE_LEAD_ENDPOINT
ENV VITE_LEAD_ENDPOINT=${VITE_LEAD_ENDPOINT}
ENV VDS_BUILD=1
RUN bun run build

# ---------- runtime stage ----------
# Serve the static output with plain Nginx — no Node.js at runtime.
FROM nginx:1.27-alpine AS runtime

# Nitro emits the fully prerendered site to .output/public/
COPY --from=build /app/.output/public/ /usr/share/nginx/html/
COPY deploy/nginx-container.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]