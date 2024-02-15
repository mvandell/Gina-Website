const express = require('express');
const authRouter = express.Router();
const {requireUser} = require('./utils');

const jwt = require("jsonwebtoken");
const {JWT_SECRET} = process.env;

const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//POST /auth/login
authRouter.post("/login", async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const user = await prisma.user.findUnique({
            where: {
                username: username
            },
        });

        const validPassword = await bcrypt.compare(
            password,
            user?.password ?? ""
        );

        //Check user and password
        if (!user) {
            return res.status(401).send("There is no user with that username.");
        } else if (!validPassword) {
            return res.status(401).send("Incorrect password.");
        }

        //Create token
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
        res.send({token});
        console.log("Login successful!");
    } catch (error) {
        next(error);
    }
});

//POST /auth/dates
authRouter.post("/dates", requireUser, async (req, res, next) => {
    try {
        const {start, end, title, allDay} = req.body;
        const newDate = await prisma.dates.create({
            data: {
                start: new Date(start),
                end: new Date(end),
                title,
                allDay: allDay
            },
        });
        res.status(201).send(newDate);
    } catch (error) {
        next(error);
    }
});

//POST /auth/about/add
authRouter.post("/about/add", requireUser, async (req, res, next) => {
    try {
        const {paragraph} = req.body;
        const newParagraph = await prisma.about.create({
            data: {
                paragraph
            },
        });
        res.status(201).send(newParagraph);
    } catch (error) {
        next(error);
    }
});

//PATCH /auth/account/:id/edit
authRouter.patch("/account/:id/edit", requireUser, async (req, res, next) => {
    try {
        const {username, password, email, phone} = req.body;
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, SALT_COUNT);
            return hashedPassword;
        }

        const updatedUser = await prisma.user.update({
            where: {id: req.user.id},
            data: {
                username: username || undefined,
                password: hashedPassword || undefined,
                email: email || undefined,
                phone: phone || undefined
            }
        });
        delete updatedUser.password;
        res.send("user successfully updated");
    } catch (error) {
        next(error)
    }
});

//PATCH /auth/bio/:id/edit
authRouter.patch("/about/:id/edit", requireUser, async (req, res, next) => {
    try {
        const {paragraph} = req.body;
        const updatedBio = await prisma.about.update({
            where: {id: Number(req.params.id)},
            data: {paragraph: paragraph}
        });
        res.send(updatedBio);
    } catch (error) {
        next(error)
    }
});

//PATCH /auth/policy/edit
authRouter.patch("/policy/:id/edit", requireUser, async (req, res, next) => {
    try {
        const {instrument, heading, content} = req.body;
        const updatedPolicy = await prisma.policy.update({
            where: {id: Number(req.params.id)},
            data: {
                instrument: instrument || undefined,
                heading: heading || undefined,
                content: content || undefined
            }
        });
        res.send(updatedPolicy);
    } catch (error) {
        next(error)
    }
});

//PATCH /auth/dates/edit/:id
authRouter.patch("/dates/edit/:id", requireUser, async (req, res, next) => {
    try {
        const {start, end, title, allDay} = req.body;

        const updatedDate = await prisma.dates.update({
            where: {id: Number(req.params.id)},
            data: {
                start: new Date(start) || undefined, //required
                end: new Date(end) || undefined, //required
                title: title || undefined,
                allDay: allDay || undefined //can't change true to false
            }
        });
        res.send(updatedDate);
    } catch (error) {
        next(error)
    }
});


//DELETE /auth/dates/:id
authRouter.delete("/dates/:id", requireUser, async (req, res, next) => {
    try {
       const deletedDate = await prisma.dates.delete({
        where: {id: Number(req.params.id)},
       });
       if (!deletedDate) {
        return res.status(404).send("Date not found!");
       }
       console.log("deleted date");
       res.send(deletedDate);
    } catch (error) {
        next(error)
    }
});

module.exports = authRouter;