FROM node:18.16.1

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["npm", "start"]
