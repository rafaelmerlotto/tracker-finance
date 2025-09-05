# Usa immagine Node ARM64 per Mac M1/M2
FROM --platform=linux/arm64 node:20-alpine

WORKDIR /src

# Copia package.json e prisma prima per caching
COPY package*.json ./ 
COPY prisma ./prisma

RUN npm install

# Genera client Prisma
RUN npx prisma generate

# Copia tutto il resto
COPY . .

CMD ["npm", "run", "start"]
