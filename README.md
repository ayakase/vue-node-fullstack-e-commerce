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

## ENV

Backend:

- API_KEY=cloudinary-api-key
- API_SECRET=cloudinary-secret
- CLOUD_NAME=cloudinary-name
- FE_URL=
- FE_NGINX_URL=
- these 2 env can be add or remove in server.js, depends on your need
- FE_LOCAL_URL= http://localhost:3000
- SQL_SERVER=localhost
- SQL_DATABASE=hoangha
- SQL_USER=root
- SQL_PASSWORD=
- SQL_PORT=3308

## Run the project:

With docker-compose up, after all the containers have successfully been launched, run `sudo docker ps` and find the backend container, grab its id, and then run `sudo docker exec -it 'backend-container-id' npm run sync` to initiate database
