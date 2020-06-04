const { product, category } = require("../models");

exports.create = async (req, res) => {
  try {
    const { namaProduk,harga,quantity } = req.body;
    const totalHarga = harga * quantity 
    req.body.total = totalHarga
    const produk = await product.findOne({
      where: {
        namaProduk,
      },
    });
    if (!produk) {
      const newProduk = await product.create(req.body);
      res
        .status(200)
        .send({ message: "success create product", data: newProduk });
    } else {
      res.status(500).send({ message: "Product Already Exist!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "server internal error" });
  }
};

exports.show = async (req, res) => {
  try {
    const products = await product.findAll({
      include: [
        {
          model: category,
          attributes: ["jenisProduk"],
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "categoryId"] },
    });
    res.status(200).send({ data: products });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "server internal error" });
  }
};

exports.update = async (req, res) => {
  try {
    const products = await product.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: category,
          attributes: ["jenisProduk"],
        },
      ],

      attributes: { exclude: ["createdAt", "updatedAt", "categoryId"] },
    });
    if (products) {
      const newProduct = await product.update(req.body, {
        where: { id: req.params.id },
        include: [
          {
            model: category,
            attributes: ["jenisProduk"],
          },
        ],
        attributes: { exclude: ["createdAt", "updatedAt", "categoryId"] },
      });
      res.status(200).send({ message: "data successfully updated" });
    } else {
      res.status(404).send({ message: "data does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "server internal error" });
  }
};

exports.destroy = async (req, res) => {
    try {
      await product.destroy({ where: { id: req.params.id } });
      res.status(200).send({ status: 'success delete user' });
    } catch (error) {
      console.log(error);
      res.status(500).send({message:"Server Internal Error"})
    }
  };