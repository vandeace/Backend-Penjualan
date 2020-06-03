'use strict';
module.exports = (sequelize, DataTypes) => {
  const jual = sequelize.define('jual', {
    customerId: DataTypes.STRING,
    productId: DataTypes.STRING,
    total: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  jual.associate = function(models) {
    // associations can be defined here
    jual.belongsTo(models.customer);
  };
  return jual;
};
