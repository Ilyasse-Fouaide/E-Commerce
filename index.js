const express = require("express");
const config = require("./config");
const connect = require("./db/connect");

const app = express();

const port = config.APP_PORT || 5000

const start = async () => {
  try {
    await connect();
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
  } catch (error) {
    throw new Error(error)
  }
}

start()