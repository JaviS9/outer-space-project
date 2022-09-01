const userController = require('../controllers/user');
const projectController = require('../controllers/project');
const adminController = require('../controllers/admin');
const techController = require('../controllers/tech')
const authenticationController = require('../controllers/authentication')
const subscriptionController = require('../controllers/subscription')
const app = require('../app');

module.exports = (app) => {
   // *** REGISTER AND LOGIN ***
   app.post('/register', authenticationController.register)
   app.get('/login/:id/:password', authenticationController.login)

   // *** USER ***
   // GET
   app.get('/user/list', userController.listUser); 
   app.get('/user/find/:nickName', userController.findUser);
   app.get('/user/find/id/:id', userController.findUserId);
   app.get('/user/find/projects/:id', userController.findUserFundedProjects);
   app.get('/user/find/subscriptions/:id', userController.findUserSubscriptions);
   app.get('/user/:idUser/find/subscription/:idProject', userController.findSubscription);
   app.get('/user/find/techs/:id', userController.findUserTechs);
   app.get('/user/find/donations/:id', userController.findUserDonations)
   app.get('/user/search/:nickName', userController.searchUser);

   // POST
   app.post('/user/add', userController.addUser);
   app.post('/user/add/subscription', userController.addSubscription);
   app.post('/user/add/tech', userController.addTech);

   // PUT
   app.put('/user/update/:id', userController.updateUser);

   // DELETE
   app.delete('/user/delete/:id', userController.deleteUser);
   app.delete('/user/:idUser/delete/subscription/:idProject', userController.deleteSubscription);
   app.delete('/user/:idUser/delete/tech/:idTech', userController.deleteTech);

   // *** SUBSCRIPTION ***
   // GET
   app.get('/subscription/find/:id', subscriptionController.findSubscription);
   app.get('/subscription/find/donations/:id', subscriptionController.findSubscriptionDonations);

   // *** DONATION ***
   // GET 
   app.get('/donation/list', subscriptionController.listDonation);

   // POST
   app.post('/donation/add', subscriptionController.addDonation);

   // DELETE
   app.delete('/subscription/:idSubscription/delete/donation/:idDonation', subscriptionController.deleteDonation);


   // *** PROJECT ***
   // GET
   app.get('/project/list', projectController.listProject);
   app.get('/project/find/:title', projectController.findProject);
   app.get('/project/find/id/:id', projectController.findProjectId);
   app.get('/project/find/subscriptions/:id', projectController.findProjectSubscriptions);
   app.get('/project/find/donations/:id', projectController.findProjectDonations)
   app.get('/project/all/donations', projectController.findAllDonations)
   app.get('/project/search/:title', projectController.searchProject);
   

   // POST
   app.post('/project/add', projectController.addProject);
   app.post('/project/add/update', projectController.addUpdate);

   // PUT
   app.put('/project/update/:id', projectController.updateProject);

   // DELETE
   app.delete('/project/delete/:id', projectController.deleteProject);
   app.delete('/project/:id/delete/update/:date', projectController.deleteUpdate);

   // *** UPDATES ***
   // GET ALL UPDATES WITH PROJECT INFO
   app.get('/project/find/updates/:id', projectController.findProjectUpdates);
   app.get('/project/update/list', projectController.listUpdate);
   app.get('/update/search/:update', projectController.searchUpdate);

   // *** ADMIN ***
   // GET
   app.get('/admin/list', adminController.listAdmin);
   app.get('/admin/find/:email', adminController.findAdmin);
   app.get('/admin/find/id/:id', adminController.findAdminId);
   app.get('/admin/search/:name', adminController.searchAdmin);

   // POST
   app.post('/admin/add', adminController.addAdmin);

   // PUT
   app.put('/admin/update/:id', adminController.updateAdmin);

   // DELETE
   app.delete('/admin/delete/:id', adminController.deleteAdmin);

   // *** TECH *** 
   // GET
   app.get('/tech/list', techController.listTech);
   app.get('/tech/find/:name', techController.findTech);
   app.get('/tech/find/id/:id', techController.findTechId);
   app.get('/tech/search/:name', techController.searchTech);

   // POST
   app.post('/tech/add', techController.addTech);

   // PUT
   app.put('/tech/update/:id', techController.updateTech);

   // DELETE
   app.delete('/tech/delete/:id', techController.deleteTech);
   
};