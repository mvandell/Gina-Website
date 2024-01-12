// TODO: add API router here and all API sub-routers
const express = require('express');
const apiRouter = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//GET /api/bio
apiRouter.get("/bio", async (req, res, next) => {
    try {
        const bio = await prisma.user.findMany();
        res.send(bio);
    } catch (error) {
        next(error);
    }
});

//GET /api/policy/piano
apiRouter.get("/policy/piano", async (req, res, next) => {
    try {
        const piano = await prisma.policy.findUnique({
            where: {
                instrument: "piano"
            }
        });
        res.send(piano);
    } catch (error) {
        next(error)
    }
});

//GET /api/policy/voice
apiRouter.get("/policy/voice", async (req, res, next) => {
    try {
        const voice = await prisma.policy.findUnique({
            where: {
                instrument: "voice"
            }
        });
        res.send(voice);
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