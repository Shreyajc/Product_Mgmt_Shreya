const productModel = require("../models/productModel");

// insert
const addProduct = async (req, resp) => {
  if (!req.session.email) {
    return resp.redirect("/login");
  }

  try {
    const { name, category, price, quantity, description } = req.body;
    await productModel.create({ name, category, price, quantity, description });
    resp.redirect("/index");
  } catch (error) {
    console.log(error);
    resp.send("Error while adding product.");
  }
};

// edit
const editProduct = async (req, resp) => {
  try {
    const { name, category, price, quantity, description } = req.body;
    await productModel.findByIdAndUpdate(req.params.id, {
      name,
      category,
      price,
      quantity,
      description,
    });
    resp.redirect("/index");
  } catch (error) {
    console.log(error);
  }
};

const edit = async (req, resp) => {
  try {
    const product = await productModel.findById(req.params.id);
    resp.render("edit", { product });
  } catch (error) {
    console.log(error);
  }
};

// delete
const deleteProduct = async (req, resp) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    resp.redirect("/index");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addProduct, editProduct, edit, deleteProduct };
