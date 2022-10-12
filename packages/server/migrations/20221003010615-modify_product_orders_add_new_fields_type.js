"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Product_Orders", "type", {
      type: Sequelize.ENUM("Medicine", "Chemical Raw"),
      after: "quantity",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Product_Orders", "type");
  },
};
