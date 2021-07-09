require('dotenv').config();
module.exports = {
    development: {
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.MYSQL_DB,
    },
    production: {
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.MYSQL_DB,
    },
    test: {
        port: process.env.DB_PORT_TEST,
        host: process.env.DB_HOST_TEST,
        user: process.env.DB_USER_TEST,
        password: process.env.DB_PASS_TEST,
        database: process.env.MYSQL_DB_TEST,
    }
}

