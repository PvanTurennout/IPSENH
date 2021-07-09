/**
 * User Controller Unit tests
 *
 * @group unit/user
 * @group user
 */

const {ResponseMock, RequestMock} = require('./test-assistance/mock-objects');

const {createUser, login, getUserById, getUsers, updateUser, deleteUser,
       getUserGenreStats, updateUserGenreStat, getUserTrackStats,  updateUserTrackStat} = require("../api/users/user.controller");

const service = require("../api/users/user.service");

jest.mock('../api/users/user.service');

describe("User.controller: createUser tests", () => {
    let responseMock;
    let requestMock;

    beforeEach(() => {
        responseMock = new ResponseMock();
        requestMock = new RequestMock();
    });

    test("createUser Happy Flow", () => {
        requestMock.body = {
            username: 'test',
            password: 'Test123'
        };

        service.create.mockImplementation(
            (data, callBack) => {
                callBack(null, {});
            }
        );

        createUser(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(200);
        expect(responseMock.body.success).toBe(1);
        expect(responseMock.body.data).not.toBe(undefined);
    });

    test("createUser database error", () => {
        requestMock.body = {
            username: 'Leander',
            password: 'Test123'
        };

        service.create.mockImplementation(
            (userId, callBack) => {
                callBack(true, null);
            }
        );

        createUser(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(500);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.message).toBe("Database connection error");
    });
});

describe("User.controller: login tests", () => {
    let responseMock;
    let requestMock;

    beforeEach(() => {
        responseMock = new ResponseMock();
        requestMock = new RequestMock();
    });

    test("login Happy Flow", () => {
        requestMock.body = {
            username: 'Leander',
            password: 'Test123'
        };

        service.getUserByUsername.mockImplementation(
            (username, callBack) => {
                callBack(null, {
                    password: "$2b$10$65yoJQonsoan8LTmD9J53udXRqP5ebiadOBgniKRUxjPkgAFAWJj2"
                });
            }
        );

        login(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(200);
        expect(responseMock.body.success).toBe(1);
        expect(responseMock.body.message).toBe("Login successful");
        expect(responseMock.body.token).not.toBe(undefined);
    });

    test("login database error", () => {
        requestMock.body = {
            username: 'Leander',
            password: 'Test123'
        };

        service.getUserByUsername.mockImplementation(
            (username, callBack) => {
                callBack(true, {});
            }
        );

        login(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(500);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.message).toBe("Database connection error");
    });

    test("login Wrong Credentials", () => {
        requestMock.body = {
            username: 'JoeDimaggio',
            password: 'MrsR'
        };

        service.getUserByUsername.mockImplementation(
            (username, callBack) => {
                callBack(null, {
                    password: "$2b$10$65yoJQonsoan8LTmD9J53udXRqP5ebiadOBgniKRUxjPkgAFAWJj2"
                });
            }
        );

        login(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(403);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.message).toBe("Invalid username or password");
    });

    test("login Nonexistent Credentials", () => {
        requestMock.body = {
            username: 'JoeDimaggio',
            password: 'MrsR'
        };

        service.getUserByUsername.mockImplementation(
            (username, callBack) => {
                callBack(null, undefined);
            }
        );

        login(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(403);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.message).toBe("Invalid username or password");
    });
});

describe("User.controller: getUserById tests", () => {
    let responseMock;
    let requestMock;

    beforeEach(() => {
        responseMock = new ResponseMock();
        requestMock = new RequestMock();
    });

    test("getUserById Happy Flow", () => {
        requestMock.params.id = 3;

        service.getUserById.mockImplementation(
            (id, callBack) => {
                callBack(null, {});
            }
        );

        getUserById(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(200);
        expect(responseMock.body.success).toBe(1);
        expect(responseMock.body.data).not.toBe(undefined);
    });

    test("getUserById database error", () => {
        requestMock.params.id = 3;

        service.getUserById.mockImplementation(
            (id, callBack) => {
                callBack(true, null);
            }
        );

        getUserById(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(500);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.message).toBe("Database connection error");
    });

    test("getUserById no results", () => {
        requestMock.params.id = 3;

        service.getUserById.mockImplementation(
            (id, callBack) => {
                callBack(false, null);
            }
        );

        getUserById(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(404);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.message).toBe("Record not found");
    });

    test("getUserById incorrect id", () => {
        requestMock.params.id = 'm';

        service.getUserById.mockImplementation(
            (id, callBack) => {
                callBack(true, null);
            }
        );

        getUserById(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(500);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.message).toBe("Database connection error");
    });
});

describe("User.controller: getUsers tests", () => {
    let responseMock;
    let requestMock;

    beforeEach(() => {
        responseMock = new ResponseMock();
        requestMock = new RequestMock();
    });

    test("getUsers Happy Flow", () => {

        service.getUsers.mockImplementation(
            (callBack) => {
                callBack(null, {});
            }
        );

        getUsers(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(200);
        expect(responseMock.body.success).toBe(1);
        expect(responseMock.body.data).not.toBe(undefined);
    });

    test("getUsers Database Error", () => {

        service.getUsers.mockImplementation(
            (callBack) => {
                callBack(true, {});
            }
        );

        getUsers(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(500);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.message).toBe("Database connection error");
    });
});

describe("User.controller: updateUser tests", () => {
    let responseMock;
    let requestMock;

    beforeEach(() => {
        responseMock = new ResponseMock();
        requestMock = new RequestMock();
    });

    test("updateUser Happy Flow", () => {

        service.updateUser.mockImplementation(
            (data, callBack) => {
                callBack(null, {});
            }
        );

        requestMock.body.password = 'Test123';

        updateUser(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(200);
        expect(responseMock.body.success).toBe(1);
        expect(responseMock.body.message).toBe("User updated successfully");
    });

    test("updateUser Database Error", () => {

        service.updateUser.mockImplementation(
            (data, callBack) => {
                callBack(true, {});
            }
        );

        requestMock.body.password = 'Test123';

        updateUser(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(500);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.message).toBe("Database connection error");
    });
});


describe("User.controller: deleteUser tests", () => {
    let responseMock;
    let requestMock;

    beforeEach(() => {
        responseMock = new ResponseMock();
        requestMock = new RequestMock();
    });

    test("deleteUser Happy Flow", () => {

        service.deleteUser.mockImplementation(
            (data, callBack) => {
                callBack(null, {});
            }
        );

        requestMock.body.id = '3';

        deleteUser(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(200);
        expect(responseMock.body.success).toBe(1);
        expect(responseMock.body.message).toBe("User deleted successfully");
    });

    test("deleteUser Database Error", () => {

        service.deleteUser.mockImplementation(
            (data, callBack) => {
                callBack(true, {});
            }
        );

        requestMock.body.id = '3';

        deleteUser(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(500);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.message).toBe("Database connection error");
    });

    test("deleteUser No Results", () => {

        service.deleteUser.mockImplementation(
            (data, callBack) => {
                callBack(null, undefined);
            }
        );

        requestMock.body.id = '3';

        deleteUser(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(404);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.message).toBe("Record not found");
    });
});

describe("User.controller: getUserGenreStats tests", () => {
    let responseMock;
    let requestMock;

    beforeEach(() => {
        responseMock = new ResponseMock();
        requestMock = new RequestMock();
    });

    test("getUserGenreStats Happy Flow", () => {

        service.selectUserGenreStats.mockImplementation(
            (id, callBack) => {
                callBack(null, {});
            }
        );

        requestMock.params.id = 3;

        getUserGenreStats(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(200);
        expect(responseMock.body.success).toBe(1);
        expect(responseMock.body.data).not.toBe(undefined);
    });

    test("getUserGenreStats Database Error", () => {

        service.selectUserGenreStats.mockImplementation(
            (id, callBack) => {
                callBack(true, {});
            }
        );

        requestMock.params.id = 3;

        getUserGenreStats(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(500);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.message).toBe("Database connection error");
    });

    test("getUserGenreStats No Results", () => {

        service.selectUserGenreStats.mockImplementation(
            (id, callBack) => {
                callBack(null, undefined);
            }
        );

        requestMock.params.id = 3;

        getUserGenreStats(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(404);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.message).toBe("User not found");
    });
});

describe("User.controller: getUserTrackStats tests", () => {
    let responseMock;
    let requestMock;

    beforeEach(() => {
        responseMock = new ResponseMock();
        requestMock = new RequestMock();
    });

    test("getUserTrackStats Happy Flow", () => {

        service.selectUserTrackStats.mockImplementation(
            (id, callBack) => {
                callBack(null, {});
            }
        );

        requestMock.params.id = 3;

        getUserTrackStats(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(200);
        expect(responseMock.body.success).toBe(1);
        expect(responseMock.body.data).not.toBe(undefined);
    });

    test("getUserTrackStats Database Error", () => {

        service.selectUserTrackStats.mockImplementation(
            (id, callBack) => {
                callBack(true, {});
            }
        );

        requestMock.params.id = 3;

        getUserTrackStats(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(500);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.message).toBe("Database connection error");
    });

    test("getUserTrackStats No Results", () => {

        service.selectUserTrackStats.mockImplementation(
            (id, callBack) => {
                callBack(null, undefined);
            }
        );

        requestMock.params.id = 3;

        getUserTrackStats(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(404);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.message).toBe("User not found");
    });
});

describe("User.controller: updateUserGenreStat tests", () => {
    let responseMock;
    let requestMock;

    beforeEach(() => {
        responseMock = new ResponseMock();
        requestMock = new RequestMock();
    });

    test("updateUserGenreStat Happy Flow", () => {

        service.updateUserGenreStat.mockImplementation(
            (id, callBack) => {
                callBack(null, {});
            }
        );

        requestMock.params.id = 3;

        updateUserGenreStat(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(200);
        expect(responseMock.body.success).toBe(1);
        expect(responseMock.body.message).toBe("statistic updated successfully");
    });

    test("updateUserGenreStat Database Error", () => {

        service.updateUserGenreStat.mockImplementation(
            (id, callBack) => {
                callBack(true, {});
            }
        );

        requestMock.params.id = 3;

        updateUserGenreStat(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(500);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.message).toBe("Database connection error");
    });
});

describe("User.controller: updateUserTrackStat tests", () => {
    let responseMock;
    let requestMock;

    beforeEach(() => {
        responseMock = new ResponseMock();
        requestMock = new RequestMock();
    });

    test("updateUserTrackStat Happy Flow", () => {

        service.updateUserTrackStat.mockImplementation(
            (id, callBack) => {
                callBack(null, {});
            }
        );

        requestMock.params.id = 3;

        updateUserTrackStat(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(200);
        expect(responseMock.body.success).toBe(1);
        expect(responseMock.body.message).toBe("statistic updated successfully");
    });

    test("updateUserTrackStat Database Error", () => {

        service.updateUserTrackStat.mockImplementation(
            (id, callBack) => {
                callBack(true, {});
            }
        );

        requestMock.params.id = 3;

        updateUserTrackStat(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(500);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.message).toBe("Database connection error");
    });
});
