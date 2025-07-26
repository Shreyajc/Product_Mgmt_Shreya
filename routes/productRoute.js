const {
  addProduct,
  editProduct,
  edit,
  deleteProduct,
} = require("../controllers/productController");

const express = require("express");
const productRouter = express.Router();

productRouter.get("/add", (req, resp) => {
  resp.render("add");
});

productRouter.post("/add", addProduct);

productRouter.get("/edit/:id", edit);
productRouter.post("/update/:id", editProduct);

productRouter.post("/delete/:id", deleteProduct);

module.exports = productRouter;
