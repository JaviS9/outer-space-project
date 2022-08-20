
module.exports = {
    port: process.env.PORT || 5000,
    development: {
        username: process.env.DB_USER || "root",
        password: process.env.DB_PASS || "tfg2022",
        database: process.env.DB_NAME || "osp-database",
        port: "3000",
        host: process.env.HOST || "localhost",
        dialect: process.env.DIALECT || "mysql",
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}