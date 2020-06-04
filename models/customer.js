"use strict";
module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define(
    "customer",
    {
      nama: DataTypes.STRING,
      gender: DataTypes.STRING,
      phone: DataTypes.STRING,
      alamat: DataTypes.STRING,
    },
    {}
  );
  customer.associate = function (models) {
    // associations can be defined here
    customer.hasMany(models.order);
  };
  return customer;
};
