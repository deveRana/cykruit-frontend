# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code and .env for build-time variables
COPY . .
COPY .env .     

# Build the Next.js app
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Copy package.json for production dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy build artifacts from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npx", "next", "start", "-p", "3000", "-H", "0.0.0.0"]
