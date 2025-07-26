const express = require("express");
const session = require("express-session");
const connectDB = require("./db/db");
const methodOverride = require("method-override");
const adminRoute = require("./routes/adminRoute");
const productRoute = require("./routes/productRoute");

const app = express();
connectDB();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "shreya",
    saveUninitialized: false,
    resave: false,
  })
);
app.use(methodOverride("_method"));
app.use("/", adminRoute);
app.use("/", productRoute);

app.listen(4000, () => {
  console.log("running");
});
