# 1. Use lightweight Node.js image
FROM node:20-alpine AS builder

# 2. Set working directory
WORKDIR /app

# 3. copy package files
COPY package.json yarn.lock   ./

# 4. Install dependencies
RUN yarn install --frozen-lockfile

# 5. Copy the entire project
COPY . .

# 6. Remove unnecessary microservices and their dependencies
RUN rm -rf apps/apigateway apps/booking apps/catering  apps/users apps/payments apps/eventcenters  
RUN rm -rf libs/contracts/src/eventcenterbooking libs/contracts/src/catering libs/contracts/src/payments libs/contracts/src/eventcenters  libs/contracts/src/payments
RUN rm -rf libs/contracts/src/payments.ts libs/contracts/src/eventcenters.ts 
RUN echo "Current directory contents in contracts:" && ls -la libs/contracts/src

# 7. Generate Prisma Client for this microservice
RUN yarn prisma generate --schema=/app/apps/notifications/prisma/schema.prisma

# 8. Build the NestJS service
RUN yarn build notifications

# 9. Create a smaller runtime image
FROM node:20-alpine AS runner

# 10. reSet working directory 
WORKDIR /app

# 11. Copy only necessary files from the builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/apps ./apps

# 12. Expose service port (change per service)
EXPOSE 8003

# 13. Start the microservice
CMD ["sh", "-c", "yarn prisma migrate deploy --schema=/app/apps/notifications/prisma/schema.prisma && yarn start:prodNotifications"]
# CMD ["yarn", "start:prod"]
