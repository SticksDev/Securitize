FROM ubuntu:18.04
EXPOSE 3000
EXPOSE 3001
WORKDIR /
RUN apt-get update
COPY  ../secretize ../secretize/
COPY .gitignore ./
COPY autodeploy.sh ./
COPY index.js ./
COPY package.json ./
