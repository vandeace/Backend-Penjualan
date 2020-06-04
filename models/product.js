"use strict";
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define("product", {
    namaProduk: DataTypes.STRING,
    categoryId: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
  });
  product.associate = function (models) {
    // associations can be defined
    product.belongsTo(models.category);
    product.belongsToMany(models.order, {
      through: 'productorders',
      as: 'orders',
      foreignKey: 'productId',
    });
  };
  return product;
};
