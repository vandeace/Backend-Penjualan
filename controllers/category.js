const { category } = require("../models");

exports.create = async (req, res) => {
  try {
    const { jenisProduk } = req.body;
    const cate = await category.findOne({
      where: {
        jenisProduk,
      },
    });
    if (!cate) {
      const newCat = await category.create(req.body);
      res.status(200).send({ message: "success make data", data: newCat });
    } else {
      res.status(402).send({ message: "data already exist!" });
    }
  } catch (error) {
    res.status(500).send({ message: "Server Internal Error" });
    console.log(error);
  }
};
