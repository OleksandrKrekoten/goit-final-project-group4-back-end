const { User } = require("../../schema/usersMongooseSchema");
const { BadRequest } = require("http-errors");

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({
      verificationToken,
    });
    if (!user) {
      throw BadRequest("Verify token is not valid");
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });
    return res.json({
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = verifyEmail;
