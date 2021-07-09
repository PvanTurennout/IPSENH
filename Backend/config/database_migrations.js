const path = require("path")

const marv = require('marv/api/promise');
const driver = require('marv-mysql-driver');
const directory = path.resolve('./migrations');

const dbEnvConfigs = require('./database-env');
const envDbConfig = dbEnvConfigs[process.env.NODE_ENV];

const options = {
    table: 'db_migrations',
    connection: envDbConfig
};

module.exports = {
    runMigrations: async () => {
        const migrations = await marv.scan(directory);
        await marv.migrate(migrations, driver(options));
    }
}
