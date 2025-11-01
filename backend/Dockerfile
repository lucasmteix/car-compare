# Usar a imagem base do Node.js (versão 20, slim para reduzir tamanho)
FROM node:20-slim

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o código da aplicação
COPY . . 

# Expor a porta padrão do backend (ajuste se necessário)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "src/index.js"]