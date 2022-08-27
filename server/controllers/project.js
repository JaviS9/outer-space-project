const models = require('../models');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../models');
// var Buffer = require('buffer/').Buffer
const { Op } = require("sequelize");

module.exports = {
    //CREATE
    async addProject(req, res) {        
        try{
            // CREAR PROJECT
            let idProject = uuidv4()
            const project = await models.Project.create({
                id: idProject,
                title : req.body.title,
                description : req.body.description,
                repository : req.body.repository,
                photo : req.body.photo,
                projectFounder : req.body.founder.id,
                financiation: req.body.financiation,
            });
            res.status(200).send(project)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Project not created -- ' + err
            });
        }
    },
    
    // // ADD PARTICIPANTS 
    async addUpdate(req, res) {
        try {
            const update = await models.Update.create({
                idProject: req.body.idProject,
                update_date: new Date(),
                description: req.body.description
            });
            res.status(200).send(update)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Update not created -- ' + err
            });
        }
    },

    //READ ALL
    async listProject(_, res) {
        try {
            const projects = await models.Project.findAll();
            res.status(200).send(projects);
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Projects in list not found -- ' +  err
            });
        }
    },

    //READ ONE
    async findProject(req, res) {
        try{
            const project = await models.Project.findAll(
                { where: { title: req.params.title }});
            res.status(200).send(project)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Project not found -- ' + err
            });
        }
    },

    async findProjectId(req, res) {
        try{
            const project = await models.Project.findAll(
                { where: { id: req.params.id }});
            res.status(200).send(project)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: ProjectId not found -- ' + err
            });
        }
    },

    async findProjectUpdates (req, res) {
        try{
            const updates = await models.Update.findAll(
                { where: { idProject: req.params.id }});
            res.status(200).send(updates)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Updates not found -- ' + err
            });
        }
    },

    async findProjectSubscriptions (req, res) {
        try{
            const [results, metadata] = await sequelize.query(
                "SELECT * FROM subscription JOIN user ON user.id = subscription.idUser WHERE subscription.idProject = :id",
                { replacements: { id: req.params.id } }
              );
            res.status(200).send(results)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Subscriptions not found -- ' + err
            });
        }
    },

    async findProjectParticipations (req, res) {
        try{
            const [results, metadata] = await sequelize.query(
                "SELECT * FROM participation JOIN user ON user.id = participation.idUser WHERE participation.idProject = :id",
                { replacements: { id: req.params.id } }
              );
            res.status(200).send(results)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Participations not found -- ' + err
            });
        }
    },

    async findProjectDonations (req, res) {
        try{
            const [results, metadata] = await sequelize.query(
                "SELECT * FROM donation JOIN subscription ON subscription.numSubs = donation.idSubscription WHERE subscription.idProject = :id",
                { replacements: { id: req.params.id } }
              );
            res.status(200).send(results)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Donations not found -- ' + err
            });
        }
    },

    async findAllDonations (__, res) {
        try{
            const [results, metadata] = await sequelize.query(
                "SELECT project.title, sum(donation) as total FROM donation join subscription on donation.idSubscription = subscription.numSubs join project on subscription.idProject = project.id group by project.title;",
              );
            res.status(200).send(results)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Donations not found -- ' + err
            });
        }
    },

    //UPDATE
    async updateProject (req, res) {
        try {
            const project = await models.Project.update({
                title : req.body.title,
                description : req.body.description,
                repository : req.body.repository,
                photo : req.body.photo,
                projectFounder : req.body.founder.id,
                financiation: req.body.financiation,
                updatedAt: new Date(),
            }, {
                where: { id: req.params.id }
            });
            res.status(200).send(project)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Project not updated -- ' + err
            });
        }
    },

    // DELETE
    async deleteProject (req, res) {
        try {
            const project = await models.Project.destroy(
                {  where: { id: req.params.id } });
            res.status(200).send("SUCCESS: Project deleted")
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Project not deleted -- ' + err
            });
        }
    },

    async deleteUpdate (req, res) {
        try {
            const update = await models.Update.destroy(
                { where: {
                    [Op.and] : [
                        { idProject: req.params.id},
                        { update_date: req.params.date }
                    ]
                }} );
            res.status(200).send("SUCCESS: Update deleted")
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Participation not deleted -- ' + err
            });
        }
    },

    // GET UPDATES
    async listUpdate (req, res) {
        try{
            const [results, metadata] = await sequelize.query(
                "SELECT * FROM project JOIN `update` ON id = idProject;",
            );
            res.status(200).send(results)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Updates not found -- ' + err
            });
        }
    },

    // SEARCH
    async searchProject (req, res) {
        try {
            const [results, metadata] = await sequelize.query(
                "SELECT * FROM project WHERE title LIKE :title",
                { replacements: { title: '%' + req.params.title + '%' } }
              );
            res.status(200).send(results)
        } catch (err) {
            res.status(404).send({
                error: 'ERROR: Project not found -- ' + err
            });
        }
    },

    async searchUpdate (req, res) {
        try {
            const [results, metadata] = await sequelize.query(
                "SELECT project.title, project.photo, user.nickName, `update`.description, `update`.update_date FROM `update` JOIN project ON project.id = `update`.idProject JOIN user ON project.projectFounder = user.id WHERE project.title LIKE :update OR user.nickName LIKE :update OR `update`.description LIKE :update;",
                { replacements: { update: '%' + req.params.update + '%' } }
              );
            res.status(200).send(results)
        } catch (err) {
            res.status(404).send({
                error: 'ERROR: Project not found -- ' + err
            });
        }
    }
}