/**
 * Playlist Controller Unit tests
 *
 * @group unit/playlist
 * @group playlist
 */

const service = require("../api/playlists/playlist.service");
const {getUserLibrary, editPlaylist, createPlaylist} = require('../api/playlists/playlist.controller');
const {ResponseMock, RequestMock} = require('./test-assistance/mock-objects');
const {getUsersPlaylists, updatePlaylist} = require('../api/playlists/playlist.service');

jest.mock('../api/playlists/playlist.service');

describe("Playlist.controller: getUserLibrary tests", () => {
    let responseMock;
    let requestMock;

    beforeEach(() => {
        responseMock = new ResponseMock();
        requestMock = new RequestMock();
    });

    test("getUserLibrary Happy Flow", () => {
        getUsersPlaylists.mockImplementation(
            (userId, response, callBack) => {
                callBack(response, null,
                    [{playlistId: 1, playlistName: "MockList1"}, {playlistId: 2, playlistName: "MockList2"}] );
            }
        );
        getUserLibrary(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(200);
        expect(responseMock.body.data)
            .toEqual([{playlistId: 1, playlistName: "MockList1"}, {playlistId: 2, playlistName: "MockList2"}]);
    });

    test("getUserLibrary Missing Result", () => {
        getUsersPlaylists.mockImplementation(
            (userId, response, callBack) => {
                callBack(response, null, null)
            }
        );
        getUserLibrary(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(404);
    })

    test("getUserLibrary Error", () => {
        getUsersPlaylists.mockImplementation(
            (userId, response, callBack) => {
                callBack(response, 1)
            }
        );
        getUserLibrary(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(500);
    })
});

describe("Playlist.controller: editPlaylist tests", () => {
    let responseMock;
    let requestMock;

    beforeEach(() => {
        responseMock = new ResponseMock();
        requestMock = new RequestMock();
    });

    test("editPlaylist Happy Flow", () => {
        updatePlaylist.mockImplementation(
            (playlistObject, response, callBack) => {
                callBack(response, null, {affectedRows: 1});
            }
        );

        editPlaylist(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(204);
    });

    test("editPlaylist Playlist does not exists", () => {
                updatePlaylist.mockImplementation(
            (playlistObject, response, callBack) => {
                callBack(response, null, {affectedRows: 0});
            }
        );

        editPlaylist(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(404);
    });

    test("editPlaylist Error", () => {
                updatePlaylist.mockImplementation(
            (playlistObject, response, callBack) => {
                callBack(response, 1);
            }
        );

        editPlaylist(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(500);
    });
});


describe("Playlist.controller: createPlaylist tests", () => {
    let responseMock;
    let requestMock;

    beforeEach(() => {
        responseMock = new ResponseMock();
        requestMock = new RequestMock();
    });

    test("createPlaylist Happy Flow", () => {
        service.createPlaylistInDatabase.mockImplementation(
            (playlistName, callBack) => {
                callBack(null, {data: {insertId: 2}});
            }
        );

        service.assignPlaylistToUser.mockImplementation(
            (insertId, userId, callBack) => {
                callBack(null, {data: {playlistId: 2}})
            }
        )

        createPlaylist(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(200);
        expect(responseMock.body.success).toBe(1);
        expect(responseMock.body.data).not.toBe(undefined);
    });

    test("createPlaylist createPlaylistInDatabase error", () => {
        service.createPlaylistInDatabase.mockImplementation(
            (playlistName, callBack) => {
                callBack(true, {});
            }
        );

        createPlaylist(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(500);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.data).toBe(undefined);
    });

    test("createPlaylist Happy Flow", () => {
        service.createPlaylistInDatabase.mockImplementation(
            (playlistName, callBack) => {
                callBack(null, {insertId: 2});
            }
        );

        service.assignPlaylistToUser.mockImplementation(
            (insertId, userId, callBack) => {
                callBack(true, {})
            }
        )

        createPlaylist(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(500);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.data).toBe(undefined);
    });
});