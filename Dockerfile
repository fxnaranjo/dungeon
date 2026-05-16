# Multi-stage build for production

# Stage 1: Build the React app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY client/package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY client/ ./

# Build the app
RUN npm run build

# Stage 2: Production server
FROM node:18-alpine

WORKDIR /app

# Install serve to run the static files
RUN npm install -g serve

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Set environment variable
ENV PORT=3000

# Start the server
CMD ["serve", "-s", "dist", "-l", "3000"]

# Made with Bob
