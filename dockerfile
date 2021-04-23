FROM ubuntu:18.04
EXPOSE 3000
EXPOSE 3001
WORKDIR /
RUN apt install git -y 
RUN git clone 
WORKDIR securitize
RUN chmod +x autodeploy.sh