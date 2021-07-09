const {validTestJWT} = require('./test-constants');

class ResponseMock {
    statusCode;
    body;

    constructor() {
        this.statusCode = 0;
        this.body = {};
    }

    status(code) {
        this.statusCode = code;
        return this;
    }

    json(object) {
        this.body = object;
        return this;
    }
}

class RequestMock {
    body;
    params;
    token;

    constructor(token) {
        this.token = typeof token !== 'undefined' ? token : validTestJWT;
        this.body = {};
        this.params = { id: 0 };
    }

    get(placeholder) {

        return this.token;
    }
}

module.exports = {
    RequestMock,
    ResponseMock
}
