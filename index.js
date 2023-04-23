const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

const port = 8000;
const db = require("./config/mongoose");
const userRoutes = require("./api/routes/user");
const TodoRoutes = require("./api/routes/todo");
app.use(morgan("dev"));

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//grab JSON off the body
app.use(bodyParser.json());
//middleware
app.use(express.json());

//Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/todo", TodoRoutes);

app.get("/", function (req, res) {
  res.end("<h1> App is Running</h1>");
});

app.listen(port, function (err) {
  if (err) {
    console.log(`${err}`);
    return;
  }
  console.log(`Server has been started at ${port}`);
});
