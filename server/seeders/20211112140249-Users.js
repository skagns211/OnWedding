'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      password: '930211',
      email: 'skagns211@gmail.com',
      name: 'kimnamhun',
      nickname: 'BMW',
      birth: '930211',
      mobile: '01066043674',
      image: '',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      password: '941021',
      email: 'ionc635@gmail.com',
      name: 'kimjongseo',
      nickname: 'AUDI',
      birth: '941021',
      mobile: '01095151257',
      image: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
