const path = require("path");
const express = require("express");
const morgan = require("morgan");
const {authMiddleware} = require("./auth/utils");

const app = express();

// Logging middleware
app.use(morgan("dev"));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(express.static(path.join(__dirname, '../dist')))

//Authorization middleware (in ./auth/utils)
app.use(authMiddleware);

//Test route
app.get("/test", (req, res, next) => {
  res.send("Test route");
});

// app.get('/', (req, res, next) => {
//   res.sendFile(path.join(__dirname, '../dist/index.html'));
// })

//Add your routers here
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('SERVER ERROR: ', error);
    if(res.statusCode < 400) {
        res.status(500);
    }
    res.send({
        error: error.message,
        name: error.name,
        message: error.message,
        table: error.table,
    });
});

// 404 handler
// app.get('*', (req, res) => {
//     res.status(404).send({
//         error: '404 - Not Found',
//         message: 'No route found for the requested URL',
//     });
// });
  

module.exports = app;