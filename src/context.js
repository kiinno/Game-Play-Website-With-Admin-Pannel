const configs = require("./config/globals");
const { getUserByID } = require("./models/user.model");
module.exports = async (options) => {
  let auth, session;
  if (options.req.session?.isAuthenticated) {
    if (options.req.session?.client_ip === options.req.socket.remoteAddress) {
      auth = await getUserByID(options.req.session.uid);
      session = options.req.session ?? null;
    }
  }
  const context = {
    static_url(url) {
      return configs.static_url + "/" + url;
    },

    uploads_url(url) {
      return configs.uploads_url + "/" + url;
    },

    getFieldValue(field_name, error_list, form_data) {
      return error_list.some((field) => field.param === field_name)
        ? ""
        : form_data[field_name];
    },
    req: options.req,
    server_title: configs.server_title,
    route_title: "",
    page: null,

    params:
      Object.keys(options.req.params).length > 0 ? options.req.params : null,

    query: options.req.query ?? null,

    auth,
    session,

    flash: [],

    socket: options.req.socket.address(),

    client: {
      address: options.req.socket.remoteAddress,
      family: options.req.socket.remoteFamily,
      port: options.req.socket.remotePort,
    },

    developer: {
      name: "kiinno",
      whatsapp: "+201006985069",
    },
  };
  return Object.assign(context, options);
};
