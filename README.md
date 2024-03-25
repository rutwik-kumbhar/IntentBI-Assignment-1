# IntentBI-Assignment-1
## Project Presention [Video](https://drive.google.com/file/d/1sey6j0iq1XGiYhv4C4YZBwxdFldGm-eN/view):

## Description
Develop a Java Spring Boot backend to handle Excel file uploads, process data, and store it in a database, while creating a React.js frontend with user authentication, CRUD functionalities, sorting, pagination, all integrated with the backend.

## Key Features:

1. **Excel File Upload & Processing:** REST endpoint for Excel uploads, data validation, and storage.
2. **User Authentication & Login Page:** Backend authentication for user login with frontend UI.
3. **CRUD Operations & Data Grid:** APIs for Create, Read, Update, Delete operations displayed in a grid.
4. **Sorting & Pagination:** Grid sorting and pagination for efficient data management.

## Tech-Stacks:
    - Frontend: JavaScript , React , Chakra UI
    - Backend: Java, Spring-Boot, Spring-Data-JPA
    - Database: MYSQL.
    - User Authentication: JWT (JSON Web Tokens)
    
## Prerequisites
- Node JS
- npm or yarn
- Java 8 or higher
- MySQL Workbench (Database)
  
## Backend Setup Follow Following Step  
Add the following lines to your `application.yml` file to configure the Spring Boot backend:
```base
server:
  port: 8081
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/intentbi
    username: root
    password: root
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      dialect : org.hibernate.dialect.MySQL8Dialect
```
##### Run the Spring Boot Application

## Postman API [Documention](https://bold-comet-967671.postman.co/workspace/2b9819d1-5f1d-4df2-8ceb-19198fc8a5ee/documentation/24834453-ff7e90a2-9481-465a-a21a-5c9db56dda46)

## Postman API [JSON](https://github.com/rutwik-kumbhar/IntentBI-Assignment-1/blob/main/Intentbi-Assignment-1.postman_collection.json)

## Frontend Setup Follow Following Step  
 - Clone Github Respsotory  - Git Clone https://github.com/rutwik-kumbhar/IntentBI-Assignment-1.git
 - Go to Inside Project folder - cd assignment1-frontend
 - Run command - npm install 
 - Run Project - yarn run dev
 - open give url -  http://127.0.0.1:5173/

## Dashboard (Frontend)
<img src="https://github.com/rutwik-kumbhar/IntentBI-Assignment-1/blob/main/dahsboard.png" alt="Alt Text" width="700"/>
