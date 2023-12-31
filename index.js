const express = require("express");
const config = require("./config");
const connect = require("./db/connect");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./errorHandler");
// security packages
const xss = require("xss-clean");
const helmet = require("helmet");
const cors = require("cors");
// logger package
const morgan = require("morgan");
// routes
const authRouter = require("./routes/auth.router");
const userRouter = require("./routes/user.router");
const productRouter = require("./routes/product.router");
const reviewRouter = require("./routes/review.router");
// cookie parser package
const cookieParser = require("cookie-parser");
// file upload package
const fileUpload = require("express-fileupload");

const app = express();

// middlewares
app.use(morgan("tiny"));
app.use(cors({ origin: "*" }));
app.use(xss());
app.use(helmet());
app.use(cookieParser());
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// parsing multipart/form-data
app.use(fileUpload());

app.get('/', (req, res) => {
  res.status(200).json({
    message: "Hello to e-commerce api."
  })
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);

app.use(notFound);
app.use(errorHandler);

const port = config.APP_PORT || 5000;

const start = async () => {
  try {
    await connect(config.MONGO_URI);
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
  } catch (error) {
    throw new Error(error)
  }
}

start()