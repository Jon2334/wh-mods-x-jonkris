FROM node:20-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json .

RUN npm config set legacy-peer-deps true && \
    npm install && \
    npm install qrcode-terminal

COPY . .

# Heroku memberikan PORT secara dinamis melalui environment variable
# JANGAN hardcode EXPOSE, gunakan $PORT
CMD ["node", "index.js"]  