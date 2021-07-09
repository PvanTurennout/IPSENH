/**
 * Playlist Integration tests
 *
 * @group integration/playlist
 * @group playlist
 */

const request = require('supertest');
const {app, server} = require('../app');
const db = require('../config/database');
const {validTestJWT} = require('../test/test-assistance/test-constants');

describe("Playlist integration tests", () => {
    test.todo("Create Playlist");

    test("Read Users Playlist", async () => {
        const response = await request(app)
            .get("/api/playlist/user")
            .set('authorization', validTestJWT)
            .send()
        ;

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual([{"playlistId": 1, "playlistName": "e02db835c95d95a83c6f75f785c561f8Pieter"}]);
        }
    );

    test.skip("Update Playlist", async () => {
        const response = await request(app)
            .put("/api/playlist")
            .set('authorization', validTestJWT)
            .send({playlistId: 1, playlistName: "Updated playlist"});

        expect(response.statusCode).toBe(204);
    });

    test.todo("Delete Playlist");
});

afterAll(() => {
    db.end();
    server.close();
});
