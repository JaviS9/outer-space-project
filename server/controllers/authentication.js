const models = require('../models');
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
// const { sequelize } = require('../models');
const { Op } = require("sequelize");
const config = require('../config/config.js')

function jwtSignUser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async register (req, res) {
        try {
            const user = await models.User.create({
                id: uuidv4(),
                email: req.body.email,
                photo: req.body.photo,
                name: req.body.name,
                lastName: req.body.lastName,
                nickName: req.body.nickName,
                biography: req.body.biography,
                password: req.body.password,
            });
            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
        } catch (err) {
            res.status(500).send({
                error: 'ERROR: Ha ocurrido un error intentando hacer el registro'
            })
        }
    },

    async login (req, res) {
        try {
            const id = req.params.id
            const password = req.params.password
            var admin = false
            const user = await models.User.findOne({
                where: { [Op.or] : [
                    { email: id },
                    { nickName: id }
                ]}
            })
            if(!user) {
                const user = await models.Admin.findOne(
                    { where: { email: id }, }
                )
                if(!user) {
                    res.status(403).send({
                        error: 'Los datos de inicio de sesión son incorrectos'
                    })
                } else { admin = true }
            }
            const isPassValid = await user.comparePassword(password)
            if(!isPassValid) {
                return res.status(403).send({
                    error: 'La contraseña no es valida'
                })
            }
            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson),
                admin: admin
            })
        } catch (err) {
            res.status(500).send({
                error: 'ERROR: Ha ocurrido un error intentando iniciar sesión -- ' + err
            })
        }
    }
}