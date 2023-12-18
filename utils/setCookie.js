const config = require("../config");

const setCookie = (res, token) => {
  res.cookie("refresh_token", token, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),  // 1 day same as JWT_LIFETIME
    secure: config.NODE_ENV === "production"
  })
}

module.exports = setCookie
