const mongoose = require("mongoose");

const connect = async (uri) => {
  return await mongoose.connect(uri)
}

module.exports = connect
