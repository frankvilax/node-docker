FROM node:15
WORKDIR /app
# caching purposes because it will avoid having to do npm install even if package.json didn't change
COPY package.json .
RUN npm install
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \ 
        else npm install --only=production; \ 
        fi

COPY . .
ENV PORT 3000
EXPOSE $PORT
CMD ["node", "index.js"]