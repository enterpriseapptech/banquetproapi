# 1. Use lightweight Node.js image
FROM node:18-alpine AS builder

# 2. Set working directory
WORKDIR /app

# 3. Copy package files
COPY package.json yarn.lock ./

# 4. Install dependencies
RUN yarn install --frozen-lockfile

# 5. Copy the entire project
COPY . .

# 6. Generate Prisma Client for this microservice
RUN yarn prisma generate

# 7. Build the NestJS service
RUN yarn build notifications

# 8. Create a smaller runtime image
FROM node:18-alpine AS runner

WORKDIR /app

# 9. Copy only necessary files from the builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# 10. Apply Prisma migrations (specific to this microservice)
RUN yarn prisma migrate deploy || true

# 11. Expose service port (change per service)
EXPOSE 8003

# 12. Start the microservice
CMD ["yarn", "start:prod"]
