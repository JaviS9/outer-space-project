var models = require('../models');
const { v4: uuidv4 } = require('uuid');


module.exports = {
    //CREATE
    async addUser(req, res) {
        try{
            const user = await models.User.create({
                id: uuidv4(),
                email: req.body.email,
                photo: req.body.photo,
                name: req.body.name,
                lastName: req.body.lastName,
                nickName: req.body.nickName,
                password: req.body.password,
                // idCompany: req.body.idCompany,
                // createdAt: new Date(),
                // updatedAt: new Date(),
            });
            res.status(200).send(user)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: User not created -- ' + err
            });
        }
    },
    
    //READ ALL
    async listUser(_, res) {
        try {
            const user = await models.User.findAll();
            res.status(200).send(user);
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Users in list not found -- ' +  err
            });
        }
    },

    //READ ONE
    async findUser(req, res) {
        try{
            const user = await models.User.findAll(
                { where: { nickName: req.params.nickName }});
            res.status(200).send(user)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: User not found -- ' + err
            });
        }
    },

    //UPDATE
    async updateUser (req, res) {
        try {
            const user_id = await models.User.findAll(
                { raw: true },
                { attributes: ['id'] },
                { where: { nickName: req.params.nickName } });
            const user = await models.User.update({
                email: req.body.email,
                photo: req.body.photo,
                name: req.body.name,
                lastName: req.body.lastName,
                nickName: req.body.nickName,
                password: req.body.password,
                updatedAt: new Date(),
            }, {
                where: { id: user_id[0]["id"] }
            });
            res.status(200).send(user)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: User not updated -- ' + err
            });
        }
    },
    
    //UPDATE
    async updateUserStatus (req, res) {
        try {
            const user = await models.User.update({
                status: req.body.status,
                updatedAt: new Date(),
            }, {
                where: { nickName: req.params.nickName }
            });
            res.status(200).send(user)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: User status not updated -- ' + err
            });
        }
    },

    // DELETE
    async deleteUser (req, res) {
        try {
            const user = await models.User.destroy(
                {  where: { nickName: req.params.nickName }});
            res.status(200).send(user)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: User not deleted -- ' + err
            });
        }
    }
};