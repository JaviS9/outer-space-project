'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {

    let projects = [
        {
          "id": "6315c4068e2b814096a3210f",
          "projectFounder": "6315b6160ad8ea1299f63a87",
          "title": "Xinware",
          "financiation": 4526.24,
          "photo": "https://cdn-icons-png.flaticon.com/512/2949/2949010.png",
          "description": "Cupidatat et consequat commodo esse dolor. Cillum consectetur id voluptate culpa dolor sit laborum laboris cillum.",
          "repository": "www.Xinware.com",
          "startDate": "2014-02-13 09:00:06",
          "endDate": null,
        },
        {
          "id": "6315c406d3958d5446dd72b7",
          "projectFounder": "6315b6160ad8ea1299f63a87",
          "title": "Everest",
          "financiation": 3645.95,
          "photo": "https://cdn-icons-png.flaticon.com/512/1374/1374275.png",
          "description": "Velit Lorem adipisicing pariatur qui sit consectetur consequat dolor quis irure dolor elit. Ex veniam culpa fugiat id duis laborum eiusmod ea.",
          "repository": "www.Everest.com",
          "startDate": "2014-01-03 09:25:06",
          "endDate": null,
          
        },
        {
          "id": "6315c40650f50380dc4839f4",
          "projectFounder": "6315b616f4d12815c00621f9",
          "title": "Kraggle",
          "financiation": 7951.65,
          "photo": "https://cdn-icons-png.flaticon.com/512/2949/2949010.png",
          "description": "Dolore officia sunt ad amet enim. Voluptate minim voluptate laboris anim qui cupidatat aliquip culpa anim pariatur sit mollit ut sint.",
          "repository": "www.Kraggle.com",
          "startDate": "2014-02-10 09:25:06",
          "endDate": null,
        },
        {
          "id": "6315c4064df187b6da646c2d",
          "projectFounder": "6315b6160ad8ea1299f63a87",
          "title": "Stelaecor",
          "financiation": 2251.6,
          "photo": "https://cdn-icons-png.flaticon.com/512/1374/1374275.png",
          "description": "Cupidatat magna exercitation magna ut occaecat incididunt eiusmod dolor Lorem reprehenderit culpa consequat quis. Labore ex voluptate adipisicing voluptate.",
          "repository": "www.Stelaecor.com",
          "startDate": "2014-02-11 09:25:06",
          "endDate": null,
        },
        {
          "id": "6315c406a5898297f9e35248",
          "projectFounder": "6315b616f4d12815c00621f9",
          "title": "Cyclonica",
          "financiation": 461.2,
          "photo": "https://cdn-icons-png.flaticon.com/512/2949/2949009.png",
          "description": "Minim magna quis sint cillum cillum esse laborum aute fugiat dolore quis dolore in. Et ut incididunt excepteur ut.",
          "repository": "www.Cyclonica.com",
          "startDate": "2014-02-02 09:25:06",
          "endDate": null,
        },
        {
          "id": "6315c406b8bcf2ec07bb7832",
          "projectFounder": "6315b616dbae57e12349ff06",
          "title": "Solgan",
          "financiation": 4798.82,
          "photo": "https://cdn-icons-png.flaticon.com/512/2949/2949010.png",
          "description": "Sint anim esse commodo nisi commodo amet adipisicing. Quis ad enim sint aliquip do mollit aliquip duis anim enim anim aliqua qui.",
          "repository": "www.Solgan.com",
          "startDate": "2015-02-01 09:25:06",
          "endDate": null,
        },
        {
          "id": "6315c406f30b6871ae58531c",
          "projectFounder": "6315b616aa66a25113caaef5",
          "title": "Zytrax",
          "financiation": 4083.16,
          "photo": "https://cdn-icons-png.flaticon.com/512/2949/2949009.png",
          "description": "Eu aliquip sit elit nisi excepteur duis eu ipsum veniam magna sunt. Ea nisi laboris est voluptate culpa duis culpa.",
          "repository": "www.Zytrax.com",
          "startDate": "2016-01-08 09:25:06",
          "endDate": null,
        },
        {
          "id": "6315c4060b9ac5d13e327fad",
          "projectFounder": "6315b61624e7f39237c31d01",
          "title": "Zentix",
          "financiation": 1279.67,
          "photo": "https://cdn-icons-png.flaticon.com/512/2949/2949010.png",
          "description": "Pariatur est reprehenderit ad ex quis. Laborum consequat elit consequat aliqua et minim adipisicing veniam elit do.",
          "repository": "www.Zentix.com",
          "startDate": "2018-02-08 09:25:06",
          "endDate": null,
        },
        {
          "id": "6315c4063a0060ef66a629e8",
          "projectFounder": "6315b616e9c282d949b87725",
          "title": "Kog",
          "financiation": 5604.47,
          "photo": "https://cdn-icons-png.flaticon.com/512/2949/2949009.png",
          "description": "Et culpa sit minim cupidatat dolore anim ea irure magna sunt adipisicing minim. Id excepteur Lorem est Lorem ipsum veniam ipsum.",
          "repository": "www.Kog.com",
          "startDate": "2011-01-13 09:25:06",
          "endDate": null,
        },
        {
          "id": "6315c4064b8b90616dd22ded",
          "projectFounder": "6315b616e9c282d949b87725",
          "title": "Musanpoly",
          "financiation": 8269.18,
          "photo": "https://cdn-icons-png.flaticon.com/512/1374/1374275.png",
          "description": "Ullamco dolor mollit consectetur ullamco consectetur sunt sit dolore ex ullamco est. Tempor velit aute deserunt cupidatat pariatur reprehenderit cupidatat et ipsum pariatur.",
          "repository": "www.Musanpoly.com",
          "startDate": "2014-01-20 09:25:06",
          "endDate": null,
        },
        {
          "id": "6315c7d11b3bca76c30277b0",
          "projectFounder": "6315b616e9c282d949b87725",
          "title": "Quizmo",
          "financiation": 5932.9,
          "photo": "https://cdn-icons-png.flaticon.com/512/1374/1374275.png",
          "description": "Non exercitation Lorem reprehenderit tempor nulla pariatur ea nulla id laborum eu. Duis deserunt Lorem adipisicing proident ea sunt excepteur reprehenderit.",
          "repository": "www.Quizmo.com",
          "startDate": "2015-02-04 09:25:06",
          "endDate": null
        },
        {
          "id": "6315c7d106895e27df6162d6",
          "projectFounder": "6315b616f449dcb07d6a3639",
          "title": "Jimbies",
          "financiation": 2822.51,
          "photo": "https://cdn-icons-png.flaticon.com/512/2949/2949009.png",
          "description": "Eu excepteur eu veniam laborum minim ipsum tempor sit sit sunt voluptate deserunt. Enim sit eiusmod mollit mollit proident.",
          "repository": "www.Jimbies.com",
          "startDate": "2014-02-12 09:25:06",
          "endDate": null
        },
        {
          "id": "6315c7d1d776f1a6fe067349",
          "projectFounder": "6315b6169b2a6562dabceba9",
          "title": "Pharmacon",
          "financiation": 2622.07,
          "photo": "https://cdn-icons-png.flaticon.com/512/2949/2949010.png",
          "description": "Fugiat mollit enim sunt anim reprehenderit minim. Incididunt commodo fugiat laborum mollit elit anim amet esse.",
          "repository": "www.Pharmacon.com",
          "startDate": "2014-02-11 09:25:06",
          "endDate": null
        },
        {
          "id": "6315c7d1a6bb5e520df95222",
          "projectFounder": "6315b616f449dcb07d6a3639",
          "title": "Lunchpad",
          "financiation": 1760.75,
          "photo": "https://cdn-icons-png.flaticon.com/512/2949/2949010.png",
          "description": "Dolore in exercitation tempor nostrud eiusmod reprehenderit magna ut cupidatat. Excepteur reprehenderit quis velit duis tempor fugiat aliqua do anim cupidatat Lorem dolor nulla.",
          "repository": "www.Lunchpad.com",
          "startDate": "2014-01-05 09:25:06",
          "endDate": null
        },
        {
          "id": "6315c7d12d3a4f3cf1b45e08",
          "projectFounder": "6315b6169b2a6562dabceba9",
          "title": "Amtap",
          "financiation": 2480.9,
          "photo": "https://cdn-icons-png.flaticon.com/512/2949/2949009.png",
          "description": "Eiusmod cupidatat anim do labore. Proident labore consequat ut deserunt duis excepteur.",
          "repository": "www.Amtap.com",
          "startDate": "2014-01-23 09:25:06",
          "endDate": null
        },
        {
          "id": "6315c7d11fcd6ae78fbcde8b",
          "projectFounder": "6315b616eeb37e4f0bb2086b",
          "title": "Tubalum",
          "financiation": 8955.71,
          "photo": "https://cdn-icons-png.flaticon.com/512/2949/2949009.png",
          "description": "Nostrud laboris veniam quis ipsum excepteur velit in occaecat duis est culpa. Nulla aliquip Lorem voluptate reprehenderit cillum ex magna amet.",
          "repository": "www.Tubalum.com",
          "startDate": "2014-02-09 09:25:06",
          "endDate": null
        },
    ]

    await queryInterface.bulkInsert('project', projects, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('project', null, {});
  }
};
