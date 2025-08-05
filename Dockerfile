# Etapa de construcción
FROM node:22-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

# Etapa de producción
FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY prisma ./prisma

# Generar el cliente Prisma en producción
RUN npx prisma generate

# Crear directorios necesarios y establecer permisos
RUN mkdir -p src && chown -R node:node .

# Cambiar al usuario node
USER node

EXPOSE 3000

CMD ["npm", "run", "start:prod"]