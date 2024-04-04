# Project Name

## Description

This project is a web application built with Node.js, MySQL, Sequelize, Vue.js, and Cloudinary. It serves as a platform for [brief description of the project's purpose or main functionality].

## Features

- [Feature 1]
- [Feature 2]
- [Feature 3]

## Technologies Used

- Vue.js
- Node.js
- MySQL
- Redis
- Sequelize
- Cloudinary
- Pinia
- Vue-chartjs

## Run the project:

With docker-compose:

```
version: '3'
services:
  mysql:
    image: mysql:latest
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=123
      - MYSQL_DATABASE=hoangha
      - MYSQL_TCP_PORT=3308
    volumes:
      - mysql_data:/var/lib/mysql
    ports:
      - "3308:3308"
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    restart: always
    environment:
      - API_KEY=your_cloudinary_api_key
      - API_SECRET=your_cloudinary_api_secret
      - CLOUD_NAME=your_cloudinary_cloudname
      - FE_URL=https://localhost:5173
      - FE_NGINX_URL=http://localhost:83
      - FE_LOCAL_URL=http://localhost:5173
      - NODE_OPTIONS=no-network-family-autoselection
      - SQL_SERVER=mysql
      - SQL_DATABASE=hoangha
      - SQL_USER=root
      - SQL_PORT=3308
      - SQL_PASSWORD=123
      - TEST=text
      - SECRET_KEY=idkthiskeyissecret
    depends_on:
      - mysql
    ports:
      - "3000:3000"
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    restart: always
    environment:
      - VITE_BEURL=http://localhost:3000
    depends_on:
      - backend
    ports:
      - "5173:5173"
volumes:
  mysql_data:
```

after all the containers have successfully been launched, run `sudo docker ps` and find the backend container, grab its id, and then run `sudo docker exec -it 'backend-container-id' npm run sync` to initiate database
