const express = require("express");
const router = express.Router();
const context = require("../context");
const express_validator = require("express-validator");
const validate = express_validator.check;
const validationResault = express_validator.validationResult;
const {
  addNewUser,
  createAuthentication,
  deleteUser,
} = require("../models/user.model");
const { loginFormValidator, signupFormValidator } = require("../validators");
const loginRequired = require("../middlewares/login-required");

router.get("/", (req, res) => {
  res.redirect("/");
});

router
  .route("/signup")
  .get(loginRequired(false), async (req, res) => {
    const signup_status = req.flash("signup_status");
    const form_errors = req.flash("form_errors");
    const form_data = req.flash("signup_form");
    res.render(
      "www/signup",
      await context({
        page: "Create New Account",
        req,
        signup_status: signup_status.length > 0 ? signup_status : null,
        form_errors,
        form_data: form_data.pop() ?? [],
      })
    );
  })
  .post(loginRequired(false), signupFormValidator, async (req, res) => {
    const _v_form = validationResault(req);
    const form_data = {
      username: req.body.username,
      password: req.body.password,
      confirm_password: req.body.confirm_password,
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    };
    if (_v_form.isEmpty()) {
      const signup_status = await addNewUser(form_data);
      if (signup_status.status) {
        req.session.uid = signup_status.data._id;
        req.session.isAuthenticated = true;
        req.session.client_ip = req.socket.remoteAddress;
        res.redirect("/");
      } else {
        req.flash("signup_status", signup_status);
        req.flash("signup_form", form_data);
        res.redirect("./signup");
      }
    } else {
      req.flash("form_errors", _v_form.array());
      req.flash("signup_form", form_data);
      res.redirect("./signup");
    }
  });

router.get("/logout", loginRequired(true), (req, res) => {
  req.session.destroy();
  res.redirect("./login");
});

router.get("/delete", loginRequired(true), async (req, res) => {
  if (req.session.isAuthenticated) {
    await deleteUser(req.session.uid);
    req.session.destroy();
  }
  res.redirect("/account/login");
});

router.get("/login", loginRequired(false), async (req, res) => {
  const flash = req.flash("login_flash");
  const form_errors = req.flash("validation");
  res.render(
    "www/login",
    await context({
      page: "Login",
      req,
      flash,
      form_errors,
    })
  );
});

router.post(
  "/login",
  loginRequired(false),
  loginFormValidator,
  async (req, res) => {
    const _v_form = validationResault(req);
    if (_v_form.isEmpty()) {
      const _auth_check = await createAuthentication(
        req.body.username,
        req.body.password
      );
      if (_auth_check.status) {
        req.session.uid = _auth_check.data._id;
        req.session.client_ip = req.socket.remoteAddress;
        req.session.isAuthenticated = true;
        res.redirect("/");
      } else {
        req.flash("login_flash", _auth_check);
        res.redirect("./login");
      }
    } else {
      req.flash("validation", _v_form.array());
      res.redirect("./login");
    }
  }
);

module.exports = router;
