const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "365d" });
};

const generateTokenForPass = (email, id, token) => {
  return jwt.sign({ id: id, email: email }, token, {
    expiresIn: "35m",
  });
};

module.exports = { generateToken, generateTokenForPass };
