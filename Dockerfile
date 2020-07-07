# get the base image 
FROM node:alpine

#set the working dir 
WORKDIR /usr/src/app

# copy the package.json in working dir
COPY package*.json ./

# to install all dependecies in working dir set earlier
RUN npm install

# copy the whole code from here to docker working dir
COPY . .

# open port to run nodejs
EXPOSE 3000

# start application
CMD ["npm", "start"]