# Use uma imagem Node.js como base
FROM node:current-alpine3.20

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos do package.json e yarn.lock
COPY package.json yarn.lock ./

# Instale as dependências com Yarn
RUN yarn install --production

# Copie todo o código da aplicação para o container
COPY . .

# Construa o projeto para produção
RUN yarn build

# Exponha a porta onde a API será executada
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["yarn", "start:prod"]
