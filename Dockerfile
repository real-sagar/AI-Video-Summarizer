FROM node:22

# Install FFmpeg
RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /app

# Copy only package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy rest of the source code
COPY . .

EXPOSE 10000

CMD ["yarn", "start"]
