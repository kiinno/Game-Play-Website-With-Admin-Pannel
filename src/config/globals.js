const db_user = "clever01011";
const db_pass = "BDZtaZ6l0OCJOHx4";
const db_uri = `mongodb+srv://${db_user}:${db_pass}@cluster0.6zqcpni.mongodb.net/www?retryWrites=true&w=majority`;

module.exports = {
  templates: "views",
  static_url: "/assets",
  static_path: "assets",
  uploads_url: "/uploads",
  uploads_path: "uploads",
  host: "127.0.0.1",
  port: process.env.PORT || 3000,
  db_user,
  db_pass,
  db_uri,
  server_title: "KEG-CO",
};
