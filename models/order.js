"use strict";
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    "order",
    {
      customerId: DataTypes.STRING,
      total: DataTypes.INTEGER,
    },
    {}
  );
  order.associate = function (models) {
    // associations can be defined here
    order.belongsTo(models.customer);
    order.belongsToMany(models.product, {
      through: 'productorders',
      as: 'products',
      foreignKey: 'orderId',
    });
  };
  return order;
};
