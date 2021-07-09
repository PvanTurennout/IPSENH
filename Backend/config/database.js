require('dotenv').config();
const { createPool } = require("mysql2");
const dbEnvConfigs = require('./database-env');
const envDbConfig = dbEnvConfigs[process.env.NODE_ENV];

envDbConfig.connectionLimit = 20;

const pool = createPool(envDbConfig);

module.exports = pool;
