FROM node:22-alpine

WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

# Create the uploads directory so it always exists
RUN mkdir -p uploads/resumes

# Expose the backend port
EXPOSE 5000

# Wait 5 seconds for MongoDB to be ready, run seed scripts, then start server
CMD sh -c "sleep 5 && node seedCategories.js && node seedUsers.js && npm start"
