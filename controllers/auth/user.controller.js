const createError = require("http-errors");
const {
  updateBalance,
  getBalance,
  getUser,
} = require("../../services/userService");

const getCurrentUser = async (req, res, next) => {
  if (!req.user) return next(createError(404, "No users found"));
  if (!req.user.token) return next(createError(401, "Not authorized"));

  const { _id, token } = req.user;

  const { email, balance } = await getUser(_id, token);
  return res.status(201).json({ email, balance });
};

const updateUserBalance = async (req, res, next) => {
  if (!req.user) return next(createError(404, "No users found"));
  if (!req.user.token) return next(createError(401, "Not authorized"));

  const { _id, token } = req.user;
  const { balance } = req.body;

  const newUserBalance = await updateBalance(_id, token, balance);

  return res.status(201).json({ newUserBalance });
};

const getUserBalance = async (req, res, next) => {
  if (!req.user) return next(createError(404, "No users found"));
  if (!req.user.token) return next(createError(401, "Not authorized"));

  const balance = await getBalance(req.user);

  return res.status(201).json({ balance });
};

module.exports = { getCurrentUser, updateUserBalance, getUserBalance };
