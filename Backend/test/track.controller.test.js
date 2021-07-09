/**
 * Track Controller Unit tests
 *
 * @group unit/track
 * @group track
 */

const service = require("../api/tracks/tracks.service");
const {ResponseMock, RequestMock} = require('./test-assistance/mock-objects');
const {getTrackIdsFromPlaylist, changeTrackInfo, deleteTrack, uploadTrack, addTrackToPlaylist} = require('../api/tracks/tracks.controller');
const {getTrackIdsForPlaylist, updateTrack, deleteTrackFromDatabase, uploadTrackToDatabase, uploadTrackMetaData, addTrackToPlaylistInDatabase} = require('../api/tracks/tracks.service');

jest.mock('../api/tracks/tracks.service')

describe("Track.controller: getTrackIdsFromPlaylist tests", () => {
    let responseMock;
    let requestMock;

    beforeEach(() => {
        responseMock = new ResponseMock();
        requestMock = new RequestMock();
    });

    test.skip("getTrackIdsFromPlaylist Happy Flow", () => {
        requestMock.body = [1, 4, 487];
        getTrackIdsForPlaylist.mockImplementation(
            (userId, callBack) => {
                callBack({});
            }
        );

        getTrackIdsFromPlaylist(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(200);
        expect(responseMock.data).toEqual({
            1: [1, 2, 3, 4, 5, 6, 7, 8],
            4: [],
            487: [489, 2397, 934, 92]
        });

    });

    test("getTrackIdsFromPlaylist Only Empty Playlists Found", () => {
        requestMock.body = [1, 2];
        getTrackIdsForPlaylist.mockImplementation(
            (userId, callBack) => {
                callBack([]);
            }
        );

        getTrackIdsFromPlaylist(requestMock, responseMock);

        expect(responseMock.statusCode).toBe(200);
        expect(responseMock.body.data).toEqual({1: [], 2: []});
    });

    test("getTrackIdsFromPlaylist Error", () => {
        requestMock.body = [1];
        getTrackIdsForPlaylist.mockImplementation(
            (userId, callBack) => { callBack(null, 1); }
        );

        getTrackIdsFromPlaylist(requestMock, responseMock);

        expect(responseMock.statusCode).toBe(500);
    });
});

describe("Track.controller: changeTrackInfo tests", () => {
    let responseMock;
    let requestMock;

    beforeEach(() => {
        responseMock = new ResponseMock();
        requestMock = new RequestMock();
    });

    test("changeTrackInfo Happy Flow", () => {
        updateTrack.mockImplementation(
            (trackObject, response, callBack) => {
                callBack(response, null, {affectedRows: 1});
            }
        );

        changeTrackInfo(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(204);
    });

    test("changeTrackInfo Playlist does not exists", () => {
        updateTrack.mockImplementation(
            (trackObject, response, callBack) => {
                callBack(response, null, {affectedRows: 0});
            }
        );

        changeTrackInfo(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(404);
    });

    test("changeTrackInfo Error", () => {
        updateTrack.mockImplementation(
            (trackObject, response, callBack) => {
                callBack(response, 1);
            }
        );

        changeTrackInfo(requestMock, responseMock);
        expect(responseMock.statusCode).toBe(500);
    });
});


describe("Track.controller: deleteTrack tests", () => {
    let responseMock;
    let requestMock;

    beforeEach(() => {
        responseMock = new ResponseMock();
        requestMock = new RequestMock();
    });

    test("deleteTrack Happy Flow", () => {
        service.deleteTrackFromDatabase.mockImplementation(
            (id, callBack) => {
                callBack(null, {})
            }
        );

        deleteTrack(requestMock, responseMock);

        expect(responseMock.statusCode).toBe(200);
        expect(responseMock.body.success).toBe(1);
        expect(responseMock.body.data).toBe(undefined);

    });

    test("deleteTrack database error", () => {
        service.deleteTrackFromDatabase.mockImplementation(
            (id, callBack) => {
                callBack(true, {})
            }
        );

        deleteTrack(requestMock, responseMock);

        expect(responseMock.statusCode).toBe(500);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.data).toBe(undefined);

    });
});

describe("Track.controller: uploadTrack tests", () => {
    let responseMock;
    let requestMock;

    beforeEach(() => {
        responseMock = new ResponseMock();
        requestMock = new RequestMock();
    });

    test("uploadTrack Happy Flow", () => {

        service.uploadTrackToDatabase.mockImplementation(
            (sourceType, sourceUrl, callBack) => {
                callBack(null, {insertId: 1});
            }
        );

        service.uploadTrackMetaData.mockImplementation(
            (data, callBack) => {
                callBack(null, {insertId: 1});
            }
        );

        service.addTrackToPlaylistInDatabase.mockImplementation(
            (defaultPlaylistId, trackId, callBack) => {
                callBack(null, {trackId: 1, defaultPlaylistId: 4})
            }
        );

        uploadTrack(requestMock, responseMock);

        expect(responseMock.statusCode).toBe(200);
        expect(responseMock.body.success).toBe(1);
        expect(responseMock.body.data).not.toBe(undefined);

    });

    test("uploadTrack uploadTrackToDatabase error", () => {

        service.uploadTrackToDatabase.mockImplementation(
            (sourceType, sourceUrl, callBack) => {
                callBack(true, {});
            }
        );

        uploadTrack(requestMock, responseMock);

        expect(responseMock.statusCode).toBe(500);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.data).toBe(undefined);

    });

    test("uploadTrack uploadTrackMetaData error", () => {

        service.uploadTrackToDatabase.mockImplementation(
            (sourceType, sourceUrl, callBack) => {
                callBack(null, {insertId: 1});
            }
        );

        service.uploadTrackMetaData.mockImplementation(
            (data, callBack) => {
                callBack(true, {});
            }
        );

        uploadTrack(requestMock, responseMock);

        expect(responseMock.statusCode).toBe(500);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.data).toBe(undefined);

    });

    test("uploadTrack addTrackToPlaylist error", () => {

        service.uploadTrackToDatabase.mockImplementation(
            (sourceType, sourceUrl, callBack) => {
                callBack(null, {insertId: 1});
            }
        );

        service.uploadTrackMetaData.mockImplementation(
            (data, callBack) => {
                callBack(null, {insertId: 1});
            }
        );

        service.addTrackToPlaylistInDatabase.mockImplementation(
            (defaultPlaylistId, trackId, callBack) => {
                callBack(true, {trackId: 1, defaultPlaylistId: 4})
            }
        );

        uploadTrack(requestMock, responseMock);

        expect(responseMock.statusCode).toBe(500);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.data).toBe(undefined);

    });
});

