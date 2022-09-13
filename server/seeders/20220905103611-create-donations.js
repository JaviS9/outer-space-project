var CryptoJS = require("crypto-js");

function encrypt (text) {
  return CryptoJS.AES.encrypt(text, 'SecretPas)sphrase').toString()
}

'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
  
  let dona = [
    {
      "id": 1,
      "idSubscription": 19,
      "cardName": encrypt("Patsy Delgado"),
      "cardNumber": encrypt("2980850321947390"),
      "cardExpirationDate": encrypt("09/25"),
      "date": "2021-05-15 12:39:52",
      "donation": 6588.76
    },
    {
      "id": 2,
      "idSubscription": 11,
      "cardName": encrypt("Joseph Lawson"),
      "cardNumber": encrypt("5150632723331178"),
      "cardExpirationDate": encrypt("09/25"),
      "date": "2022-07-04 11:00:09",
      "donation": 3172.71
    },
    {
      "id": 3,
      "idSubscription": 4,
      "cardName": encrypt("Penny Horne"),
      "cardNumber": encrypt("2330608879092242"),
      "cardExpirationDate": encrypt("09/25"),
      "date": "2020-01-21 09:13:02",
      "donation": 3674.46
    },
    {
      "id": 4,
      "idSubscription": 12,
      "cardName": encrypt("Beryl Fleming"),
      "cardNumber": encrypt("8235663322652884"),
      "cardExpirationDate": encrypt("09/25"),
      "date": "2021-02-14 10:00:59",
      "donation": 9601.17
    },
    {
      "id": 5,
      "idSubscription": 12,
      "cardName": encrypt("Olsen Hart"),
      "cardNumber": encrypt("9903382046619432"),
      "cardExpirationDate": encrypt("09/25"),
      "date": "2020-02-20 06:04:13",
      "donation": 8250.88
    },
    {
      "id": 6,
      "idSubscription": 15,
      "cardName": encrypt("Francine Pope"),
      "cardNumber": encrypt("2622407949500060"),
      "cardExpirationDate": encrypt("09/25"),
      "date": "2020-03-11 12:01:47",
      "donation": 9944.58
    },
    {
      "id": 7,
      "idSubscription": 3,
      "cardName": encrypt("Berger Frye"),
      "cardNumber": encrypt("5154047389004348"),
      "cardExpirationDate": encrypt("09/25"),
      "date": "2022-06-03 02:27:26",
      "donation": 3029.87
    },
    {
      "id": 8,
      "idSubscription": 16,
      "cardName": encrypt("Ida Powell"),
      "cardNumber": encrypt("5364574704887742"),
      "cardExpirationDate": encrypt("09/25"),
      "date": "2021-04-26 05:57:58",
      "donation": 4640.43
    },
    {
      "id": 9,
      "idSubscription": 6,
      "cardName": encrypt("Violet Murphy"),
      "cardNumber": encrypt("7442965072202624"),
      "cardExpirationDate": encrypt("09/25"),
      "date": "2021-11-06 11:14:55",
      "donation": 3607.01
    },
    {
      "id": 10,
      "idSubscription": 3,
      "cardName": encrypt("Alicia Swanson"),
      "cardNumber": encrypt("6645824365291342"),
      "cardExpirationDate": encrypt("09/25"),
      "date": "2022-04-10 08:41:38",
      "donation": 9110.92
    },
    {
      "id": 11,
      "idSubscription": 4,
      "cardName": encrypt("Bethany Campbell"),
      "cardNumber": encrypt("8048855744512742"),
      "cardExpirationDate": encrypt("09/25"),
      "date": "2022-04-29 04:06:40",
      "donation": 9690.4
    },
    {
      "id": 12,
      "idSubscription": 15,
      "cardName": encrypt("Hudson Juarez"),
      "cardNumber": encrypt("8610199264190130"),
      "cardExpirationDate": encrypt("09/25"),
      "date": "2020-12-15 09:31:20",
      "donation": 3671.99
    },
    {
      "id": 13,
      "idSubscription": 10,
      "cardName": encrypt("Savannah Pate"),
      "cardNumber": encrypt("5804273755520188"),
      "cardExpirationDate": encrypt("09/25"),
      "date": "2020-11-13 04:56:22",
      "donation": 4632.18
    },
    {
      "id": 14,
      "idSubscription": 5,
      "cardName": encrypt("Gregory Turner"),
      "cardNumber": encrypt("2116726261983514"),
      "cardExpirationDate": encrypt("09/25"),
      "date": "2020-08-03 07:40:39",
      "donation": 3962.58
    },
    {
      "id": 15,
      "idSubscription": 17,
      "cardName": encrypt("Jennings Miles"),
      "cardNumber": encrypt("9787010721802370"),
      "cardExpirationDate": encrypt("09/25"),
      "date": "2021-09-16 01:00:29",
      "donation": 1862.34
    },
    {
      "id": 16,
      "idSubscription": 9,
      "cardName": encrypt("Floyd Hayden"),
      "cardNumber": encrypt("6811931137057566"),
      "cardExpirationDate": encrypt("09/25"),
      "date": "2021-04-05 03:49:33",
      "donation": 7354.92
    },
    {
      "id": 17,
      "idSubscription": 12,
      "cardName": encrypt("Roy Mcgee"),
      "cardNumber": encrypt("2202188354793557"),
      "cardExpirationDate": encrypt("09/25"),
      "date": "2021-02-17 09:24:05",
      "donation": 4696.97
    },
    {
      "id": 18,
      "idSubscription": 15,
      "cardName": encrypt("Ella Grant"),
      "cardNumber": encrypt("9814762284013932"),
      "cardExpirationDate": encrypt("09/25"),
      "date": "2020-10-09 08:43:31",
      "donation": 722.13
    },
    {
      "id": 19,
      "idSubscription": 16,
      "cardName": encrypt("Slater Lane"),
      "cardNumber": encrypt("2154908647532984"),
      "cardExpirationDate": encrypt("09/25"),
      "date": "2022-03-05 03:37:50",
      "donation": 256.07
    }
  ]
      
  
  await queryInterface.bulkInsert('donation', dona, {});
},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('donation', null, {});
  }
};
