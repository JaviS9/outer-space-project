const userController = require('../controllers/user');
const projectController = require('../controllers/project');
const adminController = require('../controllers/admin');
const techController = require('../controllers/tech')
const app = require('../app');

module.exports = (app) => {
   // REGISTER AND LOGIN
   app.post('/register', userController.addUser)

   // *** USER ***
   // GET
   app.get('/user/list', userController.listUser); 
   app.get('/user/find/:nickName', userController.findUser);
   app.get('/user/find/id/:id', userController.findUserId);
   app.get('/user/find/projects/:id', userController.findUserFundedProjects)
   app.get('/user/find/subscriptions/:id', userController.findUserSubscriptions)
   app.get('/user/find/participations/:id', userController.findUserParticipations)

   // POST
   app.post('/user/add', userController.addUser);
   app.post('/user/add/subscription', userController.addSubscription)
   app.post('/user/add/participation', userController.addParticipation)

   // PUT
   app.put('/user/update/:id', userController.updateUser);
   app.put('/user/update/status/:id', userController.updateUserStatus);

   // DELETE
   app.delete('/user/delete/:id', userController.deleteUser);
   app.delete('/user/:idUser/delete/subscription/:idProject', userController.deleteSubscription);
   app.delete('/user/:idUser/delete/participation/:idProject', userController.deleteParticipation);

   // SEARCH
   app.delete('/user/search/:nickName', userController.searchUser);

   // *** PROJECT ***
   // GET
   app.get('/project/list', projectController.listProject);
   app.get('/project/find/:title', projectController.findProject);
   app.get('/project/find/updates/:id', projectController.findProjectUpdates)
   app.get('/project/find/subscriptions/:id', projectController.findProjectSubscriptions)
   app.get('/project/find/participations/:id', projectController.findProjectParticipations)

   // POST
   app.post('/project/add', projectController.addProject);
   app.post('/project/add/update', projectController.addUpdate);

   // PUT
   app.put('/project/update/:id', projectController.updateProject);

   // DELETE
   app.delete('/project/delete/:id', projectController.deleteProject);
   app.delete('/project/:id/delete/update/:date', projectController.deleteUpdate)

   // SEARCH
   // app.delete('/project/search/:title', projectController.searchProject);

   // *** ADMIN ***
   // GET
   app.get('/admin/list', adminController.listAdmin); 
   app.get('/admin/find/id/:id', adminController.findAdminId);

   // POST
   app.post('/admin/add', adminController.addAdmin);

   // PUT
   app.put('/admin/update/:id', adminController.updateAdmin);

   // DELETE
   app.delete('/admin/delete/:id', adminController.deleteAdmin);

   // SEARCH
   app.delete('/admin/search/:search', adminController.searchAdmin);


   // *** TECH *** 
   // GET
   app.get('/tech/list', techController.listTech);
   app.get('/tech/find/:name', techController.findTech);
   app.get('/tech/find/id/:id', techController.findTechId);

   // POST
   app.post('/tech/add', techController.addTech);

   // PUT
   app.put('/tech/update/:id', techController.updateTech);

   // DELETE
   app.delete('/tech/delete/:id', techController.deleteTech);

   // SEARCH
   app.delete('/tech/search/:search', techController.searchTech);

   // SUBSCRIPTION/DONATION
   
};