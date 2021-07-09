const {assignPlaylistToUser} = require("./playlist.service");
const {standardGetServiceCallBackFunction, standardPutServiceCallBackFunction} = require("./servicesHandeler.functions");
const {getUsersPlaylists, updatePlaylist, createPlaylistInDatabase} = require("./playlist.service");
const {decode} = require("jsonwebtoken");

module.exports = {
    getUserLibrary: (request, response) => {
        const jwt = request.get('authorization').split(" ")[1];
        const userId = decode(jwt).result.userId;
        getUsersPlaylists(userId, response, standardGetServiceCallBackFunction);
    },

    editPlaylist: (request, response) => {
        updatePlaylist(extractBody(request), response, standardPutServiceCallBackFunction);
    },

    createPlaylist: (request, responseToFrontend) => {
        const jwt = request.get('authorization').split(" ")[1];
        const userId = decode(jwt).result.userId;

        const body = extractBody(request);
        const playlistName = body._name;

        createPlaylistInDatabase(playlistName, (error, responseFromDatabase) => {
            if (error) {
                return responseToFrontend.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            assignPlaylistToUser(responseFromDatabase.insertId, userId, (error, secondResponseFromDatabase) => {
                if (error) {
                    return responseToFrontend.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    });
                }

                return responseToFrontend.status(200).json({
                    success: 1,
                    data: {playlistId: responseFromDatabase.insertId}
                });
            })
        });
    }
}

function extractBody(request) {
    return request.body;
}
