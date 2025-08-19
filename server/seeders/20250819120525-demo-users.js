'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Zafer Eqbal',
        email: 'najish.eqbal@gmail.com',
        password: 'Zafer1998@',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Priya Verma',
        email: 'priya.verma@example.com',
        password: 'hashedpassword2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Amit Kumar',
        email: 'amit.kumar@example.com',
        password: 'hashedpassword3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Neha Gupta',
        email: 'neha.gupta@example.com',
        password: 'hashedpassword4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Suresh Reddy',
        email: 'suresh.reddy@example.com',
        password: 'hashedpassword5',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