describe("Track.controller: addTrackToPlaylist tests", () => {
    let responseMock;
    let requestMock;

    beforeEach(() => {
        responseMock = new ResponseMock();
        requestMock = new RequestMock();
    });

    test("addTrackToPlaylist Happy Flow", () => {
        service.addTrackToPlaylistInDatabase.mockImplementation(
            (playlistId, trackId, callBack) => {
                callBack(null, {})
            }
        );

        addTrackToPlaylist(requestMock, responseMock);

        expect(responseMock.statusCode).toBe(200);
        expect(responseMock.body.success).toBe(1);
        expect(responseMock.body.data).toBe(undefined);

    });

    test("addTrackToPlaylist duplicate entry", () => {
        service.addTrackToPlaylistInDatabase.mockImplementation(
            (playlistId, trackId, callBack) => {
                callBack({sqlState: 23000}, {})
            }
        );

        addTrackToPlaylist(requestMock, responseMock);

        expect(responseMock.statusCode).toBe(400);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.data).toBe(undefined);

    });

    test("addTrackToPlaylist error", () => {
        service.addTrackToPlaylistInDatabase.mockImplementation(
            (playlistId, trackId, callBack) => {
                callBack(true, {})
            }
        );

        addTrackToPlaylist(requestMock, responseMock);

        expect(responseMock.statusCode).toBe(500);
        expect(responseMock.body.success).toBe(0);
        expect(responseMock.body.data).toBe(undefined);

    });
});
