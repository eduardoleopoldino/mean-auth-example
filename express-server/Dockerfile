FROM node:15
COPY . .
RUN npm install
USER node
WORKDIR /home/node/app
CMD ["npm", "start"]