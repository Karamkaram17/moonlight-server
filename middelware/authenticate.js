function authenticate(req, res, next) {
  if (!req.cookies.sessionId) {
    return res.status(401).redirect("/login");
  }
  next();
}

module.exports = { authenticate };
