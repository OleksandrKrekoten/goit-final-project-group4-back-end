const express = require("express");
const login = require("../../controllers/auth/login.controller");
const logout = require("../../controllers/auth/logout.controller");
const register = require("../../controllers/auth/register.controller");
const { updateUserBalance } = require("../../controllers/auth/user.controller");
const verifyEmail = require("../../controllers/auth/verifyEmail");
const {
  authValidation,
  userBalanceValidation,
} = require("../../middlewares/authValidation");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const isAuth = require("../../middlewares/isAuth");

const authRouter = express.Router();

authRouter.post("/register", ctrlWrapper(authValidation), register);
authRouter.post("/login", ctrlWrapper(authValidation), login);
authRouter.get("/verify/:verificationToken", ctrlWrapper(verifyEmail));
authRouter.post("/logout", ctrlWrapper(isAuth), logout);
authRouter.patch(
  "/user",
  ctrlWrapper(isAuth),
  ctrlWrapper(userBalanceValidation),
  updateUserBalance
);

module.exports = authRouter;
