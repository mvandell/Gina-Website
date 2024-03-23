# Gina Vandellos' Website  
### Designed by [Marisa Vandellos](https://github.com/mvandell)  
Website link coming soon!

## Table of Contents  
1. [Description](https://github.com/mvandell/Gina-Website?tab=readme-ov-file#description)  
2. [Technology Used](https://github.com/mvandell/Gina-Website?tab=readme-ov-file#technology-used)    
3. [How to Setup the Project](https://github.com/mvandell/Gina-Website?tab=readme-ov-file#how-to-setup-the-project)  
4. [Known Issues](https://github.com/mvandell/Gina-Website?tab=readme-ov-file#known-issues)  

## Description  
This website is an easy-to-use, yet robust, way for my mom to share important information about her business. The simple layout allows users to quickly find what they are looking for, without extra elements distracting them. It is designed to both draw in new students and provide up-to-date information to her current students.  

## Technology Used  
![Prisma badge](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)  ![Redux badge](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)  ![React badge](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)  ![React Router badge](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)  ![Vite badge](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)  ![NPM badge](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)  ![Node badge](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

## How to Setup the Project  
To run this code on your computer, follow these steps:  
1. Copy the 'clone' link from the **<> Code** button
2. Run `git clone <copied link>` in the command line to copy the repo down to your local computer
3. Run `cd Gina-Website` to switch to the repo's folder
4. Run `npm install` in the command line to install any dependencies you don't have installed globally
used
5. Create a .env file in the top-level of your folder
6. In the .env file, insert this code:  
    `PORT=<port number>`  
    `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/<database name>"`  
    `JWT_SECRET="<some secret>"`  
7. Run  the following commands in the command line to add prisma and initialize the database:  
    `npm install prisma --save-dev`  
    `npx prisma migrate dev --name init`  
8. Run `npm run seed` in the command line to seed the database  
9. Run `npm run dev` in the command line to start the server  
10. Open the app on your localhost at the port you specified!  

## Known Issues  