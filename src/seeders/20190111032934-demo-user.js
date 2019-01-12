'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          fullName: 'John Doe',
          userName: 'johndoe',
          email: 'johndoe@demo.com',
          password: '123456',
          isVerified: '1',
          role: 'Admin'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
