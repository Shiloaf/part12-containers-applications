FROM node:20 AS deps
WORKDIR /usr/src/app
COPY package*.json .
ENV VITE_BACKEND_URL=http://localhost:3000
RUN npm ci

FROM deps AS build
COPY . .
RUN npm test
RUN npm run build

FROM nginx:1.25-alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html