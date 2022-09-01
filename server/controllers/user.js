const models = require('../models');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../models');
// var Buffer = require('buffer/').Buffer
const { Op } = require("sequelize");

module.exports = {
    //CREATE
    async addUser(req, res) {        
        try{
            const user = await models.User.create({
                id: uuidv4(),
                email: req.body.email,
                // photo: req.body.photo,
                photo: req.body.photo,
                name: req.body.name,
                lastName: req.body.lastName,
                nickName: req.body.nickName,
                biography: req.body.biography,
                password: req.body.password,
            });
            res.status(200).send(user)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Ya existe un usuario con esos datos'
            })
        }
    },

    async addSubscription(req, res) {        
        try{
            const subscriptions = await models.Subscription.bulkCreate(req.body.subscriptions);
            res.status(200).send(subscriptions)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Esta suscripción ya existe'
            });
        }
    },

    async addTech(req, res) {        
        try{
            const techs = await models.UserTech.bulkCreate(req.body.techs);
            res.status(200).send(techs)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Esta tecnología ya la tiene el usuario'
            });
        }
    },
    
    //READ ALL
    async listUser(_, res) {
        try {
            const users = await models.User.findAll();
            res.status(200).send(users);
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
                error: 'ERROR: findUser not found -- ' + err
            });
        }
    },

    async findUserId(req, res) {
        try{
            const user = await models.User.findAll(
                { where: { id: req.params.id }});
            res.status(200).send(user)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: findUserId not found -- ' + err
            });
        }
    },

    async findUserFundedProjects (req, res) {
        try{
            const projects = await models.Project.findAll(
                { where: { projectFounder: req.params.id }});
            res.status(200).send(projects)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Projectfunded not found -- ' + err
            });
        }
    },

    async findSubscription (req, res) {
        try{
            const [results, metadata] = await sequelize.query(
                "SELECT * FROM subscription JOIN project ON project.id = subscription.idProject WHERE subscription.idUser = :idUser AND subscription.idProject = :idProject",
                { replacements: { idUser: req.params.idUser, idProject: req.params.idProject }
                } );
            res.status(200).send(results)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Subscriptions not found -- ' + err
            });
        }
    },
    
    async findUserSubscriptions (req, res) {
        try{
            const [results, metadata] = await sequelize.query(
                "SELECT * FROM subscription JOIN project ON project.id = subscription.idProject WHERE subscription.idUser = :id",
                { replacements: { id: req.params.id } }
              );
            res.status(200).send(results)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Subscriptions not found -- ' + err
            });
        }
    },

    async findUserTechs (req, res) {
        try{
            const [results, metadata] = await sequelize.query(
                "SELECT * FROM usertech JOIN tech ON tech.id = usertech.idTech WHERE usertech.idUser = :id",
                { replacements: { id: req.params.id } }
              );
            res.status(200).send(results)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Friends not found -- ' + err
            });
        }
    },

    async findUserDonations (req, res) {
        try{
            const [results, metadata] = await sequelize.query(
                "SELECT * FROM donation JOIN subscription ON subscription.numSubs = donation.idSubscription WHERE subscription.idUser = :id",
                { replacements: { id: req.params.id } }
              );
            res.status(200).send(results)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Donations not found -- ' + err
            });
        }
    },

    //UPDATE
    async updateUser (req, res) {
        try {
            const user = await models.User.update({
                email: req.body.email,
                photo: req.body.photo,
                name: req.body.name,
                lastName: req.body.lastName,
                nickName: req.body.nickName,
                biography: req.body.biography,
                password: req.body.password,
                updatedAt: new Date(),
            }, {
                where: { id: req.params.id },
                individualHooks: true
            });
            res.status(200).send(user)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: User not updated -- ' + err
            });
        }
    },

    // DELETE
    async deleteUser (req, res) {
        try {
            const user = await models.User.destroy(
                { where: { id: req.params.id } });
            res.status(200).send("SUCCESS: User deleted")
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: User not deleted -- ' + err
            });
        }
    },

    async deleteSubscription (req, res) {
        try {
            const subscription = await models.Subscription.destroy(
                { where: {
                    [Op.and] : [
                        { idUser: req.params.idUser },
                        { idProject: req.params.idProject }
                    ]
                }} );
            res.status(200).send("SUCCESS: Subscription deleted")
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Subscription not deleted -- ' + err
            });
        }
    },

    async deleteTech (req, res) {
        try {
            const tech = await models.UserTech.destroy(
                { where: {
                    [Op.and] : [
                        { idUser: req.params.idUser },
                        { idTech: req.params.idTech }
                    ]
                }} );
            res.status(200).send("SUCCESS: Tech deleted")
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Tech not deleted -- ' + err
            });
        }
    },

    // SEARCH
    async searchUser (req, res) {
        try {
            const [results, metadata] = await sequelize.query(
                "SELECT * FROM user WHERE nickName LIKE :nickName OR name LIKE :nickName OR lastName LIKE :nickName OR email LIKE :nickName",
                { replacements: { nickName: '%' + req.params.nickName + '%' } }
              );
            res.status(200).send(results)
        } catch (err) {
            res.status(404).send({
                error: 'ERROR: User not found -- ' + err
            });
        }
    }
};