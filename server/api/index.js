// TODO: add API router here and all API sub-routers
const express = require('express');
const apiRouter = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//GET /api/user
apiRouter.get("/user", async (req, res, next) => {
    try {
        const user = await prisma.user.findMany();
        res.send(user);
    } catch (error) {
        next(error)
    }
});

//GET /api/about
apiRouter.get("/about", async (req, res, next) => {
    try {
        const about = await prisma.about.findMany();
        res.send(about);
    } catch (error) {
        next(error);
    }
});

//GET /api/policy
apiRouter.get("/policy", async (req, res, next) => {
    try {
        const policy = await prisma.policy.findMany();
        res.send(policy);
    } catch (error) {
        next(error)
    }
});

//GET /api/dates
apiRouter.get("/dates", async (req, res, next) => {
    try {
        const dates = await prisma.dates.findMany(); //might need to change this later
        res.send(dates);
    } catch (error) {
        next(error)
    }
})

module.exports = apiRouter;