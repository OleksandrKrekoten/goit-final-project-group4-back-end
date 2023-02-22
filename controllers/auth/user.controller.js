const { updateBalance } = require("../../services/userService");

const updateUserBalance = async (req, res) => {
  const { _id, token } = req.user;
  const { balance } = req.body;

  const newUserBalance = await updateBalance(_id, token, balance);

  return res.status(201).json({ newUserBalance });
};

module.exports = { updateUserBalance };
