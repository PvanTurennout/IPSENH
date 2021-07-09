const router = require("express").Router();
const {logRequest} = require("../../logger/requestLogger");
const {logSomethingFromFrontend} = require("./frontend-logs.controller");

router.post("/", logRequest, logSomethingFromFrontend);

module.exports = router;
