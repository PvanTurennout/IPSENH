const {runMigrations} = require("./config/database_migrations");

runMigrations().then().catch((reason => console.error(reason)));
