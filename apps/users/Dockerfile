# 1. Use lightweight Node.js image
FROM node:18-alpine AS builder

# 2. Set working directory
WORKDIR /app

# 2. copy package files
COPY package.json yarn.lock   ./

# 4. Install dependencies
RUN yarn install --frozen-lockfile

# 5. Copy the entire project
COPY . .
# 6. Remove unnecessary microservices (Keep only `users`)
RUN rm -rf apps/apigateway apps/booking apps/catering  apps/notifications apps/payments apps/eventcenters  
RUN rm -rf libs/contracts/src/eventcenterbooking libs/contracts/src/booking libs/contracts/src/catering libs/contracts/src/payments libs/contracts/src/eventcenters  
RUN rm -rf libs/contracts/src/booking.ts  libs/contracts/src/payments.ts libs/contracts/src/eventcenters.ts
RUN echo "Current directory contents in contracts:" && ls -la libs/contracts/src

# RUN echo "Current directory contents :" && ls -la /libs/contracts

# Move into the microservice directory
WORKDIR /app/apps/users

RUN echo "Current directory contents in apps/users:" && ls -la

# 6. Generate Prisma Client for this microservice
RUN yarn prisma generate --schema=/app/apps/users/prisma/schema.prisma

# 7. Build the NestJS service
RUN yarn build users

# 8. Create a smaller runtime image
FROM node:18-alpine AS runner

WORKDIR /app

# 9. Copy only necessary files from the builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/prisma ./prisma


# 11. Expose service port (change per service)
EXPOSE 8001

# 12. Start the microservice
CMD ["sh", "-c", "yarn prisma migrate deploy --schema=/app/apps/users/prisma/schema.prisma && yarn start:prod"]
# CMD ["yarn", "start:prod"]
