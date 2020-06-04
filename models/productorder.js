'use strict';
module.exports = (sequelize, DataTypes) => {
  const productOrder = sequelize.define('productOrder', {
    productId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    quantity: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL,
  }, {});
  productOrder.associate = function(models) {
    // associations can be defined here
  };
  return productOrder;
};