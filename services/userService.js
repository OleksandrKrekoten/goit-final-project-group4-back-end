const { User } = require("../schema/usersMongooseSchema");
const createError = require("http-errors");

const updateBalance = async (_id, token, balance) => {
  const user = await User.findOneAndUpdate(
    { _id, token },
    { $set: { balance } },
    { new: true }
  );
  if (!user) {
    return next(createError(404, "User doesn't exist or unauthorized"));
  }
  return user.balance;
};

module.exports = {
  updateBalance,
};
