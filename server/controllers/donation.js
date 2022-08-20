const models = require('../models');
const { Op } = require("sequelize");

module.exports = {
    //CREATE
    async addDonation(req, res) {        
        try{
            const donation = await models.Donation.create({
                idUser: req.body.idUser,
                idProject: req.body.idProject,
                donation: req.body.donation
            });
            res.status(200).send(donation)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Donation not created -- ' + err
            });
        }
    },
    
    //READ ALL
    async listDonation(_, res) {
        try {
            const donations = await models.Donation.findAll();
            res.status(200).send(donations);
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Donations in list not found -- ' +  err
            });
        }
    },

    //READ ONE
    async findSubscriptionDonations(req, res) {
        try{
            const donation = await models.Donation.findAll(
                { where: {
                    [Op.and] : [
                        { idUser: req.params.idUser },
                        { idProject: req.params.idProject }
                    ]
                }} );
            res.status(200).send(donation)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: findDonationId not found -- ' + err
            });
        }
    },

    // DELETE
    async deleteDonation (req, res) {
        try {
            const donation = await models.Donation.destroy(
                { where: {
                    [Op.and] : [
                        { id: req.params.id },
                        { idUser: req.params.idUser },
                        { idProject: req.params.idProject }
                    ]
                }} );
            res.status(200).send("SUCCESS: Donation deleted")
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: Donation not deleted -- ' + err
            });
        }
    },

}