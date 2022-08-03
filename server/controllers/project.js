var models = require('../models');
const { v4: uuidv4 } = require('uuid');
// var Buffer = require('buffer/').Buffer


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
                photo : null,
                projectFounder : req.body.founder.id,
            });
            res.status(200).send(project)
            // FUNCTION PARTICIPANTS
            addParticipants(res, req.body.participants, idProject)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Project not created -- ' + err
            });
        }
    },
    
    // ADD PARTICIPANTS 
    async addParticipants(res, participants, idProject) {
        try {
            // METER PART
            for(let i = 0; i < participants.length; i++){
                const participant = await models.Participation.create({
                    idUser: participants[i].id,
                    idProject: idProject,
                });
                res.status(200).send(participant)
            }
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Project not created -- ' + err
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

    //UPDATE
    async updateProject (req, res) {
        try {
            const project_id = await models.Project.findAll(
                { raw: true },
                { attributes: ['id'] },
                { where: { title: req.params.title } });
            const project = await models.Project.update({
                projectFounder : req.body.projectFounder,
                title : req.body.title,
                description : req.body.description,
                repository : req.body.repository,
                updatedAt: new Date(),
            }, {
                where: { id: project_id[0]["id"] }
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
            const project_id = await models.Project.findAll(
                { raw: true },
                { attributes: ['id'] },
                { where: { title: req.params.title } });
            const project = await models.Project.destroy(
                {  where: { id: project_id[0]["id"] } });
            res.status(200).send("SUCCESS: Project deleted")
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Project not deleted -- ' + err
            });
        }
    }
};