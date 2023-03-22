const express = require("express");
const router = express.Router();
const context = require("../context");
const mongoose = require("mongoose");
const { UserModel } = require("../models/user.model");
const { db_uri } = require("../config/globals");
router.get("/", async (req, res) => {
  res.render(
    "admin/index",
    await context({ page: "Home", route_title: "Admin Pannel", req })
  );
});

router.get("/users", async (req, res) => {
  try {
    await mongoose.connect(db_uri);
    res.render(
      "admin/users",
      await context({
        page: "Users",
        route_title: "Admin Pannel",
        req,
        data: await UserModel.find({}),
      })
    );
  } catch (error) {
    console.log("Error From Admin Route", error);
  } finally {
    await mongoose.disconnect();
  }
});

router.get("/sessions", async (req, res) => {
  try {
    await mongoose.connect(db_uri);
    res.render(
      "admin/sessions",
      await context({
        page: "Users",
        route_title: "Admin Pannel",
        req,
        data: await mongoose.connection.db
          .collection("sessions")
          .find({})
          .toArray(),
      })
    );
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
  }
});

module.exports = router;
