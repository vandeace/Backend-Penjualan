'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
 return queryInterface.bulkInsert('customers', [{
        nama: 'John Doe',
        gender:'Laki-laki',
        phone:'123456789',
        alamat:"jl.riau",
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
