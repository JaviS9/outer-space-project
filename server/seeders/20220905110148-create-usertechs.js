'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
  
  let subs = [
      {
        "idUser": "6315b6160ad8ea1299f63a87",
        "idTech": "1",
      },
      {
        "idUser": "6315b616c1dee7ccb9fffb7c",
        "idTech": "2",
      },
      {
        "idUser": "6315b6160ad8ea1299f63a87",
        "idTech": "2",
      },
      {
        "idUser": "6315b6167c84b52b771b26fb",
        "idTech": "6",
      },
      {
        "idUser": "6315b6160ad8ea1299f63a87",
        "idTech": "5",
      },
      {
        "idUser": "6315b616c1dee7ccb9fffb7c",
        "idTech": "4",
      },
      {
        "idUser": "6315b6167c84b52b771b26fb",
        "idTech": "1",
      },
      {
        "idUser": "6315b6162d28a67f96b9e188",
        "idTech": "1",
      },
      {
        "idUser": "6315b6167c84b52b771b26fb",
        "idTech": "3",
      },
      {
        "idUser": "6315b6162d28a67f96b9e188",
        "idTech": "7",

      },
      {
        "idUser": "6315b616dbae57e12349ff06",
        "idTech": "7",

      },
      {
        "idUser": "6315b616702e129e5e32e206",
        "idTech": "1",

      },
      {
        "idUser": "6315b616dbae57e12349ff06",
        "idTech": "9",

      },
      {
        "idUser": "6315b6166dabdd0d2af0b964",
        "idTech": "5",

      },
      {
        "idUser": "6315b616702e129e5e32e206",
        "idTech": "2",

      },
      {
        "idUser": "6315b616702e129e5e32e206",
        "idTech": "6",

      },
      {
        "idUser": "6315b6166dabdd0d2af0b964",
        "idTech": "4",

      },
      {
        "idUser": "6315b616eeb37e4f0bb2086b",
        "idTech": "1",

      },
      {
        "idUser": "6315b616eeb37e4f0bb2086b",
        "idTech": "9",

      }
  ]
  
  await queryInterface.bulkInsert('usertech', subs, {});
},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usertech', null, {});
  }
};
