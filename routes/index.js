const express = require("express");
const router = express.Router();
const {
  create: createCustomer,
  show: showCustomer,
} = require("../controllers/customer");
const { create: createCategory } = require("../controllers/category");
const {
  create: createProduct,
  show: showAllProduct,
  update: updateProduct,
} = require("../controllers/product");
const {
  create : createTransaction,
  show : showAllTransaction,
  update : updateTransaction,
  destroy : deleteTransaction,
} = require("../controllers/transaction")

//========USER ACTION=======================
router.post("/createCust", createCustomer);
router.get("/customers", showCustomer);

router.post("/category", createCategory);

router.post("/product", createProduct);
router.get("/products", showAllProduct);
router.patch("/product/:id", updateProduct);

router.post("/transaction", createTransaction)
router.get("/transactions", showAllTransaction)
router.patch("/transaction/:id", updateTransaction)
router.delete("/transaction/:id", deleteTransaction)

module.exports = router;
