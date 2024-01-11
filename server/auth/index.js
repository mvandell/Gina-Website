// TODO: add auth here
import prisma from '../db/client';
const express = require('express');
const authRouter = express.Router();
const {requireAdmin} = require('./utils');

const jwt = require("jsonwebtoken");
const {JWT_SECRET} = process.env;

const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

//POST login
authRouter.post("/login", async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const admin = await prisma.admin.findUnique({
            where: {
                username: username
            },
        });

        const validPassword = await bcrypt.compare(
            password,
            user?.password ?? ""
        );

        //Check admin and password
        if (!admin) {
            return res.status(401).send("There is no admin with that username.");
        } else if (!validPassword) {
            return res.status(401).send("Incorrect password.");
        }

        //Create token
        const token = jwt.sign({id: admin.id}, process.env.JWT_SECRET);
        res.send({token});
        console.log("Login successful!");
    } catch (error) {
        next(error);
    }
});

//POST dates
authRouter.post("/dates", requireAdmin, async (req, res, next) => {
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

//PATCH admin
authRouter.patch("/account/:id/edit", requireAdmin, async (req, res, next) => {
    try {
        const {username, password, email, phone} = req.body;
        let hashedPassword = "";
        if (password !== null) {
            hashedPassword = await bcrypt.hash(password, SALT_COUNT);
        }

        const updatedAdmin = await prisma.admin.update({
            where: {id: req.user.id},
            data: {
                username: username || undefined,
                password: hashedPassword || undefined,
                email: email || undefined,
                phone: phone || undefined
            }
        });
        delete updatedAdmin.password;
        res.send("Admin successfully updated");
    } catch (error) {
        next(error)
    }
});

//PATCH bio
authRouter.patch("/bio/edit", requireAdmin, async (req, res, next) => {
    try {
        const {about} = req.body;
        const updatedBio = await prisma.admin.update({
            where: {id: req.user.id},
            data: {about: about}
        });
        res.send(updatedBio);
    } catch (error) {
        next(error)
    }
});

//PATCH piano policy
authRouter.patch("/policy/piano/edit", requireAdmin, async (req, res, next) => {
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

//PATCH voice policy
authRouter.patch("/policy/voice/edit", requireAdmin, async (req, res, next) => {
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

//PATCH dates
authRouter.patch("/dates/edit/:id", requireAdmin, async (req, res, next) => {
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


//DELETE dates
authRouter.delete("/dates/:id", requireAdmin, async (req, res, next) => {
    try {
       const deletedDate = await prisma.dates.delete({
        where: {id: Number(req.params.id)},
       });
       if (!deletedDate) {
        return res.status(404).send("Date not found!");
       }
       res.send(deletedDate);
    } catch (error) {
        next(error)
    }
});
