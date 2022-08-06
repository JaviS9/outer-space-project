const userController = require('../controllers/user');
const projectController = require('../controllers/project');
const app = require('../app');

module.exports = (app) => {
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

   // POST
   app.post('/project/add', projectController.addProject);
   app.post('/project/add/participants', projectController.addParticipants)

   // PUT
   app.put('/project/update/:id', projectController.updateProject);

   // DELETE
   app.delete('/project/delete/:id', projectController.deleteProject);

   //ROLE
   //ADMIN
   
   //UPDATE
};