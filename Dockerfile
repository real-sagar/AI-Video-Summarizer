FROM node:22

RUN apt-get update && apt-get install -y ffmpeg

# IMPORTANT: set workdir to backend folder
WORKDIR /app/backend

# Copy only backend package files
COPY backend/package*.json ./

RUN yarn install

# Copy backend source code
COPY backend .

EXPOSE 10000

CMD ["yarn", "start"]
