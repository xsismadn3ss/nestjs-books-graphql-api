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

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /usr/src/app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY prisma ./prisma

# Instalar dependencias de producción
RUN npm install --omit=dev

# Generar el cliente Prisma en producción
RUN npx prisma generate --schema=./prisma/schema.prisma

# Crear directorios necesarios y establecer permisos
RUN mkdir -p src && chown -R node:node .

# Cambiar al usuario node
USER node

EXPOSE 3000

# iniciar contenedor
CMD ["npx", "prisma", "migrate", "deploy", "&&", "npm", "run", "start:prod"]