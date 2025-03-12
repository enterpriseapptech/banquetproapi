# 1. Use lightweight Node.js image
FROM node:18-alpine AS builder

# 2. Set working directory
WORKDIR /app


COPY package.json yarn.lock   ./

# 4. Install dependencies
RUN yarn install --frozen-lockfile

# 5. Copy the entire project

COPY apps/users ./apps/users
COPY libs/contracts/src/users libs/contracts/src/contracts.module.ts libs/contracts/src/index.ts  ./libs/contracts/src/
COPY libs/contracts/src/contracts.service.spec.ts libs/contracts/src/contracts.service.ts  ./libs/contracts/src/
COPY libs/contracts/tsconfig.lib.json ./libs/contracts/
COPY libs/interfaces ./libs/interfaces

RUN echo "Current directory contents  libs/contracts:" && ls -la /libs/contracts

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
COPY --from=builder /app/prisma ./prisma

# 10. Apply Prisma migrations (specific to this microservice)
RUN yarn prisma migrate deploy || true

# 11. Expose service port (change per service)
EXPOSE 8001

# 12. Start the microservice
CMD ["yarn", "start:prod"]
