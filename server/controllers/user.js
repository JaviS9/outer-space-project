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

    async addParticipation(req, res) {        
        try{
            const participations = await models.Participation.bulkCreate(req.body.participations);
            res.status(200).send(participations)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Este usuario ya participa en el proyecto'
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
            const user = await models.Project.findAll(
                { where: { projectFounder: req.params.id }});
            res.status(200).send(user)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Projectsfunded not found -- ' + err
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

    async findUserParticipations (req, res) {
        try{
            const [results, metadata] = await sequelize.query(
                "SELECT * FROM participation JOIN project ON project.id = participation.idProject WHERE participation.idUser = :id",
                { replacements: { id: req.params.id } }
              );
            res.status(200).send(results)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Participations not found -- ' + err
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
                where: { id: req.params.id }
            });
            res.status(200).send(user)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: User not updated -- ' + err
            });
        }
    },

    //UPDATE STAUS
    async updateUserStatus (req, res) {
        try {
            const user = await models.User.update({
                user_status: req.body.status,
                updatedAt: new Date(),
            }, {
                where: { id: req.params.id }
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
                        { idProject: req.params.idProject },
                        { idUser: req.params.idUser }
                    ]
                }} );
            res.status(200).send("SUCCESS: Subscription deleted")
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Subscription not deleted -- ' + err
            });
        }
    },

    async deleteParticipation (req, res) {
        try {
            const participation = await models.Participation.destroy(
                { where: {
                    [Op.and] : [
                        { idProject: req.params.idProject },
                        { idUser: req.params.idUser }
                    ]
                }} );
            res.status(200).send("SUCCESS: Participation deleted")
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Participation not deleted -- ' + err
            });
        }
    },
};