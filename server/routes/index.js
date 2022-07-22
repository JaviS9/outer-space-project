const userController = require('../controllers/user');
const projectController = require('../controllers/project');
const app = require('../app');

module.exports = (app) => {
   //USER
   app.post('/user/add', userController.addUser);
   app.get('/user/list', userController.listUser);
   app.get('/user/find/:nickName', userController.findUser);
   app.put('/user/update/:nickName', userController.updateUser);
   app.put('/user/updateStatus/:nickName', userController.updateUserStatus);
   app.delete('/user/delete/:nickName', userController.deleteUser);

   //PROJECT
   app.post('/project/add', projectController.addProject);
   app.get('/project/list', projectController.listProject);
   app.get('/project/find', projectController.findProject);
   app.put('/project/update', projectController.updateProject);
   app.delete('/project/find', projectController.deleteProject);

   //ADMIN
   //ROLE
   //USERROLE
   //SUBSCRIPTION
   //HISTORY
   //MEMORY
};