const logger = require("../../logger/logger");

module.exports = {
    standardGetServiceCallBackFunction: getRequestResultBuilder,
    standardPutServiceCallBackFunction: putRequestResultBuilder
}


function getRequestResultBuilder(responseObject, error, results) {
    if (error) {
        return processError(responseObject, error);
    }

    if (!results) {
        return notFound(responseObject, "No Data Found");
    }

    standardDataResponse(responseObject, results);
}

function putRequestResultBuilder(responseObject, error, results) {
    if (error) {
        return processError(responseObject, error);
    }

    if (results.affectedRows === 0) {
        return notFound(responseObject, "Id Not Found");
    }

    noResult(responseObject);
}


function processError(responseObject, error) {
    logger.error(error);

    return responseObject.status(500).json({
        message: "Internal Server Error"
    });
}

function notFound(responseObject, errorMessage) {
    return responseObject.status(404).json({
        message: errorMessage
    });
}

function noResult(responseObject) {
    return responseObject.status(204).json();
}

function standardDataResponse(responseObject, data){
    return responseObject.status(200).json({
        data: data
    });
}
