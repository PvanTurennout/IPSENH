const logger = require("../../logger/logger");

module.exports = {
    logSomethingFromFrontend: (request, response) => {
        const ngxLogObject = request.body;
        logger.error(`FRONTEND: ${ngxLogObject.timestamp} message: ${ngxLogObject.message}`);
        return response.status(201).json();
    }
}
