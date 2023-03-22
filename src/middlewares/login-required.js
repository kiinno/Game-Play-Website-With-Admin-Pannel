module.exports = (loginStatus, redirectTo = "/") => {
  return (req, res, next) => {
    if ((req.session.isAuthenticated ?? false) === loginStatus) next();
    else res.redirect(redirectTo);
  };
};
