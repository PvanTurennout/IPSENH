/**
 * Track Integration tests
 *
 * @group integration/track
 * @group track
 */

const request = require('supertest');
const {app, server} = require('../app');
const {validTestJWT} = require('../test/test-assistance/test-constants');
const db = require('../config/database');

describe("Track intergration tests", () => {
    test.todo("Create Track");

    test.skip("Read Users-Playlist Tracks", async () => {
        const response = await request(app)
            .get("api/track")
            .set('authorization', validTestJWT)
            .send();

        expect(response.statusCode).toBe(200);
        expect(response.body.data).toEqual([
            {trackId: 1, trackName: "", artist: "", type: "", genre: "", location: ""},
            {trackId: 1, trackName: "", artist: "", type: "", genre: "", location: ""},
            {trackId: 1, trackName: "", artist: "", type: "", genre: "", location: ""}
        ]);
    });

    test.skip("Read All Users Playlists Tracks", async () => {
        const response = await request(app)
            .post("api/track")
            .set('authorization', validTestJWT)
            .send([1, 2, 3]);

        expect(response.statusCode).toBe(200);
        expect(response.body.data).toEqual({
            1: [1, 2, 3],
            2: [2, 3],
            3: [1]
        });
    });

    test.skip("Update Track", async () => {
        const response = await request(app)
            .put("api/track")
            .set('authorization', validTestJWT)
            .send({trackId: 1, trackName: "Updated Track", artist: "Updated Artist"});

        expect(response.statusCode).toBe(204);
    });

    test.todo("Delete Track");
});

afterAll(() => {
    db.end();
    server.close();
});
