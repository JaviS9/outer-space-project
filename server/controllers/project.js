var models = require('../models');

module.exports = {
    //CREATE
    async addProject(req, res) {
        try{
            const project = await models.Project.create(
            {
                //DEFINE DATA
            });
            res.status(200).send(project)

        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Project not created -- ' + err
            })
        }
    },
    
    //READ ALL
    async listProject(_, res) {
        try {
            const project = await models.Project.findAll({});
            res.status(200).send(project);
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Projects in list not found -- ' +  err
            })
        }
    },

    //READ ONE
    async findProject(req, res) {
        try{
            const project = await models.Project.findAll({ where: { id: req.body.id }})
            res.status(200).send(project)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Project not found -- ' + err
            })
        }
    },

    //UPDATE
    async updateProject (req, res) {
        try {
            // const project = await models.Project.updateProjectById({  where: { id: req.body.id } })
            const project = await models.Project.updateProjectById(
                {
                    //DEFINE DATA
                    where: { id: req.body.id }
                });
            res.status(200).send(project)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Project not updated -- ' + err
            })
        }
    },
    
    // DELETE
    async deleteProject (req, res) {
        try {
            const project = await models.Project.deleteUserById({  where: { id: req.body.id } })
            res.status(200).send(project)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Project not deleted -- ' + err
            })
        }
    }
};