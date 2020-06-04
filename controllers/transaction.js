const {
  customer,
  product,
  order,
  category,
  productOrder,
} = require("../models");

exports.create = async (req, res) => {
  try {
    const savedOrder = await order.create(
      req.body,
      { w: 1 },
      { returning: true }
    );

    let price = 0;

    //cek every products
    req.body.products.map(async (item) => {
      //check if the product match with item.id
      const produk = await product.findByPk(item.id);
      //check if product available
      if (!produk) {
        res.status(400).send({ message: "CANT FIND ID" });
      }
      //check if quantity item no more than product quantity stock
      if (item.quantity > produk.quantity) {
        res.status(400).send({ message: "Quantity cart more than stock" });
      }
      //make total price for each item
      const totalHarga = item.quantity * produk.harga;

      price = price + totalHarga;

      //put data to an object
      const po = {
        orderId: savedOrder.id,
        productId: item.id,
        quantity: item.quantity,
        total: totalHarga,
      };
      //make balance
      const newOrder = await order.update(
        {
          total: price,
        },
        { where: { id: savedOrder.id } }
      );

      const balance = produk.quantity - item.quantity;
      //put balance
      const data = { quantity: balance };
      const newBalance = await product.update(data, { where: { id: item.id } });

      const savedProductOrder = await productOrder.create(
        po,
        { w: 1 },
        { returning: true }
      );
    });
    res.status(200).send({ message: "data successfully added!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Internal Error" });
  }
};

exports.show = async (req, res) => {
  try {
    const transactions = await order.findAll({
      include: [
        {
          model: customer,
          attributes: ["nama"],
        },
        {
          model: product,
          as: "products",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "quantity",
              "total",
              "categoryId",
            ],
          },
          through: {
            model: productOrder,
            attributes: {
              exclude: ["createdAt", "updatedAt", "productId", "orderId"],
            },
          },
          include: [
            {
              model: category,
              attributes: ["jenisProduk"],
            },
          ],
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "customerId"] },
      order: [["id", "DESC"]],
    });
    res.status(200).send({ transactions });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Internal Error" });
  }
};

exports.update = async (req, res) => {
  try {
    //get data from database
    const data = await order.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: customer,
          attributes: ["nama"],
        },
        {
          model: product,
          as: "products",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "quantity",
              "total",
              "categoryId",
            ],
          },
          through: {
            model: productOrder,
            attributes: {
              exclude: ["createdAt", "updatedAt", "productId", "orderId"],
            },
          },
          include: [
            {
              model: category,
              attributes: ["jenisProduk"],
            },
          ],
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "customerId"] },
    });
    //check data first
    if (!data) {
      res.status(400).send({ message: "data not found" });
    }
    //remove all in products
    const products = await data.getProducts();
    data.removeProducts(products);

    let price = 0;

    req.body.products.map(async (item) => {
      //check if the product match with item.id
      const produk = await product.findByPk(item.id);

      //check if product available
      if (!produk) {
        res.status(400).send({ message: "CANT FIND ID" });
      }

      const totalHarga = item.quantity * produk.harga;

      price = price + totalHarga;

      const po = {
        orderId: data.id,
        productId: item.id,
        quantity: item.quantity,
        total: totalHarga,
      };

      const newOrder = await order.update(
        {
          total: price,
        },
        { where: { id: data.id } }
      );

      const savedProductOrder = await productOrder.create(
        po,
        { w: 1 },
        { returning: true }
      );
    });

    const updatedOrder = await order.update(
      {
        customerId: req.body.customerId || data.customerId,
        total: price,
      },
      { where: { id: req.params.id } }
    );

    res.status(200).send({ message: "success update data", data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "server internal error" });
  }
};

exports.destroy = async (req, res) => {
  try {
    const data = await order.findByPk(req.params.id);

    //remove all in products
    const products = await data.getProducts();
    data.removeProducts(products);

    const deleteOrder = await order.destroy({
      where: { id: req.params.id },
    });

    res.status(200).send({ message: "success to delete data!" });
  } catch (error) {
    res.status(500).send({ message: "Failed to delete data!" });
    console.log(error);
  }
};
