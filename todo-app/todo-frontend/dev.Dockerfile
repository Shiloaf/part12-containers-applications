FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV VITE_USE_PROXY=yes

CMD ["npm", "run", "dev", "--", "--host"]