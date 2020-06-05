const { customer } = require("../models");

exports.create = async (req, res) => {
  try {
    const { nama } = req.body;
    const users = await customer.findOne({
      where: {
        nama,
      },
    });
    if (!users) {
      const newUser = await customer.create(req.body);
      res.status(200).send({ newUser });
    } else {
      res.status(500).send({ message: "Customer Already Exist!" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.show = async (req, res) => {
  try {
    const users = await customer.findAll();
    res.send({ data: users });
  } catch (error) {
    console.log(error);
  }
};

exports.update = async (req, res) => {
  try {
    await customer.update(req.body, { where: { id: req.params.id } });
    const users = await customer.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.status(200).send({ data: users });
    if (!dataCust) {
      res.status(500).send({ message: "Customer Doesnt Exist!" });
    }

    const updateCust = await customer.findOne();
  } catch (error) {
    console.log(error);
  }
};

exports.destroy = async (req, res) => {
  try {
    await customer.destroy({ where: { id: req.params.id } });
    const delCustomer = await customer.findOne({
      where: { id: req.params.id },
    });
    if(delCustomer){
      res.status(500).send({message:"ERROR DELETE USER"})
    }
    res.status(200).send({message:"success delete customer"})
  } catch (error) {
    console.log(error);
  }
};
