FROM node:20-alpine

WORKDIR /app

# OS packages update
RUN apk update && apk upgrade

# Install only required deps first (better caching)
COPY package*.json ./

# Clean install (no unnecessary deps)
RUN npm ci --only=production

# Copy app
COPY . .

EXPOSE 3000

CMD ["node", "app.js"]