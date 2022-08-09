var models = require('../models');
// const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../models');

module.exports = {
    //CREATE
    async addTech(req, res) {        
        try{
            const tech = await models.Tech.create({
                name: req.body.name,
                photo: req.body.photo,
                type: req.body.type,
            });
            res.status(200).send(tech)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Tech not created -- ' + err
            });
        }
    },
    
    //READ ALL
    async listTech(_, res) {
        try {
            const techs = await models.Tech.findAll();
            res.status(200).send(techs);
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Techs in list not found -- ' +  err
            });
        }
    },

    //READ ONE
    async findTech(req, res) {
        try{
            const tech = await models.Tech.findAll(
                { where: { name: req.params.name }});
            res.status(200).send(tech)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: findTech not found -- ' + err
            });
        }
    },

    async findTechId(req, res) {
        try{
            const tech = await models.Tech.findAll(
                { where: { id: req.params.id }});
            res.status(200).send(tech)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: findTechId not found -- ' + err
            });
        }
    },

    //UPDATE
    async updateTech (req, res) {
        try {
            const tech = await models.Tech.update({
                name: req.body.name,
                photo: req.body.photo,
                type: req.body.type,
            }, {
                where: { id: req.params.id }
            });
            res.status(200).send(tech)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Tech not updated -- ' + err
            });
        }
    },

    // DELETE
    async deleteTech (req, res) {
        try {
            const tech = await models.Tech.destroy(
                { where: { id: req.params.id } });
            res.status(200).send("SUCCESS: Tech deleted")
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Tech not deleted -- ' + err
            });
        }
    },    

    // SEARCH
    async searchTech (req, res) {
        try{
            let name = req.params.search.split(" ")[0]
            const [results, metadata] = await sequelize.query(
                "SELECT * FROM tech WHERE tech.name LIKE %:name%",
                { replacements: { name: name,
                } }
              );
            res.status(200).send(results)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: TechSearch not found -- ' + err
            });
        }
    }

};