var models = require('../models');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../models');

module.exports = {
    //CREATE
    async addAdmin(req, res) {        
        try{
            const admin = await models.Admin.create({
                id: uuidv4(),
                email: req.body.email,
                name: req.body.name,
                lastName: req.body.lastName,
                password: req.body.password,
            });
            res.status(200).send(admin)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Admin not created -- ' + err
            });
        }
    },
    
    //READ ALL
    async listAdmin(_, res) {
        try {
            const admins = await models.Admin.findAll();
            res.status(200).send(admins);
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Admins in list not found -- ' +  err
            });
        }
    },

    //READ ONE
    async findAdminId(req, res) {
        try{
            const admin = await models.Admin.findAll(
                { where: { id: req.params.id }});
            res.status(200).send(admin)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: findAdminId not found -- ' + err
            });
        }
    },

    //UPDATE
    async updateAdmin (req, res) {
        try {
            const admin = await models.Admin.update({
                email: req.body.email,
                name: req.body.name,
                lastName: req.body.lastName,
                password: req.body.password,
                updatedAt: new Date(),
            }, {
                where: { id: req.params.id }
            });
            res.status(200).send(admin)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Admin not updated -- ' + err
            });
        }
    },

    // DELETE
    async deleteAdmin (req, res) {
        try {
            const admin = await models.Admin.destroy(
                { where: { id: req.params.id } });
            res.status(200).send("SUCCESS: Admin deleted")
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Admin not deleted -- ' + err
            });
        }
    },    

    // SEARCH
    async searchAdmin (req, res) {
        try{
            let name = req.params.search.split(" ")[0]
            const [results, metadata] = await sequelize.query(
                "SELECT * FROM admin WHERE admin.name LIKE %:name%",
                { replacements: { name: name,
                } }
              );
            res.status(200).send(results)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: AdminSearch not found -- ' + err
            });
        }
    }

};