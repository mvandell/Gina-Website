const express = require('express');
const apiRouter = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//GET /api/user
apiRouter.get("/user", async (req, res, next) => {
    try {
        const user = await prisma.user.findMany();
        delete user.password;
        res.send(user);
    } catch (error) {
        next(error)
    }
});

//GET /api/blurb
apiRouter.get("/blurb", async (req, res, next) => {
    try {
        const blurb = await prisma.about.findMany({
            select: {
                blurb1: true,
                blurb2: true,
                blurb3: true
            }
        });
        res.send(blurb);
    } catch (error) {
        next(error);
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

//GET /api/about/:id
apiRouter.get("/about/:id", async (req, res, next) => {
    try {
        const about = await prisma.about.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        res.send(about);
    } catch (error) {
        next(error);
    }
});

//GET /api/policy
apiRouter.get("/policy", async (req, res, next) => {
    try {
        const policy = await prisma.policy.findMany({});
        res.send(policy);
    } catch (error) {
        next(error)
    }
});

//GET /api/dates
apiRouter.get("/dates", async (req, res, next) => {
    try {
        const dates = await prisma.dates.findMany(); 
        res.send(dates);
    } catch (error) {
        next(error)
    }
})

//GET /api/dates/:id
apiRouter.get("/dates/:id", async (req, res, next) => {
    try {
        const date = await prisma.dates.findUnique({
            where: {
                id: Number(req.params.id)
            },
        }); 
        res.send(date);
    } catch (error) {
        next(error)
    }
})

module.exports = apiRouter;