const express = require('express');
const authRouter = express.Router();
const {requireUser} = require('./utils');

const jwt = require("jsonwebtoken");
const {JWT_SECRET} = process.env;

const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//GET /auth/account
authRouter.get("/account", requireUser, async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        });
        delete user.password;
        res.send(user);
    } catch (error) {
        next(error);
    }
})

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

//POST /auth/policy/add
authRouter.post("/policy/add", requireUser, async (req, res, next) => {
    try {
        const {instrument, heading} = req.body;
        const newPolicy = await prisma.policy.create({
            data: {
                instrument,
                heading
            },
        });
        res.status(201).send(newPolicy);
    } catch (error) {
        next(error);
    }
});

//POST /auth/policy/content/add
authRouter.post("/policy/content/add", requireUser, async (req, res, next) => {
    try {
        const {instrument, headingId, content} = req.body;
        const newPolicyContent = await prisma.policy.create({
            data: {
                instrument,
                headingId,
                content
            },
        });
        res.status(201).send(newPolicyContent);
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

//PATCH /auth/policy/:id/edit
authRouter.patch("/policy/:id/edit", requireUser, async (req, res, next) => {
    try {
        const {instrument, heading} = req.body;
        const updatedPolicy = await prisma.policy.update({
            where: {id: Number(req.params.id)},
            data: {
                instrument: instrument || undefined,
                heading: heading || undefined
            }
        });
        res.send(updatedPolicy);
    } catch (error) {
        next(error)
    }
});

//PATCH /auth/policy/content/:id/edit
authRouter.patch("/policy/content/:id/edit", requireUser, async (req, res, next) => {
    try {
        const {instrument, headingId, content} = req.body;
        const updatedPolicyContent = await prisma.policy.update({
            where: {id: Number(req.params.id)},
            data: {
                instrument: instrument || undefined,
                headingId: headingId || undefined,
                content: content || undefined
            }
        });
        res.send(updatedPolicyContent);
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

//DELETE /auth/policy/:id
authRouter.delete("/policy/:id", requireUser, async (req, res, next) => {
    try {
       const deletedPolicy = await prisma.policy.delete({
        where: {id: Number(req.params.id)},
       });
       if (!deletedPolicy) {
        return res.status(404).send("Policy not found!");
       }
       console.log("deleted policy");
       res.send(deletedPolicy);
    } catch (error) {
        next(error)
    }
});

module.exports = authRouter;