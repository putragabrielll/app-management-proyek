FROM node:lts

WORKDIR /app-management-proyek

COPY . .

RUN npm init -y
RUN npm install

EXPOSE 8000

CMD node app.js

####################################################################
# perintah untuk build image => docker build . -t app-management-proyek:latest
####################################################################
# perintah untuk running image => docker run -p 8000:8000 app-management-proyek:latest
####################################################################