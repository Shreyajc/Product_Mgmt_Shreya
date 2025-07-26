const {
  regForm,
  register,
  loginForm,
  login,
  index,
  logout,
} = require("../controllers/adminController");

const express = require("express");

const adminRouter = express.Router();

adminRouter.get("/", regForm);
adminRouter.post("/register", register);

adminRouter.get("/login", loginForm); // shows login page
adminRouter.post("/login", login); // handles login form submission

adminRouter.get("/index", index);
adminRouter.get("/logout", logout);

module.exports = adminRouter;
