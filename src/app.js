const express = require("express");
const path = require("path");
const app = express();
const bodyParser = express.urlencoded({ extended: true });
const configs = require("./config/globals");
const sessions = require("express-session");
const SessionStore = require("connect-mongodb-session")(sessions);
const flash = require("connect-flash");

// Routers
const rootRotue = require("./routes/root.route");
const accountRotue = require("./routes/account.route");
const downloadRotue = require("./routes/download.route");
const adminRoute = require("./routes/admin.route");
const loginRequired = require("./middlewares/login-required");
const adminRequired = require("./middlewares/admin-required");

// View Engine pug/jade
app.set("view engine", "pug");
app.set("views", path.join(__dirname, configs.templates));

// Serving files
app.use(
  configs.static_url,
  express.static(path.join(__dirname, configs.static_path))
); // Static files

app.use(
  configs.static_url,
  express.static(path.join(__dirname, configs.static_path))
); // Uploads files

// Initializing Sessions
const store = new SessionStore({
  uri: configs.db_uri,
  collection: "sessions",
});

app.use(
  bodyParser, // Body Parser
  sessions({
    // Sessions
    secret: "conquer private mode",
    saveUninitialized: false,
    resave: true,
    store,
  }),
  flash() // Flash Messages
);

app.use("/", rootRotue); // Root Application Route

app.use("/account", accountRotue); // Account Application Route

app.use("/download", downloadRotue); // Download Application Route

app.use("/admin", [loginRequired(true), adminRequired("/")], adminRoute); // Admin Pannel Application Route

/*
 * This project created by kiinno on 03/16/2023
 *
 * Whatsapp EG+2 0100-69-850-69
 *
 * Ends on 00/00/2023
 */

app.listen(configs.port, configs.host, () => {
  console.log(
    `Server is running on port ${configs.port} visit https://${configs.host}:${configs.port}/`
  );
});
