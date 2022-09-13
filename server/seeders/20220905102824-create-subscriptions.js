'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
  
  let subs = [
      {
        "idUser": "6315b6160ad8ea1299f63a87",
        "idProject": "6315c40650f50380dc4839f4",
        "numSubs": 1,
        'createdAt': new Date(),
        'deletedAt': null
      },
      {
        "idUser": "6315b616c1dee7ccb9fffb7c",
        "idProject": "6315c40650f50380dc4839f4",
        "numSubs": 2,
        'createdAt': new Date(),
        'deletedAt': null
      },
      {
        "idUser": "6315b6160ad8ea1299f63a87",
        "idProject": "6315c406a5898297f9e35248",
        "numSubs": 3,
        'createdAt': new Date(),
        'deletedAt': null
      },
      {
        "idUser": "6315b6167c84b52b771b26fb",
        "idProject": "6315c406f30b6871ae58531c",
        "numSubs": 4,
        'createdAt': new Date(),
        'deletedAt': null
      },
      {
        "idUser": "6315b6160ad8ea1299f63a87",
        "idProject": "6315c4063a0060ef66a629e8",
        "numSubs": 5,
        'createdAt': new Date(),
        'deletedAt': null
      },
      {
        "idUser": "6315b616c1dee7ccb9fffb7c",
        "idProject": "6315c406f30b6871ae58531c",
        "numSubs": 6,
        'createdAt': new Date(),
        'deletedAt': null
      },
      {
        "idUser": "6315b6167c84b52b771b26fb",
        "idProject": "6315c7d11b3bca76c30277b0",
        "numSubs": 7,
        'createdAt': new Date(),
        'deletedAt': null
      },
      {
        "idUser": "6315b6162d28a67f96b9e188",
        "idProject": "6315c4063a0060ef66a629e8",
        "numSubs": 8,
        'createdAt': new Date(),
        'deletedAt': null
      },
      {
        "idUser": "6315b6167c84b52b771b26fb",
        "idProject": "6315c4063a0060ef66a629e8",
        "numSubs": 9,
        'createdAt': new Date(),
        'deletedAt': null
      },
      {
        "idUser": "6315b6162d28a67f96b9e188",
        "idProject": "6315c7d11b3bca76c30277b0",
        "numSubs": 10,
        'createdAt': new Date(),
        'deletedAt': null
      },
      {
        "idUser": "6315b616dbae57e12349ff06",
        "idProject": "6315c7d106895e27df6162d6",
        "numSubs": 11,
        'createdAt': new Date(),
        'deletedAt': null
      },
      {
        "idUser": "6315b616702e129e5e32e206",
        "idProject": "6315c7d11b3bca76c30277b0",
        "numSubs": 12,
        'createdAt': new Date(),
        'deletedAt': null
      },
      {
        "idUser": "6315b616dbae57e12349ff06",
        "idProject": "6315c7d1a6bb5e520df95222",
        "numSubs": 13,
        'createdAt': new Date(),
        'deletedAt': null
      },
      {
        "idUser": "6315b6166dabdd0d2af0b964",
        "idProject": "6315c7d106895e27df6162d6",
        "numSubs": 14,
        'createdAt': new Date(),
        'deletedAt': null
      },
      {
        "idUser": "6315b616702e129e5e32e206",
        "idProject": "6315c7d106895e27df6162d6",
        "numSubs": 15,
        'createdAt': new Date(),
        'deletedAt': null
      },
      {
        "idUser": "6315b616702e129e5e32e206",
        "idProject": "6315c7d1a6bb5e520df95222",
        "numSubs": 16,
        'createdAt': new Date(),
        'deletedAt': null
      },
      {
        "idUser": "6315b6166dabdd0d2af0b964",
        "idProject": "6315c7d11fcd6ae78fbcde8b",
        "numSubs": 17,
        'createdAt': new Date(),
        'deletedAt': null
      },
      {
        "idUser": "6315b616eeb37e4f0bb2086b",
        "idProject": "6315c7d1a6bb5e520df95222",
        "numSubs": 18,
        'createdAt': new Date(),
        'deletedAt': null
      },
      {
        "idUser": "6315b616eeb37e4f0bb2086b",
        "idProject": "6315c7d11fcd6ae78fbcde8b",
        "numSubs": 19,
        'createdAt': new Date(),
        'deletedAt': null
      }
  ]
  
  await queryInterface.bulkInsert('subscription', subs, {});
},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('subscription', null, {});
  }
};
