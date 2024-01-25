const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
  if (config.get("requireAuth") === false) {
    req.user = {
      _id: "5f8a1a1d3b6f8c2a9c3c2f1e",
      name: "testUser",
      email: "test@email.com",
    };
    next();
  }

  if (config.get("requireAuth") === true) {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }

    jwt.verify(token, config.get("jwtPrivateKey"), (err, decoded) => {
      if (err) {
        return res.status(400).send("Invalid token.");
      }

      req.user = decoded;
      next();
    });
  }
}

module.exports = auth;
