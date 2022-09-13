'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
  
  let updates = [
    {
      "idProject": "6315c4068e2b814096a3210f",
      "update_date": "2016-05-07 06:54:30",
      "description": "Eu ullamco sunt eu Lorem eu ea cillum incididunt amet duis tempor. Lorem ut consequat proident in id."
    },
    {
      "idProject": "6315c4068e2b814096a3210f",
      "update_date": "2022-04-12 07:53:25",
      "description": "Mollit nisi in magna aute duis aliqua Lorem veniam."
    },
    {
      "idProject": "6315c4068e2b814096a3210f",
      "update_date": "2015-07-29 05:09:46",
      "description": "Proident anim non nulla in non nostrud consectetur labore ut excepteur commodo id eu. Adipisicing proident ad elit tempor fugiat nisi."
    },
    {
      "idProject": "6315c406d3958d5446dd72b7",
      "update_date": "2016-12-07 01:44:26",
      "description": "Anim esse adipisicing aliquip irure do laboris ut id veniam cillum quis pariatur deserunt. Qui mollit ut duis aute."
    },
    {
      "idProject": "6315c406d3958d5446dd72b7",
      "update_date": "2016-10-31 11:35:16",
      "description": "Nostrud ullamco voluptate dolore qui ea tempor. Nostrud in anim pariatur eiusmod anim est cupidatat."
    },
    {
      "idProject": "6315c40650f50380dc4839f4",
      "update_date": "2016-03-28 11:15:32",
      "description": "Tempor ut labore proident aliqua labore ullamco duis elit pariatur et exercitation consequat duis. Reprehenderit nulla aliqua mollit consequat cillum mollit tempor adipisicing Lorem reprehenderit labore."
    },
    {
      "idProject": "6315c406d3958d5446dd72b7",
      "update_date": "2019-04-12 12:33:01",
      "description": "Nulla nulla fugiat enim exercitation Lorem consequat sint proident officia laboris eu elit. Ut Lorem non irure anim eu incididunt in tempor Lorem ut culpa do."
    },
    {
      "idProject": "6315c40650f50380dc4839f4",
      "update_date": "2018-01-02 08:10:51",
      "description": "Duis ut nulla nisi veniam."
    },
    {
      "idProject": "6315c40650f50380dc4839f4",
      "update_date": "2021-07-01 06:10:29",
      "description": "Commodo proident id cillum ut ipsum velit dolore duis laborum enim amet consectetur deserunt sint. Aliquip dolore veniam officia incididunt quis in aliqua velit occaecat exercitation et anim."
    },
    {
      "idProject": "6315c40650f50380dc4839f4",
      "update_date": "2019-06-02 05:42:26",
      "description": "Exercitation magna aute occaecat Lorem minim nostrud. Et nulla culpa ex elit mollit Lorem."
    },
    {
      "idProject": "6315c406a5898297f9e35248",
      "update_date": "2018-07-09 02:45:48",
      "description": "Lorem ipsum nisi proident nisi est occaecat esse tempor eiusmod voluptate consequat ipsum commodo enim. Nulla sint labore laboris non ut nisi ullamco veniam ipsum tempor."
    },
    {
      "idProject": "6315c406a5898297f9e35248",
      "update_date": "2014-02-13 09:25:06",
      "description": "Qui aliquip quis eu adipisicing magna ad laborum culpa consectetur nisi nulla ex irure."
    },
    {
      "idProject": "6315c406a5898297f9e35248",
      "update_date": "2016-11-14 01:53:10",
      "description": "Magna pariatur consequat officia reprehenderit excepteur. In sunt proident ex incididunt cupidatat do."
    },
    {
      "idProject": "6315c4060b9ac5d13e327fad",
      "update_date": "2017-12-22 05:55:13",
      "description": "Excepteur eiusmod duis officia anim. Irure incididunt nisi dolore velit ut ad cupidatat sint cillum."
    },
    {
      "idProject": "6315c4064b8b90616dd22ded",
      "update_date": "2021-08-07 04:42:15",
      "description": "Excepteur irure culpa duis dolore et. Pariatur pariatur id dolore cupidatat."
    },
    {
      "idProject": "6315c4064b8b90616dd22ded",
      "update_date": "2014-07-22 05:06:58",
      "description": "Voluptate ipsum nisi minim eiusmod irure excepteur consequat officia. Pariatur aliquip ea ullamco magna elit eiusmod id et non ullamco ea tempor."
    },
    {
      "idProject": "6315c7d1a6bb5e520df95222",
      "update_date": "2014-03-02 11:33:10",
      "description": "Consequat ut laborum sunt qui amet ipsum pariatur labore esse aute in non ea dolor. Eiusmod proident dolor enim veniam aliquip pariatur ut adipisicing aute eu commodo."
    },
    {
      "idProject": "6315c7d1a6bb5e520df95222",
      "update_date": "2021-07-12 03:28:02",
      "description": "Consectetur elit dolore occaecat fugiat veniam officia pariatur eu cillum incididunt. Qui anim nulla et mollit commodo do minim laborum veniam mollit."
    }
  ]
  
  await queryInterface.bulkInsert('update', updates, {});
},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('update', null, {});
  }
};
