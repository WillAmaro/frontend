# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de package.json y package-lock.json para instalar dependencias
COPY package.json package-lock.json* ./ 

RUN npm ci 

# Copiar todo el código fuente
COPY . .

# Construir la app Next.js
RUN npm run build

# Etapa 2: Producción
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Copiar solo lo necesario desde build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Exponer el puerto que usará Next.js (por defecto 3000)
EXPOSE 3000

# Comando para iniciar Next.js en modo producción
CMD ["npm", "start"]