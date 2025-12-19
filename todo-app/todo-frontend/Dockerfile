FROM node:20 AS deps
WORKDIR /usr/src/app
COPY package*.json .
ENV VITE_BACKEND_URL=http://backend:3000
RUN npm ci

FROM deps AS build
COPY . .
RUN npm test
ENV VITE_USE_PROXY=yes
RUN npm run build

FROM nginx:1.25-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html