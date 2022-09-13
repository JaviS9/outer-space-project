const bcrypt = require('bcrypt-nodejs')

function hashPassword () {
  const SALT_FACTOR = 8
  return bcrypt.hashSync("tfg2022", bcrypt.genSaltSync(SALT_FACTOR));
}

'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {

    let users = [
      {
        "id": "6315b6160ad8ea1299f63a87",
        "photo": "https://cdn-icons-png.flaticon.com/512/6695/6695137.png",
        "name": "Guerrero",
        "lastName": "Huff",
        "nickName": "Guerrero73",
        "email": "guerrerohuff@assistix.com",
        "biography": "Pariatur amet consequat in ullamco excepteur mollit officia. Elit id nisi magna culpa in eiusmod.",
        "password": hashPassword(),
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
      {
        "id": "6315b616f4d12815c00621f9",
        "photo": "https://cdn-icons-png.flaticon.com/512/6695/6695137.png",
        "name": "King",
        "lastName": "Calhoun",
        "nickName": "King90",
        "email": "kingcalhoun@assistix.com",
        "biography": "Incididunt consectetur consectetur amet laboris laboris magna in non ad ut cillum. Cupidatat minim ut tempor elit ullamco elit do sint fugiat.",
        "password": hashPassword(),
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
      {
        "id": "6315b61623904e58545e532a",
        "photo": "https://cdn-icons-png.flaticon.com/512/6695/6695160.png",
        "name": "Middleton",
        "lastName": "Oneal",
        "nickName": "Middleton60",
        "email": "middletononeal@assistix.com",
        "biography": "Minim excepteur cupidatat incididunt consequat eu. Id ad ex incididunt sunt officia qui deserunt sint ullamco laborum aute duis.",
        "password": hashPassword(),
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
      {
        "id": "6315b616c1dee7ccb9fffb7c",
        "photo": "https://cdn-icons-png.flaticon.com/512/6695/6695160.png",
        "name": "Valenzuela",
        "lastName": "Guy",
        "nickName": "Valenzuela64",
        "email": "valenzuelaguy@assistix.com",
        "biography": "Amet in duis aute excepteur do deserunt eiusmod ea proident eu do. Adipisicing id aute sit consectetur fugiat magna enim.",
        "password": hashPassword(),
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
      {
        "id": "6315b616bb2d9ef47af55a98",
        "photo": "https://cdn-icons-png.flaticon.com/512/6695/6695137.png",
        "name": "Hart",
        "lastName": "Chen",
        "nickName": "Hart51",
        "email": "hartchen@assistix.com",
        "biography": "Minim commodo veniam magna ullamco dolore occaecat minim reprehenderit magna qui mollit eu. Sunt deserunt commodo id sunt duis officia.",
        "password": hashPassword(),
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
      {
        "id": "6315b6167c84b52b771b26fb",
        "photo": "https://cdn-icons-png.flaticon.com/512/6695/6695211.png",
        "name": "Debora",
        "lastName": "Trujillo",
        "nickName": "Debora61",
        "email": "deboratrujillo@assistix.com",
        "biography": "Reprehenderit eu in cupidatat id excepteur nisi et. Fugiat esse irure labore ad enim occaecat quis eu minim nulla sint cillum exercitation proident.",
        "password": hashPassword(),
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
      {
        "id": "6315b6162d28a67f96b9e188",
        "photo": "https://cdn-icons-png.flaticon.com/512/6695/6695160.png",
        "name": "Madge",
        "lastName": "Burgess",
        "nickName": "Madge82",
        "email": "madgeburgess@assistix.com",
        "biography": "Labore exercitation veniam nisi labore nisi anim minim veniam elit ex nostrud. Duis commodo mollit duis sunt.",
        "password": hashPassword(),
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
      {
        "id": "6315b6162006037200ef65da",
        "photo": "https://cdn-icons-png.flaticon.com/512/6695/6695137.png",
        "name": "Myrna",
        "lastName": "Lott",
        "nickName": "Myrna90",
        "email": "myrnalott@assistix.com",
        "biography": "Sint aliquip est cillum amet consequat aliquip. Laborum qui ipsum amet reprehenderit ullamco eu non culpa excepteur officia incididunt minim et.",
        "password": hashPassword(),
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
      {
        "id": "6315b616dbae57e12349ff06",
        "photo": "https://cdn-icons-png.flaticon.com/512/6695/6695137.png",
        "name": "Briana",
        "lastName": "Valentine",
        "nickName": "Briana99",
        "email": "brianavalentine@assistix.com",
        "biography": "Elit qui anim qui minim elit reprehenderit cupidatat do labore non irure cupidatat duis. Ex dolor dolor ea aute non magna.",
        "password": hashPassword(),
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
      {
        "id": "6315b616f2f931e9172592d4",
        "photo": "https://cdn-icons-png.flaticon.com/512/6695/6695211.png",
        "name": "Gibson",
        "lastName": "Strickland",
        "nickName": "Gibson73",
        "email": "gibsonstrickland@assistix.com",
        "biography": "Velit voluptate mollit labore ullamco et aliquip labore mollit do duis. Commodo mollit tempor commodo id cillum pariatur consectetur tempor officia ullamco ad est magna adipisicing.",
        "password": hashPassword(),
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
      {
        "id": "6315b616702e129e5e32e206",
        "photo": "https://cdn-icons-png.flaticon.com/512/6695/6695160.png",
        "name": "Danielle",
        "lastName": "Estrada",
        "nickName": "Danielle62",
        "email": "danielleestrada@assistix.com",
        "biography": "Sit ex consequat dolor Lorem quis. Eiusmod nostrud ea consequat tempor est exercitation sit qui ex magna sint dolor deserunt laboris.",
        "password": hashPassword(),
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
      {
        "id": "6315b616aa66a25113caaef5",
        "photo": "https://cdn-icons-png.flaticon.com/512/6695/6695137.png",
        "name": "Katelyn",
        "lastName": "Fowler",
        "nickName": "Katelyn79",
        "email": "katelynfowler@assistix.com",
        "biography": "Exercitation ullamco deserunt tempor mollit fugiat ex aute in amet cupidatat elit. Aute nulla dolor quis minim aliqua incididunt minim sit excepteur aliquip.",
        "password": hashPassword(),
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
      {
        "id": "6315b616062736ab274c8dbe",
        "photo": "https://cdn-icons-png.flaticon.com/512/6695/6695211.png",
        "name": "Laurel",
        "lastName": "Moon",
        "nickName": "Laurel93",
        "email": "laurelmoon@assistix.com",
        "biography": "Occaecat cupidatat aliqua ut est. Excepteur excepteur officia ex officia.",
        "password": hashPassword(),
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
      {
        "id": "6315b6166dabdd0d2af0b964",
        "photo": "https://cdn-icons-png.flaticon.com/512/6695/6695160.png",
        "name": "Spears",
        "lastName": "Hughes",
        "nickName": "Spears97",
        "email": "spearshughes@assistix.com",
        "biography": "Excepteur fugiat ex Lorem laboris. Sit qui esse nulla adipisicing qui enim nisi magna.",
        "password": hashPassword(),
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
      {
        "id": "6315b616f4826588574deaab",
        "photo": "https://cdn-icons-png.flaticon.com/512/6695/6695160.png",
        "name": "Burris",
        "lastName": "Parsons",
        "nickName": "Burris98",
        "email": "burrisparsons@assistix.com",
        "biography": "Mollit amet aliquip consectetur cupidatat exercitation Lorem aute qui esse mollit sint proident eu. Commodo aliqua magna labore labore proident mollit irure enim dolor.",
        "password": hashPassword(),
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
      {
        "id": "6315b61624e7f39237c31d01",
        "photo": "https://cdn-icons-png.flaticon.com/512/6695/6695211.png",
        "name": "Guthrie",
        "lastName": "Peck",
        "nickName": "Guthrie96",
        "email": "guthriepeck@assistix.com",
        "biography": "Minim et id velit cupidatat officia commodo qui dolore eu pariatur. Eiusmod qui excepteur exercitation cillum non minim irure.",
        "password": hashPassword(),
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
      {
        "id": "6315b6161e302fc9b7f4475c",
        "photo": "https://cdn-icons-png.flaticon.com/512/6695/6695211.png",
        "name": "Mayo",
        "lastName": "Norton",
        "nickName": "Mayo73",
        "email": "mayonorton@assistix.com",
        "biography": "In cillum esse ea enim Lorem. Do magna nulla exercitation eiusmod officia commodo do.",
        "password": hashPassword(),
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
      {
        "id": "6315b616eeb37e4f0bb2086b",
        "photo": "https://cdn-icons-png.flaticon.com/512/6695/6695211.png",
        "name": "Gallegos",
        "lastName": "Cline",
        "nickName": "Gallegos81",
        "email": "gallegoscline@assistix.com",
        "biography": "Commodo laboris cillum labore magna ullamco. Fugiat consectetur et eu in laboris duis.",
        "password": hashPassword(),
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
      {
        "id": "6315b6169b2a6562dabceba9",
        "photo": "https://cdn-icons-png.flaticon.com/512/6695/6695137.png",
        "name": "Kathy",
        "lastName": "Little",
        "nickName": "Kathy92",
        "email": "kathylittle@assistix.com",
        "biography": "In proident ex consectetur anim consequat duis aliqua consequat exercitation dolore et id irure. Dolor voluptate excepteur nisi non aliqua laboris occaecat ipsum.",
        "password": hashPassword(),
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
      {
        "id": "6315b616f449dcb07d6a3639",
        "photo": "https://cdn-icons-png.flaticon.com/512/6695/6695211.png",
        "name": "Benton",
        "lastName": "Morris",
        "nickName": "Benton96",
        "email": "bentonmorris@assistix.com",
        "biography": "Velit irure commodo officia velit excepteur ad enim minim sit et deserunt. Et labore anim pariatur tempor consequat.",
        "password": hashPassword(),
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
      {
        "id": "6315b616e9c282d949b87725",
        "photo": "https://cdn-icons-png.flaticon.com/512/6695/6695160.png",
        "name": "Evangelina",
        "lastName": "Bennett",
        "nickName": "Evangelina75",
        "email": "evangelinabennett@assistix.com",
        "biography": "Ex mollit nostrud laboris nulla reprehenderit nostrud ipsum adipisicing ipsum. Proident deserunt elit reprehenderit laboris cillum ullamco veniam.",
        "password": hashPassword(),
        'createdAt': new Date(),
        'updatedAt': new Date()
      }
    ];

    await queryInterface.bulkInsert('user', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  }
};
