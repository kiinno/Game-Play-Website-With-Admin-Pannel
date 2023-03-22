const express = require("express");
const router = express.Router();
const context = require("../context");

router.get(/^(\/||\/home)?$/, async (req, res) => {
  res.render("www/index", await context({ page: "Home", req }));
});

router.get("/shop", async (req, res) => {
  res.render("www/layout", await context({ page: "Home", req }));
});
router.get("/requirements", async (req, res) => {
  res.render("www/layout", await context({ page: "Home", req }));
});

router.get("/rank", async (req, res) => {
  res.render("www/layout", await context({ page: "Home", req }));
});

module.exports = router;
