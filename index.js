const express = require("express");
const config = require("./config");
const app = express();

const port = config.APP_PORT

const start = () => {
  try {
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
  } catch (error) {
    throw new Error(error)
  }
}

start()