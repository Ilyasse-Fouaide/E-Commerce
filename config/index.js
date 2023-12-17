const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  "APP_PORT": process.env.APP_PORT,
  "MONGO_URI": process.env.MONGO_URI
}
