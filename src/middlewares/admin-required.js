const { default: mongoose } = require("mongoose");
const { db_uri } = require("../config/globals");
const { UserModel } = require("../models/user.model");

module.exports = (redirectTo = "/") => {
  return async (req, res, next) => {
    try {
      if (req.session.isAuthenticated && req.session.uid) {
        await mongoose.connect(db_uri);
        const { is_admin } = await UserModel.findById(req.session.uid);
        if (is_admin) {
          await mongoose.disconnect();
          next();
        } else throw new Error("Not Authenticated");
      } else throw new Error("Not Authenticated");
    } catch (error) {
      await mongoose.disconnect();
      res.redirect(redirectTo);
    }
  };
};
