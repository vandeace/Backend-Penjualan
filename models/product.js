'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    namaProduk: DataTypes.STRING,
    categoryId: DataTypes.STRING,
    harga: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM,
      values: [
        'Available',
        'Sold',
      ],
      defaultValue: 'Available'
  }, });
  product.associate = function(models) {
    // associations can be defined 
    product.belongsTo(models.category)
  };
  return product;
};

