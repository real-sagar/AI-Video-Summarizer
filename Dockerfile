FROM node:22

# Install FFmpeg
RUN apt-get update && apt-get install -y ffmpeg

# Set working directory to Backend (capital B!)
WORKDIR /app/Backend

# Copy package files from Backend
COPY Backend/package*.json ./

# Install dependencies
RUN yarn install

# Copy backend source code
COPY Backend .

EXPOSE 10000

CMD ["yarn", "start"]
