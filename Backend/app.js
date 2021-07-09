require("dotenv").config();
const express = require("express");
const app = express();
const {runMigrations} = require("./config/database_migrations");
const logger = require("./logger/logger");

// Declare routers here
const playlistRouter = require("./api/playlists/playlist.router");
const userRouter = require("./api/users/user.router");
const trackRouter = require("./api/tracks/tracks.router");
const frontendLogsRouter = require("./api/frontend-logs/frontend-logs.router");

app.use(express.json());

// Set Headers
if (process.env.NODE_ENV !== 'production'){
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', '*');
        next();
    });
}

// Employ routers here
app.use("/api/users", userRouter);
app.use("/api/playlist", playlistRouter);
app.use("/api/track", trackRouter);
app.use("/api/frontend-log", frontendLogsRouter);

if (process.env.NODE_ENV !== 'test') {
    runMigrations().then().catch((reason => logger.error(reason)));
}

const server = app.listen(process.env.APP_PORT, () => {
    logger.info("Server up and running on PORT : " + process.env.APP_PORT);
});

// To make available for testing
module.exports = {app, server};

