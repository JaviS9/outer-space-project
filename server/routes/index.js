const userController = require('../controllers/user');
const projectController = require('../controllers/project');
const app = require('../app');

module.exports = (app) => {
   //USER
   app.get('/user/list', userController.listUser);
   app.get('/user/find/:nickName', userController.findUser);
   app.post('/user/add', userController.addUser);
   app.put('/user/update/:nickName', userController.updateUser);
   app.put('/user/updateStatus/:nickName', userController.updateUserStatus);
   app.delete('/user/delete/:nickName', userController.deleteUser);
   app.delete('/user/search/:nickName', userController.searchUser);

   //PROJECT
   app.get('/project/list', projectController.listProject);
   app.get('/project/find/:title', projectController.findProject);
   app.post('/project/add', projectController.addProject);
   app.put('/project/update/:title', projectController.updateProject);
   app.delete('/project/delete/:title', projectController.deleteProject);

   //ROLE
   //ADMIN
   
   //USERROLE
   //SUBSCRIPTION
   //UPDATE
};