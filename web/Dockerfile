
FROM node:20-alpine

WORKDIR /app


COPY package*.json ./

# Instala dependências
RUN npm install

COPY . .

EXPOSE 5173

# Inicia Vite em modo dev com hot-reload
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]