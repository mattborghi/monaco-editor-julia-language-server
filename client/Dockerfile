# pull official base image
FROM node:latest

# set working directory
WORKDIR /frontend

# add `/frontend/node_modules/.bin` to $PATH
ENV PATH /frontend/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
# there is an issue so we need to do this
RUN npm rebuild node-sass

# add app
COPY . ./

# start app
EXPOSE 8080
CMD ["npm", "run" , "start:dev"]