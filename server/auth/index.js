// TODO: add auth here
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
        const {year, month, day, about} = req.body;
        const newDate = await prisma.dates.create({
            data: {
                year,
                month,
                day,
                about
            },
        });
        res.status(201).send(newDate);
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

//PATCH /auth/bio/edit
authRouter.patch("/bio/edit", requireUser, async (req, res, next) => {
    try {
        const {about} = req.body;
        const updatedBio = await prisma.user.update({
            where: {id: req.user.id},
            data: {about: about}
        });
        res.send(updatedBio);
    } catch (error) {
        next(error)
    }
});

//PATCH /auth/policy/piano/edit
authRouter.patch("/policy/piano/edit", requireUser, async (req, res, next) => {
    try {
        const {rate30, rate45, school, summer, cm} = req.body;
        const updatedPiano = await prisma.policy.update({
            where: {instrument: "piano"},
            data: {
                rate30: rate30 || undefined,
                rate45: rate45 || undefined,
                school: school || undefined,
                summer: summer || undefined,
                cm: cm || undefined
            }
        });
        res.send(updatedPiano);
    } catch (error) {
        next(error)
    }
});

//PATCH /auth/policy/voice/edit
authRouter.patch("/policy/voice/edit", requireUser, async (req, res, next) => {
    try {
        const {rate30, rate45, school, summer, cm} = req.body;
        const updatedVoice = await prisma.policy.update({
            where: {instrument: "voice"},
            data: {
                rate30: rate30 || undefined,
                rate45: rate45 || undefined,
                school: school || undefined,
                summer: summer || undefined,
                cm: cm || undefined
            }
        });
        res.send(updatedVoice);
    } catch (error) {
        next(error)
    }
});

//PATCH /auth/dates/edit/:id
authRouter.patch("/dates/edit/:id", requireUser, async (req, res, next) => {
    try {
        const {year, month, day, about} = req.body;
        const updatedDate = await prisma.dates.update({
            where: {id: Number(req.params.id)},
            data: {
                year: year || undefined,
                month: month || undefined,
                day: day || undefined,
                about: about || undefined
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