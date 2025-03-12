# Use Node.js base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files for caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile


# Copy the entire project
COPY . .

# Build the NestJS microservice
RUN yarn build apigateway

# Create a smaller final image
FROM node:18-alpine AS runner

WORKDIR /app

# Copy the built files from the previous stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the microservice port (adjust as needed)
EXPOSE 8000

# Start the application
CMD ["yarn", "start:prod"]

