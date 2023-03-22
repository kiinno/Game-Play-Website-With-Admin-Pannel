const express = require("express");
const router = express.Router();
const context = require("../context");
const path = require("path");

router.get("/client", async (req, res) => {
  res.render("www/layout", await context({ page: "Download Client", req }));
});

router.get("/client/get", async (req, res) => {
  res.download(path.join(__dirname, "..", "downloads", "conquer.exe"));
});

router.get("/patch", async (req, res) => {
  res.render("www/layout", await context({ page: "Download Patch", req }));
});

router.get("/patch/get", async (req, res) => {
  res.download(path.join(__dirname, "..", "downloads", "conquer-patch.zip"));
});

module.exports = router;
