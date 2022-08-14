const configjson = require('./config.json')
const db = configjson.development

module.exports = {
    port: process.env.PORT || 5000,
    db: {
        database: process.env.DB_NAME || db.database,
        user: process.env.DB_USER || db.user,
        password: process.env.DB_PASS || db.password,
        options: {
            dialect: process.env.DIALECT || db.dialect,
            host: process.env.HOST || db.host,
            storage: './osp-database.mysql'
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}