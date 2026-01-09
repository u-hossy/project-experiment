FROM node:22.12.0

RUN npm install -g pnpm

WORKDIR /frontend

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .
