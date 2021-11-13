"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Articles", [
      {
        title: "종서❤️태형",
        message: "둘의 사랑, 이루어 질 수 있을까요?",
        image: "",
        total_comment: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Articles", null, {});
  },
};
