import prisma from "../db/client";
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = process.env;

//Authorization Middleware
const authMiddleware = async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) {
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
        try {
            const {id} = jwt.verify(token, JWT_SECRET);

            if (id) {
                req.user = await prisma.admin.findUnique({
                    where: {id}
                });
                next();
            } else {
                next({
                    name: 'AuthorizationHeaderError',
                    message: 'Authorization token malformed',
                });
            }
        } catch ({name, message}) {
            next({name, message});
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${prefix}`,
        });
    }
};

//No Admin Error
const requireAdmin = (req, res, next) => {
    if (!req.user) {
        res.status(401).send("Sorry, you don't have permission to do that.")
    }
    next();
};

module.exports = {
    requireAdmin,
    authMiddleware
}