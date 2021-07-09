/**
 * Auth Middleware Unit tests
 *
 * @group unit/auth
 * @group auth
 */

const { checkToken } = require('../auth/token_validation');
const { RequestMock, ResponseMock } = require('./test-assistance/mock-objects');
const { invalidTestJWT, emptyTestJWT } = require('./test-assistance/test-constants');

describe('auth tests', () => {
    let requestMock, responseMock;

    beforeEach(() => {
        responseMock = new ResponseMock();
    })

    test('validateToken with valid token', () => {
        requestMock = new RequestMock();
        const next = jest.fn();
        checkToken(requestMock, responseMock, next);
        expect(next).toHaveBeenCalled();
    })

    test('validateToken with invalid token', () => {
        requestMock = new RequestMock(invalidTestJWT);
        const next = jest.fn();
        checkToken(requestMock, responseMock, next);
        expect(responseMock.statusCode).toBe(401);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.message).toBe("Invalid token");
    })

    test('validateToken with empty token', () => {
        requestMock = new RequestMock(emptyTestJWT);
        const next = jest.fn();
        checkToken(requestMock, responseMock, next);
        expect(responseMock.statusCode).toBe(401);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.message).toBe("Invalid token");
    })

    test('validateToken with null-value token', () => {
        requestMock = new RequestMock(null);
        const next = jest.fn();
        checkToken(requestMock, responseMock, next);
        expect(responseMock.statusCode).toBe(401);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.message).toBe("Access denied: unauthorized user");
    })
})
