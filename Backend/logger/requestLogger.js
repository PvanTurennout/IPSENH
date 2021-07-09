const logger = require("./logger");

module.exports = {
    logRequest: (request, response, next) => {
        logger.info(
            `${request.ip} - - [${Date.now()}] request: "${request.method} - ${request.originalUrl} - ${request.hostname}"`
        );
        next();
    }
}
