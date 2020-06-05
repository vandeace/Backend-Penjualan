const express = require("express");
const router = express.Router();
const {
  create: createCustomer,
  show: showCustomer,
  update: updateCostumer,
  destroy: deleteCustomer,
} = require("../controllers/customer");
const { create: createCategory,show: showAllCategory } = require("../controllers/category");
const {
  create: createProduct,
  show: showAllProduct,
  getOne : getOneProduct,
  update: updateProduct,
  destroy: deleteProduct,
} = require("../controllers/product");
const {
  create: createTransaction,
  show: showAllTransaction,
  update: updateTransaction,
  destroy: deleteTransaction,
  showOne: showOneTransaction,
} = require("../controllers/transaction");

//========USER ACTION=======================
router.post("/customer", createCustomer);
router.get("/customers", showCustomer);
router.patch("/customer/:id", updateCostumer);
router.delete("/customer/:id", deleteCustomer);

router.post("/category", createCategory);
router.get("/categories", showAllCategory)

router.post("/product", createProduct);
router.get("/products", showAllProduct);
router.get("/product/:id", getOneProduct);
router.patch("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

router.post("/transaction", createTransaction);
router.get("/transactions", showAllTransaction);
router.get("/transaction/:id", showOneTransaction);
router.patch("/transaction/:id", updateTransaction);
router.delete("/transaction/:id", deleteTransaction);

module.exports = router;
