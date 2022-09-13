const bcrypt = require('bcrypt-nodejs')

function hashPassword () {
  const SALT_FACTOR = 8
  return bcrypt.hashSync("tfg2022", bcrypt.genSaltSync(SALT_FACTOR));
}

'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
  
  let admins = [
    {
      "id": "6315cd1a3de4da8b6dcac105",
      "name": "Maddox",
      "lastName": "Espinoza",
      "email": "admin1@osp-company.com",
      "password": hashPassword(),
      'createdAt': new Date(),
      'updatedAt': new Date()
    },
    {
      "id": "6315cd1a4721b5f82f05b8f9",
      "name": "Adkins",
      "lastName": "Fitzpatrick",
      "email": "admin2@osp-company.com",
      "password": hashPassword(),
      'createdAt': new Date(),
      'updatedAt': new Date()
    },
    {
      "id": "6315cd1adbed7caa6b655bae",
      "name": "Sheryl",
      "lastName": "Cote",
      "email": "admin3@osp-company.com",
      "password": hashPassword(),
      'createdAt': new Date(),
      'updatedAt': new Date()
    },
    {
      "id": "6315cd1aca0007cfad1eb051",
      "name": "Skinner",
      "lastName": "Peck",
      "email": "admin4@osp-company.com",
      "password": hashPassword(),
      'createdAt': new Date(),
      'updatedAt': new Date()
    },
    {
      "id": "6315cd1a4cebce26641b932d",
      "name": "Silva",
      "lastName": "Jefferson",
      "email": "admin5@osp-company.com",
      "password": hashPassword(),
      'createdAt': new Date(),
      'updatedAt': new Date()
    },
    {
      "id": "6315cd1adbc37e458145293e",
      "name": "Bird",
      "lastName": "Barlow",
      "email": "admin6@osp-company.com",
      "password": hashPassword(),
      'createdAt': new Date(),
      'updatedAt': new Date()
    },
    {
      "id": "6315cd1a19784ea29d4278aa",
      "name": "Greene",
      "lastName": "Wallace",
      "email": "admin7@osp-company.com",
      "password": hashPassword(),
      'createdAt': new Date(),
      'updatedAt': new Date()
    },
    {
      "id": "6315cd1abd4059384f09156a",
      "name": "Hill",
      "lastName": "Walton",
      "email": "admin8@osp-company.com",
      "password": hashPassword(),
      'createdAt': new Date(),
      'updatedAt': new Date()
    },
    {
      "id": "6315cd1ab0e9556bd00f6d7d",
      "name": "Cruz",
      "lastName": "Hahn",
      "email": "admin9@osp-company.com",
      "password": hashPassword(),
      'createdAt': new Date(),
      'updatedAt': new Date()
    },
    {
      "id": "6315cd1a6facce170a4de16c",
      "name": "Bianca",
      "lastName": "Richmond",
      "email": "admin10@osp-company.com",
      "password": hashPassword(),
      'createdAt': new Date(),
      'updatedAt': new Date()
    }
  ]
  
  await queryInterface.bulkInsert('admin', admins, {});
},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admin', null, {});
  }
};
