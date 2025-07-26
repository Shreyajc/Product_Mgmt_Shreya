const adminModel = require("../models/adminModel");
const productModel = require("../models/productModel");
const bcrypt = require("bcryptjs");

const regForm = (req, resp) => {
  resp.render("register");
};

const register = async (req, resp) => {
  try {
    const { email, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);
    await adminModel.create({ email, password: hashpassword });
    resp.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};

const loginForm = async (req, resp) => {
  resp.render("login");
};

const login = async (req, resp) => {
  try {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      req.session.email = email;
      resp.redirect("/index");
    }
  } catch (error) {
    console.log(error);
  }
};

const index = async (req, resp) => {
  if (req.session.email) {
    const products = await productModel.find();
    resp.render("index", { email: req.session.email, products });
  } else {
    resp.redirect("/login");
  }
};

const logout = async (req, resp) => {
  req.session.destroy(() => {
    resp.redirect("/login");
  });
};

module.exports = { regForm, register, loginForm, login, index, logout };
