const models = require('../models');
const { Op } = require("sequelize");
var CryptoJS = require("crypto-js");

module.exports = {
    //CREATE
    async addDonation(req, res) {        
        try{
            const donation = await models.Donation.create({
                idSubscription: req.body.idSubscription,
                cardName: CryptoJS.AES.encrypt(req.body.cardName, 'SecretPassphrase').toString(),
                cardNumber: CryptoJS.AES.encrypt(req.body.cardNumber, 'SecretPassphrase').toString(),
                cardExpirationDate: CryptoJS.AES.encrypt(req.body.cardExpirationDate, 'SecretPassphrase').toString(),
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
    async findSubscription(req, res) {
        try{
            const subscription = await models.Subscription.findAll(
                { where: { numSubs: req.params.id } });
            res.status(200).send(subscription)
        } catch (err) {
            res.status(400).send({
                error: 'ERROR: subscription not found -- ' + err
            });
        }
    },

    async findSubscriptionDonations(req, res) {
        try{
            const donation = await models.Donation.findAll(
                { where: { idSubscription: req.params.id } });
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
                        { idSubscription: req.params.idSubscription },
                        { id: req.params.idDonation },
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