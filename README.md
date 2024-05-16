# Project Name

Tourism Website

## Description
Demo: http://dulichhoangha.netlify.app
This project is an E-commerce-like web application that sells travelling tours

## Features
- Customers: can search by keywords, filter by tour type, category, region, location and view tours, posts... leave contact information, order and finish payment via PayOS gateways, receive invoices via Email.
- Admin: can login and manage tours, orders, regions, locations, slides, posts, view statistic charts via dashboard, and change admin credentials.

## Main Technologies Used

- Vue.js: Primary framework used to build the SPA interface.
- Bootstrap & Vuetify: For pre-built UI components
- Pinia: State Management
- Node.js & Express: Backend server
- MySQL: Primary database
- Sequelize: ORM for MySQL
- Redis: Cache, rate limiter & store JWT token whitelist
- Cloudinary: Images cloud storage
- PayOS: Payment gateway
- AWS EC2: Backend & databases deployment.
- Docker: Containerize the app and run with docker-compose

## ENV

Frontend:

- VITE_BEURL=
- VITE_TINYMCE= your tinymce token
  Backend:

- API_KEY=cloudinary-api-key
- API_SECRET=cloudinary-secret
- CLOUD_NAME=cloudinary-name
- FE_URL=
- FE_NGINX_URL=
- these 2 env can be added or removed in server.js, depends on your need
- FE_LOCAL_URL= http://localhost:3000
- SQL_SERVER=localhost
- SQL_DATABASE=hoangha
- SQL_USER=root
- SQL_PASSWORD=
- SQL_PORT=3308
- PAYOS_CLIENT_ID
- PAYOS_API_KEY
- PAYOS_CHECKSUM_KEY
- EMAIL_USER: your email address
- EMAIL_PASSWORD: your email application password
- EMAIL_PORT:
- EMAIL_HOST: smtp.gmail.com

## Run the project:

With docker-compose up, after all the containers have successfully been launched, run `sudo docker ps` and find the backend container, grab its id, and then run `sudo docker exec -it 'backend-container-id' npm run sync` to initiate database and add datas.
