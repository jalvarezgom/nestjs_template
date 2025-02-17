# Build stage
FROM node:23-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/src/app

FROM base AS builder

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Install all dependencies (including dev dependencies)
RUN pnpm i

COPY . .
RUN pnpm run build

# Production stage
FROM base AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

# Install only production dependencies
RUN pnpm i --prod

COPY --from=builder /usr/src/app/dist ./dist

# Add non-root user
RUN addgroup --gid 1001 nodejs && \
  adduser --system -uid 1001 --ingroup nodejs nodejs

USER nodejs

# Add these environment variables to prevent Husky installation
ENV HUSKY=0
ENV CI=true

EXPOSE 3000
EXPOSE 9229

CMD ["node", "dist/main"]