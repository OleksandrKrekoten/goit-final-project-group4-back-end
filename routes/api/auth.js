const express = require("express");
const login = require("../../controllers/auth/login.controller");
const logout = require("../../controllers/auth/logOut.controller");
const register = require("../../controllers/auth/register.controller");
const verifyEmail = require("../../controllers/auth/verifyEmail");
const authValidation = require("../../middlewares/authValidation");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const isAuth = require("../../middlewares/isAuth");

const authRouter = express.Router();

authRouter.post("/register", ctrlWrapper(authValidation), register);
authRouter.post("/login", ctrlWrapper(authValidation), login);
authRouter.get("/verify/:verificationToken", ctrlWrapper(verifyEmail));
authRouter.post("/logout", ctrlWrapper(isAuth), logout);

module.exports = authRouter;
