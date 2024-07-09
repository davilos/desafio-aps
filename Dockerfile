FROM node

WORKDIR /usr/src/app

COPY package*.json .
RUN npm i

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD [ "node", "build/server.js" ]
