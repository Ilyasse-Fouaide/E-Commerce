const mongoose = require("mongoose");
const config = require("../config");

const connect = async () => {
  await mongoose.connect(config.MONGO_URI)
}

module.exports = connect
