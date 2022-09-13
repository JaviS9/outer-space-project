'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    let techs = [
      {
        "id": 1,
        "name": "Reilly",
        "type": "framework",
        "photo": "https://cdn-icons-png.flaticon.com/512/745/745437.png"
      },
      {
        "id": 2,
        "name": "Conway",
        "type": "framework",
        "photo": "https://cdn-icons-png.flaticon.com/512/745/745437.png"
      },
      {
        "id": 3,
        "name": "Townsend",
        "type": "framework",
        "photo": "https://cdn-icons-png.flaticon.com/512/745/745437.png"
      },
      {
        "id": 4,
        "name": "Tillman",
        "type": "framework",
        "photo": "https://cdn-icons-png.flaticon.com/512/745/745437.png"
      },
      {
        "id": 5,
        "name": "Mccullough",
        "type": "lenguaje",
        "photo": "https://cdn-icons-png.flaticon.com/512/1005/1005141.png"
      },
      {
        "id": 6,
        "name": "Terry",
        "type": "librería",
        "photo": "https://pngfreepic.com/wp-content/uploads/2021/04/book-icon-png-freepic-15.png"
      },
      {
        "id": 7,
        "name": "Richard",
        "type": "API",
        "photo": "https://cdn-icons-png.flaticon.com/512/603/603197.png"
      },
      {
        "id": 8,
        "name": "Aguirre",
        "type": "API",
        "photo": "https://cdn-icons-png.flaticon.com/512/603/603197.png"
      },
      {
        "id": 9,
        "name": "Mullins",
        "type": "framework",
        "photo": "https://cdn-icons-png.flaticon.com/512/745/745437.png"
      }
    ]

    await queryInterface.bulkInsert('tech', techs,{});
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('tech', null, {});
  }
};
