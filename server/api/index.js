// TODO: add API router here and all API sub-routers
const express = require('express');
const apiRouter = express.Router();
import prisma from '../db/client';

//GET bio
apiRouter.get("/bio", async (req, res, next) => {
    try {
        const bio = await prisma.admin.findMany();
        res.send(bio);
    } catch (error) {
        next(error);
    }
});

//GET piano policy
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

//GET voice policy
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

//GET dates
apiRouter.get("/dates", async (req, res, next) => {
    try {
        const dates = await prisma.dates.findMany();
        res.send(dates);
    } catch (error) {
        next(error)
    }
})

modeule.exports = apiRouter;